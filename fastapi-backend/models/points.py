from sqlmodel import SQLModel, Field


class PointsBase(SQLModel):
  tournament_id: int | None = Field(default=None, foreign_key="tournamnet.tournament_id")
  member_id: int | None = Field(default=None, foreign_key="member.member_id")
  stage: str | None = Field(default=None, description="Preliminaries, Knockouts")
  round: str | None = Field(default=None, description="The round of a particular stage eg P3(round 3 of Prelims), Semi-Finals")
  points: float | None = Field(default=0.0, description="Points scored by the member in the tournament stage and round")

class Points(PointsBase, table=True):
  points_id: int | None = Field(default=None, primary_key=True)
    
class PointsCreate(Points):
  pass
 
class PointsResponse(Points):
  pass