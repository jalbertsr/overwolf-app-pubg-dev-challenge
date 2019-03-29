/*global overwolf*/

import React, { Component } from 'react';
import { MemoryRouter } from 'react-router-dom';

import './common/style.css';
import WindowNames from './common/constants/windowNames';
import InGame from './windows/in-game/InGame';
import Main from './windows/main/main';
import Settings from './windows/settings/Settings';
import DefaultHeader from './common/components/DefaultHeader/DefaultHeader';
import { NicknameContext } from './context/nickname';
import UserService from './common/services/userInfoService';
import BackgroundController from './BackgroundController';
import { getAccountId } from './common/services/apiService';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWindowName: '',
      userNickname: UserService.getPUBGNickname(),
      accountId: UserService.getAccountId(),
    };
    BackgroundController.run(); // move to a place when it will run only once.
  }

  async componentDidMount() {
    const nickname = prompt(
      'Please introduce your PUBG nickname (this part still is work in progress)',
    );
    UserService.setPUBGNickname(nickname);
    const accountId = await getAccountId(nickname);
    UserService.setAccountId(accountId);
    overwolf.windows.getCurrentWindow(result => {
      this.setState({
        currentWindowName: result.window.name,
        userNickname: nickname,
        accountId,
      });
    });
  }

  render() {
    const {
      currentWindowName: windowName,
      userNickname,
      accountId,
    } = this.state;

    let window, isSettings;
    const body = document.getElementsByTagName('body')[0];
    switch (windowName) {
      case WindowNames.MAIN:
        window = <Main />;
        isSettings = false;
        body.className = 'main';
        break;
      case WindowNames.SETTINGS:
        window = <Settings />;
        body.className = 'settings';
        isSettings = true;
        break;
      case WindowNames.IN_GAME:
        window = <InGame />;
        isSettings = false;
        body.className = 'in-game';
        break;
      default:
        console.error(`Unexistent window type ${windowName}`);
    }

    return (
      <React.Fragment>
        <DefaultHeader windowName={windowName} isSettings={isSettings} />
        <MemoryRouter>
          <NicknameContext.Provider
            value={{ nickname: userNickname, accountId: accountId }}
          >
            {window}
          </NicknameContext.Provider>
        </MemoryRouter>
      </React.Fragment>
    );
  }
}

export default App;
