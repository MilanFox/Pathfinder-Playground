import { drawGridLines, findClickedCell, canvas, drawToken, drawWeights, drawPath } from './script/utils/canvas.js';
import { brush, buildBrushMenu } from './script/utils/brushes.js';
import { grid } from './script/store/grid.js';
import { eventHandler, events } from './script/utils/events.js';
import { setCssStyles, styles } from './script/store/style.js';
import { findPath } from './script/utils/pathfinder.js';
import { measurePerformance } from './script/utils/performance.js';
import { updateInfo } from './script/utils/info.js';
import { tryRestoreFromQuery, updateUrlQuery } from './script/utils/deeplink.js';

let isDragging = false;
let draggedCells = new Set();

const updateFrame = () => {
  drawGridLines();

  const [path, performance] = measurePerformance(() => findPath(grid));
  if (path && path.length > 2) {
    drawPath({ path, color: styles.colorMid });
    updateInfo(`The path took ${performance}ms to calculate.`);
  }

  for (const token of grid.allTokens) drawToken(token);
  drawWeights();

  updateUrlQuery();
};

const applyBrushAction = (event) => {
  if (event.target !== canvas) return;
  const posEvent = event.touches ? event.touches[0] : event;
  const cell = findClickedCell(posEvent);
  const cellId = `${cell.x},${cell.y}`;
  if (!draggedCells.has(cellId)) {
    brush.data[brush.current].action(cell);
    draggedCells.add(cellId);
  }
};

const handleStart = (event) => {
  if (event.target !== canvas) return;
  isDragging = true;
  draggedCells.clear();
  applyBrushAction(event);
};

const handleMove = (event) => {
  if (isDragging) applyBrushAction(event);
};

const handleEnd = () => {
  isDragging = false;
  draggedCells.clear();
};

const initiateState = () => {
  window.addEventListener('resize', updateFrame);
  window.addEventListener('mousedown', handleStart);
  window.addEventListener('mousemove', handleMove);
  window.addEventListener('mouseup', handleEnd);
  window.addEventListener('touchstart', handleStart);
  window.addEventListener('touchmove', handleMove);
  window.addEventListener('touchend', handleEnd);

  eventHandler.on(events.DATA_CHANGED, updateFrame);

  setCssStyles();
  buildBrushMenu();
  tryRestoreFromQuery();
  updateFrame();
};

initiateState();
