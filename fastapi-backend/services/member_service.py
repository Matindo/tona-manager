from models.team_member import TeamMember, TeamMemberCreate, TeamMemberResponse, TeamMemberUpdate
from typing import List
from sqlmodel import select, Session

def create_team_member(team_member_create: TeamMemberCreate, session: Session) -> TeamMemberResponse:
  team_member = TeamMember(**team_member_create.model_dump())
  session.add(team_member)
  session.commit()
  session.refresh(team_member)
  return TeamMemberResponse(**team_member.model_dump())

def get_team_member(team_member_id: int, session: Session) -> TeamMemberResponse | None:
  statement = select(TeamMember).where(TeamMember.member_id == team_member_id)
  result = session.exec(statement).first()
  return TeamMemberResponse(**result.model_dump()) if result else None

def update_team_member(team_member_update: TeamMemberUpdate, session: Session) -> TeamMemberResponse | None:
  existing_member = get_db_member(team_member_update.member_id, session)
  if not existing_member:
    return None
  update_data = team_member_update.model_dump(exclude_unset=True)
  for key, value in update_data.items():
    setattr(existing_member, key, value)
  session.add(existing_member)
  session.commit()
  session.refresh(existing_member)
  return TeamMemberResponse(**existing_member.model_dump())

def delete_team_member(team_member_id: int, session: Session) -> bool:
  existing_member = get_team_member(team_member_id, session)
  if not existing_member:
    return False
  session.delete(existing_member)
  session.commit()
  return True


# --------------------------------------------------------------------------------  #
### Helper functions ###
# --------------------------------------------------------------------------------  #
def get_db_member(member_id: int, session: Session) -> TeamMember | None:
  statement = select(TeamMember).where(TeamMember.member_id == member_id)
  return session.exec(statement).first()