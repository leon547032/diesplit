import React, { useRef, useEffect, useState } from 'react';

const ZoomableSvgViewer = () => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);

  const [scale, setScale] = useState(1);

  // 마운트 시 중앙 스크롤
  useEffect(() => {
    const container = containerRef.current;
    const svg = svgRef.current;

    if (container && svg) {
      container.scrollLeft = (svg.clientWidth * scale - container.clientWidth) / 2;
      container.scrollTop = (svg.clientHeight * scale - container.clientHeight) / 2;
    }
  }, [scale]);

  // 줌 핸들러
  const handleWheel = (e) => {
    e.preventDefault();
    const zoomSpeed = 0.001;
    let newScale = scale - e.deltaY * zoomSpeed;
    newScale = Math.max(0.1, Math.min(newScale, 5));
    setScale(newScale);
  };

  // 클릭 좌표 계산
  const handleClick = (e) => {
    const svg = svgRef.current;
    const rect = svg.getBoundingClientRect();

    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const svgX = offsetX / scale;
    const svgY = offsetY / scale;

    console.log(`🎯 클릭한 SVG 좌표: (${svgX.toFixed(1)}, ${svgY.toFixed(1)})`);
  };

  // 요소 클릭 시 개별 이벤트
  const handleElementClick = (name) => {
    console.log(`✅ 클릭한 요소: ${name}`);
  };

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      style={{
        width: '600px',
        height: '500px',
        overflow: 'auto',
        border: '2px solid gray',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          flexShrink: 0,
          display: 'inline-block',
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        <svg
          ref={svgRef}
          width={2000}
          height={1000}
          style={{ display: 'block' }}
          onClick={handleClick}
        >
          <rect
            x="100"
            y="100"
            width="200"
            height="200"
            fill="lightblue"
            onClick={(e) => {
              e.stopPropagation(); // svg 클릭 중첩 방지
              handleElementClick('Rect A');
            }}
          />
          <circle
            cx="600"
            cy="200"
            r="80"
            fill="salmon"
            onClick={(e) => {
              e.stopPropagation();
              handleElementClick('Circle B');
            }}
          />
          <text
            x="1000"
            y="500"
            fontSize="40"
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ cursor: 'pointer' }}
            onClick={(e) => {
              e.stopPropagation();
              handleElementClick('Text C');
            }}
          >
            Click Me!
          </text>
        </svg>
      </div>
    </div>
  );
};

export default ZoomableSvgViewer;
