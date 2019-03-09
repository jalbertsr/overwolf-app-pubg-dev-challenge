/*global overwolf*/

import { REQUIRED_FEATURES } from '../constants/requiredFeatures';
import { LogService as log } from './log-service';
import { sendInGameData } from './apiService';

const REGISTER_RETRY_TIMEOUT = 10000;

function registerToGEP() {
  console.log('registeredToGEP');
  overwolf.games.events.setRequiredFeatures(REQUIRED_FEATURES, response => {
    if (response.status === 'error') {
      setTimeout(registerToGEP, REGISTER_RETRY_TIMEOUT);
    } else if (response.status === 'success') {
      overwolf.games.events.onNewEvents.removeListener(_handleGameEvent);
      overwolf.games.events.onNewEvents.addListener(_handleGameEvent);

      overwolf.games.events.onInfoUpdates2.removeListener(_handleInfoUpdate);
      overwolf.games.events.onInfoUpdates2.addListener(_handleInfoUpdate);
    }
  });
}

async function _handleGameEvent(eventsInfo) {
  const promisesArray = [];
  for (const eventData of eventsInfo.events) {
    log('EVENTS', eventData.name, eventData.data);
    const payload = {
      name: eventData.name,
      data: eventData.data,
    };

    promisesArray.push(sendInGameData(payload));
  }

  Promise.all(promisesArray);
}

async function _handleInfoUpdate(eventsInfo) {
  log('UPDATES', eventsInfo.feature, eventsInfo.info);
  const payload = {
    feature: eventsInfo.feature,
    data: eventsInfo.info,
  };

  sendInGameData(payload);
}

export default {
  registerToGEP,
};
