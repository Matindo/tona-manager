from pydantic import BaseModel
from typing import List
from datetime import datetime

class Tournament(BaseModel):
    name: str
    region: str | None = None
    type: str = "P" # P for preliminaries only, K for knockouts only, PK for both
    start_date: datetime | None = None
     
class TournamentCreate(Tournament):
    pass

class TournamentUpdate(BaseModel):
    name: str | None = None
    region: str | None = None
    type: str | None = None
    start_date: datetime | None = None
    
class TournamentInDB(Tournament):
    tournament_id: int
    stage: str | None = None  # e.g., "preliminary", "knockout"
    round: int | None = None  # Number of rounds in the tournament
    end_date: datetime | None = None
    teams: List[int]  # List of team IDs participating in the tournament
    status: str  # e.g., "upcoming", "ongoing", "completed"
    
class TournamentResponse(Tournament):
    tournament_id: int
    stage: str | None = None  # e.g., "preliminary", "knockout"
    round: int | None = None  # Number of rounds in the tournament
    end_date: datetime | None = None
    teams: List[int]  # List of team IDs participating in the tournament
    status: str  # e.g., "upcoming", "ongoing", "completed"