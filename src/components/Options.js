import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Redirect
} from 'react-router-dom';

import Popup from './Popup.js';
import Foreground from './Foreground.js';

function Options() {
  return (
    <Router>
      <div styles={styles.container}>
        <h1>Chrome Ext - Options</h1>
        <nav>
          <ul>
          <li><Link to="/">Options</Link></li>
          <li><Link to="/popup">Popup</Link></li>
          <li><Link to="/foreground">Foreground</Link></li>
          </ul>
        </nav>
      </div>
      <Switch>
        <Route exact path="/popup">
          <Popup />
        </Route>
        <Route exact path="/foreground">
          <Foreground />
        </Route>
        <Route exact path="/">
          <Redirect to="/options.html" />
        </Route>
      </Switch>
    </Router>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nav_bar: {
    marginBottom: '50px'
  }
}

export default Options;
