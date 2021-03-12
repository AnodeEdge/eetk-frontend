import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import NavRoute from "./routes/NavRoutes";
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <NavRoute />
        {/* <Footer/> */}
      </div>
    </Router>
    
  );
}

export default App;
