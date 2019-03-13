import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withNickname } from '../../../context/nickname';
import PUBG_Icon from '../../../statics/PUBG_Icon.png';
import './styles.css';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matchId: '864e8837-6c15-4c74-9cc9-f5cf00f1c5fc', // testing propouses (pot cauducar)
      searchedNickname: '',
    };
  }

  handleChange = e => {
    this.setState({ searchedNickname: e.target.value });
  };

  handleClick = () => {
    const { searchedNickname } = this.state;
    if (searchedNickname.length) {
      this.setState({ searchedNickname: '' }, () =>
        this.props.history.push(`/profile/${searchedNickname}`),
      );
    }
  };

  render() {
    const { matchId, searchedNickname } = this.state;
    const { nickname } = this.props;
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
              <Link to={`/match/${matchId}`} style={{ textDecoration: 'none' }}>
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

export default withRouter(withNickname(Navbar));
