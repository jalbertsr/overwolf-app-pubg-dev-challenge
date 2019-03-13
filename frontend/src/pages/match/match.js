import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { withNickname } from '../../context/nickname';
import {
  getMatchStats,
  getTelemetryData,
} from '../../common/services/apiService';

class Match extends Component {
  state = {
    data: {},
  };

  async componentDidMount() {
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
  }

  getTelemetryLink = (included, telemetryId) =>
    included.reduce(
      (acc, obj) => (obj.id === telemetryId ? acc + obj.attributes.URL : acc),
      '',
    );

  render() {
    const { data } = this.state;
    return <div>{JSON.stringify(data)}</div>;
  }
}

export default withRouter(withNickname(Match));
