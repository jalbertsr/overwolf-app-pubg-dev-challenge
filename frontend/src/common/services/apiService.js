import axios from 'axios';

const BASE_PATH =
  'https://2z9znr6j0a.execute-api.eu-west-1.amazonaws.com/PUBG_API';
const headers = {
  headers: {
    Accept: 'application/json',
  },
};

const getAccountId = async nickname =>
  await axios
    .get(`${BASE_PATH}/players?filter[playerNames]=${nickname}`)
    .then(({ data }) => {
      const { data: info } = data;
      const [user] = info;
      return user.id;
    });

const getLifeStats = async accountId =>
  await axios
    .get(`${BASE_PATH}/players/${accountId}/seasons/lifetime`, headers)
    .then(({ data }) => data.data);

export { getLifeStats, getAccountId };
