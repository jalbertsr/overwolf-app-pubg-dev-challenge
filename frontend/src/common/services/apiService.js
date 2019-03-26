import axios from 'axios';

import { defaultPayload } from './dataFormatter';

const BASE_PATH_PUBG_PROXY =
  'https://2z9znr6j0a.execute-api.eu-west-1.amazonaws.com/PUBG_API';
const BASE_PATH_PUBG = 'https://api.pubg.com';
const BASE_PATH_LISTENER =
  'https://8uodths1pe.execute-api.eu-west-1.amazonaws.com/Overwolf-alpha/listener';
const BASE_PATH_FRIENDLIST =
  'https://8mqcdo2gvh.execute-api.eu-west-1.amazonaws.com/FriendList';

const headers = {
  headers: {
    Accept: 'application/json',
  },
};

const getAccountId = async nickname =>
  await axios
    .get(`${BASE_PATH_PUBG_PROXY}/players?filter[playerNames]=${nickname}`)
    .then(({ data }) => {
      const { data: info } = data;
      const [user] = info;
      return user.id;
    });

const getLifeStats = async accountId =>
  await axios
    .get(
      `${BASE_PATH_PUBG_PROXY}/players/${accountId}/seasons/lifetime`,
      headers,
    )
    .then(({ data }) => data.data);

const getLastMatches = async accountId =>
  await axios
    .get(`${BASE_PATH_PUBG_PROXY}/players/${accountId}`, headers)
    .then(({ data }) => data.data);

const getMatchStats = async matchId =>
  await axios
    .get(`${BASE_PATH_PUBG}/shards/steam/matches/${matchId}`, headers)
    .then(({ data }) => data);

const getTelemetryData = async url =>
  await axios.get(url, headers).then(({ data }) => data);

const sendInGameData = async info =>
  await axios
    .post(
      BASE_PATH_LISTENER,
      { ...info },
      { headers: { 'Content-Type': 'application/json' } },
    )
    .then(({ data }) => {
      console.log('Server response', data);
    })
    .catch(e => console.log(e));

const getInGameData = async accountId =>
  await axios
    .post(
      BASE_PATH_LISTENER,
      { ...defaultPayload, readOnly: true, accountId, data: {} },
      { headers: { 'Content-Type': 'application/json' } },
    )
    .then(({ data }) => data)
    .catch(e => console.log(e));

const getFriendList = async accountId =>
  await axios
    .get(`${BASE_PATH_FRIENDLIST}/friendlist/${accountId}`)
    .then(({ data }) => data.data);

export {
  getLifeStats,
  getAccountId,
  getLastMatches,
  getMatchStats,
  getTelemetryData,
  getInGameData,
  getFriendList,
  sendInGameData,
};
