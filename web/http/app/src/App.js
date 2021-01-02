import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './App.css';
import Search from './components/Search';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Search} />
      </Switch>
    </Router>
  );
}

export default App;
