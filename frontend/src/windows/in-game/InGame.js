import React, { Component } from 'react';

import WindowsService from '../../common/services/windows-service';
import windowNames from '../../common/constants/windowNames';
import HotkeysService from '../../common/services/hotkeys-service';

class InGame extends Component {
  state = {
    toggleHotkey: '',
  };

  async componentDidMount() {
    try {
      await this._updateHotkeys();
    } catch (e) {
      console.error(e);
    }

    HotkeysService.addHotkeyChangeListener(this._updateHotkeys);

    setTimeout(() => {
      WindowsService.close(windowNames.IN_GAME);
    }, 6000);
  }

  _updateHotkeys = async () => {
    const toggleHotkey = await HotkeysService.getToggleHotkey();
    this.setState({ toggleHotkey });
  };

  render() {
    const { toggleHotkey } = this.state;
    return <div>{`Look who killed you! Press ${toggleHotkey}`}</div>;
  }
}

export default InGame;
