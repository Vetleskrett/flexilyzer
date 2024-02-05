from services.analyzers_service import AnalyzerService
from services.projects_service import ProjectsService
from services.assignments_service import AssignmentService


def fetchIOHelper(db, analyzer_id):
    required_input_objects = AnalyzerService.get_analyzer_inputs(db, analyzer_id)
    required_inputs = {input_obj.key_name for input_obj in required_input_objects}

    required_output_objects = AnalyzerService.get_analyzer_outputs(db, analyzer_id)

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
    print(assignment_id, required_inputs, project_ids)
    assignment_metadatas = AssignmentService.get_assignment_metadata(db, assignment_id)
    print(assignment_metadatas)
    keys = {am.id: am.key_name for am in assignment_metadatas}

    projects_with_metadata = {}
    for id in project_ids:
        project_metadata_objects = ProjectsService.get_project_metadata(
            db, project_id=id
        )

        filtered_metadata = {
            keys[meta.assignment_metadata_id]: meta.value
            for meta in project_metadata_objects
            if keys[meta.assignment_metadata_id] in required_inputs
        }

        projects_with_metadata[id] = filtered_metadata

    return projects_with_metadata
