import React, { useState } from 'react';
import { Leaf, Volume2, ShieldCheck, Pill, Stethoscope, AlertTriangle, AlertCircle } from 'lucide-react';

export default function ResultsView({ result, language }) {
  const { prediction, recommendation } = result;
  const [isPlaying, setIsPlaying] = useState(false);

  const texts = {
    English: {
      predictionTitle: "Disease Prediction",
      detected: "Detected",
      confidence: "Confidence",
      severity: "Severity",
      description: "Description",
      symptoms: "Symptoms",
      organic: "Organic Treatment",
      chemical: "Chemical Treatment",
      prevention: "Prevention",
      listen: "Listen to Advice",
      stopListen: "Stop Listening"
    },
    Hindi: {
      predictionTitle: "रोग की भविष्यवाणी",
      detected: "पहचानी गई बीमारी",
      confidence: "आत्मविश्वास",
      severity: "गंभीरता",
      description: "विवरण",
      symptoms: "लक्षण",
      organic: "जैविक उपचार",
      chemical: "रासायनिक उपचार",
      prevention: "बचाव के उपाय",
      listen: "सलाह सुनें",
      stopListen: "सुनना बंद करें"
    }
  };

  const t = texts[language] || texts.English;
  const severityClass = recommendation.severity?.toLowerCase() || 'low';

  const friendlyName = prediction.disease.replace(/___/g, " ").replace(/_/g, " ");

  const playVoice = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const textToRead = `${t.detected} ${friendlyName}. ${t.severity}: ${recommendation.severity}. ${recommendation.description}. ${t.symptoms}: ${recommendation.symptoms.join(', ')}.`;
    
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = language === 'Hindi' ? 'hi-IN' : 'en-US';
    
    utterance.onend = () => setIsPlaying(false);
    
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
      {/* Prediction Card */}
      <div className="glass-card">
        <h2 className="section-title">
          <Leaf size={24} />
          {t.predictionTitle}
        </h2>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
          <div>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>{t.detected}</p>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary-dark)', textTransform: 'capitalize' }}>
              {friendlyName}
            </h3>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>{t.confidence}</p>
            <h3 style={{ fontSize: '1.25rem' }}>{prediction.confidence.toFixed(1)}%</h3>
          </div>
        </div>

        <div style={{ marginTop: '1rem', background: '#e2e8f0', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ width: `${prediction.confidence}%`, background: 'var(--color-primary)', height: '100%' }}></div>
        </div>
      </div>

      {/* Voice Assistant Button */}
      <button className="btn-voice" onClick={playVoice}>
        <Volume2 size={20} />
        {isPlaying ? t.stopListen : t.listen}
      </button>
      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 className="section-title" style={{ margin: 0 }}>
            <Stethoscope size={24} />
            {t.description}
          </h2>
          <span className={`severity-badge severity-${severityClass}`}>
            <AlertTriangle size={16} />
            {t.severity}: {recommendation.severity}
          </span>
        </div>
        <p>{recommendation.description}</p>
      </div>

      {/* Symptoms */}
      <div className="glass-card">
        <h2 className="section-title">
          <AlertCircle size={24} />
          {t.symptoms}
        </h2>
        <div>
          {recommendation.symptoms.map((item, idx) => (
            <div key={idx} className="list-item">
              <span className="list-icon">✅</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Organic Treatment */}
      <div className="glass-card">
        <h2 className="section-title">
          <Leaf size={24} style={{ color: 'var(--color-success)' }} />
          {t.organic}
        </h2>
        <div>
          {recommendation.organic_treatment.map((item, idx) => (
            <div key={idx} className="list-item">
              <span className="list-icon">🌱</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chemical Treatment */}
      <div className="glass-card">
        <h2 className="section-title">
          <Pill size={24} style={{ color: 'var(--color-warning)' }} />
          {t.chemical}
        </h2>
        <div>
          {recommendation.chemical_treatment.map((item, idx) => (
            <div key={idx} className="list-item">
              <span className="list-icon">💊</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Prevention */}
      <div className="glass-card">
        <h2 className="section-title">
          <ShieldCheck size={24} style={{ color: 'var(--color-primary-dark)' }} />
          {t.prevention}
        </h2>
        <div>
          {recommendation.prevention.map((item, idx) => (
            <div key={idx} className="list-item">
              <span className="list-icon">🛡️</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
