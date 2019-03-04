const _listeners = [];

function addListener(eventHandler) {
  _listeners.push(eventHandler);
}

function trigger(eventName, data) {
  for (const listener of _listeners) {
    listener(eventName, data);
  }
}

export default {
  addListener,
  trigger,
};
