import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './styles.css';
import { withNickname } from '../../context/nickname';
import {
  getMatchStats,
  getTelemetryData,
  getInGameData,
  getLifeStats,
  getAccountId,
} from '../../common/services/apiService';
import YourStats from './yourStats';
import VsKillerStats from './vsKillerStats';

class Match extends Component {
  state = {
    inGameData: {},
    lifeTimeStats: {},
    loading: true,
  };

  async componentDidMount() {
    const { data: inGameData } = await this.inGameData();
    const userLifeTimeStats = await getLifeStats(this.props.accountId);
    const killerAccountId = await getAccountId(inGameData.Item.killer);
    const killerLifeTimeStats = await getLifeStats(killerAccountId);
    const lifeTimeStats = {
      user: userLifeTimeStats,
      killer: killerLifeTimeStats,
    };
    this.setState({ inGameData, lifeTimeStats, loading: false });
  }

  getTelemetryData = async () => {
    const { matchId } = this.props.match.params;
    try {
      const { data, included } = await getMatchStats(matchId);
      const telemetryId = data.relationships.assets.data[0].id;
      const telemetryLink = this.getTelemetryLink(included, telemetryId);
      return await getTelemetryData(telemetryLink);
    } catch (e) {
      console.error(e);
    }
  };

  inGameData = async () => await getInGameData();

  getTelemetryLink = (included, telemetryId) =>
    included.reduce(
      (acc, obj) => (obj.id === telemetryId ? acc + obj.attributes.URL : acc),
      '',
    );

  render() {
    if (this.state.loading) return <div>loading...</div>;
    const { killer } = this.state.inGameData.Item;
    const { nickname } = this.props;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-4 stats-box">
            <YourStats inGameData={this.state.inGameData.Item} />
          </div>
          <div className="col-md-7 stats-box">
            <VsKillerStats
              killer={killer}
              nickname={nickname}
              lifeTimeStats={this.state.lifeTimeStats}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withNickname(Match));
