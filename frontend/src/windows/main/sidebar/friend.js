import React, { Component } from 'react';

import './sidebarStyles.css';
import { getInGameData } from '../../../common/services/apiService';

class Friend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friendData: {},
      isHovered: false,
    };
  }

  componentDidMount() {
    this.listenFriendsInGame();
    this.tickId = setInterval(this.listenFriendsInGame, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.tickId);
  }

  listenFriendsInGame = async () => {
    const { friendId } = this.props;
    const friendInfo = await getInGameData(friendId);
    const friendData = friendInfo.data.Item;
    if (friendData !== undefined) {
      this.setState({ friendData });
    }
  };

  handleMouseHover = () => {
    this.setState(prevState => ({ isHovered: !prevState.isHovered }));
  };

  render() {
    const { nickname } = this.props;
    const { isHovered, friendData } = this.state;
    const {
      mapName,
      matchEnd,
      matchStart,
      myCurrentRank,
      kills,
      totalTeams,
    } = friendData;
    const isPlaying = matchStart && !matchEnd;
    return (
      <li
        onMouseEnter={this.handleMouseHover}
        onMouseLeave={this.handleMouseHover}
      >
        <p>
          {`${nickname} ${
            isPlaying ? 'is currently playing' : 'is not currently playing'
          }`}
        </p>
        {isHovered && isPlaying && (
          <div>
            <p>{`Playing at ${mapName}. ${myCurrentRank}/${totalTeams}`}</p>
            <p>{`Kills ${kills}`}</p>
          </div>
        )}
      </li>
    );
  }
}

export default Friend;
