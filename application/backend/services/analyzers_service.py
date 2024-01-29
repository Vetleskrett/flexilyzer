from fastapi import HTTPException, UploadFile
from pydantic import ValidationError
from db.crud.analyzers_crud import AnalyzerRepository
from schemas.analyzer_schema import (
    RequirementsSchema,
    ScriptSchema,
    AnalyzerOutputResponse,
    AnalyzerInputResponse,
    AnalyzerCreate,
)
from utils.validationUtils import validatePydanticToHTTPError
from utils.storeUtils import store_file
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
    def get_analyzer_inputs(db, analyzer_id: int):
        AnalyzerService.get_analyzer(db, analyzer_id=analyzer_id)

        return AnalyzerRepository.get_analyzer_inputs(db, analyzer_id=analyzer_id)

    @staticmethod
    def get_analyzer_outputs(db, analyzer_id: int):
        AnalyzerService.get_analyzer(db, analyzer_id=analyzer_id)

        return AnalyzerRepository.get_analyzer_outputs(db, analyzer_id=analyzer_id)

    @staticmethod
    def post_analyzer(db, analyzer: AnalyzerCreate):
        base_analyzer = {}

        return AnalyzerRepository.create_analyzer(db=db, analyzer=analyzer)

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
