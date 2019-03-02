import { REQUIRED_FEATURES_DICT } from '../constants/requiredFeatures';
import MAP_NAMES from '../constants/mapNames';

export function LogService(type, feature, data) {
    if (type === 'UPDATES') {
        switch (feature) {
            case REQUIRED_FEATURES_DICT.ROSTER:
                console.log('roster')
                break;
            case REQUIRED_FEATURES_DICT.LOCATION:
                const { location } = data.game_info;
                const { x, y , z} = JSON.parse(location);
                console.log(`Location: X: ${x}, Y: ${y}, Z: ${z}`)
                break;
            case REQUIRED_FEATURES_DICT.DEATH: 
                break;
            case REQUIRED_FEATURES_DICT.MAP:
                const mapName = data.match_info.map;
                console.log(`Playing in ${MAP_NAMES[mapName]} map.`);
                break;
            case REQUIRED_FEATURES_DICT.PHASE:
                const phaseName = data.game_info.phase;
                console.log(`Phase of the game: ${phaseName}`);
                break;
            default:
                console.log(`Feature type ${feature} | data -> ${JSON.stringify(data)}`);
                break;
        }
    } else if (type === 'EVENTS') {
        switch (feature) {
            case REQUIRED_FEATURES_DICT.DEATH:
                console.log('Event DEATH happened')
                break;
            case REQUIRED_FEATURES_DICT.KILLER:
            let killerName = '';
            try { 
                const parsedString = JSON.parse(data);
                killerName = parsedString.killer_name;
                console.log(`Got killed by ${killerName}`);
            } catch (e) { 
                console.error(e)
            }
                break;
            case REQUIRED_FEATURES_DICT.DAMAGE_DEALT:
                console.log('Damage dealt');
                break;
            default:
                console.log(`Event type ${feature} | data -> ${JSON.stringify(data)}`);
                break;
        }
    } else {
        console.error(`Log service TYPE ${type} not found`)
    }

}