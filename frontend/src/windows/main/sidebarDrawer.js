import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import './sidebarStyles.css';
import { SidebarContext } from '../../context/sidebar';
import { getFriendList, getInGameData } from '../../common/services/apiService';
import { withNickname } from '../../context/nickname';

class SidebarDrawer extends Component {
  state = {
    friendList: [],
    friendListInGameData: [],
    hoverData: {},
    isHovered: false,
  };

  async componentDidMount() {
    const { accountId } = this.props;
    const { Item } = await getFriendList(accountId);
    const friendsIds = this.extractFriendsIds(Item.friendList);
    const friendsData = await this.getFriendsData(friendsIds);
    this.setState({
      friendList: Item.friendList,
      friendListInGameData: friendsData,
    });
  }

  extractFriendsIds = friendList => friendList.map(friend => friend.accountId);

  getFriendsData = async friendListId => {
    const promises = friendListId.map(friendId => getInGameData(friendId));
    const friendsData = await Promise.all(promises);
    return friendsData.map(({ data: { Item } }) => ({ ...Item }));
  };

  handleMouseEnter = accountId => {
    const { friendListInGameData } = this.state;
    const [friendData] = friendListInGameData.filter(
      friend => friend.accountId === accountId,
    );
    this.setState({ hoverData: friendData, isHovered: true });
  };

  handleMouseLeave = () => {
    this.setState({ isHovered: false });
  };

  render() {
    const { friendList, isHovered, hoverData } = this.state;
    return (
      <SidebarContext.Consumer>
        {({ isSidebarActive }) => (
          <TransitionGroup component={null}>
            {isSidebarActive && (
              <CSSTransition classNames="dialog" timeout={200}>
                <div className="sidenav">
                  <ul>
                    {friendList.map(({ accountId, nickname }) => (
                      <li
                        key={accountId}
                        onMouseEnter={() => this.handleMouseEnter(accountId)}
                        onMouseLeave={this.handleMouseLeave}
                      >
                        <p>{nickname}</p>
                        {isHovered && (
                          <div>{`${JSON.stringify(hoverData)} hola`}</div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </CSSTransition>
            )}
          </TransitionGroup>
        )}
      </SidebarContext.Consumer>
    );
  }
}

export default withNickname(SidebarDrawer);
