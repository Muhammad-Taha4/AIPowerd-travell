from pydantic import BaseModel
from typing import List, Optional

class UserPreferences(BaseModel):
    destination: Optional[str] = None
    budget_range: str
    activities: List[str]
    group_size: int
    travel_dates: Optional[str] = None

class Recommendation(BaseModel):
    package_id: str
    title: str
    relevance_score: float
    explanation: str

class WeatherData(BaseModel):
    month: str
    avg_temp: float
    rainfall: float
    events: List[str]

class IncidentAlert(BaseModel):
    id: str
    type: str  # Weather, Political, Health
    severity: str # High, Medium, Low
    message: str
    location: str
