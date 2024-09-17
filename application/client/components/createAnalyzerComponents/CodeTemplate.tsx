import { getAnalyzerTemplate } from "@/utils/apiUtils";
import { FormDataT } from "@/types/analyzerDefinitions";
import { Button } from "@nextui-org/react";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useEffect, useState } from "react";
import { useSnackbar } from "@/context/snackbarContext";
import { formatAnalyzerData } from "../analyzerComponents/analyzerUtils";
import CodeDisplay from "../analyzerComponents/CodeDisplay";

export default function CodeTemplate({ formData }: { formData: FormDataT }) {
  const { openSnackbar } = useSnackbar();

  const [codeTemplate, setCodeTemplate] = useState<string | undefined>();

  useEffect(() => {
    async function fetchCodeTemplate() {

      try {
        const data = await getAnalyzerTemplate(formatAnalyzerData(formData));
        setCodeTemplate(data);
      } catch(error) {
        console.error(error);
      }
      
    }
    fetchCodeTemplate();
  }, [formData]);

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
          <div className="mt-4 flex justify-center">
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
