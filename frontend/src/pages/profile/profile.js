import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { withNickname } from '../../context/nickname';
import { withSearch } from '../../context/search';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: {},
    };
  }

  async componentDidMount() {
    const { accountId } = this.props;
    try {
      const data = await axios
        .get(
          `https://2z9znr6j0a.execute-api.eu-west-1.amazonaws.com/PUBG_API/players/${accountId}/seasons/lifetime`,
          {
            headers: {
              Accept: 'application/json',
            },
          },
        )
        .then(({ data }) => data.data);
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return <div>{this.props.accountId}</div>;
  }
}

export default withRouter(withNickname(withSearch(Profile)));
