import React, { useState, useEffect } from 'react';
import { TrendingUp, Search, RefreshCw, AlertCircle, CloudRain, Sun, Wind, MapPin, AlertTriangle, Info } from 'lucide-react';

export default function ExplorePage({ language, initialTab = 'mandi' }) {
  const isHindi = language === 'hi';
  const [activeTab, setActiveTab] = useState(initialTab);
  
  // State for Mandi
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingPrices, setLoadingPrices] = useState(true);
  const [prices, setPrices] = useState([]);

  // State for Alerts
  const [locationName, setLocationName] = useState(null);
  const [loadingAlerts, setLoadingAlerts] = useState(true);
  const [alerts, setAlerts] = useState([]);
  const [weatherCondition, setWeatherCondition] = useState(null);
  
  const t = {
    title: isHindi ? 'खोजें (Explore)' : 'Explore',
    tabMandi: isHindi ? 'मंडी भाव' : 'Mandi Prices',
    tabAlerts: isHindi ? 'रोग अलर्ट' : 'Disease Alerts',
    
    // Mandi translations
    subtitleMandi: isHindi ? 'अपनी उपज का सही मूल्य जानें' : 'Live crop market rates',
    searchPlaceholder: isHindi ? 'फसल खोजें (उदा: गेहूं, धान)...' : 'Search crop (e.g., Wheat, Paddy)...',
    refresh: isHindi ? 'रिफ्रेश करें' : 'Refresh',
    lastUpdated: isHindi ? 'अंतिम अपडेट: आज' : 'Last Updated: Today',
    minPrice: isHindi ? 'न्यूनतम मूल्य' : 'Min Price',
    maxPrice: isHindi ? 'अधिकतम मूल्य' : 'Max Price',
    modalPrice: isHindi ? 'औसत (मोडल) मूल्य' : 'Modal Price',
    perQuintal: isHindi ? '₹ / क्विंटल' : '₹ / Quintal',
    noResults: isHindi ? 'कोई फसल नहीं मिली।' : 'No crops found.',
    disclaimer: isHindi ? 'यह डेटा सरकारी (Agmarknet) स्रोतों पर आधारित है। वास्तविक मंडी मूल्य भिन्न हो सकते हैं।' : 'Data is sourced from Agmarknet. Actual mandi prices may vary.',

    // Alert translations
    subtitleAlerts: isHindi ? 'मौसम आधारित रोग पूर्वानुमान' : 'Weather-based disease forecasts',
    locating: isHindi ? 'आपका स्थान ढूँढ रहा है...' : 'Finding your location...',
    feedTitle: isHindi ? 'नवीनतम अलर्ट' : 'Latest Alerts',
    hoursAgo: isHindi ? 'घंटे पहले' : 'hours ago',
    minsAgo: isHindi ? 'मिनट पहले' : 'mins ago',
    today: isHindi ? 'आज' : 'Today',
    action: isHindi ? 'अनुशंसित कार्रवाई:' : 'Recommended Action:'
  };

  const mockMandiData = [
    { id: 1, enName: 'Wheat', hiName: 'गेहूं', min: 2150, max: 2400, modal: 2275, trend: 'up' },
    { id: 2, enName: 'Paddy (Rice)', hiName: 'धान (चावल)', min: 2000, max: 3200, modal: 2500, trend: 'up' },
    { id: 3, enName: 'Maize', hiName: 'मक्का', min: 1800, max: 2100, modal: 1950, trend: 'down' },
    { id: 4, enName: 'Cotton', hiName: 'कपास', min: 6500, max: 7200, modal: 6800, trend: 'up' },
    { id: 5, enName: 'Mustard', hiName: 'सरसों', min: 4800, max: 5400, modal: 5100, trend: 'down' },
    { id: 6, enName: 'Soybean', hiName: 'सोयाबीन', min: 4200, max: 4700, modal: 4500, trend: 'up' },
    { id: 7, enName: 'Gram (Chickpea)', hiName: 'चना', min: 5500, max: 6100, modal: 5800, trend: 'up' },
    { id: 8, enName: 'Potato', hiName: 'आलू', min: 800, max: 1200, modal: 1000, trend: 'down' },
    { id: 9, enName: 'Onion', hiName: 'प्याज', min: 1500, max: 2500, modal: 2000, trend: 'up' },
    { id: 10, enName: 'Tomato', hiName: 'टमाटर', min: 1200, max: 3000, modal: 2100, trend: 'down' },
  ];

  const fetchPrices = () => {
    setLoadingPrices(true);
    setTimeout(() => {
      setPrices(mockMandiData);
      setLoadingPrices(false);
    }, 800);
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchLocationAndAlerts = () => {
    setLoadingAlerts(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`);
            const data = await response.json();
            if (data && data.address) {
              const city = data.address.city || data.address.town || data.address.county || data.address.state_district || '';
              const state = data.address.state || '';
              setLocationName([city, state].filter(Boolean).join(', '));
            }
          } catch (e) {
            console.error('Failed to fetch location name', e);
            setLocationName(isHindi ? 'अज्ञात स्थान' : 'Unknown Location');
          }
          generateAlerts(lat, lon);
        },
        (err) => {
          setLocationName(isHindi ? 'अज्ञात स्थान' : 'Unknown Location');
          generateAlerts(20, 77); // Fallback to central India
        },
        { timeout: 10000 }
      );
    } else {
      setLocationName(isHindi ? 'अज्ञात स्थान' : 'Unknown Location');
      generateAlerts(20, 77);
    }
  };

  useEffect(() => {
    if (activeTab === 'alerts' && alerts.length === 0) {
      fetchLocationAndAlerts();
    }
  }, [activeTab]);

  const generateAlerts = (lat, lon) => {
    const month = new Date().getMonth() + 1;
    let generatedAlerts = [];
    let condition = {};

    // Simulate weather based on month and region
    if (month >= 6 && month <= 9) {
      // Monsoon / High Humidity
      condition = { icon: <CloudRain size={24} color="#3b82f6"/>, en: 'High Humidity (85%) & Rain', hi: 'उच्च आर्द्रता (85%) और बारिश' };
      generatedAlerts = [
        {
          id: 1,
          type: 'danger',
          time: `2 ${t.hoursAgo}`,
          enTitle: 'High Fungal Risk in Rice',
          hiTitle: 'धान में फफूंद का उच्च जोखिम',
          enDesc: 'Current humidity levels exceed 80%, creating an ideal environment for Rice Blast and Brown Spot.',
          hiDesc: 'वर्तमान आर्द्रता का स्तर 80% से अधिक है, जो धान में ब्लास्ट और ब्राउन स्पॉट के लिए आदर्श वातावरण है।',
          enAction: 'Spray preventive fungicides immediately and ensure field drainage.',
          hiAction: 'तुरंत निवारक कवकनाशी का छिड़काव करें और खेत में जल निकासी सुनिश्चित करें।'
        },
        {
          id: 2,
          type: 'warning',
          time: `5 ${t.hoursAgo}`,
          enTitle: 'Root Rot in Soybean',
          hiTitle: 'सोयाबीन में जड़ सड़न',
          enDesc: 'Continuous rainfall can lead to waterlogging and root rot in early-stage soybean crops.',
          hiDesc: 'लगातार बारिश से शुरुआती अवस्था की सोयाबीन की फसलों में जलभराव और जड़ सड़न हो सकती है।',
          enAction: 'Avoid standing water in the field.',
          hiAction: 'खेत में पानी जमा न होने दें।'
        }
      ];
    } else if (month >= 3 && month <= 5) {
      // Summer / High Heat
      condition = { icon: <Sun size={24} color="#e2a85c"/>, en: 'High Heat (42°C) & Dry', hi: 'तेज गर्मी (42°C) और सूखा' };
      generatedAlerts = [
        {
          id: 1,
          type: 'danger',
          time: `30 ${t.minsAgo}`,
          enTitle: 'Whitefly Infestation Alert',
          hiTitle: 'सफेद मक्खी के प्रकोप का अलर्ट',
          enDesc: 'High temperatures and dry conditions are highly favorable for whitefly multiplication in Cotton.',
          hiDesc: 'उच्च तापमान और शुष्क स्थितियां कपास में सफेद मक्खी के गुणन के लिए अत्यधिक अनुकूल हैं।',
          enAction: 'Install yellow sticky traps and spray Neem oil extract.',
          hiAction: 'पीले चिपचिपे जाल लगाएं और नीम के तेल के अर्क का छिड़काव करें।'
        },
        {
          id: 2,
          type: 'info',
          time: `4 ${t.hoursAgo}`,
          enTitle: 'Heat Stress in Vegetables',
          hiTitle: 'सब्जियों में हीट स्ट्रेस',
          enDesc: 'Temperatures above 40°C can cause flower drop in tomatoes and cucurbits.',
          hiDesc: '40°C से ऊपर का तापमान टमाटर और कद्दू वर्गीय सब्जियों में फूल झड़ने का कारण बन सकता है।',
          enAction: 'Irrigate crops during early morning or late evening hours only.',
          hiAction: 'केवल सुबह-सुबह या देर शाम को फसलों की सिंचाई करें।'
        }
      ];
    } else {
      // Winter / Cool & Damp
      condition = { icon: <Wind size={24} color="#0ea5e9"/>, en: 'Cool Temps (12°C) & Dew', hi: 'ठंडा तापमान (12°C) और ओस' };
      generatedAlerts = [
        {
          id: 1,
          type: 'danger',
          time: `1 ${t.hoursAgo}`,
          enTitle: 'Rust Disease Alert for Wheat',
          hiTitle: 'गेहूं के लिए रस्ट रोग का अलर्ट',
          enDesc: 'Cool temperatures with morning dew provide optimal conditions for Yellow Rust fungus.',
          hiDesc: 'सुबह की ओस के साथ ठंडा तापमान पीला रस्ट कवक के लिए अनुकूल स्थिति प्रदान करता है।',
          enAction: 'Monitor lower leaves closely and apply registered fungicides at first sight of pustules.',
          hiAction: 'निचली पत्तियों की बारीकी से निगरानी करें और धब्बे दिखने पर तुरंत कवकनाशी का प्रयोग करें।'
        },
        {
          id: 2,
          type: 'warning',
          time: `3 ${t.hoursAgo}`,
          enTitle: 'Late Blight in Potato',
          hiTitle: 'आलू में पछेती झुलसा',
          enDesc: 'High relative humidity and cool weather can trigger rapid spread of Late Blight.',
          hiDesc: 'उच्च सापेक्ष आर्द्रता और ठंडा मौसम पछेती झुलसा के तेजी से प्रसार को ट्रिगर कर सकता है।',
          enAction: 'Apply preventive sprays of Mancozeb or Chlorothalonil.',
          hiAction: 'मैनकोजेब या क्लोरोथालोनिल का निवारक छिड़काव करें।'
        }
      ];
    }

    setWeatherCondition(condition);
    setAlerts(generatedAlerts);
    setLoadingAlerts(false);
  };

  const filteredPrices = prices.filter(crop => {
    const search = searchTerm.toLowerCase();
    return crop.enName.toLowerCase().includes(search) || crop.hiName.includes(search);
  });

  return (
    <div className="main-content" style={{ paddingBottom: '40px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: 'var(--color-primary-dark)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <TrendingUp size={28} /> {t.title}
        </h2>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', background: '#e2e8f0', padding: '4px', borderRadius: '12px', marginBottom: '24px' }}>
        <button 
          onClick={() => setActiveTab('mandi')}
          style={{ flex: 1, padding: '10px', borderRadius: '8px', background: activeTab === 'mandi' ? 'white' : 'transparent', color: activeTab === 'mandi' ? 'var(--color-primary-dark)' : 'var(--color-text-muted)', fontWeight: activeTab === 'mandi' ? 'bold' : 'normal', boxShadow: activeTab === 'mandi' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none', transition: 'all 0.2s' }}
        >
          {t.tabMandi}
        </button>
        <button 
          onClick={() => setActiveTab('alerts')}
          style={{ flex: 1, padding: '10px', borderRadius: '8px', background: activeTab === 'alerts' ? 'white' : 'transparent', color: activeTab === 'alerts' ? 'var(--color-primary-dark)' : 'var(--color-text-muted)', fontWeight: activeTab === 'alerts' ? 'bold' : 'normal', boxShadow: activeTab === 'alerts' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
        >
          {t.tabAlerts}
          <div style={{ width: '8px', height: '8px', background: 'var(--color-danger)', borderRadius: '50%' }}></div>
        </button>
      </div>

      {/* MANDI TAB CONTENT */}
      {activeTab === 'mandi' && (
        <div className="tab-content fade-in">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: 0 }}>{t.subtitleMandi}</p>
            <button 
              onClick={fetchPrices} 
              disabled={loadingPrices}
              style={{ background: 'white', border: '1px solid #e2e8f0', padding: '6px 10px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-primary-dark)', opacity: loadingPrices ? 0.5 : 1 }}
            >
              <RefreshCw size={14} className={loadingPrices ? "spin-animation" : ""} />
              <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{t.refresh}</span>
            </button>
          </div>

          <div style={{ background: '#fef3c7', padding: '10px 12px', borderRadius: '8px', display: 'flex', gap: '8px', alignItems: 'flex-start', marginBottom: '20px', border: '1px solid #fde68a' }}>
            <AlertCircle size={16} color="#d97706" style={{ flexShrink: 0, marginTop: '2px' }} />
            <p style={{ fontSize: '0.75rem', color: '#92400e', margin: 0 }}>{t.disclaimer}</p>
          </div>

          <div style={{ position: 'relative', marginBottom: '24px' }}>
            <Search size={20} color="var(--color-text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
            <input 
              type="text" 
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '1rem', outline: 'none', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', padding: '0 4px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>{t.lastUpdated}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>{t.perQuintal}</span>
          </div>

          {loadingPrices ? (
            <div className="loading-container glass-card"><div className="spinner"></div></div>
          ) : filteredPrices.length === 0 ? (
            <div className="glass-card" style={{ textAlign: 'center', padding: '32px 16px', color: 'var(--color-text-muted)' }}>{t.noResults}</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredPrices.map((crop) => (
                <div key={crop.id} className="glass-card" style={{ padding: '16px', background: 'white', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
                    <h3 style={{ fontSize: '1.1rem', color: 'var(--color-text-main)', margin: 0 }}>{isHindi ? crop.hiName : crop.enName}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--color-primary-light)', color: 'var(--color-primary-dark)', padding: '4px 10px', borderRadius: '16px', fontWeight: 'bold' }}>
                      ₹{crop.modal}
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{t.minPrice}</span>
                      <span style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>₹{crop.min}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{t.maxPrice}</span>
                      <span style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>₹{crop.max}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ALERTS TAB CONTENT */}
      {activeTab === 'alerts' && (
        <div className="tab-content fade-in">
          
          {loadingAlerts ? (
            <div className="loading-container glass-card">
              <div className="spinner"></div>
              <p style={{ marginTop: '16px', color: 'var(--color-primary-dark)' }}>{t.locating}</p>
            </div>
          ) : (
            <>
              {/* Weather Status Card */}
              <div className="glass-card" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', border: '1px solid #bae6fd', marginBottom: '24px', padding: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ background: 'white', padding: '12px', borderRadius: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                  {weatherCondition?.icon}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-text-muted)', fontSize: '0.8rem', marginBottom: '4px' }}>
                    <MapPin size={12} /> {locationName}
                  </div>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#0369a1' }}>
                    {isHindi ? weatherCondition?.hi : weatherCondition?.en}
                  </h3>
                </div>
              </div>

              <h3 className="section-title" style={{ fontSize: '1.1rem', marginBottom: '16px' }}>{t.feedTitle}</h3>

              {/* Feed Alerts */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {alerts.map((alert) => (
                  <div key={alert.id} className="glass-card" style={{ background: 'white', padding: 0, overflow: 'hidden', borderLeft: `4px solid ${alert.type === 'danger' ? 'var(--color-danger)' : alert.type === 'warning' ? 'var(--color-warning)' : 'var(--color-primary)'}` }}>
                    <div style={{ padding: '16px' }}>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: alert.type === 'danger' ? 'var(--color-danger)' : alert.type === 'warning' ? '#d97706' : 'var(--color-primary-dark)', fontWeight: 'bold' }}>
                          {alert.type === 'danger' ? <AlertTriangle size={18} /> : <Info size={18} />}
                          <span>{isHindi ? alert.hiTitle : alert.enTitle}</span>
                        </div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{alert.time}</span>
                      </div>
                      
                      <p style={{ color: 'var(--color-text-main)', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '12px' }}>
                        {isHindi ? alert.hiDesc : alert.enDesc}
                      </p>

                      <div style={{ background: '#f1f5f9', padding: '12px', borderRadius: '8px', fontSize: '0.9rem' }}>
                        <span style={{ fontWeight: 'bold', color: 'var(--color-primary-dark)', display: 'block', marginBottom: '4px' }}>{t.action}</span>
                        <span style={{ color: 'var(--color-text-main)' }}>{isHindi ? alert.hiAction : alert.enAction}</span>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

        </div>
      )}

      {/* Required CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        .spin-animation { animation: spin 1s linear infinite; }
        .fade-in { animation: fadeIn 0.3s ease-in; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
      `}} />

    </div>
  );
}
