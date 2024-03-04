from curses import keyname
from datetime import datetime
from sqlalchemy.orm import sessionmaker
import sqlalchemy as sa
import json
from utils.dbUtils import generate_random_website, get_real_webpage
from schemas.shared import BatchEnum
from db.models import (
    Batch,
    Course,
    Assignment,
    ProjectMetadata,
    Team,
    Project,
    Analyzer,
    AnalyzerInput,
    AnalyzerOutput,
    Report,
    AssignmentMetadata,
    assignment_analyzer_association,  # Make sure to import this
)

from sqlalchemy import text


from db.database import engine, Base

# Create the engine and session
SessionLocal = sessionmaker(bind=engine)


def reset_sequences(engine, session):
    # Acquire a connection from the engine
    with engine.connect() as connection:
        # Fetch all sequence names
        sequences = connection.execute(
            text("SELECT c.relname FROM pg_class c WHERE c.relkind = 'S';")
        ).fetchall()
        for seq in sequences:
            # Reset each sequence
            session.execute(text(f"ALTER SEQUENCE {seq[0]} RESTART WITH 1;"))


def run_seed():
    session = SessionLocal()
    try:
        print("Cleaning DB ...")
        # Delete all existing data from tables
        # Note: Assumes you have a list of all table models or can otherwise obtain them.
        tables = [
            Batch,
            Course,
            Assignment,
            ProjectMetadata,
            Team,
            Project,
            Analyzer,
            AnalyzerInput,
            AnalyzerOutput,
            Report,
            AssignmentMetadata,
        ]
        for table in tables:
            if sa.inspect(engine).has_table(table.__tablename__):
                session.query(table).delete()

        # Reset all sequences
        reset_sequences(engine, session)

        session.commit()
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
        session.flush()

        assignment_metadata = AssignmentMetadata(
            assignment_id=assignment.id, key_name="url", value_type="str"
        )
        session.add(assignment_metadata)
        session.flush()

        print("Creating teams in loop ...")
        for i in range(9):
            print(f"Team {i}...")
            team = Team(course=course)
            session.add(team)
            project = Project(
                team=team,
                assignment=assignment,
            )
            session.add(project)

            print("Creating project metadata ...")
            project_metadata = ProjectMetadata(
                value=get_real_webpage(i),
                project=project,
                assignment_metadata_id=assignment_metadata.id,
            )
            session.add(project_metadata)

        print("Creating course 2 ...")
        course2 = Course(tag="IT4334", name="Store, distribuerte datamengder")
        session.add(course2)

        print("Creating assignment 2...")
        assignment2 = Assignment(
            name="SQL øving", due_date=datetime(2024, 3, 25, 23, 59), course=course2
        )
        session.add(assignment2)
        session.flush()

        assignment_metadata2 = AssignmentMetadata(
            assignment_id=assignment2.id, key_name="url", value_type="str"
        )
        session.add(assignment_metadata2)
        session.flush()

        print("Creating teams for course 2 ...")
        team3 = Team(course=course2)
        team4 = Team(course=course2)
        session.add(team3)
        session.add(team4)

        print("Creating projects 3...")
        project3 = Project(
            team=team3,
            assignment=assignment2,
        )
        session.add(project3)
        print("Creating projects 4...")
        project4 = Project(
            team=team4,
            assignment=assignment2,
        )
        session.add(project4)

        print("Creating project metadata  3 ...")
        project_metadata3 = ProjectMetadata(
            value="https://github.com/freeCodeCamp/freeCodeCamp",
            project=project3,
            assignment_metadata_id=assignment_metadata2.id,
        )
        session.add(project_metadata3)

        print("Creating project metadata  4 ...")
        project_metadata4 = ProjectMetadata(
            value="https://github.com/TheAlgorithms/Python",
            project=project4,
            assignment_metadata_id=assignment_metadata2.id,
        )
        session.add(project_metadata4)

        print("Creating course 3 ...")
        course3 = Course(tag="IT6206", name="Grunnleggende Python")
        session.add(course3)

        print("Creating assignment 3 ...")
        assignment3 = Assignment(
            name="Intro til Python",
            due_date=datetime(2024, 3, 23, 23, 59),
            course=course3,
        )
        session.add(assignment3)
        session.flush()

        assignment_metadata3 = AssignmentMetadata(
            assignment_id=assignment3.id, key_name="zip_file_name", value_type="zip"
        )
        session.add(assignment_metadata3)
        session.flush()

        print("Creating teams in loop ...")
        for i in range(2):
            print(f"Team {i}...")
            team = Team(course=course3)
            session.add(team)
            project = Project(
                team=team,
                assignment=assignment3,
            )
            session.add(project)

            print("Creating project metadata ...")
            project_metadata = ProjectMetadata(
                value=f"{team.id}.zip",
                project=project,
                assignment_metadata_id=assignment_metadata3.id,
            )
            session.add(project_metadata)

        print("Creating analyzer ...")
        analyzer = Analyzer(
            name="Test Analyzer",
            description="Generic description",
            creator="Wilhelm Bjo",
        )
        session.add(analyzer)

        # Associate the analyzer with the assignment
        # assignment.analyzers.append(analyzer)
        session.flush()

        print("Creating analyzer 2 ...")
        analyzer2 = Analyzer(
            name="Test Analyzer 2",
            description="Analyzer to measuse stats of webpage with Google's Lighthouse tool",
            creator="Enthe Nu",
        )
        session.add(analyzer2)
        # assignment.analyzers.append(analyzer2)
        session.flush()

        print("Creating batch")
        batch = Batch(
            assignment_id=assignment.id,
            analyzer_id=analyzer2.id,
            status=BatchEnum.FINISHED,
        )
        session.add(batch)
        session.flush()

        print("Creating batch 2")
        batch2 = Batch(
            assignment_id=assignment.id,
            analyzer_id=analyzer2.id,
            status=BatchEnum.FINISHED,
        )
        session.add(batch2)
        session.flush()

        print("Creating analyzer inputs ...")
        analyzer_inputs = [
            AnalyzerInput(key_name="url", value_type="str", analyzer=analyzer)
        ]
        session.add_all(analyzer_inputs)

        print("Creating analyzer inputs 2 ...")
        analyzer_inputs2 = [
            AnalyzerInput(key_name="databaseurl", value_type="str", analyzer=analyzer2)
        ]
        session.add_all(analyzer_inputs2)

        print("Creating analyzer outputs ...")
        analyzer_outputs = [
            AnalyzerOutput(
                key_name="b",
                display_name="Main output",
                value_type="str",
                # extended_metadata=json.dumps({"fromRange": 1, "toRange": 100}),
                analyzer=analyzer,
                # ),
                # AnalyzerOutput(
                #     key_name="hasViewport",
                #     display_name="Viewport",
                #     value_type="bool",
                #     analyzer=analyzer,
                # ),
                # AnalyzerOutput(
                #     key_name="hasHTTPS",
                #     display_name="HTTPS",
                #     value_type="bool",
                #     analyzer=analyzer,
                # ),
                # AnalyzerOutput(
                #     key_name="js_workload",
                #     display_name="JS Main thread work",
                #     value_type="text",
                #     analyzer=analyzer,
            ),
        ]
        session.add_all(analyzer_outputs)

        print("Creating analyzer outputs 2 ...")
        analyzer_outputs2 = [
            AnalyzerOutput(
                key_name="hasHTTPS",
                display_name="Hashttps",
                value_type="bool",
                analyzer=analyzer2,
            ),
            AnalyzerOutput(
                key_name="hasViewport",
                display_name="Viewport",
                value_type="bool",
                analyzer=analyzer2,
            ),
            AnalyzerOutput(
                key_name="performance",
                display_name="Performance",
                value_type="range",
                extended_metadata=json.dumps({"fromRange": 1, "toRange": 100}),
                analyzer=analyzer2,
            ),
            AnalyzerOutput(
                key_name="js_workload",
                display_name="JS Main thread work",
                value_type="str",
                analyzer=analyzer2,
            ),
        ]
        session.add_all(analyzer_outputs2)

        # print("Creating report 1 ...")
        # report1_data = {
        #     "performance": 65,
        #     "hasViewport": False,
        #     "hasHTTPS": False,
        #     "js_workload": "JS main thread workload is high, consider optimizing JS code.",
        # }
        # report1 = Report(
        #     report=json.dumps(report1_data), project=project, batch_id=batch.id
        # )
        # session.add(report1)

        # print("Creating report 2 ...")
        # report2_data = {
        #     "performance": 88,
        #     "hasViewport": True,
        #     "hasHTTPS": False,
        #     "js_workload": "JS main thread workload is high, consider optimizing JS code.",
        # }
        # report2 = Report(
        #     report=json.dumps(report2_data), project=project, batch_id=batch2.id
        # )
        # session.add(report2)

        session.commit()
        print("Finished!")

    except Exception as e:
        session.rollback()
        print(f"Something went wrong: {e}")

    finally:
        session.close()
