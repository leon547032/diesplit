import React, { useState } from "react";

const rawData = [ { X_SIZE: 20, Y_SIZE: 30, X_BASE: 10, Y_BASE: 10, STITCH_DRTN: "", SORT: 0, ITEM_NM: "PDA" }, { X_SIZE: 20, Y_SIZE: 30, X_BASE: 40, Y_BASE: 10, STITCH_DRTN: "", SORT: 1, ITEM_NM: "PDA" }, { X_SIZE: 20, Y_SIZE: 30, X_BASE: 10, Y_BASE: 50, STITCH_DRTN: "T", SORT: 2, ITEM_NM: "PDA" }, { X_SIZE: 20, Y_SIZE: 30, X_BASE: 40, Y_BASE: 50, STITCH_DRTN: "T", SORT: 3, ITEM_NM: "PDA" }, { X_SIZE: 20, Y_SIZE: 30, X_BASE: 10, Y_BASE: 90, STITCH_DRTN: "B", SORT: 4, ITEM_NM: "PDA" }, { X_SIZE: 20, Y_SIZE: 30, X_BASE: 40, Y_BASE: 90, STITCH_DRTN: "B", SORT: 5, ITEM_NM: "PDA" }, { X_SIZE: 20, Y_SIZE: 30, X_BASE: 10, Y_BASE: 130, STITCH_DRTN: "", SORT: 6, ITEM_NM: "PDA" }, { X_SIZE: 20, Y_SIZE: 30, X_BASE: 40, Y_BASE: 130, STITCH_DRTN: "", SORT: 7, ITEM_NM: "PDA" }, { X_SIZE: 20, Y_SIZE: 30, X_BASE: 10, Y_BASE: 170, STITCH_DRTN: "", SORT: 8, ITEM_NM: "PDA" }, { X_SIZE: 20, Y_SIZE: 30, X_BASE: 40, Y_BASE: 170, STITCH_DRTN: "", SORT: 9, ITEM_NM: "PDA" }, { X_SIZE: 20, Y_SIZE: 30, X_BASE: 10, Y_BASE: 210, STITCH_DRTN: "", SORT: 10, ITEM_NM: "PDA" }, { X_SIZE: 20, Y_SIZE: 30, X_BASE: 40, Y_BASE: 210, STITCH_DRTN: "", SORT: 11, ITEM_NM: "PDA" }, { X_SIZE: 20, Y_SIZE: 30, X_BASE: 10, Y_BASE: 250, STITCH_DRTN: "", SORT: 12, ITEM_NM: "PDA" }, { X_SIZE: 20, Y_SIZE: 30, X_BASE: 40, Y_BASE: 250, STITCH_DRTN: "", SORT: 13, ITEM_NM: "PDA" }, { X_SIZE: 20, Y_SIZE: 30, X_BASE: 10, Y_BASE: 290, STITCH_DRTN: "", SORT: 14, ITEM_NM: "PDA" }, { X_SIZE: 20, Y_SIZE: 30, X_BASE: 40, Y_BASE: 290, STITCH_DRTN: "", SORT: 15, ITEM_NM: "PDA" }, { X_SIZE: 20, Y_SIZE: 30, X_BASE: 10, Y_BASE: 330, STITCH_DRTN: "", SORT: 16, ITEM_NM: "PDA" }, { X_SIZE: 20, Y_SIZE: 30, X_BASE: 40, Y_BASE: 330, STITCH_DRTN: "", SORT: 17, ITEM_NM: "PDA" }, { X_SIZE: 20, Y_SIZE: 30, X_BASE: 10, Y_BASE: 370, STITCH_DRTN: "", SORT: 18, ITEM_NM: "PDA" }, { X_SIZE: 20, Y_SIZE: 30, X_BASE: 40, Y_BASE: 370, STITCH_DRTN: "", SORT: 19, ITEM_NM: "PDA" }, { X_SIZE: 20, Y_SIZE: 30, X_BASE: 10, Y_BASE: 410, STITCH_DRTN: "", SORT: 20, ITEM_NM: "PDA" }, { X_SIZE: 20, Y_SIZE: 30, X_BASE: 40, Y_BASE: 410, STITCH_DRTN: "", SORT: 21, ITEM_NM: "PDA" }, { X_SIZE: 20, Y_SIZE: 30, X_BASE: 10, Y_BASE: 450, STITCH_DRTN: "", SORT: 22, ITEM_NM: "PDA" }, { X_SIZE: 20, Y_SIZE: 30, X_BASE: 40, Y_BASE: 450, STITCH_DRTN: "", SORT: 23, ITEM_NM: "PDA" } ];

