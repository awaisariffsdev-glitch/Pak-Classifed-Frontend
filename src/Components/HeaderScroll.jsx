import React from 'react';

const HeaderScroll = () => {
  const offerText = "SUMMER MEGA MART • POST ADS FOR FREE & SELL FAST • BUY EXTRAORDINARY FOR LESS • 50% OFF PREMIUM ADS • JOIN PAKISTAN'S BIGGEST SUMMER MARKETPLACE • START TRADING NOW •";

  // Injecting keyframe styles directly so you don't need a separate CSS file
  const inlineStyles = `
    @keyframes scrollMarquee {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-50%); }
    }
  `;

  // Inline style objects for the elements
  const containerStyle = {
    width: '100%',
    overflow: 'hidden',
    backgroundColor: '#111111', // Sleek dark mode
    color: '#626764',           // Vibrant green accent
    padding: '12px 0',
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #222222',
  };

  const trackStyle = {
    display: 'flex',
    width: 'max-content',
    animation: 'scrollMarquee 120s linear infinite',
  };

  const contentStyle = {
    whiteSpace: 'nowrap',
  };

  return (
    <div style={containerStyle}>
      {/* Dynamic injection for the keyframe animation */}
      <style dangerouslySetInnerHTML={{ __html: inlineStyles }} />
      
      <div 
        style={trackStyle}
        // onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
        // onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}
      >
        {/* First Half */}
        <div style={contentStyle}>
          {Array(4).fill(offerText).join("")}
        </div>
        {/* Second Half (Seamless duplicate for infinite loop) */}
        <div style={contentStyle} aria-hidden="true">
          {Array(4).fill(offerText).join("")}
        </div>
      </div>
    </div>
  );
};

export default HeaderScroll;