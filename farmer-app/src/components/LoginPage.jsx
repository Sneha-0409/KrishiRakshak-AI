import React, { useState } from 'react';
import { Phone, ArrowRight, ShieldCheck, Volume2, Globe } from 'lucide-react';

export default function LoginPage({ language, toggleLanguage, onLoginSuccess }) {
  const isHindi = language === 'hi';
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');

  const t = {
    titlePhone: isHindi ? 'अपना मोबाइल नंबर दर्ज करें' : 'Enter your mobile number',
    descPhone: isHindi ? 'हम आपको एक कोड भेजेंगे' : 'We will send you a verification code',
    phonePlaceholder: isHindi ? '10 अंकों का नंबर' : '10-digit number',
    continueBtn: isHindi ? 'आगे बढ़ें' : 'Continue',
    titleOtp: isHindi ? 'कोड दर्ज करें' : 'Enter the code',
    descOtp: isHindi ? `${phone} पर भेजा गया` : `Sent to ${phone}`,
    otpPlaceholder: isHindi ? '4 अंकों का कोड' : '4-digit code',
    verifyBtn: isHindi ? 'सत्यापित करें' : 'Verify',
    titleName: isHindi ? 'आपका शुभ नाम?' : 'What is your name?',
    descName: isHindi ? 'हम आपको किस नाम से बुलाएं?' : 'How should we address you?',
    namePlaceholder: isHindi ? 'अपना नाम लिखें' : 'Enter your name',
    startBtn: isHindi ? 'शुरू करें' : 'Get Started',
    audioHelp: isHindi ? 'ऑडियो सहायता' : 'Audio Help'
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (phone.length === 10) {
      setStep(2);
      // Simulate SMS auto-fill for prototype
      setTimeout(() => {
        setOtp('1234');
      }, 1500);
    } else {
      alert(isHindi ? 'कृपया 10 अंकों का सही मोबाइल नंबर दर्ज करें।' : 'Please enter a valid 10-digit mobile number.');
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp.length === 4) {
      setStep(3);
    } else {
      alert(isHindi ? 'कृपया 4 अंकों का सही कोड दर्ज करें।' : 'Please enter a valid 4-digit code.');
    }
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (name.trim().length > 0) {
      onLoginSuccess(name.trim());
    } else {
      alert(isHindi ? 'कृपया अपना नाम दर्ज करें।' : 'Please enter your name.');
    }
  };

  const handleAudioHelp = () => {
    alert(isHindi ? 'यह सुविधा जल्द आ रही है!' : 'This feature is coming soon!');
  };

  return (
    <div style={{ padding: '0', background: 'var(--color-background)', flex: 1, display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Bar for Language Toggle */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '24px' }}>
        <button
          onClick={toggleLanguage}
          style={{
            background: 'white',
            color: 'var(--color-primary-dark)',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '0.9rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}
        >
          <Globe size={16} />
          {language === 'en' ? 'हिंदी' : 'English'}
        </button>
      </div>

      <div style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        
        {/* Logo/Icon Area */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
          <div style={{ width: '80px', height: '80px', background: 'white', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(0,0,0,0.05)' }}>
            <img src="/logo.png" alt="Logo" style={{ width: '56px', height: '56px', objectFit: 'contain' }} />
          </div>
        </div>

        {step === 1 ? (
          <div className="fade-in">
            <h1 style={{ fontSize: '1.8rem', color: 'var(--color-primary-dark)', textAlign: 'center', marginBottom: '8px' }}>{t.titlePhone}</h1>
            <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '1rem', marginBottom: '32px' }}>{t.descPhone}</p>

            <form onSubmit={handlePhoneSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ position: 'relative' }}>
                <Phone size={24} color="var(--color-primary)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="tel"
                  placeholder={t.phonePlaceholder}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  style={{
                    width: '100%',
                    padding: '20px 20px 20px 52px',
                    fontSize: '1.4rem',
                    borderRadius: '16px',
                    border: '2px solid white',
                    background: 'white',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    outline: 'none',
                    color: 'var(--color-text-main)',
                    fontWeight: 'bold',
                    letterSpacing: '2px'
                  }}
                  autoFocus
                />
              </div>

              <button
                type="submit"
                disabled={phone.length !== 10}
                style={{
                  width: '100%',
                  padding: '20px',
                  background: phone.length === 10 ? 'var(--color-primary)' : '#cbd5e1',
                  color: 'white',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  boxShadow: phone.length === 10 ? '0 8px 16px rgba(83, 122, 68, 0.3)' : 'none',
                  transition: 'all 0.3s'
                }}
              >
                {t.continueBtn} <ArrowRight size={24} />
              </button>
            </form>
          </div>
        ) : step === 2 ? (
          <div className="fade-in">
            <h1 style={{ fontSize: '1.8rem', color: 'var(--color-primary-dark)', textAlign: 'center', marginBottom: '8px' }}>{t.titleOtp}</h1>
            <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '1rem', marginBottom: '32px' }}>{t.descOtp}</p>

            <form onSubmit={handleOtpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ position: 'relative' }}>
                <ShieldCheck size={24} color="var(--color-primary)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="tel"
                  placeholder={t.otpPlaceholder}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  style={{
                    width: '100%',
                    padding: '20px 20px 20px 52px',
                    fontSize: '1.8rem',
                    borderRadius: '16px',
                    border: '2px solid white',
                    background: 'white',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    outline: 'none',
                    color: 'var(--color-text-main)',
                    fontWeight: 'bold',
                    letterSpacing: '8px',
                    textAlign: 'center'
                  }}
                  autoFocus
                />
              </div>

              <button
                type="submit"
                disabled={otp.length !== 4}
                style={{
                  width: '100%',
                  padding: '20px',
                  background: otp.length === 4 ? 'var(--color-primary)' : '#cbd5e1',
                  color: 'white',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  boxShadow: otp.length === 4 ? '0 8px 16px rgba(83, 122, 68, 0.3)' : 'none',
                  transition: 'all 0.3s'
                }}
              >
                {t.verifyBtn} <ShieldCheck size={24} />
              </button>

              <div style={{ textAlign: 'center', marginTop: '8px', color: 'var(--color-text-muted)', fontSize: '0.9rem', padding: '8px', background: 'rgba(255,255,255,0.5)', borderRadius: '8px' }}>
                {isHindi ? 'यह एक डेमो संस्करण है। कृपया 1234 दर्ज करें।' : 'This is a demo version. Please type 1234.'}
              </div>
            </form>
          </div>
        ) : (
          <div className="fade-in">
            <h1 style={{ fontSize: '1.8rem', color: 'var(--color-primary-dark)', textAlign: 'center', marginBottom: '8px' }}>{t.titleName}</h1>
            <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '1rem', marginBottom: '32px' }}>{t.descName}</p>

            <form onSubmit={handleNameSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ position: 'relative' }}>
                <Globe size={24} color="var(--color-primary)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder={t.namePlaceholder}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '20px 20px 20px 52px',
                    fontSize: '1.4rem',
                    borderRadius: '16px',
                    border: '2px solid white',
                    background: 'white',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    outline: 'none',
                    color: 'var(--color-text-main)',
                    fontWeight: 'bold'
                  }}
                  autoFocus
                />
              </div>

              <button
                type="submit"
                disabled={name.trim().length === 0}
                style={{
                  width: '100%',
                  padding: '20px',
                  background: name.trim().length > 0 ? 'var(--color-primary)' : '#cbd5e1',
                  color: 'white',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  boxShadow: name.trim().length > 0 ? '0 8px 16px rgba(83, 122, 68, 0.3)' : 'none',
                  transition: 'all 0.3s'
                }}
              >
                {t.startBtn} <ArrowRight size={24} />
              </button>
            </form>
          </div>
        )}

        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'center' }}>
          <button 
            onClick={handleAudioHelp}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', 
              background: 'white', padding: '12px 24px', borderRadius: '30px',
              color: 'var(--color-primary-dark)', fontWeight: 'bold', fontSize: '1rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}>
            <Volume2 size={20} />
            {t.audioHelp}
          </button>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .fade-in { animation: fadeIn 0.4s ease-in; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}} />
    </div>
  );
}
