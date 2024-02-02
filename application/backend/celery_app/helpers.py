from services.analyzers_service import AnalyzerService
from services.projects_service import ProjectsService
from services.assignments_service import AssignmentService


def fetchIOHelper(db, analyzer_id):
    # Fetch all required analyzer inputs from DB
    required_input_objects = AnalyzerService.get_analyzer_inputs(db, analyzer_id)
    # Extract the key_name from each AnalyzerInput object into a set
    required_inputs = {input_obj.key_name for input_obj in required_input_objects}
    required_output_objects = AnalyzerService.get_analyzer_outputs(db, analyzer_id)
    # Extract the key_name from each AnalyzerInput object into a set

    required_outputs = {
        output_obj.key_name: {
            "value_type": output_obj.value_type,
            "extended_metadata": output_obj.extended_metadata
            if output_obj.extended_metadata
            else None,
        }
        for output_obj in required_output_objects
    }

    return required_inputs, required_outputs


def fetchProjectsAndMetadataHelper(db, project_ids, required_inputs, assignment_id):
    projects_with_metadata = {}
    # Fetch all required metadata for all projects

    assignment_metadata = AssignmentService.get_assignment_metadata(db, assignment_id)

    for id in project_ids:
        # Fetch project metadata, assuming it returns a dict-like object
        project_metadata_objects = ProjectsService.get_project_metadata(
            db, project_id=id
        )

        filtered_metadata = {
            meta.key_name: meta.value
            for meta in project_metadata_objects
            if meta.key_name in required_inputs
        }

        # Store the filtered metadata in projects_with_metadata
        projects_with_metadata[id] = filtered_metadata

    return projects_with_metadata
