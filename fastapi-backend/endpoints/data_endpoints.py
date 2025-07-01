from fastapi import APIRouter, HTTPException, Depends, Path, status
from services.db_service import get_session
from sqlmodel import Session
from typing import Annotated
from models.team import TeamUpdate, TeamResponse
from models.team_member import TeamMemberUpdate, TeamMemberResponse
from models.points import PointsCreate, PointsUpdate, PointsResponse
import services.team_service as team_server
import services.member_service as member_server
import services.points_service as points_server
import services.tona_service as tona_server

router = APIRouter()

# ----------------------------------------------------------------------- #
## Tournament Endpoints
# ----------------------------------------------------------------------- #
@router.delete("/deleteTournament", status_code=status.HTTP_202_ACCEPTED)
def delete_tournament(tournament_id: int, session: Session = Depends(get_session)):
  """
  Delete a tournament.
  This endpoint allows deleting a tournament specified by its ID.
  """
  try:
    result = tona_server.delete_tournament(tournament_id, session)
    if not result:
      raise HTTPException(status_code=404, detail="Tournament not found")
    return {"message": "Tournament deleted successfully"}
  except Exception as e:
    raise HTTPException(status_code=400, detail=str(e))


# ----------------------------------------------------------------------- #
## Team Endpoints
# ----------------------------------------------------------------------- #
@router.delete("/deleteTeam", status_code=status.HTTP_200_OK)
async def delete_member(team_id: int, session: Session = Depends(get_session)):
  """
  Delete a team.
  This endpoint allows deleting a team from the database.
  """
  try:
    result = team_server.delete_team(team_id, session)
    if not result:
      raise HTTPException(status_code=404, detail="Team not found")
    return {"message": "Team deleted successfully"}
  except Exception as e:
    raise HTTPException(status_code=400, detail=str(e))


# ----------------------------------------------------------------------- #
## Member Endpoints
# ----------------------------------------------------------------------- #
@router.delete("/deleteMember", status_code=status.HTTP_204_NO_CONTENT)
async def delete_member(member_id: int, session: Session = Depends(get_session)):
  """
  Delete a member from the records.
  This endpoint allows deleting a member from your database.
  """
  try:
    result = member_server.delete_team_member(member_id, session)
    if not result:
      raise HTTPException(status_code=404, detail="Team member not found")
    return {"message": "Member deleted successfully"}
  except Exception as e:
    raise HTTPException(status_code=400, detail=str(e))


# ----------------------------------------------------------------------- #
## Points Endpoints
# ----------------------------------------------------------------------- #
@router.post("/addMemberScore", status_code=status.HTTP_201_CREATED)
def add_member_points(points: PointsCreate, session: Session = Depends(get_session)):
  """
  Add member points.
  This endpoint allows assigning points for a finished round to a specified member.
  """
  try:
    result = points_server.add_points(points, session)
    if not result:
      raise HTTPException(status_code=404, detail="Member not found")
    return {"message": "Points added successfully", "points": result}
  except Exception as e:
    raise HTTPException(status_code=400, detail=str(e))
      
@router.post("/editMemberScore", status_code=status.HTTP_202_ACCEPTED)
def edit_member_points(points: PointsUpdate, session: Session = Depends(get_session)):
  """
  Edit existing member points.
  This endpoint allows editing of existing member points for a round.
  """
  try:
    result = points_server.update_points(points, session)
    if not result:
      raise HTTPException(status_code=404, detail="Record not found")
    return {"message": "Points edited successfully", "points": result}
  except Exception as e:
    raise HTTPException(status_code=400, detail=str(e))
    
@router.post("/deleteMemberScore", status_code=status.HTTP_202_ACCEPTED)
def delete_member_points(points_id: int, session: Session = Depends(get_session)):
  """
  Delete existing member points.
  This endpoint removes existing member points from your database.
  """
  try:
    result = points_server.delete_points(points_id, session)
    if not result:
      raise HTTPException(status_code=404, detail="Record not found")
    return {"message": "Points deleted successfully"}
  except Exception as e:
    raise HTTPException(status_code=400, detail=str(e))