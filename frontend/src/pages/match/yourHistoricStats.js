import React, { Component } from 'react';

import './styles.css';
import MAP_NAMES from '../../common/constants/mapNames';
import { withNickname } from '../../context/nickname';
import {
  getLastMatches,
  getMatchStats,
} from '../../common/services/apiService';

class YourHistoricStats extends Component {
  state = {
    avarageStats: {},
    loading: true,
  };

  async componentDidMount() {
    const { accountId, map } = this.props;
    const { relationships } = await getLastMatches(accountId);
    const arrayOfMatches = relationships.matches.data.map(match => match.id);
    const listOfAllMatches = await this.fetchAllMatches(arrayOfMatches);
    const filteredMatchesByMap = this.filterMatchesByMap(map, listOfAllMatches);
    const playerMatchesStats = this.extractPlayerMatchesStatsByAccountId(
      filteredMatchesByMap,
      accountId,
    );
    const avarageStats = this.createAvarageStats(playerMatchesStats);
    this.setState({ avarageStats, loading: false });
  }

  fetchAllMatches = async arrayOfMatches => {
    const promisesArray = arrayOfMatches.map(matchId => getMatchStats(matchId));
    return await Promise.all(promisesArray);
  };

  filterMatchesByMap = (mapName, matches) =>
    matches.filter(
      match => MAP_NAMES[match.data.attributes.mapName] === mapName,
    );

  extractPlayerMatchesStatsByAccountId = (matches, accountId) => {
    const playerMatchesData = [];
    for (let i = 0; i < matches.length; i++) {
      const matchData = matches[i]['included'];
      for (let j = 0; j < matchData.length; j++) {
        const playerData = matchData[j];
        if (playerData['type'] === 'participant') {
          const playerStats = playerData['attributes']['stats'];
          if (playerStats.playerId === accountId) {
            playerMatchesData.push(playerStats);
            break;
          }
        }
      }
    }
    return playerMatchesData;
  };

  createAvarageStats = playerMatchesStats => {
    const numberOfMatches = playerMatchesStats.length;
    const aggregatedData = {
      ...Object.keys(playerMatchesStats[0]).reduce((acc, stat) => {
        acc[stat] = 0;
        return acc;
      }, {}),
      deathType: {
        byplayer: 0,
        alive: 0,
        suicide: 0,
        logout: 0,
      },
    };

    playerMatchesStats.forEach(stats => {
      Object.keys(stats).forEach(stat => {
        if (stat === 'deathType') {
          if (stats.deathType === 'byplayer')
            aggregatedData.deathType.byplayer++;
          else if (stats.deathType === 'alive')
            aggregatedData.deathType.alive++;
          else if (stats.deathType === 'logout')
            aggregatedData.deathType.logout++;
          else if (stats.deathType === 'suicide')
            aggregatedData.deathType.suicide++;
        } else {
          aggregatedData[stat] += stats[stat];
        }
      });
    });

    delete aggregatedData.name;
    delete aggregatedData.playerId;

    const avarageStats = Object.keys(aggregatedData).reduce((acc, stat) => {
      stat === 'deathType'
        ? (acc.deathType = aggregatedData.deathType) // this is not avarage xd
        : (acc[stat] = aggregatedData[stat] / numberOfMatches);
      return acc;
    }, {});

    return avarageStats;
  };

  render() {
    const { map } = this.props;
    const { avarageStats, loading } = this.state;
    return (
      <React.Fragment>
        <h2>{`Your avarage performance in ${map}`}</h2>
        {loading ? (
          <p>loading...</p>
        ) : (
          <div>{JSON.stringify(avarageStats)}</div>
        )}
      </React.Fragment>
    );
  }
}

export default withNickname(YourHistoricStats);
