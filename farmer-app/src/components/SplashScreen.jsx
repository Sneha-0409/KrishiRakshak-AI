import React, { useEffect, useState } from 'react';
import { Leaf } from 'lucide-react';

export default function SplashScreen({ onComplete }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // The CSS animation takes 2.5s for fadeOut. 
    // We remove it from the DOM slightly after that to let the animation finish.
    const timer = setTimeout(() => {
      setVisible(false);
      onComplete();
    }, 3000); 

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div className="splash-screen">
      <div className="splash-logo" style={{ overflow: 'hidden', padding: '8px', background: 'white', width: '150px', height: '150px', borderRadius: '50%' }}>
        <img src="/logo.png" alt="KrishiRakshak Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>
      <h1 className="splash-title">KrishiRakshak AI</h1>
      <p className="splash-subtitle">Smart Farming, Better Yields</p>
    </div>
  );
}
