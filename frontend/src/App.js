/*global overwolf*/

import React, { Component } from 'react';
import { MemoryRouter } from 'react-router-dom';

import InGame from './windows/in-game/InGame';
import Main from './windows/main/main';
import DefaultHeader from './common/components/DefaultHeader/DefaultHeader';
import { NicknameContext } from './context/nickname';
import UserService from './common/services/userInfoService';
import BackgroundController from './BackgroundController';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWindowName: '',
      userNickname: UserService.getPUBGNickname(),
      accountId: UserService.getAccountId(),
    };
    BackgroundController.run();
  }

  componentDidMount() {
    overwolf.windows.getCurrentWindow(result => {
      this.setState({
        currentWindowName: result.window.name,
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
      case 'main':
        window = <Main />;
        isSettings = false;
        break;
      case 'settings':
        window = <div> settings </div>;
        body.className = 'settings';
        isSettings = true;
        break;
      case 'ingame':
        window = <InGame />;
        isSettings = false;
        body.className = 'in-game';
        break;
      default:
        console.error(`Unexistent window type ${windowName}`);
    }

    return (
      <div className="App">
        <DefaultHeader windowName={windowName} isSettings={isSettings} />
        <MemoryRouter>
          <NicknameContext.Provider
            value={{ nickname: userNickname, accountId: accountId }}
          >
            {window}
          </NicknameContext.Provider>
        </MemoryRouter>
      </div>
    );
  }
}

export default App;
