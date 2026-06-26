import React from 'react';
import { User, Settings, Phone, MapPin, Sprout, Globe, Bell, ChevronRight, LogOut, Info } from 'lucide-react';

export default function ProfilePage({ language, userName, toggleLanguage, onLogout }) {
  const isHindi = language === 'hi';

  const t = {
    title: isHindi ? 'प्रोफ़ाइल' : 'Profile',
    name: userName || (isHindi ? 'रमेश जी' : 'Ramesh ji'),
    phone: '+91 98765 43210',
    location: isHindi ? 'सिंगरौली, मध्य प्रदेश' : 'Singrauli, Madhya Pradesh',
    
    farmDetails: isHindi ? 'खेत का विवरण' : 'Farm Details',
    farmSizeTitle: isHindi ? 'कुल आकार' : 'Total Size',
    farmSizeVal: isHindi ? '5 एकड़' : '5 Acres',
    primaryCropsTitle: isHindi ? 'मुख्य फसलें' : 'Primary Crops',
    primaryCropsVal: isHindi ? 'गेहूं, आलू, धान' : 'Wheat, Potato, Paddy',
    soilTypeTitle: isHindi ? 'मिट्टी का प्रकार' : 'Soil Type',
    soilTypeVal: isHindi ? 'काली मिट्टी' : 'Black Soil',
    
    appSettings: isHindi ? 'ऐप सेटिंग्स' : 'App Settings',
    languageText: isHindi ? 'भाषा (Language)' : 'Language',
    languageCurrent: isHindi ? 'हिंदी' : 'English',
    notificationsText: isHindi ? 'सूचनाएं (Notifications)' : 'Notifications',
    notificationsCurrent: isHindi ? 'चालू' : 'On',
    
    helpSupport: isHindi ? 'सहायता और संपर्क' : 'Help & Support',
    kisanCenter: isHindi ? 'किसान कॉल सेंटर (1551)' : 'Kisan Call Center (1551)',
    kisanDesc: isHindi ? 'कृषि विशेषज्ञों से बात करें' : 'Talk to agriculture experts',
    aboutApp: isHindi ? 'ऐप के बारे में' : 'About App',
    version: 'v1.0.0',
    
    logout: isHindi ? 'लॉग आउट' : 'Log Out',
    comingSoon: isHindi ? 'यह सुविधा जल्द आ रही है!' : 'This feature is coming soon!'
  };

  const handleComingSoon = () => {
    alert(t.comingSoon);
  };

  return (
    <div className="main-content" style={{ paddingBottom: '40px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ color: 'var(--color-primary-dark)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <User size={28} /> {t.title}
        </h2>
      </div>

      {/* User Info Card */}
      <div className="glass-card fade-in" style={{ padding: '24px', background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)', color: 'white', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '2px solid rgba(255,255,255,0.5)' }}>
          <User size={32} color="var(--color-primary-dark)" />
        </div>
        <div>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '1.4rem', fontWeight: 800 }}>{t.name}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.9)', marginBottom: '2px' }}>
            <Phone size={14} /> {t.phone}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.9)' }}>
            <MapPin size={14} /> {t.location}
          </div>
        </div>
      </div>

      {/* Farm Details */}
      <h3 className="section-title" style={{ fontSize: '1.1rem', marginBottom: '12px' }}>{t.farmDetails}</h3>
      <div className="glass-card fade-in" style={{ padding: '0', background: 'white', marginBottom: '24px', overflow: 'hidden' }}>
        <div style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '16px', borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ width: '40px', height: '40px', background: '#f0fdf4', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <MapPin size={20} color="#16a34a" />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>{t.farmSizeTitle}</p>
            <p style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-text-main)' }}>{t.farmSizeVal}</p>
          </div>
        </div>
        <div style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '16px', borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ width: '40px', height: '40px', background: '#fefce8', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Sprout size={20} color="#ca8a04" />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>{t.primaryCropsTitle}</p>
            <p style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-text-main)' }}>{t.primaryCropsVal}</p>
          </div>
        </div>
        <div style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '40px', height: '40px', background: '#f8fafc', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Globe size={20} color="#475569" />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>{t.soilTypeTitle}</p>
            <p style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-text-main)' }}>{t.soilTypeVal}</p>
          </div>
        </div>
      </div>

      {/* App Settings */}
      <h3 className="section-title" style={{ fontSize: '1.1rem', marginBottom: '12px' }}>{t.appSettings}</h3>
      <div className="glass-card fade-in" style={{ padding: '0', background: 'white', marginBottom: '24px', overflow: 'hidden' }}>
        <div onClick={toggleLanguage} style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '16px', borderBottom: '1px solid #f1f5f9', cursor: 'pointer' }}>
          <div style={{ width: '40px', height: '40px', background: '#eff6ff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Globe size={20} color="#2563eb" />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-main)' }}>{t.languageText}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary-dark)', fontWeight: 'bold' }}>
            {t.languageCurrent} <ChevronRight size={18} color="var(--color-text-muted)" />
          </div>
        </div>
        
        <div onClick={handleComingSoon} style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }}>
          <div style={{ width: '40px', height: '40px', background: '#fff1f2', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Bell size={20} color="#e11d48" />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-main)' }}>{t.notificationsText}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)' }}>
            {t.notificationsCurrent} <ChevronRight size={18} />
          </div>
        </div>
      </div>

      {/* Help & Support */}
      <h3 className="section-title" style={{ fontSize: '1.1rem', marginBottom: '12px' }}>{t.helpSupport}</h3>
      <div className="glass-card fade-in" style={{ padding: '0', background: 'white', marginBottom: '32px', overflow: 'hidden' }}>
        <a href="tel:1551" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '16px', borderBottom: '1px solid #f1f5f9', cursor: 'pointer' }}>
            <div style={{ width: '40px', height: '40px', background: '#ecfdf5', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Phone size={20} color="#059669" />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: '0 0 2px 0', fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-main)' }}>{t.kisanCenter}</p>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{t.kisanDesc}</p>
            </div>
            <ChevronRight size={18} color="var(--color-text-muted)" />
          </div>
        </a>
        
        <div onClick={handleComingSoon} style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }}>
          <div style={{ width: '40px', height: '40px', background: '#f8fafc', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Info size={20} color="#475569" />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-main)' }}>{t.aboutApp}</p>
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{t.version}</span>
        </div>
      </div>

      {/* Logout Button */}
      <button 
        onClick={onLogout}
        style={{ width: '100%', padding: '16px', borderRadius: '16px', background: '#fee2e2', color: '#b91c1c', fontSize: '1.1rem', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', border: '1px solid #fecaca' }}
      >
        <LogOut size={20} />
        {t.logout}
      </button>

      <style dangerouslySetInnerHTML={{__html: `
        .fade-in { animation: fadeIn 0.4s ease-in; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}} />
    </div>
  );
}
