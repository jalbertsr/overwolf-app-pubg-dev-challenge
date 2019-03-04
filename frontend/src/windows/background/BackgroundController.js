/*global overwolf*/

import WindowNames from '../../common/constants/windowNames';
import RunningGameService from '../../common/services/running-game-service';
import WindowsService from '../../common/services/windows-service';
import GEPService from '../../common/services/gep-service';
import EventBus from '../../common/services/event-bus';

class BackgroundController {
	static async run() {
		window.ow_eventBus = EventBus;

		BackgroundController._registerAppLaunchTriggerHandler();
		
		let startupWindow = WindowsService.getStartupWindowName();
		WindowsService.restore(startupWindow);

		let isGameRunning = RunningGameService.isGameRunning();
		if (isGameRunning) {
			GEPService.registerToGEP();
			await WindowsService.restore(WindowNames.IN_GAME);
			WindowsService.minimize(WindowNames.IN_GAME);
		}

		RunningGameService.addGameRunningChangedListener((isGameRunning) => {
			if (isGameRunning) {
				WindowsService.restore(WindowNames.IN_GAME);
			} else {
				// WindowsService.minimize(WindowNames.IN_GAME);
				console.log('closing app after game closed');
				window.close();
			}
		});
	}

	static _registerAppLaunchTriggerHandler() {
		overwolf.extensions.onAppLaunchTriggered.removeListener(
			BackgroundController._onAppRelaunch);
		overwolf.extensions.onAppLaunchTriggered.addListener(
			BackgroundController._onAppRelaunch);
	}

	static _onAppRelaunch() {
		WindowsService.restore(WindowNames.SETTINGS);
	}

	static _registerHotkeys() {
		// How to trigger an event
		// HotkeysService.setTakeScreenshotHotkey(async () => {
		// 	try {
		// 		let screenshotUrl = await ScreenshotService.takeScreenshot();
		// 		window.ow_eventBus.trigger('screenshot', screenshotUrl);
		// 	} catch (e) {
		// 		console.error(e);
		// 	}
		// });
	}
}

export default BackgroundController;