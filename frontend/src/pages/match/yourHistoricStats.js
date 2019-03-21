import React, { Component } from 'react';

import './styles.css';
import MAP_NAMES from '../../common/constants/mapNames';
import { withNickname } from '../../context/nickname';
import {
  getLastMatches,
  getMatchStats,
} from '../../common/services/apiService';

class YourHistoricStats extends Component {
  state = {};

  async componentDidMount() {
    const { accountId, map } = this.props;
    const { relationships } = await getLastMatches(accountId);
    const arrayOfMatches = relationships.matches.data.map(match => match.id);
    const listOfAllMatches = await this.fetchAllMatches(arrayOfMatches);
    const filteredMatchesByMap = this.filterMatchesByMap(map, listOfAllMatches);
    console.log(filteredMatchesByMap);
  }

  fetchAllMatches = async arrayOfMatches => {
    const promisesArray = arrayOfMatches.map(matchId => getMatchStats(matchId));
    return await Promise.all(promisesArray);
  };

  filterMatchesByMap = (mapName, matches) =>
    matches.filter(
      match => MAP_NAMES[match.data.attributes.mapName] === mapName,
    );

  render() {
    return <h2>This is your avarage performance in this map</h2>;
  }
}

export default withNickname(YourHistoricStats);
