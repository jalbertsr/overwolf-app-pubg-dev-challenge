import axios from 'axios';

const BASE_PATH_PUBG =
  'https://2z9znr6j0a.execute-api.eu-west-1.amazonaws.com/PUBG_API';
const BASE_PATH_LISTENER =
  'https://8uodths1pe.execute-api.eu-west-1.amazonaws.com/Overwolf-alpha/listener';

const headers = {
  headers: {
    Accept: 'application/json',
  },
};

const getAccountId = async nickname =>
  await axios
    .get(`${BASE_PATH_PUBG}/players?filter[playerNames]=${nickname}`)
    .then(({ data }) => {
      const { data: info } = data;
      const [user] = info;
      return user.id;
    });

const getLifeStats = async accountId =>
  await axios
    .get(`${BASE_PATH_PUBG}/players/${accountId}/seasons/lifetime`, headers)
    .then(({ data }) => data.data);

const sendInGameData = async info =>
  await axios
    .post(BASE_PATH_LISTENER, { info })
    .then(({ data }) =>
      data === 'success' ? console.log('success') : console.log('fail'),
    );

export { getLifeStats, getAccountId, sendInGameData };
