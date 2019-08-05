import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Homepage from '../components/Homepage';
import Login from '../components/newupdate/Login';
import GeneralEditCard from '../components/GeneralEditCard';

class App extends Component {
  render() {

    return (
      <div className="App">
        <Router>
          <div>
            <Route exact path="/" component={Homepage} />
            <Route exact path='/login'component={Login} />
            <Route exact path='/Add' component={GeneralEditCard} />
          </div>
        </Router>
        {//<Footer />
        }
      </div>
    );
  }
}

export default App;
