import React, { useEffect, useRef, useState } from 'react';

const TrulyCenteredSvg = () => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);
  const [isSvgSmaller, setIsSvgSmaller] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    const svg = svgRef.current;

    if (!container || !svg) return;

    const containerW = container.clientWidth;
    const containerH = container.clientHeight;
    const svgW = svg.width.baseVal.value;
    const svgH = svg.height.baseVal.value;

    const smaller = svgW <= containerW && svgH <= containerH;
    setIsSvgSmaller(smaller);

    if (!smaller) {
      // scroll 중앙으로 이동
      container.scrollLeft = (svgW - containerW) / 2;
      container.scrollTop = (svgH - containerH) / 2;
    }
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '600px',
        height: '400px',
        border: '2px solid black',
        overflow: 'auto',
        display: isSvgSmaller ? 'flex' : 'block',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <div
        ref={wrapperRef}
        style={{
          flexShrink: 0,
          width: 'fit-content',
          height: 'fit-content',
        }}
      >
        <svg
          ref={svgRef}
          width="2000"
          height="1000"
          style={{
            display: 'block',
            background: '#f9f9f9',
          }}
        >
          <rect x="0" y="0" width="2000" height="1000" fill="#e0f7fa" />
          <circle cx="100" cy="100" r="40" fill="tomato" />
          <text
            x="1000"
            y="500"
            fontSize="40"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            🎯 Centered SVG
          </text>
        </svg>
      </div>
    </div>
  );
};

export default TrulyCenteredSvg;
