/*global overwolf*/

import React, { Component } from 'react';
import { MemoryRouter } from 'react-router-dom';

import Background from './windows/background/Background';
import InGame from './windows/in-game/InGame';
import Main from './windows/main/main';
import DefaultHeader from './common/components/DefaultHeader/DefaultHeader';

class App extends Component {
  state = {
    currentWindowName: '',
  };

  componentDidMount() {
    overwolf.windows.getCurrentWindow(result => {
      console.log(result);
      this.setState(
        {
          currentWindowName: result.window.name,
        },
        () => console.log('app window state', this.state),
      );
    });
  }

  render() {
    const { currentWindowName: windowName } = this.state;
    let window, isSettings;
    const body = document.getElementsByTagName('body')[0];
    switch (windowName) {
      case 'main':
        window = <Main />;
        isSettings = false;
        break;
      case 'background':
        window = <Background />;
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
        console.log(`Unexistent window type ${windowName}`);
    }

    return (
      <div className="App">
        <DefaultHeader windowName={windowName} isSettings={isSettings} />
        <MemoryRouter>{window}</MemoryRouter>
      </div>
    );
  }
}

export default App;
