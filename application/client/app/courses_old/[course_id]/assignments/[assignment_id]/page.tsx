"use client";
import RangeComponent from "@/components/analyzerComponents/rangeComponent";
import TextComponent from "@/components/analyzerComponents/textComponent";
import BoolComponent from "@/components/analyzerComponents/boolComponent";
import AssignmentMetadata from "@/components/assignmentComponents/AssignmentMetadata";
import { useTeam } from "../providers";

interface Props {
  params: { tag: string; id: string };
}

const renderMetrics = (report: any, metric_metadata: any) => {
  const metrics = JSON.parse(report.report); // Convert the report string to an object.
  const metadata = metric_metadata[report.analyzer]; // Find the corresponding metadata.

  return Object.entries(metrics).map(([keyName, value]) => {
    const metricMetadata = metadata.find((m: any) => m.key_name === keyName);

    if (!metricMetadata) {
      return null; // If there's no metadata for a metric, don't render a component.
    }

    switch (metricMetadata.value_type) {
      case "range":
        const extendedMetadata = JSON.parse(metricMetadata.extended_metadata);
        return (
          <RangeComponent
            keyName={keyName}
            value={value as number}
            fromValue={extendedMetadata.fromRange}
            toValue={extendedMetadata.toRange}
          />
        );
      case "text":
        return <TextComponent keyName={keyName} value={value as string} />;
      case "bool":
        return <BoolComponent keyName={keyName} value={value as boolean} />;
      default:
        return null; // If the value_type is not recognized, don't render a component.
    }
  });
};

export default async function AssigmentReportsPage({ params }: Props) {
  const assigment_details = {
    id: 1,
    course: 1,
    name: "Øving 3",
    due_date: "2023-12-20T23:59:00",
  };

  const detailed_repos_data = {
    repo_data: [
      {
        id: 3,
        github_link: "https://github.com/pettelau/tsffbet",
        assignment: 3,
        team: 3,
        reports: [
          {
            id: 3,
            timestamp: "2023-10-18T17:16:37.285733",
            report:
              '{"performance": 65, "hasViewport": false, "hasHTTPS": false, "js_workload": "JS main thread workload is high, consider optimizing JS code."}',
            analyzer: 3,
            repository: 3,
          },
          {
            id: 4,
            timestamp: "2023-10-18T17:16:37.285757",
            report:
              '{"performance": 88, "hasViewport": true, "hasHTTPS": false, "js_workload": "JS main thread workload is high, consider optimizing JS code."}',
            analyzer: 3,
            repository: 3,
          },
        ],
      },
    ],
    metric_metadata: {
      "3": [
        {
          id: 9,
          key_name: "performance",
          value_type: "range",
          display_name: "Performance rating",
          extended_metadata: '{"fromRange": 1, "toRange": 100}',
          analyzer: 3,
        },
        {
          id: 10,
          key_name: "hasViewport",
          value_type: "bool",
          display_name: "Viewport",
          extended_metadata: {},
          analyzer: 3,
        },
        {
          id: 11,
          key_name: "hasHTTPS",
          value_type: "bool",
          display_name: "HTTPS",
          extended_metadata: {},
          analyzer: 3,
        },
        {
          id: 12,
          key_name: "js_workload",
          value_type: "text",
          display_name: "JS Main thread work",
          extended_metadata: {},
          analyzer: 3,
        },
      ],
    },
  };


  return (
    <div className="text-center mt-10">
      No team chosen. Choose one from the left menu to show reports for this
      team
    </div>
  );
}
