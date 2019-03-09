/*global overwolf*/

const _gameRunningChangedListeners = [];

function _init() {
  overwolf.games.onGameInfoUpdated.removeListener(_onGameInfoUpdated);
  overwolf.games.onGameInfoUpdated.addListener(_onGameInfoUpdated);
}

function _onGameInfoUpdated(event) {
  let gameRunning;

  if (event && (event.runningChanged || event.gameChanged)) {
    gameRunning = event.gameInfo && event.gameInfo.isRunning;
    for (const listener of _gameRunningChangedListeners) {
      listener(gameRunning);
    }
  }
}

async function isGameRunning() {
  return await _isGameRunning();
}

function _isGameRunning() {
  return new Promise(resolve => {
    overwolf.games.getRunningGameInfo(function(runningGameInfo) {
      if (runningGameInfo && runningGameInfo.isRunning) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

function addGameRunningChangedListener(callback) {
  _gameRunningChangedListeners.push(callback);
}

_init();

export default {
  isGameRunning,
  addGameRunningChangedListener,
};
