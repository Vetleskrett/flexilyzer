import styles from "./page.module.css";
import Link from "next/link";

interface Props {
  params: { id: string };
}

export default async function AssigmentStartPage({ params }: Props) {
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
    <main className={styles.main}>
      <h2>Start page for Assignment with ID: {params.id}</h2>
      <br />
      <div className="">
        Name: {assigment_details.name} <br />
        Due date: {new Date(assigment_details.due_date).toLocaleDateString()}
      </div>
      <br />
      All repositories for this assignment: <br />
      {detailed_repos_data.repo_data.map((repo) => {
        return (
          <>
            <div style={{ backgroundColor: "gainsboro", padding: 30 }}>
              Repo ID: {repo.id} <br />
              GitHub Link: {repo.github_link} <br />
              Analyses of this repo: <br />
              {repo.reports.map((report) => {
                return (
                  <div style={{ backgroundColor: "skyblue", marginBottom: 10 }}>
                    Report ID: {report.id} <br />
                    Analyzer ID: {report.analyzer} <br />
                    {report.report}
                  </div>
                );
              })}
            </div>
          </>
        );
      })}
    </main>
  );
}
