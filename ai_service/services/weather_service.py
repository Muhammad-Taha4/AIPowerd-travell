import httpx
import os

class WeatherService:
    def __init__(self):
        self.api_key = os.getenv("OPENWEATHER_API_KEY")
        self.base_url = "https://api.openweathermap.org/data/2.5"

    async def get_current_weather(self, lat: float, lon: float):
        async with httpx.AsyncClient() as client:
            res = await client.get(f"{self.base_url}/weather", params={
                "lat": lat, "lon": lon, "appid": self.api_key, "units": "metric"
            })
            return res.json()

    async def get_historical_patterns(self, destination: str):
        # Mocking historical data based on destination for demo purposes
        # Real implementation would call a historical weather API
        return {
            "Jan": {"temp": 20, "rain": 50, "events": ["New Year Festival"]},
            "Jun": {"temp": 30, "rain": 10, "events": ["Summer Solstice"]},
            "Dec": {"temp": 15, "rain": 40, "events": ["Christmas Market"]}
        }

weather_service = WeatherService()
