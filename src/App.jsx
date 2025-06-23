import { useState } from 'react'
import './App.css'

function App() {
  const [editMode, setEditMode] = useState(false);
  const [data, setData] = useState(initialData);
  const [isSaved, setIsSaved] = useState(true);

  // 데이터 비교 함수
  const isDataEqual = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
  };

  // 저장 버튼 클릭
  const handleSave = () => {
    if (isDataEqual(data, initialDataCopy)) {
      alert("수정된 정보가 없습니다.");
    } else {
      alert("저장되었습니다");
      setIsSaved(true);
      setEditMode(false); // 저장 시 자동으로 수정완료 처리
      // 저장 시 초기데이터 복사본도 갱신
      initialDataCopy = data.map(item => ({ ...item }));
    }
  };

  // 닫기 버튼 클릭
  const handleClose = () => {
    if (!isDataEqual(data, initialDataCopy) && !isSaved) {
      // 저장 안 된 변경사항이 있으면 confirm 창 표시
      if (window.confirm("수정된 정보가 있습니다. 무시하고 창을 닫으시겠습니까?")) {
        setData(initialDataCopy.map(item => ({ ...item }))); // 초기데이터로 복원
        setIsSaved(true);
        setEditMode(false); // 닫을 때 수정모드 해제
        alert("닫았습니다");
      }
      // 취소하면 아무 동작 없음
    } else {
      setEditMode(false); // 닫을 때 수정모드 해제
      alert("창 닫았음");
    }
  };

  // 데이터 변경 시 저장 상태 false로
  const handleDataChange = (newData) => {
    setData(newData);
    setIsSaved(false);
  };

  // 모든 사각형의 xSize, ySize 중 최대값과 최소값 구하기
  const allSizes = data.flatMap(d => [d.xSize, d.ySize]);
  const minSide = Math.min(...allSizes);
  const maxSide = Math.max(...allSizes);

  // 전체 SCALE을 "최소값이 MIN_SIZE가 되고, 동시에 최대값도 MIN_SIZE가 되도록" 조정
  // 즉, minSide가 MIN_SIZE가 되도록 배율을 키우고, maxSide가 MIN_SIZE가 되도록 배율을 줄임
  // 둘 중 더 작은 배율을 선택 (그래야 둘 다 MIN_SIZE 이상이 됨)
  const scaleForMin = MIN_SIZE / minSide;
  const scaleForMax = MIN_SIZE / maxSide;
  const dynamicScale = Math.min(scaleForMin, scaleForMax);

  // DrawCanvas에서 사용할 width/height 계산 로직을 이곳으로 이동
  const contentWidth = Math.max(
    ...data.flatMap(r =>
      Array.from({ length: r.xShot || 1 }, (_, shotX) =>
        (r.xBase + shotX * (r.xSize + r.xScribeSize) + r.xSize)
      )
    )
  ) * dynamicScale;
  const contentHeight = Math.max(
    ...data.map(
      (r) =>
        r.yBase +
        ((r.yShot || 1) - 1) * (r.ySize + r.yScribeSize) +
        r.ySize
    )
  ) * dynamicScale;
  const totalWidth = Math.max(CANVAS_WIDTH, contentWidth + PADDING * 2);
  const totalHeight = Math.max(CANVAS_HEIGHT, contentHeight + PADDING * 2);

  return (
    <div>
      <button
        onClick={() => setEditMode((prev) => !prev)}
        style={{ margin: "16px", padding: "8px 20px", fontSize: "16px" }}
      >
        {editMode ? "수정완료" : "수정"}
      </button>
      <button
        onClick={handleSave}
        style={{ margin: "16px 0 16px 4px", padding: "8px 20px", fontSize: "16px" }}
      >
        저장
      </button>
      <button
        onClick={handleClose}
        style={{ margin: "16px 0 16px 4px", padding: "8px 20px", fontSize: "16px" }}
      >
        닫기
      </button>
      <span style={{ fontSize: "16px", marginLeft: "12px" }}>
        canvas: {totalWidth} x {totalHeight}
      </span>
      <DrawCanvas
        editMode={editMode}
        data={data}
        setData={handleDataChange}
        scale={dynamicScale}
        totalWidth={totalWidth}
        totalHeight={totalHeight}
      />
    </div>
  );
}

