import os
import shutil
import uuid

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from model.predict import predict_image
from backend.gemini import get_disease_information

app = FastAPI(
    title="KrishiRakshak AI",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "backend/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@app.get("/")
def home():
    return {
        "message": "KrishiRakshak AI Backend Running"
    }


@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    extension = os.path.splitext(file.filename)[1]

    filename = f"{uuid.uuid4()}{extension}"

    file_path = os.path.join(
        UPLOAD_DIR,
        filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # AI Prediction
    prediction = predict_image(file_path)

    friendly_name = (
        prediction["disease"]
        .replace("___", " ")
        .replace("_", " ")
    )

    # Gemini Recommendation
    recommendation = get_disease_information(
        friendly_name
    )

    return {
        "prediction": prediction,
        "recommendation": recommendation
    }