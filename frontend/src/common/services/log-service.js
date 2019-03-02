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
            case REQUIRED_FEATURES_DICT.MATCH:
                console.log(`Mode: ${data.match_info.mode}`)
                break;
            case REQUIRED_FEATURES_DICT.RANK:
                const { me, total_teams } = data.match_info;
                console.log(`My rank: ${me} out of ${total_teams}` )
                break;
            case REQUIRED_FEATURES_DICT.MAP:
                const mapName = data.match_info.map;
                console.log(`Playing in ${MAP_NAMES[mapName]} map.`);
                break;
            case REQUIRED_FEATURES_DICT.PHASE:
                const phaseName = data.game_info.phase;
                console.log(`Phase of the game: ${phaseName}`);
                break;
            case REQUIRED_FEATURES_DICT.TEAM: 
                const { team_members } = data.match_info.nicknames;
                const teamNicknames = team_members.length ? team_members.reduce((acc, {player}) => player + ', ' + acc, '').slice(0, -2) : '';
                console.log(`Team members: ${teamNicknames}.`) 
                break;
            case REQUIRED_FEATURES_DICT.KILL:
            const { kills, headshots, total_damage_dealt, max_kill_distance } = data.match_info; 
            console.log(
                `
                Stats from your recent match: 
                    - Kills: ${kills}
                    - Headshots: ${headshots}
                    - Total damage dealt: ${total_damage_dealt}
                    - Max kill distance: ${max_kill_distance/100} m   
            `)
            break;
            default:
                console.log(`Feature type ${feature} | data -> ${JSON.stringify(data)}`);
                break;
        }
    } else if (type === 'EVENTS') {
        switch (feature) {
            case REQUIRED_FEATURES_DICT.DEATH:
                console.log('Event DEATH happened', data)
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
                console.log('Damage dealt', data);
                break;
            case REQUIRED_FEATURES_DICT.MATCH_START:
                console.log('Match Started!');
                break;
            case REQUIRED_FEATURES_DICT.MATCH_END:
                console.log('Match Ended!');
                break;
            case REQUIRED_FEATURES_DICT.MATCH_SUMMARY:
                console.log('You are in the match Summary!');
                break;
            default:
                console.log(`Event type ${feature} | data -> ${JSON.stringify(data)}`);
                break;
        }
    } else {
        console.error(`Log service TYPE ${type} not found, got this data: ${JSON.stringify(data)}`)
    }

}