import React, { useState, useEffect } from 'react';
import { Camera, Sun, Scan, Sprout, ChevronRight, FlaskConical, ClipboardList, TrendingUp } from 'lucide-react';

export default function HomeDashboard({ language, onNavigate, toggleLanguage }) {
  const isHindi = language === 'hi';
  const [locationName, setLocationName] = useState('Singrauli');

  const t = {
    greeting: isHindi ? 'सुप्रभात,' : 'Good morning,',
    name: isHindi ? 'रमेश जी 👋' : 'Ramesh ji 👋',
    alert: isHindi ? 'सिंगरौली के पास 1 रोग अलर्ट' : '1 disease alert near Singrauli',
    aiPowered: isHindi ? 'AI संचालित' : 'AI POWERED',
    scanCropTitle: isHindi ? 'फसल रोग तुरंत स्कैन करें' : 'Scan Crop Disease Instantly',
    scanCropDesc: isHindi ? 'प्रभावित पत्ते या तने पर अपना कैमरा पॉइंट करें' : 'Point your camera at the affected leaf or stem',
    riceBlast: isHindi ? 'राइस ब्लास्ट अलर्ट — सिंगरौली' : 'Rice Blast Alert — Singrauli',
    riceBlastDesc: isHindi ? '14 किसानों ने 3 किमी के दायरे में इसकी सूचना दी है • 2 घंटे पहले' : '14 farmers reported this in 3km radius • 2 hrs ago',
    quickActions: isHindi ? 'त्वरित कार्य' : 'Quick Actions',
    sowNow: isHindi ? 'अब क्या बोएं' : 'What to Sow Now',
    sowDesc: isHindi ? 'खरीफ सीजन के सुझाव' : 'Kharif season tips',
    mandi: isHindi ? 'मंडी भाव' : 'Mandi Prices',
    marketRates: isHindi ? 'लाइव बाजार भाव' : 'Live market rates',
    fertCalc: isHindi ? 'उर्वरक कैलकुलेटर' : 'Fertilizer Calc',
    npkField: isHindi ? 'आपके खेत के लिए NPK' : 'NPK for your field',
    myReports: isHindi ? 'मेरी रिपोर्ट' : 'My Reports',
    pastDiag: isHindi ? '7 पिछले निदान' : '7 past diagnoses',
    farmingTips: isHindi ? 'कृषि सुझाव' : 'Farming Tips',
    more: isHindi ? 'और देखें →' : 'More →',
    tipCategory: isHindi ? 'मानसून • सिंचाई' : 'MONSOON • IRRIGATION',
    tipText: isHindi ? 'वाष्पीकरण और फंगल जोखिम को कम करने के लिए सुबह जल्दी पानी दें।' : 'Water early morning to reduce evaporation and fungal risk',
  };

  const handleComingSoon = () => {
    alert(isHindi ? 'यह सुविधा जल्द आ रही है!' : 'This feature is coming soon!');
  };

  useEffect(() => {
    // Attempt to get location to replace Singrauli if possible
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`);
            const data = await response.json();
            if (data && data.address) {
              const city = data.address.city || data.address.town || data.address.county || data.address.state_district || 'Singrauli';
              setLocationName(city);
            }
          } catch (e) {
            console.error('Failed to fetch location name', e);
          }
        },
        (err) => {
          console.log(err);
        },
        { timeout: 5000 }
      );
    }
  }, []);

  const alertText = isHindi ? `${locationName} के पास 1 रोग अलर्ट` : `1 disease alert near ${locationName}`;
  const riceBlastTitle = isHindi ? `राइस ब्लास्ट अलर्ट — ${locationName}` : `Rice Blast Alert — ${locationName}`;

  return (
    <div style={{ paddingBottom: '20px', background: 'var(--color-background)', flex: 1, minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>

      {/* Dark Green Top Section */}
      <div style={{
        background: '#2b5329',
        padding: '24px 20px 12px 20px',
        paddingTop: '32px',
        color: 'white',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Top Header Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px', height: '40px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <img src="/logo.png" alt="Logo" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
            </div>
            <span style={{ fontWeight: 700, fontSize: '1.2rem' }}>KrishiRakshak AI</span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{
              background: 'rgba(255,255,255,0.15)',
              padding: '6px 12px',
              borderRadius: '20px',
              display: 'flex', alignItems: 'center', gap: '6px',
              fontSize: '0.85rem',
              fontWeight: 600,
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <Sun size={14} color="#fcd34d" /> 32°C
            </div>
            <button
              onClick={toggleLanguage}
              style={{
                background: 'rgba(255,255,255,0.15)',
                color: 'white',
                padding: '6px 16px',
                borderRadius: '20px',
                fontSize: '0.85rem',
                border: '1px solid rgba(255,255,255,0.2)'
              }}
            >
              {language === 'en' ? 'हिंदी' : 'English'}
            </button>
          </div>
        </div>

        {/* Separator Line */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.15)', width: '100%', marginBottom: '16px' }} />

        {/* Greeting Area */}
        <div style={{ marginBottom: '0px' }}>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', margin: '0 0 4px 0' }}>{t.greeting}</p>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {t.name}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>
            <div style={{ width: '8px', height: '8px', background: '#fcd34d', borderRadius: '50%' }}></div>
            {alertText}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ padding: '0 20px', marginTop: '20px', zIndex: 2, position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* Scanner Card */}
        <div
          onClick={() => onNavigate('scanner')}
          style={{
            background: 'linear-gradient(135deg, #448942 0%, #30672e 100%)',
            borderRadius: '20px',
            padding: '16px',
            color: 'white',
            boxShadow: '0 10px 25px rgba(43, 83, 41, 0.3)',
            position: 'relative',
            overflow: 'hidden',
            cursor: 'pointer'
          }}
        >
          {/* AI Pill */}
          <div style={{
            background: 'rgba(255,255,255,0.2)',
            padding: '4px 12px',
            borderRadius: '20px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.5px',
            marginBottom: '16px',
            border: '1px solid rgba(255,255,255,0.3)'
          }}>
            <div style={{ width: '6px', height: '6px', background: '#4ade80', borderRadius: '50%' }}></div>
            {t.aiPowered}
          </div>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, lineHeight: 1.1, margin: '0 0 8px 0', maxWidth: '75%', position: 'relative', zIndex: 2 }}>
            {t.scanCropTitle}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem', margin: '0 0 16px 0', maxWidth: '75%', position: 'relative', zIndex: 2 }}>
            {t.scanCropDesc}
          </p>

          <button style={{
            background: 'rgba(0,0,0,0.2)',
            border: '1px solid rgba(255,255,255,0.1)',
            padding: '8px 16px',
            borderRadius: '10px',
            color: 'white',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(10px)',
            position: 'relative',
            zIndex: 2,
            marginBottom: '10px'
          }}>
            <Camera size={20} />
          </button>

          {/* Scanner Reticle Graphics */}
          <div style={{ position: 'absolute', right: '16px', bottom: '16px', width: '100px', height: '100px', zIndex: 1 }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '24px', height: '24px', borderTop: '3px solid white', borderLeft: '3px solid white' }}></div>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '24px', height: '24px', borderTop: '3px solid white', borderRight: '3px solid white' }}></div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '24px', height: '24px', borderBottom: '3px solid white', borderLeft: '3px solid white' }}></div>
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '24px', height: '24px', borderBottom: '3px solid white', borderRight: '3px solid white' }}></div>

            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '24px', height: '24px', border: '3px solid white', borderRadius: '50%' }}>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '8px', height: '8px', background: 'white', borderRadius: '50%' }}></div>
            </div>

            {/* Continuous Scan Line Animation */}
            <div className="scan-line" style={{ position: 'absolute', top: 0, left: '10%', width: '80%', height: '2px', background: 'white', boxShadow: '0 0 8px 2px rgba(255,255,255,0.8)' }}></div>

            <Sprout size={32} color="rgba(255,255,255,0.4)" style={{ position: 'absolute', bottom: '10px', right: '10px', transform: 'rotate(15deg)' }} />
          </div>
        </div>

        {/* Alert Card */}
        <div
          onClick={() => onNavigate('explore')}
          style={{
            background: 'linear-gradient(135deg, #a52323 0%, #8b1c1c 100%)',
            borderRadius: '20px',
            padding: '20px',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            boxShadow: '0 4px 15px rgba(165, 35, 35, 0.2)',
            cursor: 'pointer'
          }}
        >
          <div style={{
            width: '48px', height: '48px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0
          }}>
            <div style={{ width: '24px', height: '24px', background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5253 100%)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
              <div style={{ width: '8px', height: '8px', background: 'white', borderRadius: '50%', clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}></div>
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', fontWeight: 700 }}>
              {riceBlastTitle}
            </h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)' }}>
              {t.riceBlastDesc}
            </p>
          </div>

          <ChevronRight color="rgba(255,255,255,0.7)" />
        </div>

        {/* Quick Actions Header */}
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '12px 0 4px 0', color: 'var(--color-text-main)' }}>
          {t.quickActions}
        </h3>

        {/* 2x2 Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '4px' }}>

          {/* What to Sow Now (Green) */}
          <div 
            onClick={() => onNavigate('sowing')}
            style={{ background: '#e8f5e9', borderRadius: '16px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}
          >
            <div style={{ width: '32px', height: '32px', background: '#c8e6c9', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sprout size={16} color="#2e7d32" />
            </div>
            <div>
              <h4 style={{ margin: '0 0 2px 0', fontSize: '0.9rem', fontWeight: 700, color: '#1b5e20' }}>{t.sowNow}</h4>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#4caf50', fontWeight: 500 }}>{t.sowDesc}</p>
            </div>
          </div>

          {/* Mandi Prices (Yellow) */}
          <div 
            onClick={handleComingSoon}
            style={{ background: '#fff8e1', borderRadius: '16px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', position: 'relative' }}
          >
            <div style={{ position: 'absolute', top: 12, right: 12, width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }} />
            <div style={{ width: '32px', height: '32px', background: '#ffecb3', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={16} color="#e65100" />
            </div>
            <div>
              <h4 style={{ margin: '0 0 2px 0', fontSize: '0.9rem', fontWeight: 700, color: '#e65100' }}>{t.mandi}</h4>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#f57c00', fontWeight: 500 }}>{t.marketRates}</p>
            </div>
          </div>

          {/* Fertilizer Calc (Blue) */}
          <div
            onClick={handleComingSoon}
            style={{ background: '#e1f5fe', borderRadius: '16px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}
          >
            <div style={{ width: '32px', height: '32px', background: '#b3e5fc', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FlaskConical size={16} color="#0277bd" />
            </div>
            <div>
              <h4 style={{ margin: '0 0 2px 0', fontSize: '0.9rem', fontWeight: 700, color: '#01579b' }}>{t.fertCalc}</h4>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#0288d1', fontWeight: 500 }}>{t.npkField}</p>
            </div>
          </div>

          {/* My Reports (Gray/White) */}
          <div
            onClick={handleComingSoon}
            style={{ background: '#ffffff', borderRadius: '16px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}
          >
            <div style={{ width: '32px', height: '32px', background: '#f1f5f9', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ClipboardList size={16} color="#475569" />
            </div>
            <div>
              <h4 style={{ margin: '0 0 2px 0', fontSize: '0.9rem', fontWeight: 700, color: '#334155' }}>{t.myReports}</h4>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500 }}>{t.pastDiag}</p>
            </div>
          </div>

        </div>

        {/* Farming Tips Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '8px 0 0px 0' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: 'var(--color-text-main)' }}>
            {t.farmingTips}
          </h3>
          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#2e7d32', cursor: 'pointer' }}>
            {t.more}
          </span>
        </div>

        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '12px 16px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', marginBottom: '0px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            <span style={{ fontSize: '16px' }}>💧</span>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#388e3c', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              {t.tipCategory}
            </span>
          </div>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-main)', fontWeight: 500, lineHeight: 1.3 }}>
            {t.tipText}
          </p>
        </div>

      </div>
    </div>
  );
}
