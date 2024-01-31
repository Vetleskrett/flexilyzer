"use client";
import api from "@/api_utils";
import { useSnackbar } from "@/context/snackbarContext";
import { Button, Input, Spinner, code } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import CodeDisplay from "./CodeDisplay";
import CodeTemplate from "../createAnalyzerComponents/CodeTemplate";
import {
  AnalyzerInputResponse,
  AnalyzerOutputResponse,
  AnalyzerSimplifiedResponse,
} from "@/extensions/data-contracts";
import { FormDataT } from "@/types/analyzerDefinitions";

export default async function AnalyzerMissingScript({
  analyzer,
  inputs,
  outputs,
}: {
  analyzer: AnalyzerSimplifiedResponse;
  inputs: AnalyzerInputResponse[];
  outputs: AnalyzerOutputResponse[];
}) {
  const router = useRouter();

  const { openSnackbar } = useSnackbar();
  const [codeTemplate, setCodeTemplate] = useState<string | undefined>();

  async function fetchCodeTemplate() {
    const resp = await api.getAnalyzerTemplate({
      name: analyzer.name,
      description: analyzer.description,
      inputs: inputs,
      outputs: outputs,
    });

    if (resp.ok) {
      setCodeTemplate(resp.data);
    } else {
      console.error(resp.error);
    }
  }

  useEffect(() => {
    fetchCodeTemplate();
  }, []);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFile) {
      alert("Please select a file to upload");
      return;
    }

    const resp = await api.uploadAnalyzerScript(analyzer.id, {
      file: selectedFile,
    });
    if (resp.ok) {
      openSnackbar({
        message: "Analyzer submitted successfully!",
        severity: "success",
      });
      router.refresh();
    } else {
      openSnackbar({
        message: `Something wrong while submitting Analyzer: ${resp.error}`,
        severity: "warning",
      });
    }
  };

  return (
    <>
      <div className="flex w-full flex-col items-center">
        <Tabs>
          <Tab key="upload" title="Upload script">
          <div className="mt-6">

            <form
              className="flex flex-col items-center justify-center"
              onSubmit={handleSubmit}
            >
              <input type="file" accept=".py" onChange={handleFileChange} />
              <br />
              <Button color="primary" type="submit">
                Upload Script
              </Button>
            </form>
            </div>
          </Tab>
          <Tab key="template" title="Show Template">
            <Suspense fallback={<Spinner />}>
              <div className="mt-6">
                <CodeDisplay code_string={codeTemplate ? codeTemplate : ""} />
              </div>
            </Suspense>
          </Tab>
        </Tabs>
      </div>
    </>
  );
}
