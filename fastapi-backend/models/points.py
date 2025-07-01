from datetime import datetime
from sqlmodel import SQLModel, Field


class PointsBase(SQLModel):
  tournament_id: int | None = Field(default=None, foreign_key="tournamnet.tournament_id")
  member_id: int | None = Field(default=None, foreign_key="member.member_id")
  round: str | None = Field(default=None, description="The round of a particular stage eg P3(round 3 of Prelims), Semi-Finals")
  points: float | None = Field(default=0.0, description="Points scored by the member in the tournament stage and round")
  created_at: str | None = Field(default=datetime.now().isoformat(" ", "seconds"), description="Timestamp when the points were recorded")

class Points(PointsBase, table=True):
  points_id: int | None = Field(default=None, primary_key=True)
    
class PointsCreate(PointsBase):
  pass

class PointsUpdate(PointsBase):
  points_id: int
  tournament_id: int
  member_id: int
  round: str
  points: float
  created_at: str | None = Field(default=datetime.now().isoformat(" ", "seconds"), description="Timestamp when the points were recorded")
 
class PointsResponse(Points):
  pass