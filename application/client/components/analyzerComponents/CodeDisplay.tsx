"use client";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function CodeDisplay({ code_string }: { code_string: string }) {
  return (
    <div className="max-w-md">
      <SyntaxHighlighter
        customStyle={{
          paddingLeft: "30px",
          paddingRight: "20px",
          fontSize: "small",
        }}
        language="python"
        style={docco}
      >
        {code_string}
      </SyntaxHighlighter>
    </div>
  );
}
