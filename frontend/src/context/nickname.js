import * as React from 'react';

export const NicknameContext = React.createContext({
  nickname: '',
  accountId: '',
});

export const withNickname = Component =>
  function withNicknameHOC(props) {
    return (
      <NicknameContext.Consumer>
        {({ nickname, accountId }) => (
          <Component {...props} nickname={nickname} accountId={accountId} />
        )}
      </NicknameContext.Consumer>
    );
  };
