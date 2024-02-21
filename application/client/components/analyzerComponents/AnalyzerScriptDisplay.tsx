"use client";
import api from "@/api_utils";
import CodeDisplay from "./CodeDisplay";
import React, { useState } from "react";
import { Button, Card, Tab, Tabs } from "@nextui-org/react";
import { useSnackbar } from "@/context/snackbarContext";
import { useRouter } from "next/navigation";

interface AnalyzerScriptDisplayProps {
  analyzer_id: number;
  script: string | null;
  has_requirements: boolean;
  requirements: string | null;
}
// Define the function as async but ensure it catches errors internally
export default function AnalyzerScriptDisplay({
  analyzer_id,
  script,
  has_requirements,
  requirements,
}: AnalyzerScriptDisplayProps) {
  const router = useRouter();

  const { openSnackbar } = useSnackbar();

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

    const resp = await api.uploadAnalyzerRequirements(analyzer_id, {
      file: selectedFile,
    });
    if (resp.ok) {
      openSnackbar({
        message: "Requirements file submitted successfully!",
        severity: "success",
      });
      router.refresh();
    } else {
      openSnackbar({
        message: `Something wrong while submitting Requirements file: ${resp.error}`,
        severity: "warning",
      });
    }
  };

  // If the response is successful, proceed to render the component
  return (
    <>
      <div className="flex w-full flex-col items-center">
        <Tabs>
          <Tab key="script" title="Script">
            <div className="mt-6">
              {script ? (
                <CodeDisplay code_string={script} />
              ) : (
                "Mismatch between server and DB."
              )}
            </div>
          </Tab>
          <Tab
            key="requirements"
            title={
              has_requirements ? "Requirements" : "Upload requirements.txt"
            }
          >
            {has_requirements ? (
              <div className="mt-6">
                {requirements ? (
                  <CodeDisplay code_string={requirements} />
                ) : (
                  "Mismatch between server and DB."
                )}
              </div>
            ) : (
              <div className="mt-6">
                <form
                  className="mt-8 flex flex-col items-center justify-center"
                  onSubmit={handleSubmit}
                >
                  <input
                    id="fileInput"
                    type="file"
                    accept=".txt"
                    onChange={handleFileChange}
                  />

                  <br />
                  <Card className="mb-8 bg-slate-100 p-3 text-xs">
                    <p>
                      {` PS: The file must be named exactly "`}
                      <i>requirements.txt</i>
                      {`".`}
                    </p>
                  </Card>
                  <Button
                    isDisabled={selectedFile !== null ? false : true}
                    color="primary"
                    type="submit"
                  >
                    Upload Requirements file
                  </Button>
                </form>
              </div>
            )}
          </Tab>
        </Tabs>
      </div>
    </>
  );
}
