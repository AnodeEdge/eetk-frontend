import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import NavigationBar from './components/NavigationBar'
import NavRoute from './routes/NavRoutes'


function App() {
  return (
    <Router>
      <div className = "App">
        <NavigationBar></NavigationBar>
        <NavRoute></NavRoute>
      </div>
    </Router>
  );
}

export default App;
