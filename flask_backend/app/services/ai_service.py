import os

class AIService:
    def __init__(self):
        self.api_key = os.getenv("OPENAI_API_KEY", "sk-placeholder")

    def get_recommendations(self, preferences, packages):
        # Mocking LangChain/OpenAI logic for demo stability
        return [
            {
                "package_id": packages[0]["id"] if packages else "1",
                "relevance_score": 0.98,
                "explanation": "This matches your history of interest in adventure and premium stays."
            }
        ]

    def analyze_best_time(self, destination):
        return f"The best time to visit {destination} is between September and November for ideal weather."

    def fetch_real_time_alerts(self, region):
        return f"No major travel alerts for {region} at this time. Enjoy your trip!"

ai_service = AIService()
