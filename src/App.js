import React from 'react';
import './App.css';
import PIVCalculator from './components/PIVCalculator';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import NavigationBar from './components/NavigationBar'
import Home from './pages/Home'
import References from './pages/References'
import Calculations from './pages/Calculations'



function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <NavigationBar></NavigationBar>
          <PIVCalculator></PIVCalculator>
          <Switch>
            <Route path='/references' component={References} />
            <Route path='/calculations' component={Calculations} />
            <Route path="/" component={Home} />
          </Switch>   
        </header>
      </div>
      
    </Router>
  );
}

export default App;
