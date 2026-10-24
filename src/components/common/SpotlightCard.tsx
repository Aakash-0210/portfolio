import React, { useRef } from 'react';
import './SpotlightCard.css';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
  tilt?: boolean;
}

/** Adapted from the free React Bits SpotlightCard source for this portfolio's card styles. */
export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(184, 167, 217, 0.12)',
  tilt = false,
  ...divProps
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (event) => {
    const card = cardRef.current;
    if (!card) return;

    const bounds = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${event.clientX - bounds.left}px`);
    card.style.setProperty('--mouse-y', `${event.clientY - bounds.top}px`);
    card.style.setProperty('--spotlight-color', spotlightColor);

    if (tilt) {
      const relativeX = (event.clientX - bounds.left) / bounds.width - 0.5;
      const relativeY = (event.clientY - bounds.top) / bounds.height - 0.5;
      card.style.setProperty('--tilt-x', `${(relativeY * -4).toFixed(2)}deg`);
      card.style.setProperty('--tilt-y', `${(relativeX * 4).toFixed(2)}deg`);
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card || !tilt) return;
    card.style.setProperty('--tilt-x', '0deg');
    card.style.setProperty('--tilt-y', '0deg');
  };

  return (
    <div
      ref={cardRef}
      {...divProps}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`card-spotlight ${className}`}
    >
      {children}
    </div>
  );
};
