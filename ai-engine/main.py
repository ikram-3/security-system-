from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest
import random
from datetime import datetime
from typing import List, Optional

app = FastAPI(title="CyberShield AI Engine")

# Mock Model for demonstration (Isolation Forest for Anomaly Detection)
# In a real app, these would be loaded from serialized files (.joblib)
anomaly_model = IsolationForest(contamination=0.1, random_state=42)

# Training with synthetic data for demo purposes
def train_mock_models():
    # Synthetic normal network traffic
    normal_data = np.random.normal(size=(100, 5))
    anomaly_model.fit(normal_data)
    print("AI Models trained with synthetic data")

@app.on_event("startup")
async def startup_event():
    train_mock_models()

class LogEntry(BaseModel):
    id: Optional[str] = None
    features: List[float] # e.g., [packet_size, frequency, duration, error_rate, unique_ips]

class BatchLogs(BaseModel):
    logs: List[LogEntry]

@app.get("/")
async def root():
    return {"status": "online", "engine": "CyberShield AI v1.0"}

@app.post("/ai/detect")
async def detect_anomalies(batch: BatchLogs):
    if not batch.logs:
        return {"anomalies": []}
    
    data = np.array([log.features for log in batch.logs])
    # -1 for outliers, 1 for inliers
    predictions = anomaly_model.predict(data)
    # Convert to scores (distance from hyperplane)
    scores = anomaly_model.decision_function(data)
    
    results = []
    for i, pred in enumerate(predictions):
        is_anomaly = bool(pred == -1)
        # Normalize score to 0-100 (where higher is more suspicious)
        # Decision function returns negative for outliers, positive for inliers
        # We want high score for outliers
        raw_score = scores[i]
        anomaly_score = min(100, max(0, (0.5 - raw_score) * 50))
        
        results.append({
            "is_anomaly": is_anomaly,
            "score": round(anomaly_score, 2)
        })
        
    return {"results": results}

@app.post("/ai/score")
async def calculate_threat_score(features: List[float]):
    # Simplified threat scoring logic
    score = sum(features) * random.uniform(0.8, 1.2)
    score = min(100, max(0, score))
    return {"threat_score": round(score, 2)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
