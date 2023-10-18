from datetime import datetime
from pony.orm import *

from session import db


class Course(db.Entity):
    id = PrimaryKey(int, auto=True)
    tag = Required(str, unique=True)
    name = Optional(str, nullable=True)
    assignments = Set("Assignment")
    groups = Set("Group")


class Assignment(db.Entity):
    course = Optional(Course)
    name = Required(str)
    due_date = Optional(datetime)
    repositories = Set("Repository")


class Group(db.Entity):
    id = PrimaryKey(int, auto=True)
    github_link = Optional(str)
    blackboard_link = Optional(str)
    course = Optional(Course)
    repositories = Set("Repository")


class Repository(db.Entity):
    id = PrimaryKey(int, auto=True)
    github_link = Optional(str)
    assignment = Optional(Assignment)
    group = Optional(Group)
    reports = Set("Report")


class Analyzer(db.Entity):
    id = PrimaryKey(int, auto=True)
    name = Required(str, unique=True)
    creator = Optional(str, nullable=True)
    metric_definitions = Set("MetricDefinition")
    reports = Set("Report")


class MetricDefinition(db.Entity):
    id = PrimaryKey(int, auto=True)
    key_name = Required(str, unique=True)
    value_type = Required(str)
    display_name = Optional(str, nullable=True)
    extended_metadata = Optional(Json)
    analyzer = Optional(Analyzer)


class Report(db.Entity):
    id = PrimaryKey(int, auto=True)
    timestamp = Required(datetime, default=lambda: datetime.now())
    report = Optional(Json)
    analyzer = Optional(Analyzer)
    repository = Optional(Repository)


db.generate_mapping()
