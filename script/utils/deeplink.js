import { grid } from '../store/grid.js';

export const updateUrlQuery = () => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  params.set('seed', grid.hash);
  url.search = params.toString();
  window.history.replaceState({}, '', url);
};

export const tryRestoreFromQuery = () => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const seed = params.get('seed');
  if (!seed) return;
  grid.restoreFromHash(seed);
};
