import os
import json

class AIService:
    def __init__(self):
        self.api_key = os.getenv("OPENAI_API_KEY", "sk-placeholder-openai")

    def get_personalized_recommendations(self, prefs, package_data):
        # In a real implementation, this would use an OpenAI prompt to rank packages
        # Prompt: "Given user preferences {prefs}, rank these packages {package_data}"
        
        # Simulated logic: Filter by matching tags
        results = []
        for pkg in package_data:
            common = set(prefs.activities).intersection(set(pkg['tags']))
            score = 0.5 + (len(common) * 0.1)
            if score > 1.0: score = 0.99
            
            explanation = f"Matches your interest in {' and '.join(list(common)) if common else 'travel'}."
            results.append({
                "package_id": pkg['id'],
                "title": pkg['title'],
                "relevance_score": score,
                "explanation": explanation
            })
            
        return sorted(results, key=lambda x: x['relevance_score'], reverse=True)

    def get_best_time_analysis(self, destination, historical_data):
        # Prompt: "Analyze historical weather {historical_data} and recommend best time for {destination}"
        
        return f"Based on historical data for {destination}, the months of September to November offer the best balance of temperature (avg 22°C) and low precipitation. This period is ideal for the outdoor activities you prefer."

    def generate_chat_response(self, query, context):
        # Real logic would call OpenAI Chat Completion
        # response = openai.ChatCompletion.create(...)
        
        return f"Regarding your question about {query}: Most travellers find that {context['package_title']} is best experienced in the early morning to avoid crowds. Would you like me to add a sunrise tour to your itinerary?"

ai_service = AIService()
