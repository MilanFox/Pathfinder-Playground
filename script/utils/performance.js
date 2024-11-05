export const measurePerformance = (cb) => {
  const start = performance.now();
  const returnValue = cb();
  const end = performance.now();
  return [returnValue, (end - start).toFixed(2)];
};