const SCALE = 3.5; const MIN_SIZE = 70; const PADDING = 50;

const getScaledSize = (size) => Math.max(size * SCALE, MIN_SIZE);

const DrawCanvas = ({ data, selectedIndex, onSelect, readonly = false, flip = false }) => { const contentWidth = Math.max(...data.map(r => r.X_BASE + r.X_SIZE)) * SCALE; const contentHeight = Math.max(...data.map(r => r.Y_BASE + r.Y_SIZE)) * SCALE; const totalWidth = Math.max(1600, contentWidth + PADDING * 2); const totalHeight = Math.max(800, contentHeight + PADDING * 2);

const handleClick = (index) => { if (!readonly) onSelect?.(index); };

const handleSvgClick = (e) => { if (!readonly && e.target.tagName !== 'rect') { onSelect?.(null); } };

return ( <svg width={totalWidth} height={totalHeight} style={{ backgroundColor: "#D4F4FA", transform: flip ? "scaleX(-1)" : "none" }} onClick={handleSvgClick} > <line x1={PADDING} y1={PADDING - 20} x2={PADDING} y2={totalHeight - PADDING + 20} stroke="#000" strokeDasharray="4" /> <line x1={PADDING - 20} y1={totalHeight - PADDING} x2={totalWidth - PADDING + 20} y2={totalHeight - PADDING} stroke="#000" strokeDasharray="4" /> <text x={PADDING - 7} y={totalHeight - PADDING + 15} fontSize="10" fill="red">0,0</text>

{data.map(({ X_SIZE, Y_SIZE, X_BASE, Y_BASE, STITCH_DRTN, SORT, ITEM_NM }, index) => {
    const width = getScaledSize(X_SIZE);
    const height = getScaledSize(Y_SIZE);
    const x = PADDING + X_BASE * SCALE;
    const y = totalHeight - PADDING - Y_BASE * SCALE - height;
    let label = ITEM_NM;
    let suffix = "";
    if (STITCH_DRTN === "T") suffix = "_D";
    if (STITCH_DRTN === "B") suffix = "_U";

    const renderedLabel = (
      <tspan>
        {label}
        {suffix && <tspan fill="red">{suffix}</tspan>}
      </tspan>
    );

    const isSelected = index === selectedIndex;

    return (
      <g key={index} onClick={() => handleClick(index)}>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill="#5CD1E5"
          stroke={isSelected ? "#FF0000" : "#000"}
          strokeWidth={isSelected ? 2 : 1}
        />
        <text x={x + 2} y={y + 10} fontSize="8" fill="white">{`${Math.round(width)}x${Math.round(height)}`}</text>
        <text x={x + 2} y={y + height - 2} fontSize="8" fill="white">{SORT}</text>
        <text x={x + width / 2} y={y + height / 2 + 4} fontSize="12" fontWeight="bold" fill="black" textAnchor="middle">{renderedLabel}</text>
      </g>
    );
  })}
</svg>

); };

const CanvasWrapper = () => { const [selectedIndex, setSelectedIndex] = useState(null); const [flipYn, setFlipYn] = useState("Y");

return ( <div style={{ display: "flex", flexDirection: "row", gap: "20px", justifyContent: "center" }}> {flipYn === "Y" && ( <DrawCanvas data={rawData} readonly flip /> )} <DrawCanvas data={rawData} selectedIndex={selectedIndex} onSelect={setSelectedIndex} /> </div> ); };

export default CanvasWrapper;

