import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import './sidebarStyles.css';
import { SidebarContext } from '../../context/sidebar';

export default function SidebarDrawer() {
  return (
    <SidebarContext.Consumer>
      {({ isSidebarActive }) => (
        <TransitionGroup component={null}>
          {isSidebarActive && (
            <CSSTransition classNames="dialog" timeout={200}>
              <div className="sidenav">
                <ul>
                  <li href="#">libout</li>
                  <li href="#">Services</li>
                  <li href="#">Clients</li>
                  <li href="#">Contlict</li>
                </ul>
              </div>
            </CSSTransition>
          )}
        </TransitionGroup>
      )}
    </SidebarContext.Consumer>
  );
}
