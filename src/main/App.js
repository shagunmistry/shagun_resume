import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Homepage from '../components/Homepage';
//import Footer from '../components/Footer';
//import Comingsoon from '../components/Comingsoon';
import Login from '../components/newupdate/Login';

class App extends Component {
  render() {

    return (
      <div className="App">
        <Router>
          <div>
            <Route exact path="/" component={Homepage} />
            <Route exact path='/login'component={Login} />
          </div>
        </Router>
        {//<Footer />
        }
      </div>
    );
  }
}

export default App;