const initialData = [
  { deviceCode: "MDB13", mapGrp: "DEFAULT", stitchDrtn: "", xSize: 300, ySize: 200, xBase: 100, yBase: 100, xCenter: 250, yCenter: 200, xShot: 1, yShot: 1, xScribeSize: 100, yScribeSize: 100, sort: 0, stitchYn: "N", itemNm: "PDA", select: false },
  { deviceCode: "MDB13", mapGrp: "DEFAULT", stitchDrtn: "", xSize: 300, ySize: 200, xBase: 100, yBase: 400, xCenter: 250, yCenter: 500, xShot: 1, yShot: 1, xScribeSize: 100, yScribeSize: 100, sort: 1, stitchYn: "N", itemNm: "PDA", select: false },
  { deviceCode: "MDB13", mapGrp: "DEFAULT", stitchDrtn: "T", xSize: 300, ySize: 200, xBase: 500, yBase: 100, xCenter: 650, yCenter: 200, xShot: 1, yShot: 1, xScribeSize: 100, yScribeSize: 100, sort: 2, stitchYn: "N", itemNm: "PDA", select: false },
  { deviceCode: "MDB13", mapGrp: "DEFAULT", stitchDrtn: "T", xSize: 300, ySize: 200, xBase: 500, yBase: 400, xCenter: 650, yCenter: 500, xShot: 1, yShot: 1, xScribeSize: 100, yScribeSize: 100, sort: 3, stitchYn: "N", itemNm: "PDA", select: false },
  { deviceCode: "MDB13", mapGrp: "DEFAULT", stitchDrtn: "B", xSize: 300, ySize: 200, xBase: 900, yBase: 100, xCenter: 1050, yCenter: 200, xShot: 1, yShot: 1, xScribeSize: 100, yScribeSize: 100, sort: 4, stitchYn: "N", itemNm: "PDA", select: false },
  { deviceCode: "MDB13", mapGrp: "DEFAULT", stitchDrtn: "B", xSize: 300, ySize: 200, xBase: 900, yBase: 400, xCenter: 1050, yCenter: 500, xShot: 1, yShot: 1, xScribeSize: 100, yScribeSize: 100, sort: 5, stitchYn: "N", itemNm: "PDA", select: false },
  { deviceCode: "MDB13", mapGrp: "DEFAULT", stitchDrtn: "", xSize: 300, ySize: 200, xBase: 1300, yBase: 100, xCenter: 1450, yCenter: 200, xShot: 1, yShot: 1, xScribeSize: 100, yScribeSize: 100, sort: 6, stitchYn: "N", itemNm: "PDA", select: false },
  { deviceCode: "MDB13", mapGrp: "DEFAULT", stitchDrtn: "", xSize: 300, ySize: 200, xBase: 1300, yBase: 400, xCenter: 1450, yCenter: 500, xShot: 1, yShot: 1, xScribeSize: 100, yScribeSize: 100, sort: 7, stitchYn: "N", itemNm: "PDA", select: false },
  { deviceCode: "MDB13", mapGrp: "DEFAULT", stitchDrtn: "", xSize: 300, ySize: 200, xBase: 1700, yBase: 100, xCenter: 1850, yCenter: 200, xShot: 1, yShot: 1, xScribeSize: 100, yScribeSize: 100, sort: 8, stitchYn: "N", itemNm: "PDA", select: false },
  { deviceCode: "MDB13", mapGrp: "DEFAULT", stitchDrtn: "", xSize: 300, ySize: 200, xBase: 1700, yBase: 400, xCenter: 1850, yCenter: 500, xShot: 1, yShot: 1, xScribeSize: 100, yScribeSize: 100, sort: 9, stitchYn: "N", itemNm: "PDA", select: false },
  { deviceCode: "MDB13", mapGrp: "DEFAULT", stitchDrtn: "", xSize: 300, ySize: 200, xBase: 2100, yBase: 100, xCenter: 2250, yCenter: 200, xShot: 1, yShot: 1, xScribeSize: 100, yScribeSize: 100, sort: 10, stitchYn: "N", itemNm: "PDA", select: false },
  { deviceCode: "MDB13", mapGrp: "DEFAULT", stitchDrtn: "", xSize: 300, ySize: 200, xBase: 2100, yBase: 400, xCenter: 2250, yCenter: 500, xShot: 1, yShot: 1, xScribeSize: 100, yScribeSize: 100, sort: 11, stitchYn: "N", itemNm: "PDA", select: false },
  { deviceCode: "MDB13", mapGrp: "DEFAULT", stitchDrtn: "", xSize: 300, ySize: 200, xBase: 2500, yBase: 100, xCenter: 2650, yCenter: 200, xShot: 1, yShot: 1, xScribeSize: 100, yScribeSize: 100, sort: 12, stitchYn: "N", itemNm: "PDA", select: false },
  { deviceCode: "MDB13", mapGrp: "DEFAULT", stitchDrtn: "", xSize: 300, ySize: 200, xBase: 2500, yBase: 400, xCenter: 2650, yCenter: 500, xShot: 1, yShot: 1, xScribeSize: 100, yScribeSize: 100, sort: 13, stitchYn: "N", itemNm: "PDA", select: false },
  { deviceCode: "MDB13", mapGrp: "DEFAULT", stitchDrtn: "", xSize: 300, ySize: 200, xBase: 2900, yBase: 100, xCenter: 3050, yCenter: 200, xShot: 1, yShot: 1, xScribeSize: 100, yScribeSize: 100, sort: 14, stitchYn: "N", itemNm: "PDA", select: false },
  { deviceCode: "MDB13", mapGrp: "DEFAULT", stitchDrtn: "", xSize: 300, ySize: 200, xBase: 2900, yBase: 400, xCenter: 3050, yCenter: 500, xShot: 1, yShot: 1, xScribeSize: 100, yScribeSize: 100, sort: 15, stitchYn: "N", itemNm: "PDA", select: false },
  { deviceCode: "MDB13", mapGrp: "DEFAULT", stitchDrtn: "", xSize: 300, ySize: 200, xBase: 3300, yBase: 100, xCenter: 3450, yCenter: 200, xShot: 1, yShot: 1, xScribeSize: 100, yScribeSize: 100, sort: 16, stitchYn: "N", itemNm: "PDA", select: false },
  { deviceCode: "MDB13", mapGrp: "DEFAULT", stitchDrtn: "", xSize: 300, ySize: 200, xBase: 3300, yBase: 400, xCenter: 3450, yCenter: 500, xShot: 1, yShot: 1, xScribeSize: 100, yScribeSize: 100, sort: 17, stitchYn: "N", itemNm: "PDA", select: false },
  { deviceCode: "MDB13", mapGrp: "DEFAULT", stitchDrtn: "", xSize: 300, ySize: 200, xBase: 3700, yBase: 100, xCenter: 3850, yCenter: 200, xShot: 1, yShot: 1, xScribeSize: 100, yScribeSize: 100, sort: 18, stitchYn: "N", itemNm: "PDA", select: false },
  { deviceCode: "MDB13", mapGrp: "DEFAULT", stitchDrtn: "", xSize: 300, ySize: 200, xBase: 3700, yBase: 400, xCenter: 3850, yCenter: 500, xShot: 1, yShot: 1, xScribeSize: 100, yScribeSize: 100, sort: 19, stitchYn: "N", itemNm: "PDA", select: false },
  { deviceCode: "MDB13", mapGrp: "DEFAULT", stitchDrtn: "", xSize: 300, ySize: 200, xBase: 4100, yBase: 100, xCenter: 4250, yCenter: 200, xShot: 1, yShot: 1, xScribeSize: 100, yScribeSize: 100, sort: 20, stitchYn: "N", itemNm: "PDA", select: false },
  { deviceCode: "MDB13", mapGrp: "DEFAULT", stitchDrtn: "", xSize: 300, ySize: 200, xBase: 4100, yBase: 400, xCenter: 4250, yCenter: 500, xShot: 1, yShot: 1, xScribeSize: 100, yScribeSize: 100, sort: 21, stitchYn: "N", itemNm: "PDA", select: false },
  { deviceCode: "MDB13", mapGrp: "DEFAULT", stitchDrtn: "", xSize: 300, ySize: 200, xBase: 4500, yBase: 100, xCenter: 4650, yCenter: 200, xShot: 1, yShot: 1, xScribeSize: 100, yScribeSize: 100, sort: 22, stitchYn: "N", itemNm: "PDA", select: false },
  { deviceCode: "MDB13", mapGrp: "DEFAULT", stitchDrtn: "", xSize: 300, ySize: 200, xBase: 4500, yBase: 400, xCenter: 4650, yCenter: 500, xShot: 1, yShot: 1, xScribeSize: 100, yScribeSize: 100, sort: 23, stitchYn: "N", itemNm: "PDA", select: false },
  { deviceCode: "MDB13", mapGrp: "DEFAULT", stitchDrtn: "", xSize: 300, ySize: 200, xBase: 4900, yBase: 100, xCenter: 5050, yCenter: 200, xShot: 20, yShot: 1, xScribeSize: 100, yScribeSize: 100, sort: 22, stitchYn: "N", itemNm: "PDA", select: false },
];

