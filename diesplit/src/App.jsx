import { useState } from 'react'
import './App.css'

function App() {
  const [editMode, setEditMode] = useState(false);

  return (
    <div>
      <button
        onClick={() => setEditMode((prev) => !prev)}
        style={{ margin: "16px", padding: "8px 20px", fontSize: "16px" }}
      >
        {editMode ? "수정완료" : "수정"}
      </button>
      <DrawCanvas editMode={editMode} />
    </div>
  );
}

const initialData = [
  { X_SIZE: 20, Y_SIZE: 30, X_BASE: 10, Y_BASE: 10, STITCH_DRTN: "", SORT: 0, ITEM_NM: "PDA", SELECT: false },
  { X_SIZE: 20, Y_SIZE: 30, X_BASE: 40, Y_BASE: 10, STITCH_DRTN: "", SORT: 1, ITEM_NM: "PDA", SELECT: false },
  { X_SIZE: 20, Y_SIZE: 30, X_BASE: 10, Y_BASE: 50, STITCH_DRTN: "T", SORT: 2, ITEM_NM: "PDA", SELECT: false },
  { X_SIZE: 20, Y_SIZE: 30, X_BASE: 40, Y_BASE: 50, STITCH_DRTN: "T", SORT: 3, ITEM_NM: "PDA", SELECT: false },
  { X_SIZE: 20, Y_SIZE: 30, X_BASE: 10, Y_BASE: 90, STITCH_DRTN: "B", SORT: 4, ITEM_NM: "PDA", SELECT: false },
  { X_SIZE: 20, Y_SIZE: 30, X_BASE: 40, Y_BASE: 90, STITCH_DRTN: "B", SORT: 5, ITEM_NM: "PDA", SELECT: false },
  { X_SIZE: 20, Y_SIZE: 30, X_BASE: 10, Y_BASE: 130, STITCH_DRTN: "", SORT: 6, ITEM_NM: "PDA", SELECT: false },
  { X_SIZE: 20, Y_SIZE: 30, X_BASE: 40, Y_BASE: 130, STITCH_DRTN: "", SORT: 7, ITEM_NM: "PDA", SELECT: false },
  { X_SIZE: 20, Y_SIZE: 30, X_BASE: 10, Y_BASE: 170, STITCH_DRTN: "", SORT: 8, ITEM_NM: "PDA", SELECT: false },
  { X_SIZE: 20, Y_SIZE: 30, X_BASE: 40, Y_BASE: 170, STITCH_DRTN: "", SORT: 9, ITEM_NM: "PDA", SELECT: false },
  { X_SIZE: 20, Y_SIZE: 30, X_BASE: 10, Y_BASE: 210, STITCH_DRTN: "", SORT: 10, ITEM_NM: "PDA", SELECT: false },
  { X_SIZE: 20, Y_SIZE: 30, X_BASE: 40, Y_BASE: 210, STITCH_DRTN: "", SORT: 11, ITEM_NM: "PDA", SELECT: false },
  { X_SIZE: 20, Y_SIZE: 30, X_BASE: 10, Y_BASE: 250, STITCH_DRTN: "", SORT: 12, ITEM_NM: "PDA", SELECT: false },
  { X_SIZE: 20, Y_SIZE: 30, X_BASE: 40, Y_BASE: 250, STITCH_DRTN: "", SORT: 13, ITEM_NM: "PDA", SELECT: false },
  { X_SIZE: 20, Y_SIZE: 30, X_BASE: 10, Y_BASE: 290, STITCH_DRTN: "", SORT: 14, ITEM_NM: "PDA", SELECT: false },
  { X_SIZE: 20, Y_SIZE: 30, X_BASE: 40, Y_BASE: 290, STITCH_DRTN: "", SORT: 15, ITEM_NM: "PDA", SELECT: false },
  { X_SIZE: 20, Y_SIZE: 30, X_BASE: 10, Y_BASE: 330, STITCH_DRTN: "", SORT: 16, ITEM_NM: "PDA", SELECT: false },
  { X_SIZE: 20, Y_SIZE: 30, X_BASE: 40, Y_BASE: 330, STITCH_DRTN: "", SORT: 17, ITEM_NM: "PDA", SELECT: false },
  { X_SIZE: 20, Y_SIZE: 30, X_BASE: 10, Y_BASE: 370, STITCH_DRTN: "", SORT: 18, ITEM_NM: "PDA", SELECT: false },
  { X_SIZE: 20, Y_SIZE: 30, X_BASE: 40, Y_BASE: 370, STITCH_DRTN: "", SORT: 19, ITEM_NM: "PDA", SELECT: false },
  { X_SIZE: 20, Y_SIZE: 30, X_BASE: 10, Y_BASE: 410, STITCH_DRTN: "", SORT: 20, ITEM_NM: "PDA", SELECT: false },
  { X_SIZE: 20, Y_SIZE: 30, X_BASE: 40, Y_BASE: 410, STITCH_DRTN: "", SORT: 21, ITEM_NM: "PDA", SELECT: false },
  { X_SIZE: 20, Y_SIZE: 30, X_BASE: 10, Y_BASE: 450, STITCH_DRTN: "", SORT: 22, ITEM_NM: "PDA", SELECT: false },
  { X_SIZE: 20, Y_SIZE: 30, X_BASE: 40, Y_BASE: 450, STITCH_DRTN: "", SORT: 23, ITEM_NM: "PDA", SELECT: false },
];

