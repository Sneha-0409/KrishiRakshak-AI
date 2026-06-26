import React, { useRef, useState } from 'react';
import { Camera, UploadCloud, Image as ImageIcon } from 'lucide-react';

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
      uploadGallery: "Choose from Gallery"
    },
    Hindi: {
      title: "फ़ोटो लें या अपलोड करें",
      subtitle: "बीमारी का पता लगाने के लिए पौधे की पत्ती की साफ फोटो लें",
      openCamera: "कैमरा खोलें",
      uploadGallery: "गैलरी से चुनें"
    }
  };

  const t = texts[language] || texts.English;

  return (
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

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden-input" 
      />
    </div>
  );
}
