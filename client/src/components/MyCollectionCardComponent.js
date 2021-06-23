import React, {Component, useState} from "react";

import ResaleDialogComponent from "./ResaleDialogComponent";

class MyCard extends Component {

  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      account: null,
      contract: null,
      
    }

  
  }
  componentDidMount = async () => {

  
    console.log("PROPS",this.props.data)
    this.setState({
      web3: this.props.data.web3,
      contract: this.props.data.contract,
      account: this.props.data.address

    })
  };
  
 

  render(){
 
    return(

      <div class="card" style={{width:"400px",padding:"10px"}}>
      <img class="card-img-top" src={`https://ipfs.io/ipfs/${this.props.ipfsHash}`} alt="Card image"/>
      <div class="card-body">
      <h4 class="card-title">{this.props.name}</h4>
      <p class="card-text">{this.props.desc}</p>
      <p class="card-text" style={{fontWeight:"bold"}}>{"Price : "+this.props.val+" Ethers"}</p>
      <ResaleDialogComponent data = {this.props}/>
      </div>
      </div>



      
    )
  }
}

export default MyCard;