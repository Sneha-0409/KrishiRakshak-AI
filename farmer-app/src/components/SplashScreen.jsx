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
      <div className="splash-logo">
        <Leaf size={56} strokeWidth={2.5} />
      </div>
      <h1 className="splash-title">KrishiRakshak AI</h1>
      <p className="splash-subtitle">Smart Farming, Better Yields</p>
    </div>
  );
}
