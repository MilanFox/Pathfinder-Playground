import { drawGridLines, findClickedCell, canvas, drawToken, drawWeights, drawPath } from './script/utils/canvas.js';
import { brush, buildBrushMenu } from './script/utils/brushes.js';
import { grid } from './script/store/grid.js';
import { eventHandler, events } from './script/utils/events.js';
import { setCssStyles, styles } from './script/store/style.js';
import { findPath } from './script/utils/pathfinder.js';

const drawCanvas = () => {
  drawGridLines();
  const path = findPath(grid);
  if (path && path.length > 2) drawPath({ path, color: styles.colorMid });
  for (const token of grid.allTokens) drawToken(token);
  drawWeights();
};

const handleClick = (event) => {
  if (event.target !== canvas) return;
  brush.data[brush.current].action(findClickedCell(event));
};

setCssStyles();
buildBrushMenu();
drawCanvas();

window.addEventListener('resize', drawCanvas);
window.addEventListener('click', handleClick);
eventHandler.on(events.DATA_CHANGED, drawCanvas);
