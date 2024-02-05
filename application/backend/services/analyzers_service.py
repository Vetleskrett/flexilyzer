import json
from fastapi import HTTPException, UploadFile
from db.crud.analyzers_crud import AnalyzerRepository
from schemas.analyzer_schema import (
    RequirementsSchema,
    ScriptSchema,
    AnalyzerBase,
    AnalyzerOutputResponse,
    AnalyzerInputResponse,
    AnalyzerResponse,
    AnalyzerCreate,
    AnalyzerInternalUpdate,
)
from utils.validationUtils import validatePydanticToHTTPError
from utils.fileUtils import delete_file, read_file, store_file, script_exists
from utils.templateUtils import generate_template


class AnalyzerService:
    @staticmethod
    def get_all_analyzers(db):
        return AnalyzerRepository.get_analyzers(db)

    @staticmethod
    def get_analyzer(db, analyzer_id: int):
        analyzer = AnalyzerRepository.get_analyzer(db, analyzer_id)
        if not analyzer:
            raise HTTPException(
                status_code=404, detail=f"Analyzer with id {analyzer_id} not found"
            )
        return analyzer

    @staticmethod
    def get_analyzer_by_name(db, analyzer_name: str):
        analyzer = AnalyzerRepository.get_analyzer_by_name(db, analyzer_name)
        if not analyzer:
            raise HTTPException(
                status_code=404, detail=f"Analyzer with name {analyzer_name} not found"
            )
        return analyzer

    @staticmethod
    def get_analyzer_inputs(db, analyzer_id: int):
        AnalyzerService.get_analyzer(db, analyzer_id=analyzer_id)

        return AnalyzerRepository.get_analyzer_inputs(db, analyzer_id=analyzer_id)

    @staticmethod
    def get_analyzer_outputs(db, analyzer_id: int):
        AnalyzerService.get_analyzer(db, analyzer_id=analyzer_id)

        return AnalyzerRepository.get_analyzer_outputs(db, analyzer_id=analyzer_id)

    @staticmethod
    def post_analyzer(db, analyzer: AnalyzerCreate):
        try:
            AnalyzerService.get_analyzer_by_name(db, analyzer.name)
        except HTTPException:
            pass
        else:
            raise HTTPException(
                status_code=409,
                detail=f"Analyzer with name '{analyzer.name}' already exists",
            )

        base_analyzer = {"name": analyzer.name, "description": analyzer.description}

        base_analyzer_casted: AnalyzerBase = AnalyzerBase(**base_analyzer)

        created_analyzer = AnalyzerRepository.create_analyzer(
            db=db, analyzer=base_analyzer_casted
        )

        created_inputs = AnalyzerRepository.create_analyzer_inputs(
            db=db, analyzer_id=created_analyzer.id, inputs=analyzer.inputs
        )

        created_outputs = AnalyzerRepository.create_analyzer_outputs(
            db=db, analyzer_id=created_analyzer.id, outputs=analyzer.outputs
        )

        casted_resp_inputs = [
            AnalyzerInputResponse(
                id=input.id, key_name=input.key_name, value_type=input.value_type
            )
            for input in created_inputs
        ]
        casted_resp_outputs = [
            AnalyzerOutputResponse(
                id=output.id,
                key_name=output.key_name,
                value_type=output.value_type,
                display_name=output.display_name,
                extended_metadata=output.extended_metadata,
            )
            for output in created_outputs
        ]

        return AnalyzerResponse(
            id=created_analyzer.id,
            name=created_analyzer.name,
            description=created_analyzer.description,
            inputs=casted_resp_inputs,
            outputs=casted_resp_outputs,
        )

    @staticmethod
    def delete_script(db, analyzer_id):
        analyzer = AnalyzerRepository.get_analyzer(db, analyzer_id)

        if not script_exists(analyzer_id=analyzer_id):  # or not analyzer.has_script:
            raise HTTPException(
                status_code=404,
                detail=f"Script for analyzer with id {analyzer_id} is not yet uploaded",
            )

        delete_file(analyzer_id)

        return None

    @staticmethod
    def delete_requirements(db, analyzer_id):
        analyzer = AnalyzerRepository.get_analyzer(db, analyzer_id)

        if not script_exists(analyzer_id=analyzer_id):  # or not analyzer.has_script:
            raise HTTPException(
                status_code=404,
                detail=f"Script for analyzer with id {analyzer_id} is not yet uploaded",
            )

        delete_file(analyzer_id, requirements=True)

        return None

    @staticmethod
    def get_analyzer_template(analyzer: AnalyzerCreate):
        return generate_template(inputs=analyzer.inputs, outputs=analyzer.outputs)

    @staticmethod
    async def upload_script(db, analyzer_id, file: UploadFile):
        validatePydanticToHTTPError(ScriptSchema, {"file_name": file.filename})
        analyzer = AnalyzerService.get_analyzer(db=db, analyzer_id=analyzer_id)

        if script_exists(analyzer_id=analyzer_id):  # or analyzer.has_script:
            raise HTTPException(
                status_code=409,
                detail=f"Script for analyzer with id {analyzer_id} is already uploaded",
            )

        await store_file(analyzer_id=analyzer_id, file=file)

        updated_analyzer_data = AnalyzerInternalUpdate(**analyzer.__dict__)
        updated_analyzer_data.has_script = True

        AnalyzerRepository.update_analyzer(
            db=db, analyzer_id=analyzer_id, analyzer=updated_analyzer_data
        )

        return "Script stored successfully."

    @staticmethod
    async def upload_requirements(db, analyzer_id, file: UploadFile):
        validatePydanticToHTTPError(RequirementsSchema, {"file_name": file.filename})
        analyzer = AnalyzerService.get_analyzer(db=db, analyzer_id=analyzer_id)

        if script_exists(analyzer_id, requirements=True):
            raise HTTPException(
                status_code=409,
                detail=f"Requirements.txt for analyzer with id {analyzer_id} is already uploaded",
            )

        await store_file(analyzer_id=analyzer.id, file=file, requirements=True)

        updated_analyzer_data = AnalyzerInternalUpdate(**analyzer.__dict__)
        updated_analyzer_data.has_requirements = True

        AnalyzerRepository.update_analyzer(
            db=db, analyzer_id=analyzer_id, analyzer=updated_analyzer_data
        )

        return "Requirements stored successfully."

    @staticmethod
    def get_script(db, analyzer_id):
        analyzer = AnalyzerRepository.get_analyzer(db, analyzer_id)

        if not script_exists(analyzer_id=analyzer_id):  # or not analyzer.hasScript:
            raise HTTPException(
                status_code=404,
                detail=f"Script for analyzer with id {analyzer_id} is not yet uploaded",
            )

        return read_file(analyzer_id)

    @staticmethod
    def get_requirements(db, analyzer_id):
        analyzer = AnalyzerRepository.get_analyzer(db, analyzer_id)

        if not script_exists(
            analyzer_id=analyzer_id, requirements=True
        ):  # or analyzer.has_vevn != "NO_VENV":
            raise HTTPException(
                status_code=404,
                detail=f"Requirements file for analyzer with id {analyzer_id} is not yet uploaded",
            )

        return read_file(analyzer_id, requirements=True)
