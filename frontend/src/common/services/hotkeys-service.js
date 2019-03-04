/*global overwolf*/

import HOTKEYS from '../constants/hotkeys-ids';

function _getHotkey(hotkeyId, callback) {
  overwolf.settings.getHotKey(hotkeyId, function(result) {
    if (!result || result.status === 'error' || !result.hotkey) {
      setTimeout(function() {
        _getHotkey(hotkeyId, callback);
      }, 2000);
    } else {
      callback(result.hotkey);
    }
  });
}

// function _setHotkey(hotkeyId, action) {
// 	overwolf.settings.registerHotKey(hotkeyId, function (result) {
// 		if (result.status === 'success') {
// 			action();
// 		} else {
// 			console.error(`[HOTKEYS SERVICE] failed to register hotkey ${hotkeyId}`);
// 		}
// 	});
// }

function getToggleHotkey() {
  return new Promise(resolve => {
    _getHotkey(HOTKEYS.TOGGLE, function(result) {
      resolve(result);
    });
  });
}

// Example on set a hotkey
// function setTakeScreenshotHotkey(action) {
// 	_setHotkey(HOTKEYS.TAKE_SCREENSHOT, action);
// }

function addHotkeyChangeListener(listener) {
  overwolf.settings.OnHotKeyChanged.addListener(listener);
}

export default {
  getToggleHotkey,
  addHotkeyChangeListener,
};
