from curses import keyname
from datetime import datetime
from sqlalchemy.orm import sessionmaker
import sqlalchemy as sa
import json
from db.models import (
    Course,
    Assignment,
    ProjectMetadata,
    Team,
    Project,
    Analyzer,
    AnalyzerInput,
    AnalyzerOutput,
    Report,
    assignment_analyzer_association,  # Make sure to import this
)

from db.database import engine, Base

# Create the engine and session
SessionLocal = sessionmaker(bind=engine)


def run_seed():
    session = SessionLocal()
    try:
        print("Cleaning DB ...")
        # Delete all existing data from tables
        # Check if table exists before deleting

        if sa.inspect(engine).has_table("course"):
            session.query(Course).delete()

        if sa.inspect(engine).has_table("assignment"):
            session.query(Assignment).delete()

        if sa.inspect(engine).has_table("team"):
            session.query(Team).delete()

        if sa.inspect(engine).has_table("project"):
            session.query(Project).delete()

        if sa.inspect(engine).has_table("analyzer"):
            session.query(Analyzer).delete()

        if sa.inspect(engine).has_table("analyzerOutput"):
            session.query().delete()

        if sa.inspect(engine).has_table("report"):
            session.query(Report).delete()
        print("Cleanup done...")

        print("Creating tables...")
        Base.metadata.create_all(bind=engine)
        print("Tables Created...")

        print("Creating course ...")
        course = Course(tag="IT2810", name="Webutvikling")
        session.add(course)

        print("Creating assignment ...")
        assignment = Assignment(
            name="Øving 3", due_date=datetime(2023, 12, 20, 23, 59), course=course
        )
        session.add(assignment)

        print("Creating team ...")
        team = Team(github_link="https://github.com/pettelau/tsffbet", course=course)
        session.add(team)

        print("Creating projects ...")
        project = Project(
            team=team,
            assignment=assignment,
        )
        session.add(project)

        print("Creating project metadata ...")
        project_metadata = ProjectMetadata(
            key_name="url",
            value="https://laubet.no",
            value_type="string",
            project=project,
        )
        session.add(project_metadata)

        print("Creating analyzer ...")
        analyzer = Analyzer(
            name="Lighthouse Analyzer",
            description="du er en bæaj",
            creator="Enthe Nu",
            hasScript=False,
        )
        session.add(analyzer)

        # Associate the analyzer with the assignment
        assignment.analyzers.append(analyzer)

        print("Creating analyzer inputs ...")
        analyzer_inputs = [
            AnalyzerInput(key_name="url", value_type="string", analyzer=analyzer)
        ]
        session.add_all(analyzer_inputs)

        print("Creating analyzer outputs ...")
        analyzer_outputs = [
            AnalyzerOutput(
                key_name="performance",
                display_name="Performance rating",
                value_type="range",
                extended_metadata=json.dumps({"fromRange": 1, "toRange": 100}),
                analyzer=analyzer,
            ),
            AnalyzerOutput(
                key_name="hasViewport",
                display_name="Viewport",
                value_type="bool",
                analyzer=analyzer,
            ),
            AnalyzerOutput(
                key_name="hasHTTPS",
                display_name="HTTPS",
                value_type="bool",
                analyzer=analyzer,
            ),
            AnalyzerOutput(
                key_name="js_workload",
                display_name="JS Main thread work",
                value_type="text",
                analyzer=analyzer,
            ),
        ]
        session.add_all(analyzer_outputs)

        print("Creating report 1 ...")
        report1_data = {
            "performance": 65,
            "hasViewport": False,
            "hasHTTPS": False,
            "js_workload": "JS main thread workload is high, consider optimizing JS code.",
        }
        report1 = Report(
            report=json.dumps(report1_data), project=project, analyzer=analyzer
        )
        session.add(report1)

        print("Creating report 2 ...")
        report2_data = {
            "performance": 88,
            "hasViewport": True,
            "hasHTTPS": False,
            "js_workload": "JS main thread workload is high, consider optimizing JS code.",
        }
        report2 = Report(
            report=json.dumps(report2_data), project=project, analyzer=analyzer
        )
        session.add(report2)

        session.commit()
        print("Finished!")

    except Exception as e:
        session.rollback()
        print(f"Something went wrong: {e}")

    finally:
        session.close()
