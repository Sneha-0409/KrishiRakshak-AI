import React, { useState } from 'react';
import CameraCapture from './components/CameraCapture';
import ResultsView from './components/ResultsView';
import SplashScreen from './components/SplashScreen';
import LoginPage from './components/LoginPage';
import HomeDashboard from './components/HomeDashboard';
import SowingGuide from './components/SowingGuide';
import ExplorePage from './components/ExplorePage';
import ProfilePage from './components/ProfilePage';
import { Leaf, RefreshCcw, Home, Compass, User, ArrowLeft } from 'lucide-react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [currentScreen, setCurrentScreen] = useState('splash'); // splash, login, home, scanner, results
  const [exploreTab, setExploreTab] = useState('mandi');
  const [language, setLanguage] = useState('en');
  const [image, setImage] = useState(null);
  const [voiceQuery, setVoiceQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  const handleNavigate = (screen, tab = null) => {
    if (tab) setExploreTab(tab);
    setCurrentScreen(screen);
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

      const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
      const response = await fetch(`${apiUrl}/predict`, {
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

  const handleVoiceQuery = (transcript) => {
    // Simple validation for prototype
    if (transcript.trim().length < 10 || transcript.toLowerCase().includes('hello')) {
      alert(language === 'hi' ? 'क्षमा करें, मुझे समझ नहीं आया। कृपया अपनी फसल की बीमारी या लक्षण के बारे में विस्तार से बताएं।' : "Sorry, I didn't quite catch that. Please describe your crop's disease or symptoms in more detail.");
      return;
    }

    setVoiceQuery(transcript);
    setImage(null);
    setLoading(true);
    setError(null);
    setResult(null);
    setCurrentScreen('results');

    // Mock API response for prototype
    setTimeout(() => {
      setResult({
        prediction: {
          disease: "Potato___Early_blight",
          confidence: 94.5
        },
        recommendation: {
          disease_name: "Potato Early Blight",
          severity: "High",
          description: language === 'hi' ? "आपके विवरण के आधार पर, यह अर्ली ब्लाइट (अगेती झुलसा) लगता है। यह पत्तियों पर काले धब्बे पैदा करने वाली एक आम बीमारी है।" : "Based on your description, this sounds like Early Blight. It is a common fungal disease causing dark spots on leaves.",
          symptoms: [transcript, language === 'hi' ? "पुरानी पत्तियों पर काले घेरे" : "Dark concentric rings on older leaves", language === 'hi' ? "पत्तियों का पीला पड़ना" : "Yellowing of leaves"],
          organic_treatment: [language === 'hi' ? "संक्रमित पत्तियों को हटा दें" : "Remove infected leaves", language === 'hi' ? "कॉपर युक्त फफूंदनाशक का प्रयोग करें" : "Apply copper-based fungicide", language === 'hi' ? "हवा का अच्छा प्रवाह सुनिश्चित करें" : "Ensure good airflow"],
          chemical_treatment: ["Chlorothalonil", "Mancozeb"],
          prevention: [language === 'hi' ? "फसल चक्रण" : "Crop rotation", language === 'hi' ? "ऊपर से पानी देने से बचें" : "Avoid overhead watering", language === 'hi' ? "प्रतिरोधी किस्में लगाएं" : "Plant resistant varieties"]
        }
      });
      setLoading(false);
    }, 2000);
  };

  const resetApp = () => {
    setImage(null);
    setVoiceQuery('');
    setResult(null);
    setError(null);
    setCurrentScreen('scanner');
  };

  const goHome = () => {
    setImage(null);
    setVoiceQuery('');
    setResult(null);
    setError(null);
    setCurrentScreen('home');
  };

  return (
    <div className="app-container">
      
      {currentScreen === 'splash' && (
        <SplashScreen onComplete={() => setCurrentScreen(isLoggedIn ? 'home' : 'login')} />
      )}

      {currentScreen !== 'splash' && (
        <>
          {currentScreen === 'login' && (
            <LoginPage 
              language={language} 
              toggleLanguage={toggleLanguage} 
              onLoginSuccess={(name) => { setUserName(name || (language === 'hi' ? 'किसान' : 'Farmer')); setIsLoggedIn(true); setCurrentScreen('home'); }} 
            />
          )}

          {currentScreen !== 'home' && currentScreen !== 'login' && (
            <header className="app-header">
              <div className="header-left">
                {(currentScreen === 'scanner' || currentScreen === 'results' || currentScreen === 'sowing' || currentScreen === 'explore') && (
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
          )}

          {currentScreen === 'home' && (
            <HomeDashboard language={language} userName={userName} onNavigate={handleNavigate} toggleLanguage={toggleLanguage} />
          )}

          {currentScreen === 'sowing' && (
            <SowingGuide language={language} />
          )}

          {currentScreen === 'explore' && (
            <ExplorePage language={language} initialTab={exploreTab} />
          )}

          {currentScreen === 'profile' && (
            <ProfilePage 
              language={language} 
              userName={userName}
              toggleLanguage={toggleLanguage} 
              onLogout={() => { setIsLoggedIn(false); setUserName(''); setCurrentScreen('login'); }}
            />
          )}

          {(currentScreen === 'scanner' || currentScreen === 'results') && (
            <main className="main-content">
              {currentScreen === 'scanner' && (
                <CameraCapture onImageSelected={handleImageSelect} onVoiceQuery={handleVoiceQuery} language={language} />
              )}
              
              {currentScreen === 'results' && image && (
                <div className="glass-card" style={{ padding: '8px' }}>
                  <img src={image} alt="Crop" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '16px' }} />
                </div>
              )}

              {currentScreen === 'results' && voiceQuery && !image && (
                <div className="glass-card fade-in" style={{ background: '#eff6ff', border: '1px solid #bfdbfe' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ background: '#2563eb', padding: '8px', borderRadius: '50%' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                    </div>
                    <h3 style={{ margin: 0, color: '#1e3a8a' }}>{language === 'hi' ? 'आपकी आवाज क्वेरी' : 'Your Voice Query'}</h3>
                  </div>
                  <p style={{ margin: 0, fontStyle: 'italic', color: '#334155', fontSize: '1.1rem' }}>"{voiceQuery}"</p>
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
          {currentScreen !== 'results' && currentScreen !== 'login' && (
            <nav className="bottom-nav">
              <div className={`nav-item ${currentScreen === 'home' ? 'active' : ''}`} onClick={goHome} style={{ cursor: 'pointer' }}>
                <Home size={24} />
                <span>{language === 'hi' ? 'होम' : 'Home'}</span>
              </div>
              <div className={`nav-item ${currentScreen === 'explore' ? 'active' : ''}`} onClick={() => handleNavigate('explore', 'mandi')} style={{ cursor: 'pointer' }}>
                <Compass size={24} />
                <span>{language === 'hi' ? 'एक्सप्लोर' : 'Explore'}</span>
              </div>
              <div className={`nav-item ${currentScreen === 'profile' ? 'active' : ''}`} onClick={() => handleNavigate('profile')} style={{ cursor: 'pointer' }}>
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
