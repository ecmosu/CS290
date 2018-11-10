import React from 'react';
import NavBar from './NavBar';
import Main from './Main';
import Methodology from './Methodology';
import Sources from './Sources';
import Subscribe from './Subscribe';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from 'reactstrap';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar></NavBar>
          <Container>
            <Switch>
              <Route path="/methodology" exact component={Methodology} />
              <Route path="/sources" exact component={Sources} />
              <Route path="/subscribe" exact component={Subscribe} />
              <Route component={Main} />
            </Switch>
          </Container>
        </div>
      </Router>
    );
  }
}

export default App;
