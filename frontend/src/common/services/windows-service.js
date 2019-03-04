/*global overwolf*/

import WindowNames from '../constants/windowNames';
import LaunchSourceService from './launch-source-service';
import RunningGameService from './running-game-service';

function _obtainWindow(name) {
  return new Promise((resolve, reject) => {
    overwolf.windows.obtainDeclaredWindow(name, response => {
      if (response.status !== 'success') {
        return reject(response);
      }

      resolve(response);
    });
  });
}

function _getCurrentWindow() {
  return new Promise((resolve, reject) => {
    overwolf.windows.getCurrentWindow(result => {
      if (result.status === 'success') {
        resolve(result.window);
      } else {
        reject(result);
      }
    });
  });
}

function restore(name) {
  return new Promise(async (resolve, reject) => {
    try {
      await _obtainWindow(name);
      overwolf.windows.restore(name, result => {
        if (result.status === 'success') {
          resolve();
        } else {
          reject(result);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
}

function dragMove(name) {
  return new Promise(async (resolve, reject) => {
    try {
      await _obtainWindow(name);
      const window = await _getCurrentWindow();
      overwolf.windows.dragMove(window.id, result => {
        if (result.status === 'success') {
          resolve();
        } else {
          reject(result);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
}

function minimize(name) {
  return new Promise(async (resolve, reject) => {
    try {
      await _obtainWindow(name);
      overwolf.windows.minimize(name, result => {
        if (result.status === 'success') {
          resolve();
        } else {
          reject(result);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
}

function close(name) {
  return new Promise(async (resolve, reject) => {
    try {
      await _obtainWindow(name);
      overwolf.windows.close(name, result => {
        if (result.status === 'success') {
          resolve();
        } else {
          reject(result);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
}

async function getStartupWindowName() {
  const launchSource = LaunchSourceService.getLaunchSource();

  if (launchSource === 'gamelaunchevent') {
    return WindowNames.IN_GAME;
  }

  // if toggle hotkey -> 'settings'

  const isGameRunning = await RunningGameService.isGameRunning();
  if (isGameRunning) {
    return WindowNames.IN_GAME;
  }

  return WindowNames.SETTINGS;
}

export default {
  close,
  restore,
  dragMove,
  minimize,
  getStartupWindowName,
};
