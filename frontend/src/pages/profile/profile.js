import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

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
    return (
      <div>
        {JSON.stringify(data)}
        <Link to="/match/864e8837-6c15-4c74-9cc9-f5cf00f1c5fc">
          864e8837-6c15-4c74-9cc9-f5cf00f1c5fc
        </Link>
      </div>
    );
  }
}

export default withRouter(withNickname(Profile));
