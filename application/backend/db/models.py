from datetime import datetime
from sqlalchemy import (
    Table,
    Column,
    Integer,
    String,
    ForeignKey,
    DateTime,
    JSON,
)
from sqlalchemy.orm import relationship
from db.database import Base

# Association table for the many-to-many relationship between Assignment and Analyzer
assignment_analyzer_association = Table(
    "assignment_analyzer",
    Base.metadata,
    Column("assignment_id", Integer, ForeignKey("assignments.id"), primary_key=True),
    Column("analyzer_id", Integer, ForeignKey("analyzers.id"), primary_key=True),
)


class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    tag = Column(String, unique=True, index=True)
    name = Column(String, index=True, nullable=True)

    assignments = relationship("Assignment", back_populates="course")
    teams = relationship("Team", back_populates="course")


class Assignment(Base):
    __tablename__ = "assignments"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, index=True)
    due_date = Column(DateTime, index=True, nullable=True)

    course_id = Column(Integer, ForeignKey("courses.id"))
    course = relationship("Course", back_populates="assignments")

    prtojects = relationship("Project", back_populates="assignment")

    analyzers = relationship(
        "Analyzer",
        secondary=assignment_analyzer_association,
        back_populates="assignments",
    )


class Team(Base):
    __tablename__ = "teams"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    github_link = Column(String, index=True, nullable=True)
    blackboard_link = Column(String, index=True, nullable=True)

    course_id = Column(Integer, ForeignKey("courses.id"))
    course = relationship("Course", back_populates="teams")

    projects = relationship("Project", back_populates="team")


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)

    assignment_id = Column(Integer, ForeignKey("assignments.id"))
    assignment = relationship("Assignment", back_populates="repositories")

    team_id = Column(Integer, ForeignKey("teams.id"))
    team = relationship("Team", back_populates="repositories")

    reports = relationship("Report", back_populates="project")

    project_metadata = relationship("ProjectMetadata", back_populates="project")


class ProjectMetadata(Base):
    __tablename__ = "project_metadata"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)

    key_name = Column(String, index=True, nullable=False)
    value = Column(String, index=True, nullable=True)
    value_type = Column(String, index=True, nullable=False)

    project_id = Column(Integer, ForeignKey("projects.id"))
    project = relationship("Project", back_populates="projects")


class Analyzer(Base):
    __tablename__ = "analyzers"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, unique=True, index=True)
    creator = Column(String, index=True, nullable=True)

    analyzer_inputs = relationship("AnalyzerInput", back_populates="analyzer")
    analyzer_outputs = relationship("AnalyzerOutput", back_populates="analyzer")
    
    reports = relationship("Report", back_populates="analyzer")

    assignments = relationship(
        "Assignment",
        secondary=assignment_analyzer_association,
        back_populates="analyzers",
    )


class AnalyzerInput(Base):
    __tablename__ = "analyzer_inputs"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    key_name = Column(String, unique=True, index=True)
    value_type = Column(String, index=True)

    analyzer_id = Column(Integer, ForeignKey("analyzers.id"))
    analyzer = relationship("Analyzer", back_populates="analyzer_inputs")


class AnalyzerOutput(Base):
    __tablename__ = "analyzer_outputs"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    key_name = Column(String, unique=True, index=True)
    value_type = Column(String, index=True)
    display_name = Column(String, index=True, nullable=True)
    extended_metadata = Column(JSON, nullable=True)

    analyzer_id = Column(Integer, ForeignKey("analyzers.id"))
    analyzer = relationship("Analyzer", back_populates="analyzer_outputs")


class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    timestamp = Column(DateTime, default=datetime.now, index=True)
    report = Column(JSON, nullable=True)

    analyzer_id = Column(Integer, ForeignKey("analyzers.id"))
    analyzer = relationship("Analyzer", back_populates="reports")

    project_id = Column(Integer, ForeignKey("projects.id"))
    project = relationship("Project", back_populates="reports")
