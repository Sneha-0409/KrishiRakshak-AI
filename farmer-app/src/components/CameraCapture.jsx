import React, { useRef, useState } from 'react';
import { Camera, UploadCloud, Image as ImageIcon, Sun, Scan, Focus, Mic } from 'lucide-react';

export default function CameraCapture({ onImageSelected, onVoiceQuery, language }) {
  const fileInputRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      onImageSelected(e.target.files[0]);
    }
  };

  const texts = {
    English: {
      title: "Take a Photo or Upload",
      subtitle: "Capture your plant's leaf clearly to detect diseases",
      openCamera: "Open Camera / Choose from Gallery",
      uploadGallery: "Tap here to select an image",
      supportedNote: <span>*Currently supporting disease detection for <strong style={{ color: '#d84315', fontWeight: 800 }}>Tomato and Potato</strong> only.</span>,
      instTitle: "How to take a good photo",
      inst1Title: "Good Lighting",
      inst1: "Ensure the leaf is well-lit and in focus.",
      inst2Title: "Center the Leaf",
      inst2: "Capture the entire affected area clearly.",
      inst3Title: "Keep it Steady",
      inst3: "Avoid blurry or shaking images.",
      voiceTitle: "Or describe the issue",
      voiceSubtitle: "Tap to speak about your crop's problem",
      recording: "Listening..."
    },
    Hindi: {
      title: "फ़ोटो लें या अपलोड करें",
      subtitle: "बीमारी का पता लगाने के लिए पौधे की पत्ती की साफ फोटो लें",
      openCamera: "कैमरा खोलें / गैलरी से चुनें",
      uploadGallery: "छवि चुनने के लिए यहां टैप करें",
      supportedNote: <span>*वर्तमान में केवल <strong style={{ color: '#d84315', fontWeight: 800 }}>टमाटर और आलू</strong> के लिए रोग का पता लगाने का समर्थन करता है।</span>,
      instTitle: "एक अच्छी तस्वीर कैसे लें",
      inst1Title: "अच्छी रोशनी",
      inst1: "सुनिश्चित करें कि पत्ती पर अच्छी रोशनी हो और वह फोकस में हो।",
      inst2Title: "पत्ती को बीच में रखें",
      inst2: "पूरे प्रभावित हिस्से को स्पष्ट रूप से कैप्चर करें।",
      inst3Title: "स्थिर रखें",
      inst3: "धुंधली या हिलती हुई तस्वीरों से बचें।",
      voiceTitle: "या समस्या के बारे में बोलें",
      voiceSubtitle: "अपनी फसल की समस्या बताने के लिए टैप करें",
      recording: "सुन रहे हैं..."
    }
  };

  const t = texts[language] || texts.English;

  const handleVoiceRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'hi' ? 'hi-IN' : 'en-US';
      
      recognition.onstart = () => setIsRecording(true);
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onVoiceQuery(transcript);
      };
      
      recognition.onerror = (event) => {
        setIsRecording(false);
        // Fallback mock if microphone access is denied or error
        onVoiceQuery(language === 'hi' ? 'मेरे टमाटर के पत्तों पर काले धब्बे हैं।' : 'My tomato leaves have black spots.');
      };
      
      recognition.onend = () => setIsRecording(false);
      
      try {
        recognition.start();
      } catch (e) {
        // Fallback if start fails
        setIsRecording(true);
        setTimeout(() => {
          setIsRecording(false);
          onVoiceQuery(language === 'hi' ? 'मेरे टमाटर के पत्तों पर काले धब्बे हैं।' : 'My tomato leaves have black spots.');
        }, 2000);
      }
    } else {
      // Fallback for browsers that don't support speech API
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        onVoiceQuery(language === 'hi' ? 'मेरे टमाटर के पत्तों पर काले धब्बे हैं।' : 'My tomato leaves have black spots.');
      }, 2000);
    }
  };

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
          <div className="upload-icon-wrapper">
            <UploadCloud size={32} color="var(--color-primary-dark)" />
          </div>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '1.2rem', color: 'var(--color-primary-dark)' }}>
            {t.openCamera}
          </h3>
          <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>
            {t.uploadGallery}
          </p>
        </div>

        <div style={{ 
          marginTop: '20px', 
          fontSize: '0.9rem', 
          color: '#e65100', 
          fontWeight: 500, 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px', 
          background: '#fff3e0', 
          padding: '12px 16px', 
          borderRadius: '12px',
          border: '1px solid #ffe0b2'
        }}>
          <span style={{ fontSize: '1.2rem' }}>⚠️</span> 
          <div style={{ lineHeight: 1.4 }}>{t.supportedNote}</div>
        </div>

        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: 'none' }}
        />
      </div>

      {/* Voice Feature */}
      <div className="glass-card" style={{ background: isRecording ? '#fee2e2' : 'white', transition: 'background 0.3s' }}>
        <h2 className="section-title" style={{ color: isRecording ? '#ef4444' : 'var(--color-primary-dark)' }}>
          <Mic size={24} />
          {t.voiceTitle}
        </h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-lg)' }}>
          {isRecording ? t.recording : t.voiceSubtitle}
        </p>
        <button 
          onClick={handleVoiceRecording}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '16px',
            background: isRecording ? '#ef4444' : '#eff6ff',
            color: isRecording ? 'white' : '#2563eb',
            border: isRecording ? 'none' : '2px dashed #93c5fd',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
        >
          <Mic size={24} className={isRecording ? 'pulse-anim' : ''} />
          {isRecording ? t.recording : t.voiceSubtitle}
        </button>
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
