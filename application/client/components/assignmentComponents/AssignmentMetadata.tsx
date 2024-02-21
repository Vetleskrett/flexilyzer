"use client";

import {
  AssignmentMetadataResponse,
  ValueTypesInput,
} from "@/extensions/data-contracts";
import { renderParameter } from "../analyzerComponents/analyzerUtils";

export default function AssignmentMetadata({
  metadata,
}: {
  metadata: AssignmentMetadataResponse[];
}) {
  return (
    <div className="mt-3 flex flex-col items-center justify-center">
      <h3 className="h3">Metadata</h3>
      {metadata.map((data) => {
        return (
          <>
            {renderParameter({
              id: data.id.toString(),
              key_name: data.key_name,
              value_type: data.value_type as ValueTypesInput,
            })}
          </>
        );
      })}
    </div>
  );
}