// 컴포넌트 밖에서 초기 데이터 복사 (참조 분리)
let initialDataCopy = initialData.map(item => ({ ...item }));

const SCALE = 3.5;
const MIN_SIZE = 100;
const PADDING = 50;

// 캔버스 기본 사이즈 상수 선언
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 400;


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

const DrawCanvas = ({ editMode, data, setData, scale, totalWidth, totalHeight }) => {

  const handleRectClick = (index) => {
    if (!editMode) return;
    setData((prev) =>
      prev.map((item, i) => ({ ...item, select: i === index }))
    );
  };

  const handleSvgClick = (e) => {
    if (
      e.target.tagName !== "rect" &&
      e.target.tagName !== "circle" &&
      e.target.tagName !== "text"
    ) {
      setData((prev) => prev.map((item) => ({ ...item, select: false })));
    }
  };


  const changeThirdChar = (index, increment) => {
    setData((prev) =>
      prev.map((item, i) => {
        if (i !== index) return item;
        const itemNm = item.itemNm;
        if (itemNm.length < 3) return item;
        const chars = itemNm.split("");
        const currentChar = chars[2].toUpperCase();
        const newChar = increment
          ? incrementChar(currentChar)
          : decrementChar(currentChar);
        chars[2] = newChar;
        return { ...item, itemNm: chars.join("") };
      })
    );
  };

  return (
    <div
      style={{
        minWidth: totalWidth,
        maxWidth: "100vw",
        overflow: "auto",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <svg
        width={totalWidth}
        height={totalHeight}
        style={{ backgroundColor: "#D4F4FA", userSelect: "none" }} // userSelect 추가
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
        <text
          x={PADDING - 20}
          y={totalHeight - PADDING + 15}
          fontSize="10"
          fill="red"
        >
          0,0
        </text>

        {data.map(
          (
            {
              xSize,
              ySize,
              xBase,
              yBase,
              stitchDrtn,
              sort,
              itemNm,
              select,
              xShot,
              yShot,
              xScribeSize,
              yScribeSize,
            },
            index
          ) => {
            const width = xSize * scale;
            const height = ySize * scale;

            let label = itemNm;
            let suffix = "";
            if (stitchDrtn === "T") suffix = "_D";
            if (stitchDrtn === "B") suffix = "_U";

            const initialItemNm = initialDataCopy[index].itemNm;
            const isChanged = itemNm !== initialItemNm;
            const fillColor = isChanged ? "#D9E5FF" : "#C4FDFF";

            const renderedLabel = (
              <tspan>
                {label}
                {suffix && <tspan fill="red">{suffix}</tspan>}
              </tspan>
            );

            // xShot, yShot 모두 적용
            const rects = [];
            let groupRect = null; // 그룹 사각형

            // 그룹 사각형 좌표 계산
            if ((xShot || 1) > 1 || (yShot || 1) > 1) {
              const margin = 2; // 바깥으로 확장할 픽셀 수
              const groupX = PADDING + xBase * scale - margin;
              const groupY = totalHeight - PADDING - yBase * scale - (ySize * (yShot || 1) + yScribeSize * ((yShot || 1) - 1)) * scale - margin;
              const groupWidth = (xSize * (xShot || 1) + xScribeSize * ((xShot || 1) - 1)) * scale + margin * 2;
              const groupHeight = (ySize * (yShot || 1) + yScribeSize * ((yShot || 1) - 1)) * scale + margin * 2;

              groupRect = (
                <rect
                  key={"group-" + index}
                  x={groupX}
                  y={groupY}
                  width={groupWidth}
                  height={groupHeight}
                  fill="none"
                  stroke="red"
                  strokeWidth={2}
                  pointerEvents="none"
                />
              );
            }

            // 반복 사각형 렌더링
            for (let shotY = 0; shotY < (yShot || 1); shotY++) {
              for (let shotX = 0; shotX < (xShot || 1); shotX++) {
                const xBaseOffset = xBase + shotX * (xSize + xScribeSize);
                const yBaseOffset = yBase + shotY * (ySize + yScribeSize);

                const xPos = PADDING + xBaseOffset * scale;
                const yPos = totalHeight - PADDING - yBaseOffset * scale - height;

                rects.push(
                  <g
                    key={index + "-" + shotX + "-" + shotY}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRectClick(index);
                    }}
                    style={{ cursor: editMode ? "pointer" : "default" }}
                  >
                    <rect
                      x={xPos}
                      y={yPos}
                      width={width}
                      height={height}
                      fill={fillColor}
                      stroke={select ? "#0100FF" : "#000"}
                      strokeWidth={select ? 2 : 1}
                    />
                    {/* 좌측상단에 xSize, ySize 표시 */}
                    <text
                      x={xPos + 2}
                      y={yPos + 10}
                      fontSize="7"
                      fill="#333"
                      textAnchor="start"
                    >
                      {`${xSize}×${ySize}`}
                    </text>
                    <text
                      x={xPos + width - 2}
                      y={yPos + height - 2}
                      fontSize="7"
                      fill="black"
                      textAnchor="end"
                    >
                      {sort}
                    </text>
                    <text
                      x={xPos + width / 2}
                      y={yPos + height / 2 + 4}
                      fontSize="12"
                      fontWeight="bold"
                      fill="black"
                      textAnchor="middle"
                    >
                      {renderedLabel}
                    </text>
                    <text
                      x={xPos + 2}
                      y={yPos + height - 2}
                      fontSize="7"
                      fill="#555"
                      textAnchor="start"
                    >
                      {`${xBaseOffset},${yBaseOffset}`}
                    </text>
                    {select && shotX === 0 && shotY === 0 && (
                      <>
                        <circle
                          cx={xPos + width / 2}
                          cy={yPos + height / 2 - 19}
                          r={10}
                          fill="#0100FF"
                          style={{ cursor: "pointer" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            changeThirdChar(index, true);
                          }}
                        />
                        <text
                          x={xPos + width / 2}
                          y={yPos + height / 2 - 15}
                          fontSize="16"
                          fill="white"
                          fontWeight="bold"
                          textAnchor="middle"
                          style={{ pointerEvents: "none", userSelect: "none" }} // 추가
                        >
                          +
                        </text>
                        <circle
                          cx={xPos + width / 2}
                          cy={yPos + height / 2 + 18}
                          r={10}
                          fill="#0100FF"
                          style={{ cursor: "pointer" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            changeThirdChar(index, false);
                          }}
                        />
                        <text
                          x={xPos + width / 2}
                          y={yPos + height / 2 + 23}
                          fontSize="16"
                          fill="white"
                          fontWeight="bold"
                          textAnchor="middle"
                          style={{ pointerEvents: "none", userSelect: "none" }} // 추가
                        >
                          -
                        </text>
                      </>
                    )}
                  </g>
                );
              }
            }
            return groupRect ? [groupRect, ...rects] : rects;
          }
        )}
      </svg>
    </div>
  );
};

export default App;
