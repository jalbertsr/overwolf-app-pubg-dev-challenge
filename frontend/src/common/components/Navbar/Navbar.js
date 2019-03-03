import React, { Component } from 'React';
import { Link, withRouter } from 'react-router-dom';

import PUBG_Icon from '../../../statics/PUBG_Icon.png';
import './styles.css';

class Navbar extends Component {
    constructor(props){
        super(props)
        this.state = {
            nickname: 'jaxalbert',
            matchId: '1231456',
            searchedNickname: ''
        }
    }

    handleChange = e => {
        this.setState({ searchedNickname: e.target.value });
    }

    handleClick = e => {
        const { searchedNickname } = this.state;
        this.setState({ searchedNickname: '' }, 
            () => this.props.history.push(`/profile/${searchedNickname}`));
    }

    render () {
        const { nickname, matchId, searchedNickname } = this.state;
        console.log(this.state, this.props)
        return (
            <nav class="navbar">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <div class="navbar-brand">
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <img src={PUBG_Icon} alt="PUBG Icon logo" />
                            </Link>
                        </div>
                        <div class="navbar-brand">
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <span class="fa fa-home"></span>
                                <span class="link">Home</span>
                            </Link>
                        </div>
                        <div class="navbar-brand">
                            <Link to={`/profile/${nickname}`} style={{ textDecoration: 'none' }}>
                                <span class="fa fa-user"></span>
                                <span class="link">Profile</span>
                            </Link>
                        </div>
                        <div class="navbar-brand">
                            <Link to={`/matchAnalysis/${matchId}`} style={{ textDecoration: 'none' }}>
                                <span class="fa fa-gears"></span>
                                <span class="link">Match Analysis</span>
                            </Link> 
                        </div>
                    </div>
                    <div class="navbar-collapse collapse">
                        <div class="navbar-form navbar-right">
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Search for a player" onChange={this.handleChange} value={searchedNickname} />
                            </div>
                            <button class="btn" onClick={this.handleClick}><span class="fa fa-search"></span></button>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default withRouter(Navbar);