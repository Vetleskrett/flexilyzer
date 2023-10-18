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
        assignment = Assignment(name="Øving 3", dueDate=datetime(2023, 12, 20, 23, 59))

        print("Creating group ...")
        group = Group(githubLink="https://github.com/pettelau/tsffbet", course=course)

        print("Creating repository ...")
        repository = Repository(
            githubLink="https://github.com/pettelau/tsffbet",
            group=group,
            assignment=assignment,
        )

        print("Creating analyzer ...")
        analyzer = Analyzer(name="Lighthouse Analyzer", createdBy="Enthe Nuh")

        print("Creating metrics ...")
        metric_definitions = [
            MetricDefinition(
                keyName="performance",
                displayName="Performance rating",
                valueType="range",
                extendedMetadata=json.dumps({"fromRange": 1, "toRange": 100}),
                analyzer=analyzer,
            ),
            MetricDefinition(
                keyName="hasViewport",
                displayName="Viewport",
                valueType="bool",
                analyzer=analyzer,
            ),
            MetricDefinition(
                keyName="hasHTTPS",
                displayName="HTTPS",
                valueType="bool",
                analyzer=analyzer,
            ),
            MetricDefinition(
                keyName="js_workload",
                displayName="JS Main thread work",
                valueType="text",
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
