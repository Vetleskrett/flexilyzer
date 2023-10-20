from fastapi import HTTPException
from db.crud import (
    analyzers_crud,
)


class AnalyzerService:
    @staticmethod
    def get_all_analyzers(db):
        return analyzers_crud.get_analyzers(db)

    @staticmethod
    def get_analyzer(db, analyzer_id: int):
        analyzer = analyzers_crud.get_analyzer(db, analyzer_id)
        if not analyzer:
            raise HTTPException(status_code=404, detail="Analyzer not found")
        return analyzer
