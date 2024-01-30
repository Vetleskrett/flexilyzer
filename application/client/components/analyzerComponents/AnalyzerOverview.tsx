"use client";
import { AnalyzerResponse } from "@/extensions/data-contracts";
import { Button, Card, CardBody } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function AnalyzerOverview({
  analyzer,
}: {
  analyzer: AnalyzerResponse;
}) {
  const router = useRouter();

  return (
    <Card className="mb-5">
      <CardBody>
        <div className="flex">
          <div className="flex-auto">
            <h3 className="h3">{analyzer.name}</h3>
            {analyzer.description}
          </div>
          <div className="flex-initial my-auto mr-15">
            <Button
              onClick={() => {
                router.push(`/analyzers/${analyzer.id}`);
              }}
              variant="faded"
            >
              Go to analyzer
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
