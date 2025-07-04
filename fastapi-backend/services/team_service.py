from models.team import Team, TeamCreate, TeamResponse, TeamUpdate
from models.team_member import TeamMemberResponse, TeamMemberCreate, TeamMemberUpdate
from models.points import PointsResponse
from typing import List
from sqlmodel import select, Session
import services.member_service as member_server 
import services.tona_service as tona_server
import services.points_service as points_server

def create_team(team_create: TeamCreate, session: Session) -> TeamResponse:
  statement = select(Team).where(Team.name == team_create.name)
  existing_team = session.exec(statement).first()
  if existing_team:
    raise ValueError(f"Team with name '{team_create.name}' already exists.")
  members_list = []
  team = team_create.model_dump()
  team["members"] = members_list
  team = Team(**team)
  print(f"Team: {team}")
  session.add(team)
  session.commit()
  session.refresh(team)
  if team_create.members and len(team_create.members) > 0:
    for member in team_create.members:
      member_to_db = TeamMemberCreate(**member.model_dump())
      member_to_db.teamId = team.team_id
      created_member = member_server.create_team_member(member_to_db, session)
      if created_member:
        members_list.append(created_member.member_id)
    team_update = TeamUpdate(team_id=team.team_id, members=members_list)
    return update_team(team_update, session)
  team_res = team.model_dump()
  team_res["members"] = convert_ids_to_members(team.members, session)
  return TeamResponse(**team_res)

def get_team(team_id: int, session: Session) -> TeamResponse | None:
  result = get_db_team(team_id, session)
  if not result:
    return None
  team_members = []
  if len(result.members) > 0:
    team_members = convert_ids_to_members(result.members, session)
  team = result.model_dump()
  team["members"] = team_members
  return TeamResponse(**team)

def update_team(team: TeamUpdate, session: Session) -> TeamResponse | None:
  existing_team = get_db_team(team.team_id, session)
  if not existing_team:
    return None
  update_data = team.model_dump(exclude_unset=True)
  for key, value in update_data.items():
    setattr(existing_team, key, value)
  session.add(existing_team)
  session.commit()
  session.refresh(existing_team)
  result = get_team(existing_team.team_id, session)
  return result

def add_team_member(team_id: int, member: TeamMemberCreate, session: Session) -> TeamResponse | None:
  team = get_db_team(team_id, session)
  if not team:
    return None
  member_list = team.members
  created_member = member_server.create_team_member(member, session)
  if not created_member:
    raise ValueError("Failed to create team member")
  member_list.append(created_member.member_id)
  team_update = TeamUpdate(team_id=team.team_id, members=member_list)
  return update_team(team_update, session)

def update_team_member(team_id: int, member: TeamMemberUpdate, session: Session) -> TeamResponse | None:
  team_exist = get_db_team(team_id, session)
  if not team_exist:
    return None
  member_exist = member_server.get_team_member(member.member_id, session)
  if not member_exist:
    raise ValueError(f"Member with ID {member.member_id} does not exist")
  if member_exist.teamId != team_id:
    print(f"Member's teamID: {member_exist.teamId}, Team ID: {team_id}")
    raise ValueError(f"Member {member.member_id} does not belong to team {team_id}")
  updated_member = member_server.update_team_member(member, session)
  if not updated_member:
    raise ValueError("Failed to update team member")
  return get_team(team_id, session)

def remove_team_member(team_id: int, member_id: int, session: Session) -> TeamResponse | None:
  team = get_team(team_id, session)
  if not team:
    return None
  member_list = convert_members_to_ids(team.members)
  if member_id not in member_list:
    raise ValueError(f"Member {member_id} is not a member of your team {team_id}")
  member_list.remove(member_id)
  team_update = TeamUpdate(team_id=team.team_id, members=member_list)
  return update_team(team_update, session)

def get_all_teams(session: Session) -> List[TeamResponse]:
  statement = select(Team)
  results = session.exec(statement).all()
  team_list = []
  for team in results:
    team_members = convert_ids_to_members(team.members, session)
    team_data = team.model_dump()
    team_data["members"] = team_members
    team_list.append(TeamResponse(**team_data))
  return team_list

def get_team_points(tourn_id: int, team_id: int, session: Session) -> List[PointsResponse]:
  points = []
  if tona_server.get_tournament_by_id(tourn_id, session) is None:
    raise ValueError(f"Tournament with ID {tourn_id} does not exist")
  team = get_db_team(team_id, session)
  if not team:
    raise ValueError(f"Team with ID {team_id} does not exist")
  for member in team.members:
    member_points = points_server.get_member_tournament_points(tourn_id, member, session)
    if member_points:
      points.extend(member_points)
  return points
    
def delete_team(team_id: int, session: Session) -> bool:
  team = get_team(team_id, session)
  if not team:
    return False
  session.delete(team)
  session.commit()
  return True

def delete_all_teams(session: Session) -> bool:
  existing_teams = session.exec(select(Team)).all()
  if not existing_teams:
    raise ValueError("No teams found in the database")
  for team in existing_teams:
    delete_team(team.team_id, session)
  if get_all_teams(session):
    raise ValueError("Failed to delete all teams from the database")
  return True

# --------------------------------------------------------------------------------  #
### Helper functions ###
# --------------------------------------------------------------------------------  #
def get_db_team(team_id: int, session: Session) -> Team | None:
  statement = select(Team).where(Team.team_id == team_id)
  return session.exec(statement).first()

def convert_ids_to_members(member_ids: List[int], session: Session) -> List[TeamMemberResponse]:
  members = []
  for member_id in member_ids:
    member = member_server.get_team_member(member_id, session)
    if member:
      members.append(member)
  return members

def convert_members_to_ids(members: List[TeamMemberResponse]) -> List[int]:
  return [member.member_id for member in members] if members else []
