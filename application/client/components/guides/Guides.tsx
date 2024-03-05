"use client";

import { Introduction } from "./Introduction";
import { WhatIsAnAnalyzer } from "./WhatIsAnAnalyzer";

const sections = [
  {
    name: "Introduction",
    ref: "#introduction",
    component: <Introduction />,
    subSections: [
      {
        name: "What is an analyzer?",
        ref: "#introduction-analyzer",
        component: <WhatIsAnAnalyzer />,
      },
      { name: "System description", ref: "#introduction-system" },
    ],
  },
  {
    name: "Analyzers",
    ref: "#analyzers",
    subSections: [
      { name: "Analyzer Inputs", ref: "#analyzer-inputs" },
      { name: "Analyzer Outputs", ref: "#analyzer-outputs" },
      { name: "Analyzer Script template", ref: "#analyzer-template" },
      { name: "Analyzer Environments", ref: "#analyzer-environments" },
    ],
  },
];

export const Guides = () => {
  return (
    <div className="mt-12 flex flex-row">
      <div className="flex w-1/4 flex-col gap-2">
        <h2 className="h2">Menu:</h2>
        {sections.map((section) => {
          return (
            <div key={section.ref} className="flex flex-col gap-1">
              {section.name}
              {section.subSections &&
                section.subSections.map((subSection) => {
                  return (
                    <div className="ml-4" key={subSection.ref}>
                      {subSection.name}
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
      <div className="flex grow">
        Content: Map all the content here with a reference on the url ...
      </div>
    </div>
  );
};
