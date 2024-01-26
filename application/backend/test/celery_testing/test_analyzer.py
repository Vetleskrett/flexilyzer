import json


def main():
    # report = json.dumps({"param1": True, "param2": "hello world", "param3": 42})

    report = json.dumps(
        {
            "performance": 76,
            "hasViewport": True,
            "hasHTTPS": False,
            "js_workload": "Good!!",
        }
    )
    return report


if __name__ == "__main__":
    print(main())
