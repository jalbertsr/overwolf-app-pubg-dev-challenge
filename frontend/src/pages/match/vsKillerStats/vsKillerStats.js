import React, { Component } from 'react';

import './styles.css';
import UserStatsList from './userStatsList';

export default class YourStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataToShow: {},
      mode: 'solo',
      view: 'tpp',
    };
  }

  componentDidMount() {
    const { view, mode } = this.state;
    const modeView = this.combineModeView(mode, view);
    const dataToShow = this.getDataToShow(modeView);
    this.setState({ dataToShow });
  }

  getDataToShow = modeView => {
    const { user, killer } = this.props.lifeTimeStats;
    return {
      user: {
        ...user.attributes.gameModeStats[modeView],
      },
      killer: {
        ...killer.attributes.gameModeStats[modeView],
      },
    };
  };

  combineModeView = (mode, view) => (view === 'tpp' ? mode : `${mode}-${view}`);

  handleChangeMode = e => {
    const selectedMode = e.target.value;
    const modeView = this.combineModeView(selectedMode, this.state.view);
    const dataToShow = this.getDataToShow(modeView);
    this.setState({
      mode: selectedMode,
      dataToShow,
    });
  };

  handleChangeView = e => {
    const selectedView = e.target.value;
    const modeView = this.combineModeView(this.state.mode, selectedView);
    const dataToShow = this.getDataToShow(modeView);
    this.setState({
      view: selectedView,
      dataToShow,
    });
  };

  render() {
    const { nickname, killer } = this.props;
    const { dataToShow } = this.state;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-8">
            <h2 style={{ marginBottom: '5px' }}>Life stats</h2>
            <h3 className="nicknames">{`${nickname} vs ${killer}`}</h3>
          </div>
          <div className="col-md-4 selector">
            <select value={this.state.mode} onChange={this.handleChangeMode}>
              <option value="solo">Solo</option>
              <option value="duo">Duo</option>
              <option value="squad">Squad</option>
            </select>
            <ul>
              <li>
                TPP
                <input
                  type="radio"
                  value="tpp"
                  checked={this.state.view === 'tpp'}
                  onChange={this.handleChangeView}
                />
              </li>
              <li>
                FPP
                <input
                  type="radio"
                  value="fpp"
                  checked={this.state.view === 'fpp'}
                  onChange={this.handleChangeView}
                />
              </li>
            </ul>
          </div>
        </div>
        {dataToShow.user && dataToShow.killer && (
          <div>
            <UserStatsList data={dataToShow.user} />
            <UserStatsList data={dataToShow.killer} />
          </div>
        )}
      </React.Fragment>
    );
  }
}
