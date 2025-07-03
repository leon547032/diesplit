import React, { useEffect, useRef, useState } from 'react';

const SmartCenteredSvg = () => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);
  const [svgIsBiggerThanContainer, setSvgIsBiggerThanContainer] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    const svg = svgRef.current;

    if (!container || !svg) return;

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const svgWidth = svg.width.baseVal.value;
    const svgHeight = svg.height.baseVal.value;

    const isWider = svgWidth > containerWidth;
    const isTaller = svgHeight > containerHeight;

    setSvgIsBiggerThanContainer(isWider || isTaller);

    if (isWider || isTaller) {
      // 스크롤 중앙
      container.scrollLeft = (svg.scrollWidth - containerWidth) / 2;
      container.scrollTop = (svg.scrollHeight - containerHeight) / 2;
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
        display: svgIsBiggerThanContainer ? 'block' : 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        ref={wrapperRef}
        style={{
          flexShrink: 0,
        }}
      >
        <svg
          ref={svgRef}
          width="300"
          height="200"
          style={{
            display: 'block',
            background: '#f0f0f0',
          }}
        >
          <rect x="0" y="0" width="300" height="200" fill="#e0f7fa" />
          <circle cx="150" cy="100" r="40" fill="tomato" />
          <text
            x="150"
            y="100"
            fontSize="20"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            I'm Centered
          </text>
        </svg>
      </div>
    </div>
  );
};

export default SmartCenteredSvg;
