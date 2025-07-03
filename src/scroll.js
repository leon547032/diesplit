import React, { useEffect, useRef } from 'react';

const CenteredSvg = () => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const svg = svgRef.current;

    if (container && svg) {
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      const svgWidth = svg.viewBox.baseVal.width || svg.width.baseVal.value;
      const svgHeight = svg.viewBox.baseVal.height || svg.height.baseVal.value;

      // svg가 container보다 크면 scroll을 위해 static하게 둠
      const isWide = svgWidth > containerWidth;
      const isTall = svgHeight > containerHeight;

      svg.style.position = isWide || isTall ? 'static' : 'absolute';
    }
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '600px',
        height: '400px',
        overflow: 'auto',
        border: '2px solid black',
        position: 'relative',
      }}
    >
      <svg
        ref={svgRef}
        width="300"
        height="200"
        viewBox="0 0 300 200"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          position: 'absolute', // 기본은 중앙 정렬
          background: '#e0f7fa',
          display: 'block',
        }}
      >
        <rect x="0" y="0" width="300" height="200" fill="#b2ebf2" />
        <circle cx="150" cy="100" r="40" fill="tomato" />
        <text
          x="150"
          y="100"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="20"
        >
          CENTERED SVG
        </text>
      </svg>
    </div>
  );
};

export default CenteredSvg;
