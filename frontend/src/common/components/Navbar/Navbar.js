import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withUser } from '../../../context/user';
import PUBG_Icon from '../../../statics/PUBG_Icon.png';
import './styles.css';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: props.nickname,
      matchId: '1231456',
      searchedNickname: '',
    };
  }

  handleChange = e => {
    this.setState({ searchedNickname: e.target.value });
  };

  handleClick = () => {
    const { searchedNickname } = this.state;
    this.setState({ searchedNickname: '' }, () =>
      this.props.history.push(`/profile/${searchedNickname}`),
    );
  };

  render() {
    const { nickname, matchId, searchedNickname } = this.state;
    return (
      <nav className="navbar">
        <div className="container-fluid">
          <div className="navbar-header">
            <div className="navbar-brand">
              <Link to="/" style={{ textDecoration: 'none' }}>
                <img src={PUBG_Icon} alt="PUBG Icon logo" />
              </Link>
            </div>
            <div className="navbar-brand">
              <Link to="/" style={{ textDecoration: 'none' }}>
                <span className="fa fa-home" />
                <span className="link">Home</span>
              </Link>
            </div>
            <div className="navbar-brand">
              <Link
                to={`/profile/${nickname}`}
                style={{ textDecoration: 'none' }}
              >
                <span className="fa fa-user" />
                <span className="link">Profile</span>
              </Link>
            </div>
            <div className="navbar-brand">
              <Link
                to={`/matchAnalysis/${matchId}`}
                style={{ textDecoration: 'none' }}
              >
                <span className="fa fa-gears" />
                <span className="link">Match Analysis</span>
              </Link>
            </div>
          </div>
          <div className="navbar-collapse collapse">
            <div className="navbar-form navbar-right">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for a player"
                  onChange={this.handleChange}
                  value={searchedNickname}
                />
              </div>
              <button className="btn" type="button" onClick={this.handleClick}>
                <span className="fa fa-search" />
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(withUser(Navbar));
