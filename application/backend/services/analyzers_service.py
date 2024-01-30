from typing import List
from fastapi import HTTPException, UploadFile
from pydantic import ValidationError, type_adapter
from db.crud.analyzers_crud import AnalyzerRepository
from schemas.analyzer_schema import (
    RequirementsSchema,
    ScriptSchema,
    AnalyzerBase,
    AnalyzerOutputResponse,
    AnalyzerInputResponse,
    AnalyzerResponse,
    AnalyzerCreate,
)
from utils.validationUtils import validatePydanticToHTTPError
from utils.storeUtils import store_file
from utils.templateUtils import generate_template

from db.models import Analyzer, AnalyzerInput, AnalyzerOutput


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
    def get_analyzer_inputs(db, analyzer_id: int):
        AnalyzerService.get_analyzer(db, analyzer_id=analyzer_id)

        return AnalyzerRepository.get_analyzer_inputs(db, analyzer_id=analyzer_id)

    @staticmethod
    def get_analyzer_outputs(db, analyzer_id: int):
        AnalyzerService.get_analyzer(db, analyzer_id=analyzer_id)

        return AnalyzerRepository.get_analyzer_outputs(db, analyzer_id=analyzer_id)

    @staticmethod
    def post_analyzer(db, analyzer: AnalyzerCreate):
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

        print([inputs. for inputs in created_inputs])

        casted_resp_inputs = [
            AnalyzerInputResponse(inputs) for inputs in created_inputs
        ]
        casted_resp_outputs = [
            AnalyzerOutputResponse(output) for output in created_outputs
        ]

        return AnalyzerResponse(
            inputs=casted_resp_inputs, outputs=casted_resp_outputs, **created_analyzer
        )

    @staticmethod
    def get_analyzer_template(analyzer: AnalyzerCreate):
        return generate_template(inputs=analyzer.inputs, outputs=analyzer.outputs)

    @staticmethod
    def upload_script(db, analyzer_id, file: UploadFile):
        validatePydanticToHTTPError(ScriptSchema, {"file_name": file.filename})
        analyzer = AnalyzerService.get_analyzer(db=db, analyzer_id=analyzer_id)

        result = store_file(analyzer_id=analyzer_id, file=file)

        return 1

    @staticmethod
    def upload_requirements(db, analyzer_id, file: UploadFile):
        validatePydanticToHTTPError(RequirementsSchema, {"file_name": file.filename})
        analyzer = AnalyzerService.get_analyzer(db=db, analyzer_id=analyzer_id)

        return 1
