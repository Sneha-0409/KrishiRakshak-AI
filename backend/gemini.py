import os
import json
from dotenv import load_dotenv
from google import genai

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    raise ValueError("GEMINI_API_KEY not found in .env file")

client = genai.Client(api_key=API_KEY)


# Gemini Function

def get_disease_information(disease_name: str, language: str = "English"):

    prompt = f"""
You are an expert agricultural scientist helping Indian farmers.

The detected plant disease is:

{disease_name}

Your job is to provide practical advice.

IMPORTANT RULES:

1. Return ONLY valid JSON.
2. Do NOT use markdown.
3. Do NOT use ```json.
4. Do NOT use **bold** formatting.
5. Do NOT write any explanation outside JSON.
6. Every list item must be plain text.
7. Keep answers concise and practical.
8. ALL of the text values in the JSON (description, symptoms, treatments, preventions) MUST be written in {language}. The JSON keys must remain in English.

Return EXACTLY this JSON format:

{{
    "severity": "",
    "description": "",
    "symptoms": [
        "",
        ""
    ],
    "organic_treatment": [
        "",
        ""
    ],
    "chemical_treatment": [
        "",
        ""
    ],
    "prevention": [
        "",
        ""
    ]
}}

The advice should be suitable for Indian farmers.
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    text = response.text.strip()
    if text.startswith("```"):
        text = text.replace("```json", "")
        text = text.replace("```", "")
        text = text.strip()

    try:
        return json.loads(text)

    except json.JSONDecodeError:
        return {
            "severity": "Unknown",
            "description": text,
            "symptoms": [],
            "organic_treatment": [],
            "chemical_treatment": [],
            "prevention": []
        }


if __name__ == "__main__":

    disease = "Tomato Late Blight"

    result = get_disease_information(disease)

    print(json.dumps(result, indent=4))