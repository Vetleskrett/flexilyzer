import { Button } from "@nextui-org/react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function CodeTemplate({
  codeTemplate,
}: {
  codeTemplate: string;
}) {
  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(codeTemplate);
      alert("Code copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }
  return (
    <>
      <SyntaxHighlighter
        customStyle={{ paddingLeft: "30px", fontSize: "small" }}
        language="python"
        style={docco}
      >
        {codeTemplate}
      </SyntaxHighlighter>
      <div className="flex justify-center mt-4">
        <Button color="secondary" onClick={copyToClipboard}>Copy code to clipboard</Button>
      </div>
    </>
  );
}
