// @deprecated context

import * as React from 'react';

const initialState = {
  isSidebarActive: false,
};

export const SidebarContext = React.createContext({
  ...initialState,
  setSidbarState: () => {},
});

export class SidebarContextProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initialState,
      setSidbarState: this.setSidbarState, // eslint-disable-line react/no-unused-state
    };
  }

  setSidbarState = isSidebarActive => {
    this.setState({
      isSidebarActive, // eslint-disable-line react/no-unused-state
    });
  };

  render() {
    return (
      <SidebarContext.Provider value={this.state}>
        {this.props.children}
      </SidebarContext.Provider>
    );
  }
}

export const withSidebarState = Component =>
  function withSidebarStateHOC(props) {
    return (
      <SidebarContext.Consumer>
        {({ isSidebarActive, setSidbarState }) => (
          <Component
            {...props}
            isSidebarActive={isSidebarActive}
            setSidbarState={setSidbarState}
          />
        )}
      </SidebarContext.Consumer>
    );
  };
