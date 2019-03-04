import React, { Component } from 'React';
import { Route, Switch } from 'react-router-dom';

import Navbar from '../../common/components/Navbar/Navbar'

export default class Main extends Component {
    constructor(props){
        super(props)
        this.state = {
            nickname: 'jaxalbert' 
        }
    }

    render () {
        return (
            <React.Fragment>
                <Navbar />
                <Switch>
                  <Route exact path="/" component={() => (<div>home/</div>)} />
                  <Route exact path="/profile/:nickname" component={(props) => (<div>profile/{console.log(props)}</div>)}/>
                  <Route exact path="/matchAnalysis/:matchId" component={(props) => (<div>lastMatch/{console.log(props)}</div>)}/>
                  <Route component={() => (<div>Not found route 404</div>)} />
                </Switch>
            </React.Fragment>
        );
    }
}