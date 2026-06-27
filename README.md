![Python](https://img.shields.io/badge/Python-3.11-blue) ![FastAPI](https://img.shields.io/badge/FastAPI-Live-green) ![TensorFlow](https://img.shields.io/badge/TensorFlow-orange) ![Gemini](https://img.shields.io/badge/Google-Gemini-blue) ![License](https://img.shields.io/badge/License-MIT-green)

## 🌾 KrishiRakshak AI - AI-Powered Smart Farming Assistant

KrishiRakshak AI is a smart agricultural healthcare platform that enables farmers to detect crop diseases using Artificial Intelligence, Computer Vision, and Generative AI. Farmers can capture images of affected crops, describe symptoms via voice, and receive instant disease predictions along with preventive measures, organic, and chemical treatment recommendations.

Designed specifically for rural usability, the app features a Progressive Web App (PWA) architecture for mobile installation, full bilingual support (English and Hindi), and Text-to-Speech capabilities so advice can be listened to directly.

---
## Live Demo

App link: 
https://krishi-rakshak-ai-9l41.vercel.app/

Frontend:
https://krishi-rakshak-ai-9141.vercel.app/

---

## Deployed Features

- **🌱 AI-Powered Crop Disease Detection**: Snap a photo or upload an image to instantly classify plant diseases using a custom-trained TensorFlow model.
- **🤖 Gemini AI Advisory**: Generates highly personalized, context-aware advice for the detected disease (organic treatments, chemical treatments, and prevention).
- **🗣️ Voice-Enabled Search**: A "Tap to Speak" microphone feature allowing farmers to describe their crop issues out loud.
- **🔊 Text-to-Speech (Listen to Advice)**: The app can read the disease diagnosis and treatment advice aloud to the user in their preferred language.
- **🌐 Seamless Multilingual Support**: 100% bilingual interface with real-time translation of UI and Gemini AI responses into Hindi.
- **📱 Progressive Web App (PWA)**: Fully installable on iOS and Android home screens, looking and feeling exactly like a native mobile app.
- **📊 Interactive Dashboard**: A premium, beautifully designed responsive dashboard for farmers to track market prices (explore section) and disease alerts.

---

## 🛠️ Tech Stack

### Frontend (Farmer App)
- **Framework**: React.js (built with Vite)
- **Styling**: Vanilla CSS (Custom Design System, Glassmorphism, Micro-animations)
- **Icons**: Lucide React
- **Architecture**: Progressive Web App (PWA) with custom Service Workers

### Backend (API)
- **Framework**: FastAPI (Python)
- **Server**: Uvicorn

### AI & Machine Learning
- **Computer Vision**: TensorFlow/Keras image classification model (MobileNetV2 transfer learning)
- **Generative AI**: Google Gemini 2.5 Flash (for dynamic advisory generation and translation)
- **Speech API**: Web Speech API (for voice-to-text and text-to-speech)

### Deployment & Cloud
- **Frontend Hosting**: Vercel (PWA Deployment)
- **Backend Hosting**: Render (FastAPI Web Service)
- **Version Control**: Git & GitHub

---

## System Architecture

```mermaid
graph TD
    A["Farmer Mobile App / PWA"] -->|1. Image or Voice Upload| B("FastAPI Backend")
    B -->|2. Image Inference| C{"TensorFlow (MobileNetV2) Disease Detection Model"}
    C -->|3. Disease Class| B
    B -->|4. Disease Name + Language| D{"Gemini 2.5 Flash (Treatment Recommendation Engine)"}
    D -->|5. Treatments & Advice| B
    B -->|6. Prediction and AI Recommendation JSON| A
    A -->|7. Text-to-Speech Output| E["Farmer"]
```

## Architecture Highlights

• FastAPI REST Backend

• TensorFlow MobileNetV2 Disease Classification

• Gemini 2.5 Flash Recommendation Engine

• Progressive Web App

• Voice Input + Text-to-Speech

• Multilingual Translation

• Cloud Deployment (Vercel + Render)


---

## Objectives

- **Empower Farmers**: Bridge the gap between rural farmers and expert agricultural knowledge.
- **Early Detection**: Enable immediate detection of crop diseases directly through smartphones.
- **Accessible Technology**: Overcome literacy barriers using Voice Input and Text-to-Speech.
- **Sustainable Farming**: Provide actionable organic treatment options alongside traditional chemical methods.

---
## UI Preview
1. Login Page
<img width="602" height="719" alt="Screenshot 2026-06-27 at 03 29 16" src="https://github.com/user-attachments/assets/ccf503fa-ba50-4eba-a6d5-8fcc154ff25c" />

2. Home
<img width="449" height="712" alt="Screenshot 2026-06-27 at 03 30 07" src="https://github.com/user-attachments/assets/6a974c98-8725-4805-8b70-2df527d882bf" />

3. AI Prediction
<img width="301" height="591" alt="Screenshot 2026-06-27 at 03 30 29" src="https://github.com/user-attachments/assets/62675f69-fd00-4857-8399-6e8374dea843" />

4. Prediction in Hindi
<img width="404" height="672" alt="image" src="https://github.com/user-attachments/assets/8d771ad8-7f32-4b1f-9e4c-9f52a08a3d76" />

5. Explore Section
<img width="402" height="672" alt="image" src="https://github.com/user-attachments/assets/cbd91126-2879-4fa5-95ef-f4124b62803e" />

## 👩‍💻 Author
**Sneha**</br>
*Computer Science Undergraduate*</br>
**Open to AI/ML & Software Engineering Internship Opportunities.**
