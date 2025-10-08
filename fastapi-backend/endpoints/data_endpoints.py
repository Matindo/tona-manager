from fastapi import APIRouter, HTTPException, Depends, Path, status
from services.db_service import get_session
from sqlmodel import Session
from typing import Annotated, List
from models.team import TeamResponse
from models.team_member import TeamMemberResponse
from models.tournament import TournamentResponse
from models.points import PointsCreate, PointsUpdate, PointsResponse
import services.team_service as team_server
import services.member_service as member_server
import services.points_service as points_server
import services.tona_service as tona_server

router = APIRouter()

# ----------------------------------------------------------------------- #
## Tournament Endpoints
# ----------------------------------------------------------------------- #
@router.get("/getTournaments", response_model=list[TournamentResponse], status_code=status.HTTP_200_OK)
def get_all_tournaments(session: Session = Depends(get_session)):
  """
  Retrieve all tournaments.
  This endpoint returns a list of all tournaments in the system.
  """
  try:
    tournaments = tona_server.get_tournaments(session)
    return tournaments
  except HTTPException:
    raise
  except Exception as e:
    raise HTTPException(status_code=400, detail=str(e))

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
  except HTTPException:
    raise
  except Exception as e:
    raise HTTPException(status_code=400, detail=str(e))


# ----------------------------------------------------------------------- #
## Team Endpoints
# ----------------------------------------------------------------------- #
@router.get("/getAllTeams", response_model=List[TeamResponse], status_code=status.HTTP_200_OK)
def get_all_teams(session: Session = Depends(get_session)):
  """
  Get all teams.
  This endpoint retrieves a list of all teams in the database.
  """
  try:
    teams = team_server.get_all_teams(session)
    if len(teams) < 1:
      raise HTTPException(status_code=404, detail="No teams found")
    return teams
  except HTTPException:
    raise
  except Exception as e:
    raise HTTPException(status_code=400, detail=str(e))

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
  except HTTPException:
    raise
  except Exception as e:
    raise HTTPException(status_code=400, detail=str(e))
  
@router.delete("/deleteAllTeams", status_code=status.HTTP_200_OK)
def delete_all_teams(session: Session = Depends(get_session)):
  """
  Delete all teams.
  This endpoint allows deleting all teams from the database.
  """
  try:
    result = team_server.delete_all_teams(session)
    if not result:
      raise HTTPException(status_code=404, detail="No teams found to delete")
    return {"message": "All teams deleted successfully"}
  except HTTPException:
    raise
  except Exception as e:
    raise HTTPException(status_code=400, detail=str(e))


# ----------------------------------------------------------------------- #
## Member Endpoints
# ----------------------------------------------------------------------- #
@router.get("/getMember/{member_id}", response_model=TeamMemberResponse, status_code=status.HTTP_200_OK)
def get_member_by_id(member_id: Annotated[int, Path(description="ID of the team member to retrieve")], session: Session = Depends(get_session)):
  """
  Get a team member by ID.
  This endpoint retrieves a team member's details using their ID.
  """
  try:
    member = member_server.get_team_member(member_id, session)
    if not member:
      raise HTTPException(status_code=404, detail="Team member not found")
    return member
  except HTTPException:
    raise
  except Exception as e:
    raise HTTPException(status_code=400, detail=str(e))
  
@router.get("/getAllMembers", response_model=List[TeamMemberResponse], status_code=status.HTTP_200_OK)
def get_all_members(session: Session = Depends(get_session)):
  """
  Get all team members.
  This endpoint retrieves a list of all team members in the database.
  """
  try:
    members = member_server.get_all_members(session)
    if len(members) < 1:
      raise HTTPException(status_code=404, detail="No team members found")
    return members
  except HTTPException:
    raise
  except Exception as e:
    raise HTTPException(status_code=400, detail=str(e))

@router.delete("/deleteMember", status_code=status.HTTP_204_NO_CONTENT)
def delete_member(member_id: int, session: Session = Depends(get_session)):
  """
  Delete a member from the records.
  This endpoint allows deleting a member from your database.
  """
  try:
    result = member_server.delete_team_member(member_id, session)
    if not result:
      raise HTTPException(status_code=404, detail="Team member not found")
    return {"message": "Member deleted successfully"}
  except HTTPException:
    raise
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
  except HTTPException:
    raise
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
  except HTTPException:
    raise
  except Exception as e:
    raise HTTPException(status_code=400, detail=str(e))
  
@router.get("/getMemberPoints/{member_id}", response_model=List[PointsResponse], status_code=status.HTTP_200_OK)
def get_member_points(member_id: Annotated[int, Path(description="ID of the team member to retrieve points for")], session: Session = Depends(get_session)):
  """
  Get all points for a specific member.
  This endpoint retrieves all points assigned to a specific member.
  """
  try:
    points = points_server.get_member_points(member_id, session)
    if not points:
      raise HTTPException(status_code=404, detail="No points found for this member")
    return points
  except HTTPException:
    raise
  except Exception as e:
    raise HTTPException(status_code=400, detail=str(e))
  
@router.get("/getTournamentPoints/{tourn_id}", response_model=List[PointsResponse], status_code=status.HTTP_200_OK)
def get_tournament_points(tournament_id: Annotated[int, Path(description="ID of the tournament to retrieve points for")], session: Session = Depends(get_session)):
  """
  Get all tournament points.
  This endpoint retrieves all points recorded for a specific tournament.
  """
  try:
    points = points_server.get_tournament_points(tournament_id, session)
    if not points:
      raise HTTPException(status_code=404, detail="No points found for this tournament")
    return points
  except HTTPException:
    raise
  except Exception as e:
    raise HTTPException(status_code=400, detail=str(e))
  
