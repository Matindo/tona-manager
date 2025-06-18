from sqlmodel import Field, SQLModel, Column
from sqlalchemy import ARRAY, Integer
from typing import List
from datetime import datetime

class TournamentBase(SQLModel):
    name: str = Field(..., max_length=100)
    region: str | None = Field(default=None, max_length=150, description="Area the tournament is being held")
    type: str = Field(default="P", description="P for preliminaries only, K for knock-outs only, PK for both")
    status: str | None = Field(default="upcoming", description="'upcoming', 'ongoing', 'completed'")
     
class TournamentCreate(TournamentBase):
    pass

class TournamentUpdate(SQLModel):
    tournament_id: int
    name: str | None = None
    region: str | None = None
    type: str | None = None
    start_date: str | None = None
    stage: str | None = None
    round: str | None = None
    teams: List[int] | None = Field(default=[], sa_column=Column(ARRAY(Integer)))
    status: str | None = None
    
class Tournament(TournamentBase, table=True):
    tournament_id: int | None = Field(default=None, primary_key=True)
    stage: str | None = Field(..., description="Preliminaries, Knockouts")
    round: str | None = Field(..., description="The round of a particular stage eg P3(round 3 of Prelims), Semi-Finals")
    start_date: str | None = Field(default=datetime.now().isoformat(" ", "seconds"), description="When the tournament is created")
    end_date: str | None = Field(..., description="Closing day of tournament")
    teams: List[int] = Field(default_factory=list, sa_column=Column(ARRAY(Integer)), description="List of teamIDs of teams participating")
    
    
class TournamentResponse(TournamentBase):
    tournament_id: int
    stage: str | None
    round: str | None
    start_date: str
    status: str
    end_date: str | None = None
    teams: List[int]