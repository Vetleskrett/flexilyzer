from sqlalchemy.orm import Session

from db.models import Analyzer, MetricDefinition


def get_analyzers(db: Session):
    """
    Retrieves all analyzers.

    Parameters:
    - db (Session): The database session.

    Returns:
    A list of all analyzers.
    """
    return db.query(Analyzer).all()


def get_analyzer(db: Session, analyzer_id: int):
    """
    Retrieves a specific analyzer.

    Parameters:
    - db (Session): The database session.
    - analyzer_id (int): The ID of the analyzer.

    Returns:
    The requested analyzer if found, otherwise None.
    """
    return db.query(Analyzer).filter(Analyzer.id == analyzer_id).first()


def get_analyzer_with_metrics_definitions(db: Session, analyzer_id: int):
    """
    Retrieves a specific analyzer along with its metric definitions.

    Parameters:
    - db (Session): The database session.
    - analyzer_id (int): The ID of the analyzer.

    Returns:
    The requested analyzer with its associated metric definitions if found, otherwise None.
    """
    analyzer = db.query(Analyzer).filter(Analyzer.id == analyzer_id).first()
    if analyzer:
        analyzer.metric_definitions = (
            db.query(MetricDefinition)
            .filter(MetricDefinition.analyzer_id == analyzer.id)
            .all()
        )
    return analyzer
