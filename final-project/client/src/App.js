import React from 'react';
import NavBar from './NavBar';
import Main from './Main';
import SecurityLookup from './SecurityLookup';
import Methodology from './Methodology';
import Sources from './Sources';
import Subscribe from './Subscribe';
import Rubric from './Rubric';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from 'reactstrap';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar></NavBar>
          <Container>
            <Switch>
              <Route path="/methodology" component={Methodology} />
              <Route path="/securitylookup" component={SecurityLookup} />
              <Route path="/sources" component={Sources} />
              <Route path="/subscribe" component={Subscribe} />
              <Route path="/rubric" component={Rubric} />
              <Route component={Main} />
            </Switch>
          </Container>
        </div>
      </Router>
    );
  }
}

export default App;
