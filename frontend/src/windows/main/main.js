import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Navbar from '../../common/components/Navbar/Navbar';
import Profile from '../../pages/profile/profile';
import Match from '../../pages/match/match';

export default function Main() {
  return (
    <React.Fragment>
      <Navbar />
      <Switch>
        <Route exact path="/" component={() => <div>home/</div>} />
        <Route
          exact
          path="/profile/:nickname"
          component={props => <Profile {...props} />}
        />
        <Route
          exact
          path="/match/:matchId"
          component={props => <Match {...props} />}
        />
        <Route component={() => <div>Not found route 404</div>} />
      </Switch>
    </React.Fragment>
  );
}
