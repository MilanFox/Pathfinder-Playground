const clamp = (min, val, max) => Math.min(Math.max(val, min), max);

export const grid = {
  tokens: {
    a: { label: 'A', x: null, y: null },
    b: { label: 'B', x: null, y: null },
  },
  weightMap: {},
  get allTokens() {
    return Object.values(this.tokens);
  },
  getWeight(pos) {
    if (!this.weightMap[pos.y]?.[pos.x]) return 0;
    return this.weightMap[pos.y]?.[pos.x];
  },
  setWeight(pos, value) {
    if (!this.weightMap[pos.y]) this.weightMap[pos.y] = {};
    if (value === Infinity) this.weightMap[pos.y][pos.x] = Infinity;
    else this.weightMap[pos.y][pos.x] = clamp(0, value, 9);
  },
};