// 컴포넌트 밖에서 초기 데이터 복사 (참조 분리)
const initialDataCopy = initialData.map(item => ({ ...item }));

const SCALE = 3.5;
const MIN_SIZE = 70;
const PADDING = 50;

// 캔버스 기본 사이즈 상수 선언
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 400;

const getScaledSize = (size) => Math.max(size * SCALE, MIN_SIZE);

function incrementChar(char) {
  if (!char) return "A";
  const code = char.charCodeAt(0);
  if (code >= 65 && code < 90) return String.fromCharCode(code + 1);
  return char;
}

function decrementChar(char) {
  if (!char) return "A";
  const code = char.charCodeAt(0);
  if (code > 65 && code <= 90) return String.fromCharCode(code - 1);
  return char;
}

const DrawCanvas = ({ editMode }) => {
  const [data, setData] = useState(initialData);

  const contentWidth = Math.max(...data.map((r) => r.X_BASE + r.X_SIZE)) * SCALE;
  const contentHeight = Math.max(...data.map((r) => r.Y_BASE + r.Y_SIZE)) * SCALE;
  const totalWidth = Math.max(CANVAS_WIDTH, contentWidth + PADDING * 2);
  const totalHeight = Math.max(CANVAS_HEIGHT, contentHeight + PADDING * 2);

  const handleRectClick = (index) => {
    if (!editMode) return; // editMode가 false면 선택 불가
    setData((prev) =>
      prev.map((item, i) => ({ ...item, SELECT: i === index }))
    );
  };

  const handleSvgClick = (e) => {
    if (e.target.tagName !== "rect" && e.target.tagName !== "circle" && e.target.tagName !== "text") {
      setData((prev) => prev.map((item) => ({ ...item, SELECT: false })));
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    setData((prev) => prev.map((item) => ({ ...item, SELECT: false })));
  };

  const changeThirdChar = (index, increment) => {
    setData((prev) =>
      prev.map((item, i) => {
        if (i !== index) return item;
        const itemNm = item.ITEM_NM;
        if (itemNm.length < 3) return item;
        const chars = itemNm.split("");
        const currentChar = chars[2].toUpperCase();
        const newChar = increment
          ? incrementChar(currentChar)
          : decrementChar(currentChar);
        chars[2] = newChar;
        return { ...item, ITEM_NM: chars.join("") };
      })
    );
  };

  return (
    <div
      style={{ width: "100%", display: "flex", justifyContent: "center", overflow: "auto" }}
      onContextMenu={handleContextMenu}
    >
      <svg
        width={totalWidth}
        height={totalHeight}
        style={{ backgroundColor: "#D4F4FA" }}
        onClick={handleSvgClick}
      >
        {/* 축선 */}
        <line
          x1={PADDING}
          y1={PADDING - 20}
          x2={PADDING}
          y2={totalHeight - PADDING + 20}
          stroke="#000"
          strokeDasharray="4"
        />
        <line
          x1={PADDING - 20}
          y1={totalHeight - PADDING}
          x2={totalWidth - PADDING + 20}
          y2={totalHeight - PADDING}
          stroke="#000"
          strokeDasharray="4"
        />
        <text x={PADDING - 20} y={totalHeight - PADDING + 15} fontSize="10" fill="red">
          0,0
        </text>

        {data.map(
          (
            { X_SIZE, Y_SIZE, X_BASE, Y_BASE, STITCH_DRTN, SORT, ITEM_NM, SELECT },
            index
          ) => {
            const width = getScaledSize(X_SIZE);
            const height = getScaledSize(Y_SIZE);
            const x = PADDING + X_BASE * SCALE;
            const y = totalHeight - PADDING - Y_BASE * SCALE - height;

            let label = ITEM_NM;
            let suffix = "";
            if (STITCH_DRTN === "T") suffix = "_D";
            if (STITCH_DRTN === "B") suffix = "_U";

            // 초기 ITEM_NM 값과 다르면 내부 색상을 변경
            const initialItemNm = initialDataCopy[index].ITEM_NM;
            const isChanged = ITEM_NM !== initialItemNm;
            const fillColor = isChanged ? "#D9E5FF" : "#C4FDFF";

            const renderedLabel = (
              <tspan>
                {label}
                {suffix && <tspan fill="red">{suffix}</tspan>}
              </tspan>
            );

            return (
              <g key={index} onClick={() => handleRectClick(index)}>
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  fill={fillColor}
                  stroke={SELECT ? "#0100FF" : "#000"}
                  strokeWidth={SELECT ? 2 : 1}
                />
                {/* <text x={x + 2} y={y + 10} fontSize="8" fill="black">
                  {`${Math.round(width)}x${Math.round(height)}`}
                </text> */}
                <text
                  x={x + width - 2} // 우측 끝에서 약간 안쪽
                  y={y + height - 2} // 하단에서 약간 위
                  fontSize="8"
                  fill="black"
                  textAnchor="end" // 우측 정렬
                >
                  {SORT}
                </text>
                <text
                  x={x + width / 2}
                  y={y + height / 2 + 4}
                  fontSize="12"
                  fontWeight="bold"
                  fill="black"
                  textAnchor="middle"
                >
                  {renderedLabel}
                </text>
                <text
                  x={x + 2}
                  y={y + height - 2}
                  fontSize="8"
                  fill="#555"
                  textAnchor="start"
                >
                  {`${X_BASE}x${Y_BASE}`}
                </text>

                {SELECT && (
                  <>
                    <circle
                      cx={x + width / 2}
                      cy={y + height / 2 - 19}
                      r={10}
                      fill="#0100FF"
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        changeThirdChar(index, true);
                      }}
                    />
                    <text
                      x={x + width / 2}
                      y={y + height / 2 - 15}
                      fontSize="14"
                      fill="white"
                      fontWeight="bold"
                      textAnchor="middle"
                      style={{ pointerEvents: "none" }}
                    >
                      +
                    </text>

                    <circle
                      cx={x + width / 2}
                      cy={y + height / 2 + 20}
                      r={10}
                      fill="#0100FF"
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        changeThirdChar(index, false);
                      }}
                    />
                    <text
                      x={x + width / 2}
                      y={y + height / 2 + 24}
                      fontSize="14"
                      fill="white"
                      fontWeight="bold"
                      textAnchor="middle"
                      style={{ pointerEvents: "none" }}
                    >
                      -
                    </text>
                  </>
                )}
              </g>
            );
          }
        )}
      </svg>
    </div>
  );
};

export default App;
