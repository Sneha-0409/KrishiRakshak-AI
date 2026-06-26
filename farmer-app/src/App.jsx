import React, { useState } from 'react';
import CameraCapture from './components/CameraCapture';
import ResultsView from './components/ResultsView';
import SplashScreen from './components/SplashScreen';
import HomeDashboard from './components/HomeDashboard';
import { Leaf, RefreshCcw, Home, Compass, User, ArrowLeft } from 'lucide-react';

function App() {
  const [currentScreen, setCurrentScreen] = useState('splash'); // splash, home, scanner, results
  const [language, setLanguage] = useState('en');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  const handleImageSelect = async (file) => {
    setImage(URL.createObjectURL(file));
    setLoading(true);
    setError(null);
    setResult(null);
    setCurrentScreen('results');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('language', language);

      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to get prediction');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(language === 'hi' ? 'छवि का विश्लेषण करने में विफल। कृपया पुनः प्रयास करें।' : 'Failed to analyze the image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetApp = () => {
    setImage(null);
    setResult(null);
    setError(null);
    setCurrentScreen('scanner');
  };

  const goHome = () => {
    setImage(null);
    setResult(null);
    setError(null);
    setCurrentScreen('home');
  };

  return (
    <div className="app-container">
      
      {currentScreen === 'splash' && (
        <SplashScreen onComplete={() => setCurrentScreen('home')} />
      )}

      {currentScreen !== 'splash' && (
        <>
          <header className="app-header">
            <div className="header-left">
              {(currentScreen === 'scanner' || currentScreen === 'results') && (
                <button className="back-button" onClick={goHome}>
                  <ArrowLeft size={24} />
                </button>
              )}
              <div className="header-title">
                <img src="/logo.png" alt="Logo" style={{ width: 44, height: 44, objectFit: 'contain', borderRadius: '50%', background: 'white', padding: '4px' }} />
                <span style={{ fontWeight: 700 }}>KrishiRakshak AI</span>
              </div>
            </div>
            <button onClick={toggleLanguage} className="lang-toggle">
              {language === 'en' ? 'हिंदी' : 'English'}
            </button>
          </header>

          {currentScreen === 'home' && (
            <HomeDashboard language={language} onNavigate={setCurrentScreen} />
          )}

          {(currentScreen === 'scanner' || currentScreen === 'results') && (
            <main className="main-content">
              {currentScreen === 'scanner' && (
                <CameraCapture onImageSelected={handleImageSelect} language={language} />
              )}
              
              {currentScreen === 'results' && image && (
                <div className="glass-card" style={{ padding: '8px' }}>
                  <img src={image} alt="Captured leaf" className="image-preview" />
                </div>
              )}

              {loading && (
                <div className="loading-container glass-card">
                  <div className="spinner"></div>
                  <p style={{ fontWeight: 500, color: 'var(--color-primary-dark)' }}>
                    {language === 'hi' ? 'AI विश्लेषण कर रहा है...' : 'AI is analyzing...'}
                  </p>
                </div>
              )}

              {error && (
                <div className="glass-card" style={{ background: '#fee2e2', color: '#b91c1c', border: '1px solid #f87171' }}>
                  {error}
                </div>
              )}

              {result && !loading && (
                <ResultsView result={result} language={language} />
              )}

              {currentScreen === 'results' && !loading && (
                <button onClick={resetApp} className="btn-outline" style={{ marginTop: 'auto' }}>
                  <RefreshCcw size={20} />
                  {language === 'hi' ? 'दूसरी तस्वीर लें' : 'Take Another Photo'}
                </button>
              )}
            </main>
          )}

          {/* Bottom Navigation */}
          {currentScreen !== 'results' && (
            <nav className="bottom-nav">
              <div className={`nav-item ${currentScreen === 'home' ? 'active' : ''}`} onClick={goHome} style={{ cursor: 'pointer' }}>
                <Home size={24} />
                <span>{language === 'hi' ? 'होम' : 'Home'}</span>
              </div>
              <div className="nav-item" style={{ cursor: 'pointer', opacity: 0.5 }}>
                <Compass size={24} />
                <span>{language === 'hi' ? 'खोजें' : 'Explore'}</span>
              </div>
              <div className="nav-item" style={{ cursor: 'pointer', opacity: 0.5 }}>
                <User size={24} />
                <span>{language === 'hi' ? 'प्रोफ़ाइल' : 'Profile'}</span>
              </div>
            </nav>
          )}
        </>
      )}
    </div>
  );
}

export default App;
