from pydantic import BaseModel
from typing import List
from datetime import datetime

class Tournament(BaseModel):
    id: int
    name: str
    description: str | None = None
    region: str | None = None
    stage: str = "prelim" # e.g., "group", "knockout", "final"
    start_date: datetime
    end_date: datetime
    teams: List[int]  # List of team IDs participating in the tournament
    status: str  # e.g., "upcoming", "ongoing", "completed"