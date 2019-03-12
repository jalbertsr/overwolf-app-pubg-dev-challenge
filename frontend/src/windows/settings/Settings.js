/*global overwolf*/

import React, { Component } from 'react';

import HotkeysService from '../../common/services/hotkeys-service';
import DragService from '../../common/services/drag-service';
import UserInfoService from '../../common/services/userInfoService';
import HotKeysImage from '../../statics/HotkeysScreenshot.png';
import './styles.css';

class Settings extends Component {
  constructor(props) {
    super(props);

    this._dragService = null;
    this._headerRef = React.createRef();

    this.state = {
      toggleText: '',
      screenshotText: '',
      nickname: UserInfoService.getPUBGNickname(),
    };
  }

  async componentDidMount() {
    try {
      await this._updateHotkeys();
    } catch (e) {
      console.error(e);
    }

    HotkeysService.addHotkeyChangeListener(this._updateHotkeys);

    // Make window draggable
    overwolf.windows.getCurrentWindow(result => {
      this._dragService = new DragService(
        result.window,
        this._headerRef.current,
      );
    });
  }

  _updateHotkeys = async () => {
    const toggleHotkey = await HotkeysService.getToggleHotkey();
    const screenshotHotkey = await HotkeysService.getTakeScreenshotHotkey();
    this.updateToggle(toggleHotkey);
    this.updateScreenshot(screenshotHotkey);
  };

  updateToggle = value => {
    this.setState({
      toggleText: value,
    });
  };

  updateScreenshot = value => {
    this.setState({
      screenshotText: value,
    });
  };

  handleChange = e => {
    this.setState({
      nickname: e.target.value,
    });
  };

  updateNickname = () => {
    const { nickname } = this.state;
    UserInfoService.setPUBGNickname(nickname);
  };

  render() {
    const { toggleText, screenshotText, nickname } = this.state;
    return (
      <div className="settings">
        <div className="wrapper">
          <h1>Account Settings:</h1>
          <p>Give us your nickname so we can give you your best stats.</p>
          <div className="key">
            <span className="nickname-settings">PUBG Nickname:&nbsp;</span>
            <div className="form-group">
              <input
                className="nickname-settings form-control"
                value={nickname}
                onChange={this.handleChange}
              />
              <button
                className="nickname"
                type="button"
                onClick={this.updateNickname}
              >
                Save
              </button>
            </div>
          </div>
        </div>
        <div className="wrapper">
          <h1>Hotkeys:</h1>
          <div className="key">
            <span>Toggle In Game Window:&nbsp;</span>
            <kbd id="toggle">{toggleText}</kbd>
          </div>
          <div className="key">
            <span>Take a screentshot:&nbsp;</span>
            <kbd id="screenshot">{screenshotText}</kbd>
          </div>
          <p>To customize your hotkeys go to the overwolf settings.</p>
          <img
            className="screenshot-settings"
            src={HotKeysImage}
            alt="Hotkeys config"
          />
        </div>
      </div>
    );
  }
}

export default Settings;
