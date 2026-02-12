from sqlalchemy import Column, Integer, Text, Boolean

from .meta import Base

class Todo(Base):
    __tablename__ = 'todos'

    id = Column(Integer, primary_key=True)
    title = Column(Text)
    done = Column(Boolean, default=False)