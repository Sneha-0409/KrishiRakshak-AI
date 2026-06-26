import React, { useState } from 'react';
import { X, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function CropDetailModal({ cropName, language, onClose }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const isHindi = language === 'hi';

  // Hardcoded detailed data for demo purposes
  const cropData = {
    'Rice (Paddy)': {
      hiName: 'चावल (धान)',
      icon: '🌾',
      prevention: [
        isHindi ? 'प्रमाणित रोग मुक्त बीजों का प्रयोग करें।' : 'Use certified disease-free seeds.',
        isHindi ? 'पौधों के बीच उचित दूरी बनाए रखें।' : 'Maintain proper spacing between plants.',
        isHindi ? 'खेत में पानी जमा न होने दें।' : 'Avoid excessive water stagnation.',
        isHindi ? 'मिट्टी परीक्षण के आधार पर ही उर्वरक डालें।' : 'Apply fertilizers based on soil tests.'
      ],
      diseases: [
        {
          name: isHindi ? 'ब्राउन स्पॉट (भूरा धब्बा)' : 'Brown Spot',
          img: '/assets/rice_brown_spot.png',
          desc: isHindi ? 'पत्तियों पर छोटे, भूरे रंग के धब्बे।' : 'Small, dark brown spots on the leaves.'
        },
        {
          name: isHindi ? 'ब्लास्ट रोग' : 'Rice Blast',
          img: '/assets/rice_blast.png',
          desc: isHindi ? 'पत्तियों पर आंख के आकार के धब्बे।' : 'Eye-shaped lesions on leaves and stems.'
        }
      ]
    },
    'Maize': {
      hiName: 'मक्का',
      icon: '🌽',
      prevention: [
        isHindi ? 'बुवाई से पहले बीज का उपचार करें।' : 'Treat seeds with fungicide before sowing.',
        isHindi ? 'खरपतवार नियंत्रण समय पर करें।' : 'Ensure timely weed control.',
        isHindi ? 'खेत में अच्छी जल निकासी व्यवस्था रखें।' : 'Maintain good drainage in the field.'
      ],
      diseases: [
        {
          name: isHindi ? 'पत्ती झुलसा (Leaf Blight)' : 'Northern Leaf Blight',
          img: '/assets/maize_blight.png',
          desc: isHindi ? 'पत्तियों पर लंबे भूरे धब्बे।' : 'Long, cigar-shaped gray-green or tan lesions.'
        }
      ]
    },
    'Cotton': {
      hiName: 'कपास',
      icon: '☁',
      prevention: [
        isHindi ? 'फसल चक्र अपनाएं।' : 'Practice crop rotation.',
        isHindi ? 'सफेद मक्खी नियंत्रण के लिए जाल लगाएं।' : 'Use yellow sticky traps for whiteflies.',
        isHindi ? 'सूखे पत्तों को खेत से हटा दें।' : 'Remove dried leaves and debris from the field.'
      ],
      diseases: [
        {
          name: isHindi ? 'पत्ता मरोड़ (Leaf Curl)' : 'Cotton Leaf Curl Virus',
          img: '/assets/cotton_curl.png',
          desc: isHindi ? 'पत्तियों का मुड़ना और छोटा होना।' : 'Curling of leaf margins and stunted growth.'
        }
      ]
    }
  };

  const getCropData = (name) => {
    // Basic matching logic to handle translations
    if (name.includes('Rice') || name.includes('चावल')) return cropData['Rice (Paddy)'];
    if (name.includes('Maize') || name.includes('मक्का')) return cropData['Maize'];
    if (name.includes('Cotton') || name.includes('कपास')) return cropData['Cotton'];
    
    // Default fallback
    return {
      hiName: name,
      icon: '🌱',
      prevention: [
        isHindi ? 'अच्छी गुणवत्ता वाले बीजों का प्रयोग करें।' : 'Use high-quality seeds.',
        isHindi ? 'खेत को साफ रखें।' : 'Keep the field clean and free of weeds.'
      ],
      diseases: [
        {
          name: isHindi ? 'सामान्य कवक रोग' : 'Common Fungal Disease',
          img: '/assets/generic_leaf.png',
          desc: isHindi ? 'पत्तियों पर असामान्य धब्बे।' : 'Unusual spots or discoloration on leaves.'
        }
      ]
    };
  };

  const data = getCropData(cropName);

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'var(--color-background)',
      zIndex: 100,
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ 
        padding: '16px', 
        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0
      }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.25rem' }}>
          <span>{data.icon}</span> 
          {isHindi ? data.hiName : cropName}
        </h2>
        <button onClick={onClose} style={{ color: 'white' }}>
          <X size={28} />
        </button>
      </div>

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Prevention Section */}
        <div>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary-dark)', marginBottom: '12px' }}>
            <ShieldCheck size={24} color="var(--color-success)" />
            {isHindi ? 'रोगों से कैसे बचें' : 'How to Avoid Diseases'}
          </h3>
          <div className="glass-card" style={{ background: 'white' }}>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--color-text-main)' }}>
              {data.prevention.map((tip, idx) => (
                <li key={idx} style={{ lineHeight: '1.5' }}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Common Diseases Section */}
        <div>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary-dark)', marginBottom: '12px' }}>
            <AlertTriangle size={24} color="var(--color-warning)" />
            {isHindi ? 'सामान्य रोग' : 'Common Diseases'}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {data.diseases.map((disease, idx) => (
              <div key={idx} className="glass-card" style={{ padding: 0, overflow: 'hidden', background: 'white', border: '1px solid #e2e8f0' }}>
                {disease.img && (
                  <div 
                    onClick={() => setSelectedImage(disease.img)}
                    style={{ width: '100%', height: '160px', background: '#f1f5f9', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', cursor: 'pointer' }}
                  >
                    <img src={disease.img} alt={disease.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} />
                  </div>
                )}
                <div style={{ padding: '16px' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '4px', color: 'var(--color-text-main)' }}>{disease.name}</h4>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{disease.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Image Lightbox */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            zIndex: 200,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px'
          }}
        >
          <button 
            onClick={() => setSelectedImage(null)}
            style={{ position: 'absolute', top: '20px', right: '20px', color: 'white', background: 'rgba(0,0,0,0.5)', borderRadius: '50%', padding: '8px' }}
          >
            <X size={32} />
          </button>
          <img 
            src={selectedImage} 
            alt="Full size" 
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '8px' }} 
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
