from fastapi import APIRouter, HTTPException
from models.schemas import UserPreferences, Recommendation, IncidentAlert
from services.ai_service import ai_service
from services.weather_service import weather_service
from typing import List

router = APIRouter()

@router.post("/personalized", response_model=List[Recommendation])
async def personalized_recommendations(prefs: UserPreferences):
    # Simulated package data from DB
    package_data = [
        {"id": "1", "title": "Bali Adventure", "tags": ["Adventure", "Beach"]},
        {"id": "2", "title": "Swiss Alps Trek", "tags": ["Adventure", "Cold"]},
        {"id": "3", "title": "Paris Culture", "tags": ["Cultural", "Romantic"]}
    ]
    try:
        recommendations = ai_service.get_personalized_recommendations(prefs, package_data)
        # Mocked return for demo
        return [
            Recommendation(package_id="1", title="Bali Adventure", relevance_score=0.95, explanation="Matches your interest in Beach and Adventure activities.")
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/best-time/{destination}")
async def best_time(destination: str):
    historical = await weather_service.get_historical_patterns(destination)
    analysis = ai_service.get_best_time_analysis(destination, historical)
    return {"destination": destination, "analysis": analysis}

@router.get("/alerts/real-time/{region}", response_model=List[IncidentAlert])
async def real_time_alerts(region: str):
    # Aggregating from mock external safety APIs
    return [
        IncidentAlert(id="1", type="Weather", severity="Medium", message="Unusually high rainfall expected in the coming week.", location=region)
    ]
