from sqlmodel import SQLModel, create_engine, Session
import os, models

DATABASE_URL = "postgresql://" + os.getenv("DB_USER", "tonauser") + ":" + os.getenv("DB_PASSWORD", "tonapassword") + "@" + os.getenv("DB_HOST", "db") + "/" + os.getenv("DB_NAME", "tonadb")

engine = create_engine(DATABASE_URL , echo=True)

def get_session():
  with Session(engine) as session:
    yield session

def init_db():
  SQLModel.metadata.create_all(engine)