import React, { Component } from "react";
import Mint from "./pages/MintComponent";
import Navi from "./components/NavComponent";
import Home from "./pages/HomeComponent";
import MyCollection from "./pages/MyCollectionComponent";

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom' 


import SimpleStorageContract from "./contracts/SimpleStorage.json"
import getWeb3 from "./getWeb3";

import "./App.css";
import MySales from "./pages/MySalesComponent";


class App extends Component {

  
  constructor(props) {
    super(props)

    this.state = {
      ipfsHash: '',
      web3: null,
      buffer: null,
      address: null,
      contract:null,
      accounts:null,
      balance:null
      
    }
    if(window.ethereum) {
      window.ethereum.on('accountsChanged', function () {
         
              console.log("ACCOUNT CHANGED REFRESHING")
              window.parent.location = window.parent.location.href; 
              alert("Metamask account change detected, refreshing for safer experience")
          
      });
  }
  
  }
    
  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      
      this.setState({contract:instance,address:accounts[0],web3:web3, accounts:accounts})
      const balance = await web3.eth.getBalance(this.state.address)
      this.setState({balance:balance})
  
      console.log("",this.state)
    
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };
  render(){
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return(
      <Router>
        <Navi address={this.state.address} balance = {this.state.balance}/>
      <Switch>
      <Route path="/" exact component={() => (<Home data={this.state} />)}/>
      <Route path="/create"  component={() => (<Mint data={this.state} />)}/>
      <Route path="/my_collection" component={() => (<MyCollection data={this.state} />)}/>
      <Route path="/my_sales" component={() => (<MySales data={this.state} />)}/>
    
      </Switch>
      </Router>
      
    )
  }

 
}

export default App;
