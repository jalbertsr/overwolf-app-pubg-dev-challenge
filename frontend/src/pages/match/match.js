import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './styles.css';
import { withNickname } from '../../context/nickname';
import {
  getMatchStats,
  getTelemetryData,
  getInGameData,
} from '../../common/services/apiService';

class Match extends Component {
  state = {
    data: {},
    hasTelemetry: false,
    loading: true,
  };

  async componentDidMount() {
    if (this.state.hasTelemetry) {
      const { matchId } = this.props.match.params;
      try {
        const { data, included } = await getMatchStats(matchId);
        const telemetryId = data.relationships.assets.data[0].id;
        const telemetryLink = this.getTelemetryLink(included, telemetryId);
        const telemetryInfo = await getTelemetryData(telemetryLink);
        console.log(telemetryInfo);
        // this.setState({ data: data.attributes });
      } catch (e) {
        console.error(e);
      }
    } else {
      const ingameData = await getInGameData();
      this.setState({ data: ingameData.data, loading: false });
    }
  }

  getTelemetryLink = (included, telemetryId) =>
    included.reduce(
      (acc, obj) => (obj.id === telemetryId ? acc + obj.attributes.URL : acc),
      '',
    );

  render() {
    if (this.state.loading) return <div>loading...</div>;
    const {
      kills,
      maxKillDistance,
      myRank,
      totalDamage,
      totalTeams,
      headshots,
    } = this.state.data.Item;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-4">
            <div className="last-stats-box">
              <h2>Your last game stats</h2>
              <ul>
                <li>{`Rank: ${myRank} out of ${totalTeams}`}</li>
                <li>{`Total damage: ${totalDamage}`}</li>
                <li>{`Kills: ${kills}`}</li>
                <li>{`Headshots: ${headshots}`}</li>
                <li>{`Max kill distance: ${maxKillDistance}`}</li>
                <li>Total distance travelled: </li>
              </ul>
            </div>
          </div>
          <div className="col-md-8">.col-xs-6 .col-md-4</div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withNickname(Match));
