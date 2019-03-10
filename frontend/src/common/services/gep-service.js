/*global overwolf*/

import { REQUIRED_FEATURES } from '../constants/requiredFeatures';
import { dataFormatterService } from './dataFormatter';
import { sendInGameData } from './apiService';

const REGISTER_RETRY_TIMEOUT = 10000;

const requestBodyIsReady = payload =>
  payload !== null &&
  payload !== undefined &&
  !!Object.keys(payload).length &&
  !!Object.keys(payload.data).length;

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
    const payload = dataFormatterService(
      'EVENTS',
      eventData.name,
      eventData.data,
    );
    if (requestBodyIsReady(payload)) {
      promisesArray.push(sendInGameData(payload));
    }
  }

  Promise.all(promisesArray);
}

async function _handleInfoUpdate(eventsInfo) {
  const payload = dataFormatterService(
    'UPDATES',
    eventsInfo.feature,
    eventsInfo.info,
  );
  if (requestBodyIsReady(payload)) {
    sendInGameData(payload);
  }
}

export default {
  registerToGEP,
};
