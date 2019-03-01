/*global overwolf*/


const REQUIRED_FEATURES = [
	// Event
	'death',
	'knockedout',
	'damage_dealt',
	'headshot',
	'kill',
	'killer',
	'matchEnd',
	'matchStart',
	'revived',
	// Info Update
	'headshots',
	'kills',
	'max_kill_distance',
	'total_damage_dealt',
	'location',
	'map',
	'mode',
	'name',
	'phase',
	'me',
	'total_teams',
	'roster',
	'nicknames'
];
const REGISTER_RETRY_TIMEOUT = 10000;

function registerToGEP() {
	console.log('registeredToGEP');
	overwolf.games.events.setRequiredFeatures(REQUIRED_FEATURES, function (response) {
		console.log('REQUIRED_FEATURES', response);
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
	for (let eventData of eventsInfo.events) {
		console.log('events', eventData)
	}
}

async function _handleInfoUpdate(eventsInfo) {
	console.log('info update', eventsInfo);
	overwolf.log.info("Info Update: " + eventsInfo.feature);
  }

export default {
	registerToGEP
}