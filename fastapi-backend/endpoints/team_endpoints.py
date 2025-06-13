from fastapi import APIRouter, HTTPException
from models.team import Team

router = APIRouter()

@router.put("/updateTeam")
async def update_team(team_id: int, team_name: str, team_logo: str | None = None, team_region: str | None = None):
    """
    Update a team's details.
    This endpoint allows updating the details of a team specified by its ID.
    """
    try:
        team = Team(id=team_id, name=team_name, logo=team_logo, region=team_region)
        updated_team = update_team_details(team)
        if not updated_team:
            raise HTTPException(status_code=404, detail="Team not found")
        return {"message": "Team updated successfully", "team": updated_team}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/{team_id}")
async def get_team(team_id: int):
    """
    Retrieve a team by ID.
    This endpoint returns the details of a team specified by its ID.
    """
    try:
        team = get_team_details(team_id)
        if not team:
            raise HTTPException(status_code=404, detail="Team not found")
        return team
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.post("/addMember")
async def add_member(team_id: int, member_name: str, gender: str, role: str, rep: str | None = None):
    """
    Add a member to a team.
    This endpoint allows adding a member to a specified team.
    """
    try:
        success = add_member_to_team(team_id, member_name, gender, role)
        if not success:
            raise HTTPException(status_code=404, detail="Team or Member not found")
        return {"message": "Member added successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.post("/editMember")
async def edit_member(team_id: int, member_id: str, member_name: str, gender: str, role: str, rep: str | None = None):
    """
    Edit a member's details in a team.
    This endpoint allows editing the details of a member in a specified team.
    """
    try:
        success = edit_member_in_team(team_id, member_id, member_name, gender, role, rep)
        if not success:
            raise HTTPException(status_code=404, detail="Team or Member not found")
        return {"message": "Member edited successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.delete("/deleteMember")
async def delete_member(team_id: int, member_id: str):
    """
    Delete a member from a team.
    This endpoint allows deleting a member from a specified team.
    """
    try:
        success = delete_member_from_team(team_id, member_id)
        if not success:
            raise HTTPException(status_code=404, detail="Team or Member not found")
        return {"message": "Member deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.post("/addMemberScore")
async def add_member_points(team_id: int, member_id: str, points: int, stage: str, round: int):
    """
    Add points to a member in a team.
    This endpoint allows adding points to a specified member in a team.
    """
    try:
        success = add_points_to_member(team_id, member_id, points, stage, round)
        if not success:
            raise HTTPException(status_code=404, detail="Team or Member not found")
        return {"message": "Points added successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.get("/getMemberScores")
async def get_member_points(team_id: int, member_id: str):
    """
    Retrieve points of a member in a team.
    This endpoint returns the points of a specified member in a team.
    """
    try:
        points = get_points_of_member(team_id, member_id)
        if points is None:
            raise HTTPException(status_code=404, detail="Team or Member not found")
        return {"points": points}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
