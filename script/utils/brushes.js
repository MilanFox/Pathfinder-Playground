import { grid } from '../store/grid.js';
import { eventHandler, events } from './events.js';

/* ACTIONS */

export const setToken = (id, pos) => {
  grid.tokens[id].x = pos.x;
  grid.tokens[id].y = pos.y;
  eventHandler.emit(events.DATA_CHANGED);
};

export const offsetWeight = (offset, pos) => {
  grid.setWeight(pos, grid.getWeight(pos) + offset);
  eventHandler.emit(events.DATA_CHANGED);
};

export const setWeight = (value, pos) => {
  grid.setWeight(pos, value);
  eventHandler.emit(events.DATA_CHANGED);
};

/* DATA */

export const brush = {
  data: {
    token_a: { value: 'token_a', label: 'A', action: (pos) => setToken('a', pos), tooltip: 'Set Token A' },
    token_b: { value: 'token_b', label: 'B', action: (pos) => setToken('b', pos), tooltip: 'Set Token B'  },
    increase: { value: 'increase', label: '+', action: (pos) => offsetWeight(1, pos), tooltip: 'Increase weight of cell'  },
    decrease: { value: 'decrease', label: '-', action: (pos) => offsetWeight(-1, pos), tooltip: 'Decrease weight of cell' },
    block: { value: 'block', label: '✗', action: (pos) => setWeight(Infinity, pos), tooltip: 'Block cell entirely' },
    clear: { value: 'clear', label: '✓', action: (pos) => setWeight(0, pos), tooltip: 'Reset cell' },
  },
  get current() {
    return document.querySelector('input[name="brush"]:checked').value;
  },
};

/* UTILS */

export const buildBrushMenu = () => {
  const menu = document.getElementById('menu');

  const buildMenuItem = (brush) => {
    const menuItemLabel = document.createElement('label');
    menuItemLabel.innerText = brush.label;

    const menuItem = document.createElement('input');
    menuItem.value = brush.value;
    menuItem.name = 'brush';
    menuItem.type = 'radio';
    menuItemLabel.appendChild(menuItem);


    const tooltip = document.createElement('div')
    tooltip.innerText = brush.tooltip
    tooltip.classList.add('tooltip')
    menuItemLabel.appendChild(tooltip)

    return menuItemLabel;
  };

  for (const brushType of Object.values(brush.data)) menu.appendChild(buildMenuItem(brushType));
  menu.querySelector('input').checked = true;
};
