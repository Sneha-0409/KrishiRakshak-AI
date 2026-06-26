import React, { useState, useEffect } from 'react';
import { MapPin, Sprout, CloudRain, Sun, Snowflake, Wheat } from 'lucide-react';
import CropDetailModal from './CropDetailModal';

export default function SowingGuide({ language }) {
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [error, setError] = useState(null);
  const [seasonInfo, setSeasonInfo] = useState(null);
  const [selectedCrop, setSelectedCrop] = useState(null);

  const isHindi = language === 'hi';

  const t = {
    title: isHindi ? 'बुवाई गाइड' : 'Sowing Guide',
    locating: isHindi ? 'आपका स्थान ढूँढ रहा है...' : 'Finding your location...',
    locError: isHindi ? 'स्थान प्राप्त करने में विफल। कृपया अनुमति जांचें।' : 'Failed to get location. Please check permissions.',
    season: isHindi ? 'वर्तमान मौसम:' : 'Current Season:',
    sowNow: isHindi ? 'अब क्या बोएं:' : 'What to Sow Now:',
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setLocation({ lat, lon });
          calculateSeason(lat, lon);
          fetchLocationName(lat, lon);
        },
        (err) => {
          setError(t.locError);
          // Fallback to default Northern Hemisphere
          calculateSeason(20, 77); 
        },
        { timeout: 10000 }
      );
    } else {
      setError(t.locError);
      calculateSeason(20, 77);
    }
  }, []);

  const fetchLocationName = async (lat, lon) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`);
      const data = await response.json();
      if (data && data.address) {
        const city = data.address.city || data.address.town || data.address.county || data.address.state_district || '';
        const state = data.address.state || '';
        const name = [city, state].filter(Boolean).join(', ');
        setLocationName(name);
      }
    } catch (e) {
      console.error('Failed to fetch location name', e);
    }
  };

  const calculateSeason = (lat, lon) => {
    const month = new Date().getMonth() + 1; // 1-12
    let info = {};

    // Check if in Indian Subcontinent roughly
    const isIndia = (lat >= 8 && lat <= 37 && lon >= 68 && lon <= 97);

    if (isIndia) {
      if (month >= 6 && month <= 10) {
        info = {
          name: isHindi ? 'खरीफ (मानसून)' : 'Kharif (Monsoon)',
          icon: <CloudRain size={32} color="#3b82f6" />,
          desc: isHindi ? 'बारिश का मौसम शुरू हो गया है। इन फसलों को बहुत पानी की आवश्यकता होती है।' : 'The rainy season has started. These crops require plenty of water.',
          crops: [
            { name: isHindi ? 'चावल (धान)' : 'Rice (Paddy)', icon: '🌾' },
            { name: isHindi ? 'मक्का' : 'Maize', icon: '🌽' },
            { name: isHindi ? 'कपास' : 'Cotton', icon: '☁' },
            { name: isHindi ? 'सोयाबीन' : 'Soybean', icon: '🌱' },
          ]
        };
      } else if (month >= 11 || month <= 3) {
        info = {
          name: isHindi ? 'रबी (सर्दी)' : 'Rabi (Winter)',
          icon: <Snowflake size={32} color="#0ea5e9" />,
          desc: isHindi ? 'सर्दियों का मौसम आ गया है। ठंडे मौसम वाली फसलें बोएं।' : 'Winter has arrived. Sow crops that thrive in cool weather.',
          crops: [
            { name: isHindi ? 'गेहूं' : 'Wheat', icon: '🌾' },
            { name: isHindi ? 'सरसों' : 'Mustard', icon: '🌼' },
            { name: isHindi ? 'चना' : 'Gram / Chickpea', icon: '🥜' },
            { name: isHindi ? 'मटर' : 'Peas', icon: '🫛' },
          ]
        };
      } else {
        info = {
          name: isHindi ? 'ज़ैद (गर्मी)' : 'Zaid (Summer)',
          icon: <Sun size={32} color="#e2a85c" />,
          desc: isHindi ? 'गर्मियों का मौसम है। जल्दी पकने वाली फसलें बोएं।' : 'It is summer. Sow quick-maturing crops.',
          crops: [
            { name: isHindi ? 'तरबूज' : 'Watermelon', icon: '🍉' },
            { name: isHindi ? 'खीरा' : 'Cucumber', icon: '🥒' },
            { name: isHindi ? 'करेला' : 'Bitter Gourd', icon: '🌿' },
          ]
        };
      }
    } else {
      // General Hemisphere logic
      const isNorthern = lat >= 0;
      let seasonName = '';
      if (month >= 3 && month <= 5) seasonName = isNorthern ? (isHindi ? 'वसंत' : 'Spring') : (isHindi ? 'पतझड़' : 'Autumn');
      else if (month >= 6 && month <= 8) seasonName = isNorthern ? (isHindi ? 'गर्मी' : 'Summer') : (isHindi ? 'सर्दी' : 'Winter');
      else if (month >= 9 && month <= 11) seasonName = isNorthern ? (isHindi ? 'पतझड़' : 'Autumn') : (isHindi ? 'वसंत' : 'Spring');
      else seasonName = isNorthern ? (isHindi ? 'सर्दी' : 'Winter') : (isHindi ? 'गर्मी' : 'Summer');

      info = {
        name: seasonName,
        icon: <Sprout size={32} color="var(--color-primary)" />,
        desc: isHindi ? 'आपके क्षेत्र के लिए अनुशंसित फसलें:' : 'Recommended crops for your region:',
        crops: [
          { name: isHindi ? 'सब्जियां' : 'Vegetables', icon: '🥕' },
          { name: isHindi ? 'फल' : 'Fruits', icon: '🍎' },
          { name: isHindi ? 'अनाज' : 'Grains', icon: '🌾' },
        ]
      };
    }
    
    setSeasonInfo(info);
  };

  return (
    <div className="main-content" style={{ paddingBottom: '40px' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: 'var(--color-primary-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <Wheat size={28} /> {t.title}
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
          <MapPin size={14} style={{ display: 'inline', verticalAlign: 'text-bottom' }} /> 
          {locationName 
            ? ` ${locationName}` 
            : (location ? (isHindi ? ' स्थान का पता लगा' : ' Location detected') : t.locating)}
        </p>
      </div>

      {!seasonInfo ? (
        <div className="loading-container glass-card">
          <div className="spinner"></div>
          <p style={{ fontWeight: 500, color: 'var(--color-primary-dark)' }}>{t.locating}</p>
          {error && <p style={{ color: '#b91c1c', fontSize: '0.8rem' }}>{error}</p>}
        </div>
      ) : (
        <>
          <div className="glass-card" style={{ textAlign: 'center', marginBottom: '24px', background: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
              {seasonInfo.icon}
            </div>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--color-primary-dark)', marginBottom: '8px' }}>
              {seasonInfo.name}
            </h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
              {seasonInfo.desc}
            </p>
          </div>

          <h3 className="section-title" style={{ fontSize: '1.1rem' }}>{t.sowNow}</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {seasonInfo.crops.map((crop, idx) => (
              <div 
                key={idx} 
                className="glass-card" 
                onClick={() => setSelectedCrop(crop.name)}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '20px 12px', cursor: 'pointer' }}
              >
                <div style={{ fontSize: '2.5rem' }}>{crop.icon}</div>
                <div style={{ fontWeight: 'bold', fontSize: '1rem', textAlign: 'center', color: 'var(--color-text-main)' }}>
                  {crop.name}
                </div>
              </div>
            ))}
          </div>

          {selectedCrop && (
            <CropDetailModal 
              cropName={selectedCrop} 
              language={language} 
              onClose={() => setSelectedCrop(null)} 
            />
          )}
        </>
      )}
    </div>
  );
}
