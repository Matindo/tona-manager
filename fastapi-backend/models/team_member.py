from sqlmodel import SQLModel, Field

class TeamMemberBase(SQLModel):
  name: str = Field(..., max_length=100, description="Name of the team member")
  gender: str | None = Field(default=None)
  birthdate: str | None = Field(default=None, description="Date of birth of the team member in ISO format")
  role: str = Field(default="member", description="Role of the team member in the team, e.g., 'member', 'captain', 'coach'")
  rep: str | None = Field(default=None, description="Region, class or category the member represents")
  teamId: int = Field(..., foreign_key="team.team_id", description="ID of the team this member belongs to")
    
class TeamMemberCreate(TeamMemberBase):
  pass

class TeamMemberUpdate(SQLModel):
  member_id: int
  name: str | None = None
  gender: str | None = None
  birthdate: str | None = None
  role: str | None = None
  rep: str | None = None
  teamId: int | None = None
    
class TeamMember(TeamMemberBase, table=True):
  __tablename__ = "member"
  member_id: int = Field(default=None, primary_key=True)
  status: str = Field(default="active", description="Status of the team member, e.g., 'active', 'inactive'")
    
class TeamMemberResponse(TeamMemberBase):
  member_id: int
  status: str
