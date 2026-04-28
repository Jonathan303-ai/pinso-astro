import { useState } from 'react';

interface Tab {
  label: string;
  imgSrc: string;
  imgAlt: string;
  content: string;
}

interface Props {
  tabs: Tab[];
}

export default function TabsVertical({ tabs }: Props) {
  const [active, setActive] = useState(0);

  return (
    <div className="vtabs-wrapper">
      <div className="vtabs-nav">
        {tabs.map((tab, i) => (
          <button
            key={i}
            className={`vtab-btn${i === active ? ' active' : ''}`}
            onClick={() => setActive(i)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="vtabs-content">
        {tabs.map((tab, i) => (
          <div key={i} className={`vtab-panel${i === active ? ' active' : ''}`}>
            <img src={tab.imgSrc} alt={tab.imgAlt} style={{ width: '100%', maxHeight: '140px', objectFit: 'cover', borderRadius: '2px', marginBottom: '10px' }} />
            <p style={{ textAlign: 'justify', fontSize: '13px', lineHeight: '1.6', color: '#444', margin: 0 }}>{tab.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
