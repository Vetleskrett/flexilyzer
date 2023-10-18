from pony.orm import db_session, commit
from datetime import datetime
from db.models import (
    Course,
    Assignment,
    Group,
    Repository,
    Analyzer,
    MetricDefinition,
    Report,
)
import json


@db_session
def main():
    try:
        print("Cleaning DB ...")
        Course.select().delete(bulk=True)
        Assignment.select().delete(bulk=True)
        Group.select().delete(bulk=True)
        Repository.select().delete(bulk=True)
        Analyzer.select().delete(bulk=True)
        MetricDefinition.select().delete(bulk=True)
        Report.select().delete(bulk=True)
        print("Cleaning finished")

        print("Creating course ...")
        course = Course(tag="IT2810", name="Webutvikling")

        print("Creating assignment ...")
        assignment = Assignment(name="Øving 3", due_date=datetime(2023, 12, 20, 23, 59))

        print("Creating group ...")
        group = Group(github_link="https://github.com/pettelau/tsffbet", course=course)

        print("Creating repository ...")
        repository = Repository(
            github_link="https://github.com/pettelau/tsffbet",
            group=group,
            assignment=assignment,
        )

        print("Creating analyzer ...")
        analyzer = Analyzer(name="Lighthouse Analyzer", creator="Enthe Nu")

        print("Creating metrics ...")
        metric_definitions = [
            MetricDefinition(
                key_name="performance",
                display_name="Performance rating",
                value_type="range",
                extended_metadata=json.dumps({"fromRange": 1, "toRange": 100}),
                analyzer=analyzer,
            ),
            MetricDefinition(
                key_name="hasViewport",
                display_name="Viewport",
                value_type="bool",
                analyzer=analyzer,
            ),
            MetricDefinition(
                key_name="hasHTTPS",
                display_name="HTTPS",
                value_type="bool",
                analyzer=analyzer,
            ),
            MetricDefinition(
                key_name="js_workload",
                display_name="JS Main thread work",
                value_type="text",
                analyzer=analyzer,
            ),
        ]

        print("Creating report ...")
        report_data = {
            "performance": 84,
            "hasViewport": True,
            "hasHTTPS": False,
            "js_workload": "JS main thread workload is high, consider optimizing JS code.",
        }
        report = Report(report=json.dumps(report_data), repository=repository)

        commit()
        print("Finished!")
    except Exception as e:
        print("Something went wrong: ", e)


if __name__ == "__main__":
    main()
