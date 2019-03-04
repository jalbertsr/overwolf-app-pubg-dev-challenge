/*global overwolf*/

import { REQUIRED_FEATURES } from '../constants/requiredFeatures';
import { LogService as log } from './log-service';

const REGISTER_RETRY_TIMEOUT = 10000;

function registerToGEP() {
  console.log('registeredToGEP');
  overwolf.games.events.setRequiredFeatures(REQUIRED_FEATURES, function(
    response,
  ) {
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
  for (const eventData of eventsInfo.events) {
    log('EVENTS', eventData.name, eventData.data);
  }
}

async function _handleInfoUpdate(eventsInfo) {
  log('UPDATES', eventsInfo.feature, eventsInfo.info);
}

export default {
  registerToGEP,
};
