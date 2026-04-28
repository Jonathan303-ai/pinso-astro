import { useState, useEffect, useCallback } from 'react';

interface Slide {
  src: string;
  alt: string;
  caption?: string;
}

interface Props {
  slides: Slide[];
  interval?: number;
}

export default function ImageSlider({ slides, interval = 4000 }: Props) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent(c => (c + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [next, interval]);

  return (
    <div className="slider-wrapper">
      {slides.map((slide, i) => (
        <div key={i} className={`slider-slide${i === current ? ' active' : ''}`}>
          <img
            src={slide.src}
            alt={slide.alt}
            width={1120}
            height={560}
            loading={i === 0 ? 'eager' : 'lazy'}
            fetchPriority={i === 0 ? 'high' : 'low'}
          />
          {slide.caption && (
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'rgba(0,0,0,0.45)', color: '#fff',
              padding: '6px 14px', fontSize: '12px', fontFamily: 'Philosopher, serif'
            }}>
              {slide.caption}
            </div>
          )}
        </div>
      ))}
      <div className="slider-nav">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`slider-dot${i === current ? ' active' : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
