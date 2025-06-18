from fastapi import APIRouter, Depends, HTTPException, Path, status
from sqlmodel import Session
from typing import Annotated
from models.tournament import TournamentCreate, TournamentUpdate, TournamentResponse
from models.team import TeamCreate
import services.tona_service as tona_server
from services.db_service import get_session


router = APIRouter()

@router.get("/getTournaments", response_model=list[TournamentResponse], status_code=status.HTTP_200_OK)
def get_all_tournaments(session: Session = Depends(get_session)):
    """
    Retrieve all tournaments.
    This endpoint returns a list of all tournaments in the system.
    """
    try:
        tournaments = tona_server.get_tournaments(session)
        return tournaments
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/{tournament_id}", response_model=TournamentResponse, status_code=status.HTTP_200_OK)
def get_tournament(tournament_id: Annotated[int, Path(description="The tournament ID")], session: Session = Depends(get_session)):
    """
    Retrieve a tournament by ID.
    This endpoint returns the details of a tournament specified by its ID.
    """
    try:
        tournament = tona_server.get_tournament_by_id(tournament_id, session)
        if not tournament:
            raise HTTPException(status_code=404, detail="Tournament not found")
        return tournament
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/addTournament", status_code=status.HTTP_201_CREATED, response_model=TournamentResponse)
def create_tournament(tournament: TournamentCreate, session: Session = Depends(get_session)):
    """
    Create a new tournament.
    This endpoint allows creating a new tournament with the provided details.
    """
    try:
        created_tournament = tona_server.create_tournament(tournament, session)
        return created_tournament
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/editTournament", response_model=TournamentResponse, status_code=status.HTTP_200_OK)
def update_tournament(tournament: TournamentUpdate, session: Session = Depends(get_session)):
    """ Update an existing tournament.
    This endpoint allows updating the details of an existing tournament.
    """
    try:
        updated_tournament = tona_server.update_tournament(tournament, session)
        if not updated_tournament:
            raise HTTPException(status_code=404, detail="Tournament not found")
        return updated_tournament
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/{tournament_id}/getTeams", status_code=status.HTTP_200_OK)
def get_teams_in_tournament(tournament_id: Annotated[int, Path(description="Tournament ID whose teams you want")]):
    """
    Retrieve teams in a tournament.
    This endpoint returns a list of teams participating in the specified tournament.
    """
    try:
        teams = tona_server.get_teams_in_tournament(tournament_id)
        if not teams:
            raise HTTPException(status_code=404, detail="Tournament not found")
        if len(teams) == 0:
            raise HTTPException(status_code=204, detail="No teams found for this tournament")
        return {"teams": teams}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.post("/addTeam", status_code=status.HTTP_201_CREATED)
def add_team_to_tournament(team: TeamCreate, session : Session = Depends(get_session)):
    """
    Add a team to a tournament.
    This endpoint allows adding a specified team to the tournament.
    """
    try:
        result = tona_server.add_team(team, session)
        if not result:
            raise HTTPException(status_code=404, detail="Tournament not found")
        return { "message": "Team added to tournament successfully" }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.post("/addTeams")
def add_teams_to_tournament(tourn_id: int, teams: list[TeamCreate], session : Session = Depends(get_session)):
    """
    Add multiple teams to a tournament.
    This endpoint allows adding multiple teams to the tournament.
    """
    try:
        result = tona_server.add_multiple_teams(tourn_id, teams, session)
        if not result:
            raise HTTPException(status_code=404, detail="Tournament or teams not found")
        return {"message": "Teams added to tournament successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.post("/removeTeam", status_code=status.HTTP_200_OK)
def remove_team_from_tournament(team_id: int, tournament_id: int, session : Session = Depends(get_session)):
    """
    Remove a team from a tournament.
    This endpoint allows removing a specified team from the tournament.
    """
    try:
        result = tona_server.remove_team(team_id, tournament_id, session)
        if not result:
            raise HTTPException(status_code=404, detail="Tournament or team not found")
        return {"message": "Team removed from tournament successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/startRound", status_code=status.HTTP_202_ACCEPTED)
def start_tournament_round(tournament_id: int, stage: str, round: str, session: Session = Depends(get_session)):
    """
    Start a round in a tournament.
    This endpoint allows starting a specified round in the tournament.
    """
    try:
        result = tona_server.start_round(tournament_id, stage, round, session)
        if not result:
            raise HTTPException(status_code=404, detail="Tournament  not found")
        return {"message": f"{round} of {stage} started successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/endTournament", status_code=status.HTTP_202_ACCEPTED)
def end_tournament(tournament_id: int, session : Session = Depends(get_session)):
    """
    End a tournament.
    This endpoint allows marking a tournament as completed.
    """
    try:
        result = tona_server.end_tournament(tournament_id, session)
        if not result:
            raise HTTPException(status_code=404, detail="Tournament not found or already ended")
        return {"message": "Tournament ended successfully"}
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
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))