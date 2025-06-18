from models.tournament import Tournament, TournamentCreate, TournamentUpdate, TournamentResponse
from models.team import Team, TeamCreate, TeamResponse
import services.team_service as team_server
from typing import List
from sqlmodel import select, Session

def get_tournaments(session: Session) -> List[TournamentResponse]:
  statement = select(Tournament)
  results = session.exec(statement).all()
  return results

def create_tournament(tournament_create: TournamentCreate, session: Session) -> TournamentResponse:
  tournament = Tournament(**tournament_create.model_dump())
  session.add(tournament)
  session.commit()
  session.refresh(tournament)
  return TournamentResponse(**tournament.model_dump())
  
def get_tournament_by_id(tournament_id: int, session: Session) -> TournamentResponse | None:
  statement = select(Tournament).where(Tournament.tournament_id == tournament_id)
  result = session.exec(statement).first()
  return result
  
def update_tournament(tournament: TournamentUpdate, session: Session) -> TournamentResponse | None:
  existing_tournament = get_tournament_by_id(tournament.tournament_id, session)
  if not existing_tournament:
    return None
  update_data = tournament.model_dump(exclude_unset=True)
  for key, value in update_data.items():
    setattr(existing_tournament, key, value)
  session.add(existing_tournament)
  session.commit()
  session.refresh(existing_tournament)
  return TournamentResponse(**existing_tournament.model_dump())
  
def add_team(team: TeamCreate, session: Session) -> TournamentResponse | None:
  created_team = team_server.create_team(team, session)
  if not created_team:
    return None
  tourn_id = created_team.tournament_id
  teamlist = get_tournament_by_id(tourn_id, session).model_dump().get("teams")
  teamlist.append(created_team.team_id)
  tournament = TournamentUpdate(tournament_id=created_team.tournament_id, teams=teamlist)
  return update_tournament(tournament, session)

def add_multiple_teams(tourn_id: int, teams: List[TeamCreate], session: Session) -> TournamentResponse | None:
  teamlist_array = list[int]
  for team in teams:
    created_team = team_server.create_team(team, session)
    if not created_team:
      return None
    teamlist_array.append(created_team.team_id)
  teamlist = get_tournament_by_id(tourn_id, session).model_dump().get("teams")
  teamlist.append(teamlist_array)
  tournament = TournamentUpdate(tournament_id=tourn_id, teams=teamlist)
  return update_tournament(tournament, session)

def get_teams_in_tournament(tournament_id: int, session: Session) -> List[TeamResponse] | None:
  teamlist = get_tournament_by_id(tournament_id, session).model_dump().get("teams")
  if not teamlist:
    return None
  teams = List[TeamResponse]
  for team_id in teamlist:
    team = team_server.get_team(team_id, session)
    teams.append(team)
  return teams

def remove_team(team_id: int, tourn_id: int, session: Session) -> TournamentResponse | None:
  team_exist = team_server.get_team(team_id, session)
  if not team_exist:
    return None
  teamlist = get_tournament_by_id(tourn_id, session).model_dump().get("teams")
  if team_id not in teamlist:
    return None
  teamlist.remove(team_id)
  tourn_update = TournamentUpdate(tournament_id=tourn_id, teams=teamlist)
  return update_tournament(tourn_update, session)

def start_round(tourn_id: int, stage: str, round: str, session: Session) -> TournamentResponse | None:
  tourn_update = TournamentUpdate(tournament_id=tourn_id, stage=stage, round=round)
  return update_tournament(tourn_update, session)

def end_tournament(tourn_id: int, session: Session) -> TournamentResponse | None:
  tourn_update = TournamentUpdate(tournament_id=tourn_id, status="completed")
  updated_tournament = update_tournament(tourn_update, session)
  if not updated_tournament:
    return None
  return updated_tournament

def delete_tournament(tournament_id: int, session: Session) -> bool:
  tournament = get_tournament_by_id(tournament_id, session)
  if not tournament:
    return False
  session.delete(tournament)
  session.commit()
  return True
  
