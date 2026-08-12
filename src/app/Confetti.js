import React from 'react';
import './confetti.css';

const Confetti = () => {
  const confetti = Array.from({ length: 100 }).map((_, i) => (
    <div key={i} className="confetti-piece" style={{
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 2}s`,
    }}></div>
  ));

  return <div className="confetti-container">{confetti}</div>;
};

export default Confetti;

