const getNeighbors = (pos) => [
  { x: pos.x + 1, y: pos.y },
  { x: pos.x - 1, y: pos.y },
  { x: pos.x, y: pos.y + 1 },
  { x: pos.x, y: pos.y - 1 },
];

const heuristic = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

export const findPath = (grid) => {
  const start = grid.tokens.a;
  const goal = grid.tokens.b;

  if (start.x === null || start.y === null || goal.x === null || goal.y === null) return;

  const openSet = new Set([`${start.x},${start.y}`]);
  const cameFrom = {};
  const gScore = { [`${start.x},${start.y}`]: 0 };
  const fScore = { [`${start.x},${start.y}`]: heuristic(start, goal) };
  const visited = new Set();

  while (openSet.size > 0) {
    let current = [...openSet].reduce((lowest, pos) => (fScore[pos] < fScore[lowest] ? pos : lowest));

    const [cx, cy] = current.split(',').map(Number);
    if (cx === goal.x && cy === goal.y) {
      const path = [];
      while (current) {
        const [x, y] = current.split(',').map(Number);
        path.unshift({ x, y });
        current = cameFrom[current];
      }
      return path;
    }

    openSet.delete(current);
    visited.add(current);

    for (const neighbor of getNeighbors({ x: cx, y: cy })) {
      const { x, y } = neighbor;
      if (x < 0 || y < 0) continue;

      const cellWeight = grid.getWeight(neighbor);
      if (cellWeight === 'Infinity') continue;

      const neighborKey = `${x},${y}`;
      if (visited.has(neighborKey)) continue;

      const tentativeGScore = gScore[current] + cellWeight + 1;

      if (tentativeGScore < (gScore[neighborKey] || Infinity)) {
        cameFrom[neighborKey] = current;
        gScore[neighborKey] = tentativeGScore;
        fScore[neighborKey] = tentativeGScore + heuristic(neighbor, goal);
        if (!openSet.has(neighborKey)) openSet.add(neighborKey);
      }
    }
  }

  return null;
};
