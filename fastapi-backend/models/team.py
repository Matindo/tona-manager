from sqlmodel import SQLModel, Field
from sqlalchemy import ARRAY, Integer, Column
from typing import List
from models.team_member import TeamMemberResponse
    
class TeamBase(SQLModel):
    name: str = Field(..., max_length=100, description="Name of the team")
    logo: str | None = Field(default=None, description="URL or path to the team's logo")
    region: str | None = Field(default=None, description="Area, region or division the team comes from")
    
class TeamCreate(TeamBase):
    members: List[int] | None
    pass
    
class TeamUpdate(SQLModel):
    team_id: int
    name: str | None = None
    logo: str | None = None
    region: str | None = None
    members: List[int] | None = None
    
class Team(TeamBase, table=True):
    team_id: int = Field(default=None, primary_key=True)
    members: List[int] | None = Field(default_factory=list, sa_column=Column(ARRAY(Integer)))
    
class TeamResponse(TeamBase):
    team_id: int
    members: List[TeamMemberResponse] | None = None
    