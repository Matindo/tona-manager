from pydantic import BaseModel
from typing import List

class Points(BaseModel):
    tournamentId: int
    stage: str
    round: int
    points: int

class TeamMember(BaseModel):
    id: int
    name: str
    gender: str
    role: str
    rep: str
    teamId: int
    isActive: bool = True
    points: List[Points] = []

class Team(BaseModel):
    id: int
    name: str
    logo: str | None = None
    region: str | None = None
    members: List[TeamMember] = []