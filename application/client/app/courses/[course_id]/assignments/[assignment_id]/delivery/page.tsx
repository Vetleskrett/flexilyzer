"use client";
import { ProjectMetadataCreate } from "@/extensions/data-contracts";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { Input, Button } from "@nextui-org/react";
import { useSnackbar } from "@/context/snackbarContext";
import { LoadingComponent } from "@/components/LoadingComponent";
import { getAssignmentProject, fetchAssignmentMetadata, submitProjectForm } from "./serverActions";

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

  // Fetch project data and populate the form
  useEffect(() => {
    if (team_id && assignment_id) {
      getAssignmentProject(assignment_id, Number(team_id))
        .then((project) => {
          const newFormData = new Map<number, string>();
          project.project_metadata.forEach((metadata: any) => {
            newFormData.set(metadata.assignment_metadata_id, metadata.value);
          });
          setFormData(newFormData);
        })
        .catch((error) => {
          console.error("Error loading project:", error);
        });
    }
  }, [team_id, assignment_id]);

  // Fetch assignment metadata using react-query
  const {
    data: assignment_metadatas,
    isLoading: isLoadingAssignmentMetadata,
    error: errorAssignmentMetadata,
  } = useQuery(["assignment_metadatas", assignment_id], () => fetchAssignmentMetadata(assignment_id), {
    enabled: !!assignment_id,
    refetchOnWindowFocus: false,
    retry: false,
  });

  // Handle form submission
  async function submitForm() {
    if (!team_id) return;

    const project_metadata: ProjectMetadataCreate[] = [];
    formData.forEach((value, id) => {
      project_metadata.push({
        value: value,
        assignment_metadata_id: id,
      });
    });

    const data = {
      team_id: Number(team_id),
      assignment_id: params.assignment_id,
      project_metadata,
    };

    try {
      await submitProjectForm(data);
      openSnackbar({
        message: "Delivery submitted successfully!",
        severity: "success",
      });
    } catch (error) {
      openSnackbar({
        message: `An error occurred while submitting: ${(error as Error).message}`,
        severity: "error",
      });
    }
  }

  if (isLoadingAssignmentMetadata) {
    return <LoadingComponent text="Loading ..." />;
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
      {assignment_metadatas?.map((assignment_metadata) => (
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
      ))}

      <Button color="primary" onClick={submitForm}>
        Submit
      </Button>
    </div>
  );
}
