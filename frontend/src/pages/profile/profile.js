import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { withUser } from '../../context/user';

class Profile extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      nickname: props.nickname || '',
      searchedNickname: props.match.params.nickname || '',
    };
  }

  decideHierarchy = () => {
    console.log(this.state);
    const { searchedNickname, nickname } = this.state;
    return searchedNickname.length ? searchedNickname : nickname;
  };

  render() {
    return <div>{this.decideHierarchy()}</div>;
  }
}

export default withRouter(withUser(Profile));
