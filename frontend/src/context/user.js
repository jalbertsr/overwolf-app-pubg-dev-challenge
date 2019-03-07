import * as React from 'react';

export const UserContext = React.createContext({
  nickname: '',
});

export const withUser = Component =>
  function withUserHOC(props) {
    return (
      <UserContext.Consumer>
        {({ nickname }) => <Component {...props} nickname={nickname} />}
      </UserContext.Consumer>
    );
  };
