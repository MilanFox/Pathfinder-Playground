export const events = {
  DATA_CHANGED: 'dataChanged',
};

export const eventHandler = {
  events: {},
  on(eventName, cb) {
    (this.events[eventName] ??= []).push(cb);
  },
  emit(eventName, payload) {
    this.events[eventName]?.forEach(f => f(payload));
  },
};

