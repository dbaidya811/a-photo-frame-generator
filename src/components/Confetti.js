import React from 'react';
import './confetti.css';

const Confetti = () => {
  const colors = ['#e63946', '#f1faee', '#a8dadc', '#457b9d', '#1d3557', '#ffc300'];

  const confetti = Array.from({ length: 100 }).map((_, i) => (
    <div
      key={i}
      className="confetti-piece"
      style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 4}s`,
        animationDuration: `${2 + Math.random() * 3}s`,
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        transform: `rotate(${Math.random() * 360}deg)`,
      }}
    ></div>
  ));

  return <div className="confetti-container">{confetti}</div>;
};

export default Confetti;