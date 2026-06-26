import React, { useRef, useState } from 'react';
import { Camera, UploadCloud, Image as ImageIcon, Sun, Scan, Focus } from 'lucide-react';

export default function CameraCapture({ onImageSelected, language }) {
  const fileInputRef = useRef(null);
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      onImageSelected(e.target.files[0]);
    }
  };

  const texts = {
    English: {
      title: "Take a Photo or Upload",
      subtitle: "Capture your plant's leaf clearly to detect diseases",
      openCamera: "Open Camera",
      uploadGallery: "Choose from Gallery",
      supportedNote: "*Currently supporting disease detection for Tomato and Potato only.",
      instTitle: "How to take a good photo",
      inst1Title: "Good Lighting",
      inst1: "Ensure the leaf is well-lit and in focus.",
      inst2Title: "Center the Leaf",
      inst2: "Capture the entire affected area clearly.",
      inst3Title: "Keep it Steady",
      inst3: "Avoid blurry or shaking images."
    },
    Hindi: {
      title: "फ़ोटो लें या अपलोड करें",
      subtitle: "बीमारी का पता लगाने के लिए पौधे की पत्ती की साफ फोटो लें",
      openCamera: "कैमरा खोलें",
      uploadGallery: "गैलरी से चुनें",
      supportedNote: "*वर्तमान में केवल टमाटर और आलू के लिए रोग का पता लगाने का समर्थन करता है।",
      instTitle: "एक अच्छी तस्वीर कैसे लें",
      inst1Title: "अच्छी रोशनी",
      inst1: "सुनिश्चित करें कि पत्ती पर अच्छी रोशनी हो और वह फोकस में हो।",
      inst2Title: "पत्ती को बीच में रखें",
      inst2: "पूरे प्रभावित हिस्से को स्पष्ट रूप से कैप्चर करें।",
      inst3Title: "स्थिर रखें",
      inst3: "धुंधली या हिलती हुई तस्वीरों से बचें।"
    }
  };

  const t = texts[language] || texts.English;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="glass-card">
        <h2 className="section-title">
          <Camera size={24} />
          {t.title}
        </h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-lg)' }}>
          {t.subtitle}
        </p>

        <div 
          className="upload-area"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="upload-icon">
            <UploadCloud size={32} />
          </div>
          <div className="upload-text">
            <h3>{t.openCamera} / {t.uploadGallery}</h3>
            <p>Tap here to select an image</p>
          </div>
        </div>

        <div style={{ marginTop: '16px', fontSize: '0.85rem', color: '#f57c00', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px', background: '#fff8e1', padding: '10px 12px', borderRadius: '8px' }}>
          <span>⚠️</span> {t.supportedNote}
        </div>

        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden-input" 
        />
      </div>

      {/* Premium Instructions Section */}
      <div style={{ 
        background: '#ffffff', 
        borderRadius: '24px', 
        padding: '24px', 
        boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
        display: 'flex', 
        flexDirection: 'column', 
        gap: '24px'
      }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: '#1b5e20', display: 'flex', alignItems: 'center', gap: '10px', letterSpacing: '-0.3px' }}>
          <Camera size={22} color="#2e7d32" />
          {t.instTitle}
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: '#fff8e1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 2px 8px rgba(245,127,23,0.1)' }}>
              <Sun size={22} color="#f57f17" />
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: 700, color: '#334155' }}>{t.inst1Title}</h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>{t.inst1}</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 2px 8px rgba(46,125,50,0.1)' }}>
              <Scan size={22} color="#2e7d32" />
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: 700, color: '#334155' }}>{t.inst2Title}</h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>{t.inst2}</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: '#e3f2fd', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 2px 8px rgba(21,101,192,0.1)' }}>
              <Focus size={22} color="#1565c0" />
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: 700, color: '#334155' }}>{t.inst3Title}</h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>{t.inst3}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
