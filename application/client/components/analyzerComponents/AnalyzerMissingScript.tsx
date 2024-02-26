"use client";
import api from "@/utils/apiUtils";
import { useSnackbar } from "@/context/snackbarContext";
import { Button, Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import CodeDisplay from "./CodeDisplay";
import {
  AnalyzerInputResponse,
  AnalyzerOutputResponse,
  AnalyzerSimplifiedResponse,
} from "@/extensions/data-contracts";
import { formatAnalyzerData } from "./analyzerUtils";

export default function AnalyzerMissingScript({
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

  useEffect(() => {
    async function fetchCodeTemplate() {
      const resp = await api.getAnalyzerTemplate(
        formatAnalyzerData({
          id: analyzer.id,
          name: analyzer.name,
          description: analyzer.description,
          inputs: inputs,
          outputs: outputs,
        })
      );

      if (resp.ok) {
        setCodeTemplate(resp.data);
      } else {
        console.error(resp.error);
      }
    }
    fetchCodeTemplate();
  }, [analyzer, inputs, outputs]);

  const [selectedScriptFile, setSelectedScriptFile] = useState<File | null>(
    null
  );
  const [selectedReqFile, setSelectedReqFile] = useState<File | null>(null);

  const handleScriptFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      setSelectedScriptFile(event.target.files[0]);
    }
  };

  const handleReqFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedReqFile(event.target.files[0]);
    }
  };

  const handleScriptSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!selectedScriptFile) {
      alert("Please select a file to upload");
      return;
    }

    const resp = await api.uploadAnalyzerScript(analyzer.id, {
      file: selectedScriptFile,
    });
    if (resp.ok) {
      openSnackbar({
        message: "Analyzer script submitted successfully!",
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
  const handleReqSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedReqFile || selectedReqFile.name !== "requirements.txt") {
      alert("Please select a valid to upload");
      return;
    }

    const resp = await api.uploadAnalyzerRequirements(analyzer.id, {
      file: selectedReqFile,
    });
    if (resp.ok) {
      openSnackbar({
        message: "Requirements.txt file submitted successfully!",
        severity: "success",
      });
      router.refresh();
    } else {
      openSnackbar({
        message: `Something wrong while submitting requirements.txt: ${resp.error}`,
        severity: "warning",
      });
    }
  };

  return (
    <>
      <div className='flex w-full flex-col items-center'>
        <Tabs>
          <Tab key='template' title='Script Template'>
            <Suspense fallback={<Spinner />}>
              <div className='mt-6'>
                <CodeDisplay code_string={codeTemplate ? codeTemplate : ""} />
              </div>
            </Suspense>
          </Tab>
          <Tab key='upload_script' title='Upload script'>
            <div className='mt-6'>
              <form
                className='flex flex-col items-center justify-center'
                onSubmit={handleScriptSubmit}
              >
                <input
                  type='file'
                  id='fileInput'
                  accept='.py'
                  onChange={handleScriptFileChange}
                />

                <br />
                <Button
                  isDisabled={selectedScriptFile == null ? true : false}
                  color='primary'
                  type='submit'
                >
                  Upload Script
                </Button>
              </form>
            </div>
          </Tab>
          <Tab key='upload_req' title='Upload Requirements'>
            <div className='mt-6'>
              <form
                className='flex flex-col items-center justify-center'
                onSubmit={handleReqSubmit}
              >
                <input
                  type='file'
                  accept='.txt'
                  onChange={handleReqFileChange}
                />
                <br />
                <Button
                  isDisabled={selectedReqFile == null ? true : false}
                  color='primary'
                  type='submit'
                >
                  Upload Requirements
                </Button>
              </form>
            </div>
          </Tab>
        </Tabs>
      </div>
    </>
  );
}
