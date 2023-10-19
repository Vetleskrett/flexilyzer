import asyncio
from prisma import Prisma
from datetime import datetime

from prisma import Json

import json


async def main() -> None:
    try:
        prisma = Prisma()
        await prisma.connect()

        print("Cleaning DB ...")
        await prisma.course.delete_many()
        await prisma.assignment.delete_many()
        await prisma.team.delete_many()
        await prisma.repository.delete_many()
        await prisma.analyzer.delete_many()
        await prisma.metric_definition.delete_many()
        await prisma.report.delete_many()
        print("Cleaning finished")

        print("Creating course ...")
        course = await prisma.course.create(
            data={
                "tag": "IT2810",
                "name": "Webutvikling",
            }
        )

        print("Creating assignment ...")
        assignment = await prisma.assignment.create(
            data={"name": "Øving 3", "dueDate": datetime(2023, 12, 20, 23, 59)}
        )

        print("Creating team ...")
        group = await prisma.group.create(
            data={
                "githubLink": "https://github.com/pettelau/tsffbet",
                "courseId": course.id,
            }
        )
        print("Creating repository ...")
        repository = await prisma.repository.create(
            data={
                "githubLink": "https://github.com/pettelau/tsffbet",
                "groupId": group.id,
                "assignmentId": assignment.id,
            }
        )

        print("Creating analyzer ...")
        analyzer = await prisma.analyzer.create(
            data={"name": "Lighthouse Analyzer", "createdBy": "Enthe Nuh"}
        )

        print("Creating metrcis ...")
        metricDefinitions = await prisma.metric_definition.create_many(
            data=[
                {
                    "keyName": "performance",
                    "displayName": "Performance rating",
                    "valueType": "range",
                    "extendedMetadata": Json({"fromRange": 1, "toRange": 100}),
                    "analyzerId": analyzer.id,
                },
                {
                    "keyName": "hasViewport",
                    "displayName": "Viewport",
                    "valueType": "bool",
                    "analyzerId": analyzer.id,
                },
                {
                    "keyName": "hasHTPPS",
                    "displayName": "HTTPS",
                    "valueType": "bool",
                    "analyzerId": analyzer.id,
                },
                {
                    "keyName": "js_workload",
                    "displayName": "JS Main thread work",
                    "valueType": "text",
                    "analyzerId": analyzer.id,
                },
            ]
        )
        print("Creating report ...")
        report = await prisma.report.create(
            data={
                "report": Json(
                    {
                        "performance": 84,
                        "hasViewport": True,
                        "hasHTTPS": False,
                        "js_workload": "JS main thread workload is high, consider optimizing JS code.",
                    }
                ),
                "repositoryId": repository.id,
            }
        )

        print("Finished!")
    except Exception as e:
        print("Something went wrong: ", e)
    finally:
        await prisma.disconnect()


if __name__ == "__main__":
    asyncio.run(main())
