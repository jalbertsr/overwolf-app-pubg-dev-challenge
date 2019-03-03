/*global overwolf*/

import React, { Component } from 'react';
import { MemoryRouter } from 'react-router-dom';
import Background from './windows/background/Background';
import InGame from './windows/in-game/InGame';
import Main from './windows/main/Main';

class App extends Component {
	state = {
		currentWindowName: ''
	};

	componentDidMount() {
		overwolf.windows.getCurrentWindow(result => {
			console.log(result)
			this.setState({
				currentWindowName: result.window.name
			}, () => console.log('app window state', this.state));
		});
	}

  render() {
		const windowName = this.state.currentWindowName;
		let window;
		let body = document.getElementsByTagName('body')[0]
		switch (windowName) {
			case 'main':
				window = <Main />
				break;
			case 'background':
				window = <Background />
				break;
			case 'settings':
				window = <div> settings </div>
				body.className = 'settings'
				break;
			case 'ingame':
				window = <InGame />
				body.className = 'in-game'
				break;
			default:
				console.log(`Unexistent window type ${windowName}`)
		}

    return (
      <div className="App">
				<MemoryRouter>
					{window}
				</MemoryRouter>
      </div>
    );
  }
}

export default App;
