import api from "@/api_utils";
import { FormDataT } from "@/types/analyzerDefinitions";
import { AnalyzerCreate } from "@/extensions/data-contracts";
import { Button } from "@nextui-org/react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useEffect, useState } from "react";
import { useSnackbar } from "@/context/snackbarContext";
import { formatAnalyzerData } from "../analyzerComponents/analyzerUtils";
import CodeDisplay from "../analyzerComponents/CodeDisplay";

export default function CodeTemplate({ formData }: { formData: FormDataT }) {
  const { openSnackbar } = useSnackbar();

  const [codeTemplate, setCodeTemplate] = useState<string | undefined>();

  async function fetchCodeTemplate() {
    const resp = await api.getAnalyzerTemplate(formatAnalyzerData(formData));

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
        openSnackbar({
          message: "Code copied to clipboard!",
          severity: "success",
        });
      } catch (err) {
        openSnackbar({
          message: `Could not copy code to clipboard, error: ${err}`,
          severity: "warning",
        });
      }
    }
  }

  return (
    <>
      {codeTemplate && (
        <>
          <CodeDisplay code_string={codeTemplate} />
          <div className="flex justify-center mt-4">
            <Button
              startContent={<ContentCopyIcon />}
              color="secondary"
              onClick={copyToClipboard}
            >
              Copy code
            </Button>
          </div>
        </>
      )}
    </>
  );
}
