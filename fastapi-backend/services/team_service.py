from models.team import Team, TeamCreate, TeamResponse
from typing import List
from sqlmodel import select, Session

def create_team(team_create: TeamCreate, session: Session) -> TeamResponse:
  team = Team(**team_create.model_dump())
  session.add(team)
  session.commit()
  session.refresh(team)
  return TeamResponse(**team.model_dump())

def get_team(team_id: int, session: Session) -> TeamResponse | None:
  statement = select(Team).where(Team.team_id == team_id)
  result = session.exec(statement).first()
  return result
