/*global overwolf*/

import WindowNames from './common/constants/windowNames';
import RunningGameService from './common/services/running-game-service';
import WindowsService from './common/services/windows-service';
import GEPService from './common/services/gep-service';
import EventBus from './common/services/event-bus';
import HotkeysService from './common/services/hotkeys-service';
import ScreenshotService from './common/services/screenshotService';

class BackgroundController {
  static async run() {
    window.ow_eventBus = EventBus;

    BackgroundController._registerAppLaunchTriggerHandler();

    const startupWindow = await WindowsService.getStartupWindowName();
    WindowsService.restore(startupWindow);

    const isGameRunning = await RunningGameService.isGameRunning();
    if (isGameRunning) {
      GEPService.registerToGEP();
      await WindowsService.restore(WindowNames.IN_GAME);
      WindowsService.minimize(WindowNames.IN_GAME);
    }

    RunningGameService.addGameRunningChangedListener(isGameRunning => {
      if (isGameRunning) {
        WindowsService.restore(WindowNames.IN_GAME);
      } else {
        // WindowsService.minimize(WindowNames.IN_GAME);
        window.close();
      }
    });
  }

  static _registerAppLaunchTriggerHandler() {
    overwolf.extensions.onAppLaunchTriggered.removeListener(
      BackgroundController._onAppRelaunch,
    );
    overwolf.extensions.onAppLaunchTriggered.addListener(
      BackgroundController._onAppRelaunch,
    );
  }

  static _onAppRelaunch() {
    WindowsService.restore(WindowNames.SETTINGS);
  }

  static _registerHotkeys() {
    HotkeysService.setTakeScreenshotHotkey(async () => {
      try {
        const screenshotUrl = await ScreenshotService.takeScreenshot();
        window.ow_eventBus.trigger('screenshot', screenshotUrl);
      } catch (e) {
        console.error(e);
      }
    });
  }
}

export default BackgroundController;
