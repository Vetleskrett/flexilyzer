from fastapi import HTTPException
from db.crud import (
    repositories_crud,
)


class RepositoriesService:
    @staticmethod
    def get_all_repositories(db):
        return repositories_crud.get_repositories(db)

    @staticmethod
    def get_repository(db, repository_id: int):
        repository = repositories_crud.get_repository(db, repository_id)
        if not repository:
            raise HTTPException(status_code=404, detail="Repository not found")
        return repository

    @staticmethod
    def get_repository_reports(db, repository_id: int):
        repository = RepositoriesService.get_repository(db, repository_id)

        if repository:
            return repositories_crud.get_repository_reports(db, repository_id)
