from sqlmodel import Field, SQLModel, Column
from sqlalchemy.dialects.postgresql import ARRAY
from typing import List
from datetime import datetime

class Tournament(SQLModel):
    name: str = Field(..., max_length=100)
    region: str | None = Field(default=None, max_length=150)
    type: str = Field(default="P") # P for preliminaries only, K for knock-outs only, PK for both
    start_date: datetime = Field(default_factory=datetime.now())
    status: str = "upcoming" # "upcoming", "ongoing", "completed"
     
class TournamentCreate(Tournament):
    pass

class TournamentUpdate(SQLModel):
    name: str | None = None
    region: str | None = None
    type: str | None = None
    start_date: datetime | None = None
    stage: str | None = None
    round: int | None = None
    teams: List[int] = Field(default=[], sa_column=Column(ARRAY(Integer)))
    status: str | None = None
    
class TournamentInDB(Tournament, table=True):
    tournament_id: int | None = Field(default=None, primary_key=True)
    stage: str | None = Field(default="preliminaries")
    round: str | None = Field(default="P1")
    end_date: datetime | None = None
    teams: List[int] = Field(default_factory=list, sa_column=Column(ARRAY(Integer)))
    
    
class TournamentResponse(Tournament):
    tournament_id: int
    stage: str  
    round: str
    end_date: datetime | None = None
    teams: List[int]