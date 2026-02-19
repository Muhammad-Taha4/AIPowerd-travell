from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import recommendations

app = FastAPI(title="AI Travel Recommendations Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(recommendations.router, prefix="/recommend", tags=["Recommendations"])

@app.get("/")
async def root():
    return {"message": "AI Recommendations API is running"}
