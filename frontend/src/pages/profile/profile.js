import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { withNickname } from '../../context/nickname';
import { getAccountId, getLifeStats } from '../../common/services/apiService';

class Profile extends Component {
  state = {
    data: {},
  };

  async componentDidMount() {
    if (this.isMainAccount()) {
      const { accountId } = this.props;
      try {
        const data = await getLifeStats(accountId);
        this.setState({ data: data.attributes });
      } catch (e) {
        console.error(e);
      }
    } else {
      try {
        const { nickname } = this.props.match.params;
        const accountId = await getAccountId(nickname);
        const data = await getLifeStats(accountId);
        this.setState({ data: data.attributes });
      } catch (e) {
        console.error(e);
      }
    }
  }

  isMainAccount = () =>
    this.props.match.params.nickname === this.props.nickname;

  render() {
    const { data } = this.state;
    return <div>{JSON.stringify(data)}</div>;
  }
}

export default withRouter(withNickname(Profile));
