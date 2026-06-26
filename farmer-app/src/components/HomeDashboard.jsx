import React from 'react';
import { Camera, Sun, CloudRain, Droplets, ThermometerSun, Scan } from 'lucide-react';

export default function HomeDashboard({ language, onNavigate }) {
  const isHindi = language === 'hi';

  const t = {
    greeting: isHindi ? 'नमस्ते, किसान भाई!' : 'Hello, Farmer!',
    weather: isHindi ? 'आज का मौसम' : 'Today\'s Weather',
    sunny: isHindi ? 'धूप' : 'Sunny',
    quickActions: isHindi ? 'त्वरित कार्य' : 'Quick Actions',
    scanCrop: isHindi ? 'फसल की बीमारी स्कैन करें' : 'Scan Crop Disease',
    scanLivestock: isHindi ? 'पशुओं की बीमारी स्कैन करें' : 'Scan Livestock Disease',
    comingSoon: isHindi ? '(जल्द आ रहा है)' : '(Coming Soon)',
    tipsTitle: isHindi ? 'आज के कृषि सुझाव' : 'Farming Tips of the Day',
    tip1: isHindi ? 'गर्मी में अपनी फसलों में नियमित रूप से पानी दें, सुबह का समय सबसे अच्छा है।' : 'Water your crops regularly during summer, early mornings are best.',
    tip2: isHindi ? 'कीटों से बचाव के लिए जैविक कीटनाशकों का प्रयोग करें।' : 'Use organic pesticides to prevent pest infestations.',
  };

  return (
    <div className="main-content" style={{ paddingBottom: '20px' }}>
      
      {/* Weather Widget */}
      <div className="glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>{t.greeting}</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>{t.weather}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Sun size={32} color="#f59e0b" />
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>32°C</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{t.sunny}</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="section-title">{t.quickActions}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <button 
            className="action-card" 
            onClick={() => onNavigate('scanner')}
          >
            <div className="action-card-icon">
              <Scan size={24} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>{t.scanCrop}</div>
              <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>AI Disease Detection</div>
            </div>
          </button>

          <button className="action-card action-card-secondary" style={{ opacity: 0.7, cursor: 'not-allowed' }}>
            <div className="action-card-icon">
              <Camera size={24} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>{t.scanLivestock}</div>
              <div style={{ fontSize: '0.875rem' }}>{t.comingSoon}</div>
            </div>
          </button>

        </div>
      </div>

      {/* Tips Carousel */}
      <div>
        <h3 className="section-title">{t.tipsTitle}</h3>
        <div className="glass-card" style={{ marginBottom: '16px', borderLeft: '4px solid var(--color-primary)' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <Droplets size={20} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <p style={{ fontSize: '0.9rem' }}>{t.tip1}</p>
          </div>
        </div>
        <div className="glass-card" style={{ borderLeft: '4px solid var(--color-accent)' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <ThermometerSun size={20} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <p style={{ fontSize: '0.9rem' }}>{t.tip2}</p>
          </div>
        </div>
      </div>

    </div>
  );
}
