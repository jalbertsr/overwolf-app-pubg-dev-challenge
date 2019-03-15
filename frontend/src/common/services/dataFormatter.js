import { REQUIRED_FEATURES_DICT } from '../constants/requiredFeatures';
import MAP_NAMES from '../constants/mapNames';
import UserService from './userInfoService';
import WindowsService from './windows-service';
import WindowNames from '../constants/windowNames';

export const defaultPayload = {
  accountId: UserService.getAccountId(),
  readOnly: false,
  createPlayer: false,
  isLocation: false,
};

export function dataFormatterService(type, feature, data) {
  if (type === 'UPDATES') {
    switch (feature) {
      case REQUIRED_FEATURES_DICT.ROSTER:
        console.log(data);
        const values = Object.values(data.match_info);
        const { player: playerName } = JSON.parse(values);
        console.log(playerName);
        break;
      case REQUIRED_FEATURES_DICT.LOCATION:
        const { location } = data.game_info;
        const { x, y, z } = JSON.parse(location);
        console.log(`Location: X: ${x}, Y: ${y}, Z: ${z}`);
        if (x && y && z) {
          return {
            ...defaultPayload,
            isLocation: true,
            data: {
              locationHistory: { x, y, z },
            },
          };
        }
        break;
      case REQUIRED_FEATURES_DICT.MATCH:
        const { mode } = data.match_info;
        console.log(`Mode: ${data.match_info.mode}`);
        if (mode) {
          return {
            ...defaultPayload,
            data: { gameMode: mode },
          };
        }
        break;
      case REQUIRED_FEATURES_DICT.RANK:
        const { me, total_teams } = data.match_info;
        me && console.log(`my rank ${me}`);
        total_teams && console.log(`total players ${total_teams}`);

        if (me) {
          return {
            ...defaultPayload,
            data: { myRank: me },
          };
        } else if (total_teams) {
          return {
            ...defaultPayload,
            data: { totalTeams: total_teams },
          };
        }
        break;
      case REQUIRED_FEATURES_DICT.MAP:
        const mapName = data.match_info.map;
        console.log(`Playing in ${MAP_NAMES[mapName]} map.`);
        if (mapName) {
          return {
            ...defaultPayload,
            data: { mapName: MAP_NAMES[mapName] },
          };
        }
        break;
      case REQUIRED_FEATURES_DICT.PHASE:
        const phaseName = data.game_info.phase;
        console.log(`Phase of the game: ${phaseName}`);
        if (phaseName === 'loading_screen') {
          return {
            ...defaultPayload,
            data: { nickname: UserService.getPUBGNickname() },
            createPlayer: true,
          };
        }
        break;
      case REQUIRED_FEATURES_DICT.TEAM:
        const { team_members } = data.match_info.nicknames;
        const teamNicknames = team_members.length
          ? team_members
              .reduce((acc, { player }) => player + ', ' + acc, '')
              .slice(0, -2)
          : '';
        console.log(`Team members: ${teamNicknames}.`);
        break;
      case REQUIRED_FEATURES_DICT.KILL:
        const payload = {};
        const {
          kills,
          headshots,
          total_damage_dealt,
          max_kill_distance,
        } = data.match_info;
        if (kills) payload['kills'] = kills;
        if (headshots) payload['headshots'] = headshots;
        if (total_damage_dealt)
          payload['totalDamageDealt'] = total_damage_dealt;
        if (max_kill_distance) payload['maxKillDistance'] = max_kill_distance;
        console.log(JSON.stringify(payload));
        return {
          ...defaultPayload,
          data: { ...payload },
        };
      case REQUIRED_FEATURES_DICT.ME:
        const { name } = data.me;
        console.log('Nickname', name);
        break;
      default:
        console.log(
          `Feature type ${feature} | data -> ${JSON.stringify(data)}`,
        );
        break;
    }
  } else if (type === 'EVENTS') {
    switch (feature) {
      case REQUIRED_FEATURES_DICT.DEATH:
        console.log('Event DEATH happened', data);
        WindowsService.restore(WindowNames.IN_GAME);
        break;
      case REQUIRED_FEATURES_DICT.KILLER:
        let killerName = '';
        try {
          const parsedString = JSON.parse(data);
          killerName = parsedString.killer_name;
          console.log(`Got killed by ${killerName}`);
        } catch (e) {
          console.error(e);
        }
        if (killerName) {
          return {
            ...defaultPayload,
            data: { killer: killerName },
          };
        }
        break;
      case REQUIRED_FEATURES_DICT.KILL:
        console.log('Kill happened', data, feature);
        break;
      case REQUIRED_FEATURES_DICT.HEADSHOT:
        console.log('Headshot!', data, feature);
        break;
      case REQUIRED_FEATURES_DICT.DAMAGE_DEALT:
        console.log('Damage dealt', data, feature);
        break;
      case REQUIRED_FEATURES_DICT.MATCH_START:
        console.log('Match Started!', data, feature);
        break;
      case REQUIRED_FEATURES_DICT.MATCH_END:
        console.log('Match Ended!', data, feature);
        break;
      case REQUIRED_FEATURES_DICT.MATCH_SUMMARY:
        console.log('You are in the match Summary!', data, feature);
        break;
      default:
        console.log(`Event type ${feature} | data -> ${JSON.stringify(data)}`);
        break;
    }
  } else {
    console.error(
      `Log service TYPE ${type} not found, got this data: ${JSON.stringify(
        data,
      )}`,
    );
  }
}
