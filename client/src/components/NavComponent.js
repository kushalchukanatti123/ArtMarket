import React, { Component } from "react";
import {Link,NavLink} from 'react-router-dom';
import '../Navbar.css'

class Nav extends Component {



  render(){
    return(

       <div>
          <nav  className="navbar navbar-expand-lg navbar-mainbg" id="group">
          
          <Link className="navbar-brand navbar-logo" to="/">
            <h1 ><i><b>ArtMarket</b></i></h1>
          </Link>
        
        <div 
        className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
            
            
            
            <li className="nav-item">
              <NavLink className="nav-link" to="/" exact>
                <span>Marketplace</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/create" exact>
              <span>Create</span>
              </NavLink> 
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/my_collection" exact>
              <span>My Collection</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/my_sales" exact>
              <span>My Sales</span>
              </NavLink>
            </li>
            
            
            
            
        </ul>
      </div>

          <div class="info">
            
            <div><b>Account address : </b> {this.props.address}</div>
            <div><b>Account balance : </b> {Number(this.props.balance/1000000000000000000)+" Ethers"}</div>
        
          </div>




       
      </nav>
        
       </div>
    )
  }
}

export default Nav;