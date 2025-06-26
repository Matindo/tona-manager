from models.team import Team, TeamCreate, TeamResponse
from models.team_member import TeamMemberResponse
from typing import List
from sqlmodel import select, Session
import services.member_service as member_server 

def create_team(team_create: TeamCreate, session: Session) -> TeamResponse:
  members = List[int]
  if len(team_create.members) > 0:
    for member in team_create.members:
      member_to_db = 
  team = Team(**team_create.model_dump())
  if 
  session.add(team)
  session.commit()
  session.refresh(team)
  return TeamResponse(**team.model_dump())

def get_team(team_id: int, session: Session) -> TeamResponse | None:
  statement = select(Team).where(Team.team_id == team_id)
  result = session.exec(statement).first()
  if not result:
    return None
  team_members = []
  if result.members:
    for member_id in result.members:
      member = member_server.get_team_member(member_id, session)
      if member:
        team_members.append(TeamMemberResponse.model_validate(member))
  return TeamResponse(**result.model_dump(), members=team_members)

def update_team(team: Team, session: Session) -> TeamResponse | None:
  existing_team = get_team(team.team_id, session)
  if not existing_team:
    return None
  update_data = team.model_dump(exclude_unset=True)
  for key, value in update_data.items():
    setattr(existing_team, key, value)
  session.add(existing_team)
  session.commit()
  session.refresh(existing_team)
  return TeamResponse(**existing_team.model_dump())

def add_team_member(team_id: int, member_id: int, session: Session) -> TeamResponse | None:
  team = get_team(team_id, session)
  if not team:
    return None
  if member_id not in team.members:
    team.members.append(member_id)
    session.add(team)
    session.commit()
    session.refresh(team)
  return TeamResponse(**team.model_dump())

def remove_team_member(team_id: int, member_id: int, session: Session) -> TeamResponse | None:
  team = get_team(team_id, session)
  if not team:
    return None
  if member_id in team.members:
    team.members.remove(member_id)
    session.add(team)
    session.commit()
    session.refresh(team)
  return TeamResponse(**team.model_dump())

def get_all_teams(session: Session) -> List[TeamResponse]:
  statement = select(Team)
  results = session.exec(statement).all()
  return results

def delete_team(team_id: int, session: Session) -> bool:
  team = get_team(team_id, session)
  if not team:
    return False
  session.delete(team)
  session.commit()
  return True
