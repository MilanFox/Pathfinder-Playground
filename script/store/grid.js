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
    if (value === 'Infinity') this.weightMap[pos.y][pos.x] = 'Infinity';
    else this.weightMap[pos.y][pos.x] = clamp(0, value, 9);
  },
  get hash() {
    const jsonString = JSON.stringify({ tokens: this.tokens, weightMap: this.weightMap });
    return btoa(jsonString);
  },
  restoreFromHash(hash) {
    const jsonString = atob(hash);
    const data = JSON.parse(jsonString);
    for (const key of Object.keys(data)) this[key] = data[key];
  },
};
