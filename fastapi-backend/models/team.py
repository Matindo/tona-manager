from pydantic import BaseModel
from typing import List

class Points(BaseModel):
    tournamentId: int
    memberId: int
    stage: str
    round: int
    points: int
    
class TeamMember(BaseModel):
    name: str
    gender: str
    role: str
    rep: str
    teamId: int
    
class TeamMemberCreate(TeamMember):
    pass

class TeamMemberUpdate(BaseModel):
    name: str | None = None
    gender: str | None = None
    role: str | None = None
    rep: str | None = None
    teamId: int | None = None
    
class TeamMemberInDB(TeamMember):
    member_id: int
    status: str = "active"  # e.g., "active", "inactive"
    
class TeamMemberResponse(TeamMember):
    member_id: int
    status: str = "active"  # e.g., "active", "inactive"
    points: List[Points] = []  # List of points in different tournaments
    
class Team(BaseModel):
    name: str
    logo: str | None = None
    region: str | None = None
    members: List[TeamMember] = []
    
class TeamCreate(Team):
    pass
    
class TeamUpdate(BaseModel):
    name: str | None = None
    logo: str | None = None
    region: str | None = None
    members: List[TeamMember] | None = None
    
class TeamInDB(Team):
    team_id: int
    members: List[int] = []
    
class TeamResponse(Team):
    team_id: int
    members: List[TeamMember] = []