from fastapi import APIRouter, HTTPException
from models.tournament import TournamentCreate, TournamentUpdate, TournamentResponse
from models.team import Team
import services.tona_service as tona_server


router = APIRouter()

@router.get("/getTournaments", response_model=list[TournamentResponse])
async def get_all_tournaments():
    """
    Retrieve all tournaments.
    This endpoint returns a list of all tournaments in the system.
    """
    try:
        return await tona_server.get_tournaments()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/{tournament_id}", response_model=TournamentResponse)
async def get_tournament(tournament_id: int):
    """
    Retrieve a tournament by ID.
    This endpoint returns the details of a tournament specified by its ID.
    """
    try:
        tournament = await tona_server.get_tournament_by_id(tournament_id)
        if not tournament:
            raise HTTPException(status_code=404, detail="Tournament not found")
        return tournament
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/addTournament")
async def create_tournament(tournament: dict):
    """
    Create a new tournament.
    This endpoint allows creating a new tournament with the provided details.
    """
    try:
        created_tournament = await tona_server.create_tournament(tournament)
        return created_tournament
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/editTournament", response_model=TournamentResponse)
async def update_tournament(tournament: TournamentUpdate):
    """ Update an existing tournament.
    This endpoint allows updating the details of an existing tournament.
    """
    try:
        updated_tournament = await tona_server.update_tournament(tournament)
        if not updated_tournament:
            raise HTTPException(status_code=404, detail="Tournament not found")
        return updated_tournament
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/{tournament_id}/getTeams")
async def get_teams_in_tournament(tournament_id: int):
    """
    Retrieve teams in a tournament.
    This endpoint returns a list of teams participating in the specified tournament.
    """
    try:
        teams = await get_teams_in_tournament(tournament_id)
        if not teams:
            raise HTTPException(status_code=404, detail="No teams found for this tournament")
        return {"teams": teams}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.post("/addTeam")
async def add_team_to_tournament(team: dict):
    """
    Add a team to a tournament.
    This endpoint allows adding a specified team to the tournament.
    """
    try:
        result = await add_team_to_tournament(team)
        if not result:
            raise HTTPException(status_code=404, detail="Tournament or team not found")
        return {"message": "Team added to tournament successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.post("/addTeams")
async def add_teams_to_tournament(tourn_id: int, teams: list[dict]):
    """
    Add multiple teams to a tournament.
    This endpoint allows adding multiple teams to the tournament.
    """
    try:
        result = await add_teams_to_tournament(tourn_id, teams)
        if not result:
            raise HTTPException(status_code=404, detail="Tournament or teams not found")
        return {"message": "Teams added to tournament successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.delete("/removeTeam")
async def remove_team_from_tournament(tournament_id: int, team_id: int):
    """
    Remove a team from a tournament.
    This endpoint allows removing a specified team from the tournament.
    """
    try:
        result = await remove_team_from_tournament(tournament_id, team_id)
        if not result:
            raise HTTPException(status_code=404, detail="Tournament or team not found")
        return {"message": "Team removed from tournament successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/startRound")
async def start_tournament_round(tournament_id: int, stage: str, round: str | None = None):
    """
    Start a round in a tournament.
    This endpoint allows starting a specified round in the tournament.
    """
    try:
        result = await start_round(tournament_id, stage, round)
        if not result:
            raise HTTPException(status_code=404, detail="Tournament or round not found or already started")
        return {"message": "Tournament started successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/endRound")
async def end_tournament_round(tournament_id: int, stage: str, round: int | None = None):
    """
    End a round in a tournament.
    This endpoint allows ending a specified round in the tournament.
    """
    result = await end_round(tournament_id, stage, round)
    if not result:
        raise HTTPException(status_code=404, detail="Tournament or round not found or already ended")
    return {"message": "Tournament ended successfully"}

@router.post("/endTournament")
async def end_tournament(tournament_id: int):
    """
    End a tournament.
    This endpoint allows marking a tournament as completed.
    """
    try:
        result = await end_tournament(tournament_id)
        if not result:
            raise HTTPException(status_code=404, detail="Tournament not found or already ended")
        return {"message": "Tournament ended successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/deleteTournament", status_code=204)
async def delete_tournament(tournament_id: int):
    """
    Delete a tournament.
    This endpoint allows deleting a tournament specified by its ID.
    """
    try:
        result = await tona_server.delete_tournament(tournament_id)
        if not result:
            raise HTTPException(status_code=404, detail="Tournament not found")
        return {"message": "Tournament deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))