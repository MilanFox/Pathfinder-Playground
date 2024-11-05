import { styles } from '../store/style.js';
import { grid } from '../store/grid.js';

export const canvas = document.querySelector('canvas');

export const findClickedCell = (event) => {
  const { clientX, clientY } = event;
  return { x: Math.floor(clientX / styles.cellSize), y: Math.floor(clientY / styles.cellSize) };
};

export const drawGridLines = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');

  const { width, height } = canvas;
  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = styles.colorLight;

  for (let x = 0; x < width; x += styles.cellSize) {
    for (let y = 0; y < height; y += styles.cellSize) {
      ctx.strokeRect(x, y, styles.cellSize, styles.cellSize);
    }
  }
};

const drawRect = ({ color, pos, ctx }) => {
  ctx.fillStyle = color;
  ctx.fillRect(pos.x * styles.cellSize, pos.y * styles.cellSize, styles.cellSize, styles.cellSize);
};

const drawChar = ({ pos, char, color, ctx }) => {
  ctx.font = `${styles.cellSize / 2}px Arial`;
  ctx.fillStyle = color;
  const textWidth = ctx.measureText(char).width;
  const textHeight = styles.cellSize;
  const x = pos.x * styles.cellSize + (styles.cellSize - textWidth) / 2;
  const y = pos.y * styles.cellSize + (styles.cellSize + textHeight) / 2 - (styles.cellSize / 3);
  ctx.fillText(char, x, y);
};

export const drawToken = (token) => {
  if (token.x === null || token.y === null) return;
  const ctx = canvas.getContext('2d');
  drawRect({ ctx, pos: token, color: styles.colorMid });
  drawChar({ ctx, pos: token, color: styles.colorWhite, char: token.label });
};

export const drawWeights = () => {
  const ctx = canvas.getContext('2d');
  const { width, height } = canvas;
  for (let x = 0; x < width; x += styles.cellSize) {
    for (let y = 0; y < height; y += styles.cellSize) {
      const pos = { x: x / styles.cellSize, y: y / styles.cellSize };
      const currentWeight = grid.getWeight(pos);
      switch (currentWeight) {
        case 0:
        case undefined:
          continue;
        case 'Infinity':
          drawRect({ ctx, pos, color: styles.colorDark });
          continue;
        default:
          drawChar({ ctx, pos, color: styles.colorDark, char: currentWeight.toString() });
      }
    }
  }
};

export const drawPath = ({ path, color }) => {
  const ctx = canvas.getContext('2d');
  ctx.strokeStyle = color;
  ctx.lineWidth = styles.cellSize / 5;

  ctx.beginPath();
  path.forEach((cell, index) => {
    const x = cell.x * styles.cellSize + styles.cellSize / 2;
    const y = cell.y * styles.cellSize + styles.cellSize / 2;
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
};

