import { drawGridLines, findClickedCell, canvas, drawToken, drawWeights, drawPath } from './script/utils/canvas.js';
import { brush, buildBrushMenu } from './script/utils/brushes.js';
import { grid } from './script/store/grid.js';
import { eventHandler, events } from './script/utils/events.js';
import { setCssStyles, styles } from './script/store/style.js';
import { findPath } from './script/utils/pathfinder.js';

let isDragging = false;
let draggedCells = new Set();

const drawCanvas = () => {
  drawGridLines();
  const path = findPath(grid);
  if (path && path.length > 2) drawPath({ path, color: styles.colorMid });
  for (const token of grid.allTokens) drawToken(token);
  drawWeights();
};

const applyBrushAction = (event) => {
  if (event.target !== canvas) return;
  const cell = findClickedCell(event);

  const cellId = `${cell.x},${cell.y}`;
  if (!draggedCells.has(cellId)) {
    brush.data[brush.current].action(cell);
    draggedCells.add(cellId);
  }
};

const handleMouseDown = (event) => {
  if (event.target !== canvas) return;
  isDragging = true;
  draggedCells.clear();
  applyBrushAction(event);
};

const handleMouseMove = (event) => {
  if (isDragging) applyBrushAction(event);
};

const handleMouseUp = () => {
  isDragging = false;
  draggedCells.clear();
};

setCssStyles();
buildBrushMenu();
drawCanvas();

window.addEventListener('resize', drawCanvas);
window.addEventListener('mousedown', handleMouseDown);
window.addEventListener('mousemove', handleMouseMove);
window.addEventListener('mouseup', handleMouseUp);
eventHandler.on(events.DATA_CHANGED, drawCanvas);
