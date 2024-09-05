"use client";
import { AssignmentMetadataResponse, ProjectCreate, ProjectMetadataCreate } from "@/extensions/data-contracts";
import api from "@/utils/apiUtils";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";

import {
  Input,
  Button,
} from "@nextui-org/react";
import { useSnackbar } from "@/context/snackbarContext";
import { LoadingComponent } from "@/components/LoadingComponent";

interface Props {
  params: { course_id: number; assignment_id: number };
}

export default function TeamDeliveryPage({ params }: Props) {

  const [formData, setFormData] = useState<Map<number, string>>(new Map<number, string>());
  const updateFormData = (id: number, value: string) => {
    const newFormData = new Map(formData);
    newFormData.set(id, value);
    setFormData(newFormData);
  };

  const searchParams = useSearchParams();

  const team_id = searchParams.get("team_id");
  const assignment_id = params.assignment_id;

  const { openSnackbar } = useSnackbar();

  useEffect(() => {
    api.getAssignmentProject(assignment_id, Number(team_id)).then(response => {
      const project = response.data;
      const newFormData = new Map<number, string>();

      project.project_metadata.forEach((metadata => {
        newFormData.set(metadata.assignment_metadata_id, metadata.value);
      }))

      setFormData(newFormData);
    })
    .catch(error => {
      console.error(error);
    })

  }, [team_id])

  const fetchAssignmentMetadata = async () => {
    const resp = await api.getAssignmentMetadata(
      params.assignment_id,
      { cache: "no-cache" },
    );
    if (!resp.ok) throw new Error(`${resp.status} - ${resp.error}`);
    return resp.data;
  };

  const {
    data: assignment_metadatas,
    isLoading: isLoadingAssignmentMetadata,
    error: errorAssignmentMetadata,
  } = useQuery<AssignmentMetadataResponse[], Error>(
    ["assignment_metadatas", { assignment_id }],
    fetchAssignmentMetadata,
    {
      refetchOnWindowFocus: false,
      // Only proceed with the query if team_id is not null
      enabled: !!assignment_id,
      retry: false,
    },
  );

  async function submitForm() {

    const project_metadata: ProjectMetadataCreate[] = [];
    formData.forEach((value, id) => {
      project_metadata.push({
          value: value,
          assignment_metadata_id: id
      })
    })

    const data : ProjectCreate = {
      team_id: Number(team_id),
      assignment_id: params.assignment_id,
      project_metadata: project_metadata
    }

    const resp = await api.createProject(data)
    
    if (resp.ok) {
      openSnackbar({
        message: "Delivery submitted successfully!",
        severity: "success",
      });
    } else {
      openSnackbar({
        message: `Something wrong while submitting Delivery: ${resp.error}`,
        severity: "warning",
      });
    }
  }

  if (isLoadingAssignmentMetadata) {
    <LoadingComponent text={"Loading ..."} />;
  }

  if (errorAssignmentMetadata) {
    return (
      <div className="mt-14 text-center">
        An error occurred while trying to fetch delivery.
      </div>
    );
  }

  return (
    <div className="my-8 flex flex-col items-center justify-center text-center">

      <h3 className="h3">Delivery for Team {team_id}</h3>

      {

        assignment_metadatas?.map(assignment_metadata => {
          return (
            <div key={assignment_metadata.id}>
              
              <Input
                isRequired
                size="lg"
                label={assignment_metadata.key_name}
                placeholder={assignment_metadata.key_name}
                value={formData.get(assignment_metadata.id) || ""}
                className="mb-8"
                onChange={(e) => updateFormData(assignment_metadata.id, e.target.value)}
              />

            </div>
          )
        })
      }

      <Button color="primary" onClick={submitForm}>
        Submit
      </Button>

    </div>

  );
}