export const styles = {
  colorWhite: '#FFFFFF',
  colorLight: '#E2E8DD',
  colorMid: '#2F9C95',
  colorDark: '#697268',
  cellSize: 30,
};

const preprocessSteps = {
  toPx: (num) => `${num}px`,
  toKebab: (str) => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(),
};

const preprocessMap = {
  cellSize: preprocessSteps.toPx,
};

export const setCssStyles = () => {
  for (const [key, value] of Object.entries(styles)) {
    const processedValue = preprocessMap[key]?.(value) || value;
    document.body.style.setProperty(`--${preprocessSteps.toKebab(key)}`, processedValue);
  }
};
