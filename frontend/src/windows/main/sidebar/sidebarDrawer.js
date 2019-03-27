import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import './sidebarStyles.css';
import Friend from './friend';
import { SidebarContext } from '../../../context/sidebar';
import { getFriendList } from '../../../common/services/apiService';
import { withNickname } from '../../../context/nickname';

class SidebarDrawer extends Component {
  state = {
    friendList: [],
  };

  async componentDidMount() {
    const { accountId } = this.props;
    const {
      Item: { friendList },
    } = await getFriendList(accountId);
    this.setState({
      friendList,
    });
  }

  extractFriendsIds = friendList => friendList.map(friend => friend.accountId);

  render() {
    const { friendList } = this.state;
    return (
      <SidebarContext.Consumer>
        {({ isSidebarActive }) => (
          <TransitionGroup component={null}>
            {isSidebarActive && (
              <CSSTransition classNames="dialog" timeout={200}>
                <div className="sidenav">
                  <ul>
                    {friendList.map(({ accountId, nickname }) => (
                      <Friend
                        key={accountId}
                        friendId={accountId}
                        nickname={nickname}
                      />
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
