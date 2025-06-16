import db_service
from models.tournament import TournamentCreate, TournamentUpdate, TournamentResponse
from typing import List
from sqlmodel import select

def get_tournaments() -> List[TournamentResponse]:
  with db_service.get_session() as session:
    statement = select(TournamentResponse)
    results = session.exec(statement)
    return results.all()
  
def create_tournament(tournament: TournamentCreate) -> TournamentResponse:
  with db_service.get_session() as session:
    session.add(tournament)
    session.commit()
    session.refresh(tournament)
    return tournament
  
def get_tournament_by_id(tournament_id: int) -> TournamentResponse | None:
  with db_service.get_session() as session:
    statement = select(TournamentResponse).where(TournamentResponse.tournament_id == tournament_id)
    result = session.exec(statement).first()
    return result
  
def update_tournament(tournament: TournamentUpdate) -> TournamentResponse | None:
  with db_service.get_session() as session:
    existing_tournament = get_tournament_by_id(tournament.tournament_id)
    if not existing_tournament:
      return None
    for key, value in tournament.dict(exclude_unset=True).items():
      setattr(existing_tournament, key, value)
      session.add(existing_tournament)
      session.commit()
      session.refresh(existing_tournament)
      return existing_tournament

def delete_tournament(tournament_id: int) -> bool:
  with db_service.get_session() as session:
    tournament = get_tournament_by_id(tournament_id)
    if not tournament:
      return False
    session.delete(tournament)
    session.commit()
    return True
