// primary navigation bar

import React from 'react';
import '../css/NavigationBar.css'
import ListLink from '../components/ListLink'

function NavigationBar() {
  
  const listStyle = {
    fontSize: "large"
  }
 
  // Modify Navigation Bar Links Here
  const linkData = [
    { reference: "/", value: "Calculations" },
    { reference: "/references", value: "References" },
    { reference: "/about", value: "About" },
    { reference: "/contact", value: "Contact" },
  ]
  
  return (
    <div style={{background: "#333"}}>
      <div>
          <div className = "nav-container">
            <div className = "nav-flex-item" style={{marginLeft: "10%"}}>
              <img 
              width="45 px" 
              src="https://avatars3.githubusercontent.com/u/42901002?s=460&v=4"
              alt="logo"
              ></img>
            </div>
            <div className = "nav-flex-item">
              <label className="title">YouConduit</label>
            </div>
            <ul className="nav-flex-ul">
              {linkData.map( (data) => 
                <ListLink 
                reference={data.reference} 
                value={data.value}
                style={listStyle}
                class= "nav-link">
                </ListLink>
              )}
            </ul>
        </div>
      </div>
    </div>
  )
}

export default NavigationBar;