@router.post("/getTournamentRoundPoints/", response_model=List[PointsResponse], status_code=status.HTTP_200_OK)
def get_tournament_round_points(tournament_id: int, round: int, session: Session = Depends(get_session)):
  """
  Get tournament round points.
  This endpoint retrieves all points recorded for a specific round in a tournament.
  """
  try:
    points = points_server.get_tournament_round_points(tournament_id, round, session)
    if not points:
      raise HTTPException(status_code=404, detail="No points found for this tournament and round")
    return points
  except HTTPException:
    raise
  except Exception as e:
    raise HTTPException(status_code=400, detail=str(e))
  
@router.post("/getMemberTournamentPoints/", response_model=List[PointsResponse], status_code=status.HTTP_200_OK)
def get_member_tournament_points(tournament_id: int, member_id: int, session: Session = Depends(get_session)):
  """
  Get member's tournament points.
  This endpoint retrieves all points achieved by a specific member in a tournament.
  """
  try:
    points = points_server.get_member_tournament_points(tournament_id, member_id, session)
    if not points:
      raise HTTPException(status_code=404, detail="No points found for this member in the tournament")
    return points
  except HTTPException:
    raise
  except Exception as e:
    raise HTTPException(status_code=400, detail=str(e))
  
@router.get("/getAllMembersPoints", response_model=List[PointsResponse], status_code=status.HTTP_200_OK)
def get_all_points(session: Session = Depends(get_session)):
  """
  Get all points.
  This endpoint retrieves all points recorded in the database.
  """
  try:
    points = points_server.get_all_points(session)
    if not points:
      raise HTTPException(status_code=404, detail="No points found in the database")
    return points
  except HTTPException:
    raise
  except Exception as e:
    raise HTTPException(status_code=400, detail=str(e))
    
@router.delete("/deleteScore", status_code=status.HTTP_202_ACCEPTED)
def delete_member_points(points_id: int, session: Session = Depends(get_session)):
  """
  Delete points record.
  This endpoint removes existing points' record from your database.
  """
  try:
    result = points_server.delete_points(points_id, session)
    if not result:
      raise HTTPException(status_code=404, detail="Record not found")
    return {"message": "Points deleted successfully"}
  except HTTPException:
    raise
  except Exception as e:
    raise HTTPException(status_code=400, detail=str(e))
  
@router.delete("/deleteMemberPoints", status_code=status.HTTP_200_OK)
def delete_member_points(member_id: int, session: Session = Depends(get_session)):
  """
  Delete a member's points.
  This endpoint removes all points' records for a specified member from your database.
  """
  try:
    result = points_server.delete_member_points(member_id, session)
    if not result:
      raise HTTPException(status_code=404, detail="No points found for this member")
    return {"message": "All points for the member deleted successfully"}
  except HTTPException:
    raise
  except Exception as e:
    raise HTTPException(status_code=400, detail=str(e))
  
@router.delete("/deleteTournamentPoints", status_code=status.HTTP_200_OK)
def delete_tournament_points(tournament_id: int, session: Session = Depends(get_session)):
  """
  Delete tournament points.
  This endpoint removes all points' records for a specified tournament from your database.
  """
  try:
    result = points_server.delete_tournament_points(tournament_id, session)
    if not result:
      raise HTTPException(status_code=404, detail="No points found for this tournament")
    return {"message": "All points for the tournament deleted successfully"}
  except HTTPException:
    raise
  except Exception as e:
    raise HTTPException(status_code=400, detail=str(e))
  
@router.delete("/deleteTournamentRoundPoints", status_code=status.HTTP_200_OK)
def delete_tournament_round_points(tournament_id: int, round: str, session: Session = Depends(get_session)):
  """
  Delete round points in tournament.
  This endpoint removes all points' records for a specified round in a tournament from your database.
  """
  try:
    result = points_server.delete_tournament_round_points(tournament_id, round, session)
    if not result:
      raise HTTPException(status_code=404, detail="No points found for this tournament and round")
    return {"message": "All points for the tournament round deleted successfully"}
  except HTTPException:
    raise
  except Exception as e:
    raise HTTPException(status_code=400, detail=str(e))
  
@router.delete("/deleteMemberTournamentPoints", status_code=status.HTTP_200_OK)
def delete_member_tournament_points(tournament_id: int, member_id: int, session: Session = Depends(get_session)):
  """
  Delete member's points in tournament.
  This endpoint removes all points' records for a specified member in a tournament from your database.
  """
  try:
    result = points_server.delete_member_tournament_points(tournament_id, member_id, session)
    if not result:
      raise HTTPException(status_code=404, detail="No points found for this member in the tournament")
    return {"message": "All points for the member in the tournament deleted successfully"}
  except HTTPException:
    raise
  except Exception as e:
    raise HTTPException(status_code=400, detail=str(e))
  
@router.delete("/deleteAllPoints", status_code=status.HTTP_200_OK)
def delete_all_points(session: Session = Depends(get_session)):
  """
  Delete all points.
  This endpoint removes all points' records from your database.
  """
  try:
    result = points_server.delete_all_points(session)
    if not result:
      raise HTTPException(status_code=404, detail="No points found to delete")
    return {"message": "All points deleted successfully"}
  except HTTPException:
    raise
  except Exception as e:
    raise HTTPException(status_code=400, detail=str(e))