from models.points import Points, PointsCreate, PointsUpdate, PointsResponse
from typing import List
from sqlmodel import select, Session
import services.member_service as member_server 
import services.tona_service as tona_server
from datetime import datetime


def add_points(points: PointsCreate, session: Session) -> PointsResponse:
  points_data = Points(**points.model_dump())
  if tona_server.get_tournament_by_id(points.tournament_id, session) is None:
    raise ValueError(f"Tournament with ID {points.tournament_id} does not exist")
  if member_server.get_team_member(points.member_id, session) is None:
    raise ValueError(f"Member with ID {points.member_id} does not exist")
  points_data.created_at = datetime.now().isoformat(" ", "seconds")
  session.add(points_data)
  session.commit()
  session.refresh(points_data)
  return PointsResponse(**points_data.model_dump())

def update_points(points: PointsUpdate, session: Session)-> PointsResponse:
  existing_points = session.get(Points, points.points_id)
  if not existing_points:
    raise ValueError(f"Points with ID {points.points_id} does not exist")
  update_data = points.model_dump(exclude_unset=True)
  for key, value in update_data.items():
    setattr(existing_points, key, value)
  setattr(existing_points, "updated_at", datetime.now().isoformat(" ", "seconds"))
  session.add(existing_points)
  session.commit()
  session.refresh(existing_points)
  return PointsResponse(**existing_points.model_dump())

def get_member_points(member_id: int, session: Session) -> List[PointsResponse]:
  points = []
  if member_server.get_team_member(member_id, session) is None:
    raise ValueError(f"Member with ID {member_id} does not exist")
  statement = select(Points).where(Points.member_id == member_id)
  results = session.exec(statement).all()
  if not results:
    return points
  for result in results:
    points.append(PointsResponse(**result.model_dump()))
  return points

def get_tournament_points(tourn_id: int, session: Session) -> List[PointsResponse]:
  points = []
  if tona_server.get_tournament_by_id(tourn_id, session) is None:
    raise ValueError(f"Tournament with ID {tourn_id} does not exist")
  statement = select(Points).where(Points.tournament_id == tourn_id)
  results = session.exec(statement).all()
  if not results:
    return points
  for result in results:
    points.append(PointsResponse(**result.model_dump()))
  return points

def get_tournament_round_points(tourn_id: int, round: int, session: Session) -> List[PointsResponse]:
  points = []
  if tona_server.get_tournament_by_id(tourn_id, session) is None:
    raise ValueError(f"Tournament with ID {tourn_id} does not exist")
  statement = select(Points).where(
    Points.tournament_id == tourn_id,
    Points.round == round
  )
  results = session.exec(statement).all()
  if not results:
    return points
  for result in results:
    points.append(PointsResponse(**result.model_dump()))
  return points

def get_member_tournament_points(tourn_id: int, member_id: int, session: Session) -> List[PointsResponse]:
  points = []
  if member_server.get_team_member(member_id, session) is None:
    raise ValueError(f"Member with ID {member_id} does not exist")
  if tona_server.get_tournament_by_id(tourn_id, session) is None:
    raise ValueError(f"Tournament with ID {tourn_id} does not exist")
  statement = select(Points).where(
    Points.member_id == member_id,
    Points.tournament_id == tourn_id
  )
  results = session.exec(statement).all()
  if not results:
    return points
  for result in results:
    points.append(PointsResponse(**result.model_dump()))
  return points

def delete_points(points_id: int, session: Session) -> bool:
  existing_points = session.get(Points, points_id)
  if not existing_points:
    raise ValueError(f"Points with ID {points_id} does not exist")
  session.delete(existing_points)
  session.commit()
  return True