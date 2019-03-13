const EVENTS = ['death', 'killer', 'revived', 'kill', 'knockedout', 'match'];
const UPDATES = [
  'kills',
  'location',
  'map',
  'mode',
  'name',
  'phase',
  'me',
  'total_teams',
  'roster',
  'team',
  'rank',
];

export const REQUIRED_FEATURES = [
  // Events
  ...EVENTS,
  // Info Updates
  ...UPDATES,
];

export const REQUIRED_FEATURES_DICT = {
  // Events
  DEATH: 'death',
  KNOCKEDOUT: 'knockedout',
  DAMAGE_DEALT: 'damage_dealt',
  HEADSHOT: 'headshot',
  KILL: 'kill',
  KILLER: 'killer',
  MATCH: 'match',
  REVIVED: 'revived',
  MATCH_START: 'matchStart',
  MATCH_END: 'matchEnd',
  MATCH_SUMMARY: 'matchSummary',
  // Info Updates
  HEADSHOTS: 'headshots',
  KILLS: 'kills',
  MAX_KILL_DISTANCE: 'max_kill_distance',
  TOTAL_DAMAGE_DEALT: 'total_damage_dealt',
  LOCATION: 'location',
  MAP: 'map',
  MODE: 'mode',
  NAME: 'name',
  PHASE: 'phase',
  ME: 'me',
  TOTAL_TEAMS: 'total_teams',
  ROSTER: 'roster',
  NICKNAMES: 'nicknames',
  RANK: 'rank',
};
