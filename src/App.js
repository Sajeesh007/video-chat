import React from 'react'
import Home from './pages/Home'
import Meeting from './pages/Meeting'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {ProfileInfo, Skelton} from './components/videoPlayer/Skelton';

const App = () => {
  return (
    <div className='wrapper'>
      <Router>
        <Switch>
            <Route exact path="/">
              <Home isHome/>
            </Route>
            <Route path="/meeting">
              <Meeting/>
            </Route>
            <Route path="/login">
              <Home isLogin/>
            </Route>
            <Route path="/signup">
              <Home isSignup/>
            </Route>
            <Route path="/skelton">
              <div>
              <Skelton/>
              <ProfileInfo/>
              </div> 
            </Route>
        </Switch> 
      </Router>
    </div>
  );
};

export default App;
