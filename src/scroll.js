import React, { useEffect, useRef } from 'react';

const CenteredSvgViewer = () => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const svg = svgRef.current;

    if (container && svg) {
      container.scrollLeft = (svg.clientWidth - container.clientWidth) / 2;
      container.scrollTop = (svg.clientHeight - container.clientHeight) / 2;
    }
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '500px',
        height: '400px',
        border: '2px solid black',
        overflow: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ flexShrink: 0, display: 'inline-block' }}>
        <svg
          ref={svgRef}
          width={2000}
          height={1000}
          style={{ display: 'block' }}
        >
          <rect x="0" y="0" width="2000" height="1000" fill="#f9f9f9" />
          <circle cx="1000" cy="500" r="30" fill="tomato" />
          <text
            x="1000"
            y="500"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="30"
          >
            I'm centered!
          </text>
        </svg>
      </div>
    </div>
  );
};

export default CenteredSvgViewer;
