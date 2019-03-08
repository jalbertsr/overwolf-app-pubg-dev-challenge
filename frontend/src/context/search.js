// @deprecated context

import * as React from 'react';

const initialState = {
  searchNickname: '',
};

export const SearchContext = React.createContext({
  ...initialState,
  setSearchNickname: () => {},
});

export class SearchContextProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initialState,
      setSearchNickname: this.setSearchNickname, // eslint-disable-line react/no-unused-state
    };
  }

  setSearchNickname = nickname => {
    this.setState({
      searchNickname: nickname, // eslint-disable-line react/no-unused-state
    });
  };

  render() {
    return (
      <SearchContext.Provider value={this.state}>
        {this.props.children}
      </SearchContext.Provider>
    );
  }
}

export const withSearch = Component =>
  function withSearchrHOC(props) {
    return (
      <SearchContext.Consumer>
        {({ searchNickname, setSearchNickname }) => (
          <Component
            {...props}
            searchNickname={searchNickname}
            setSearchNickname={setSearchNickname}
          />
        )}
      </SearchContext.Consumer>
    );
  };
