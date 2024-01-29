import api from "@/api_utils";
import { FormDataT } from "@/app/types/analyzerDefinitions";
import { AnalyzerCreate } from "@/extensions/data-contracts";
import { Button, code } from "@nextui-org/react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SnackBarComponent from "../SnackBarComponent";
import { useEffect, useState } from "react";
import { SnackBarDefinitions } from "@/app/types/generalDefinitions";

export default async function CodeTemplate({
  formData,
}: {
  formData: FormDataT;
}) {
  const [snackbar, setSnackbar] = useState<SnackBarDefinitions>({
    open: false,
    message: "",
    severity: "info",
  });

  const [codeTemplate, setCodeTemplate] = useState<string | undefined>();

  const getTemplate = () => {
    console.log("fetching data");
    const data: AnalyzerCreate = {
      name: formData.name,
      description: formData.description,
      inputs: formData.inputs.map((e) => ({
        key_name: e.key_name,
        value_type: e.value_type,
      })),
      outputs: formData.outputs.map((e) => ({
        key_name: e.key_name,
        value_type: e.value_type,
      })),
    };
    return data;
  };

  async function fetchCodeTemplate() {
    const resp = await api.getAnalyzerTemplate(getTemplate());

    if (resp.ok) {
      setCodeTemplate(resp.data);
    } else {
      console.error(resp.error);
    }
  }

  useEffect(() => {
    fetchCodeTemplate();
  }, []);

  async function copyToClipboard() {
    if (codeTemplate) {
      try {
        await navigator.clipboard.writeText(codeTemplate);
        // setSnackbar({
        //   open: true,
        //   message: "Code copied to clipboard!",
        //   severity: "success",
        // });
      } catch (err) {
        // setSnackbar({
        //   open: true,
        //   message: `Could not copy code to clipboard, error: ${err}`,
        //   severity: "warning",
        // });
      }
    }
  }

  return (
    <>
      {codeTemplate ? (
        <>
          <SyntaxHighlighter
            customStyle={{ paddingLeft: "30px", fontSize: "small" }}
            language="python"
            style={docco}
          >
            {codeTemplate}
          </SyntaxHighlighter>
          <div className="flex justify-center mt-4">
            <Button
              startContent={<ContentCopyIcon />}
              color="secondary"
              onClick={copyToClipboard}
            >
              Copy code
            </Button>
            {/* <SnackBarComponent
              open={snackbar.open}
              msg={snackbar.message}
              severity={snackbar.severity}
              onClose={() => setSnackbar({ ...snackbar, open: false })}
            /> */}
          </div>
        </>
      ) : (
        "Loading ..."
      )}
    </>
  );
}
