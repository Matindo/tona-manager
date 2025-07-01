from fastapi import APIRouter, HTTPException, Depends, Path, status
from services.db_service import get_session
from models.team import Team, TeamUpdate, TeamResponse
from models.team_member import TeamMemberCreate, TeamMemberUpdate, TeamMemberResponse
from sqlmodel import Session
from typing import Annotated
import services.team_service as team_server


router = APIRouter()

@router.put("/updateTeam", status_code=status.HTTP_202_ACCEPTED)
async def update_team(team: TeamUpdate, session: Session = Depends(get_session)):
    """
    Update a team's details.
    This endpoint allows updating the details of a team specified by its ID.
    """
    try:
        updated_team = team_server.update_team(team, session)
        if not updated_team:
            raise HTTPException(status_code=404, detail="Team not found")
        return {"message": "Team updated successfully", "team": updated_team}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/addMember", status_code=status.HTTP_201_CREATED)
async def add_member(team_id: int, member: TeamMemberCreate, session: Session = Depends(get_session)):
    """
    Add a member to a team.
    This endpoint allows adding a member to a specified team.
    """
    try:
        result = team_server.add_team_member(team_id, member, session)
        if not result:
            raise HTTPException(status_code=404, detail="Team not found or member addition failed. Please check your details.")
        return {"message": "Member added successfully.", "team": result}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.post("/editMember", status_code=status.HTTP_202_ACCEPTED)
async def edit_member(team_id: int, member: TeamMemberUpdate, session: Session = Depends(get_session)):
    """
    Edit a member's details in a team.
    This endpoint allows editing the details of a member in a specified team.
    """
    try:
        result = team_server.update_team_member(team_id, member, session)
        if not result:
            raise HTTPException(status_code=404, detail="Team not found")
        return {"message": "Member edited successfully", "team": result}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.post("/removeMember", status_code=status.HTTP_200_OK)
async def delete_member(team_id: int, member_id: int, session: Session = Depends(get_session)):
    """
    Remove a member from a team.
    This endpoint allows kicking out a member from a specified team.
    """
    try:
        result = team_server.remove_team_member(team_id, member_id, session)
        if not result:
            raise HTTPException(status_code=404, detail="Team not found")
        return {"message": "Member removed successfully", "team": result}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/getTeamScores", status_code=status.HTTP_200_OK)
async def get_member_points(tournament_id: int, team_id: int, session: Session = Depends(get_session)):
    """
    Retrieve team members' points.
    This endpoint returns the points of all members in a team.
    """
    try:
        points = team_server.get_team_points(tournament_id, team_id, session)
        if points is None:
            raise HTTPException(status_code=404, detail="Records not found")
        return {"points": points}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/{team_id}", status_code=status.HTTP_200_OK, response_model=TeamResponse)
async def get_team(team_id: Annotated[int, Path(description="ID of the team to fetch")], session: Session = Depends(get_session)):
    """
    Retrieve a team by ID.
    This endpoint returns the details of a team specified by its ID.
    """
    try:
        team = team_server.get_team(team_id, session)
        if not team:
            raise HTTPException(status_code=404, detail="Team not found")
        return team
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))