import React, { Component } from "react";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


  

class Card1 extends Component {

  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      account: null,
      contract: null,
      
    }
    this.handler = this.handler.bind(this);
  
  }
  componentDidMount = async () => {

  
    console.log("PROPS",this.props.data)
    this.setState({
      web3: this.props.data.web3,
      contract: this.props.data.contract,
      account: this.props.data.address

    })
  };
  
  handler(e){
    
    console.log("KEY",e.target.id);
    console.log("CONTRACT",this.props.data.contract)
    const tokId = e.target.id;
    console.log("tokId",Number(tokId));
    console.log("value",this.props.val);
    this.props.data.contract.methods.buyArt(Number(tokId)).send({from: this.state.account,value:Number(this.props.val)*1000000000000000000}).then((res) => {
      console.log('Result', res)
      window.parent.location = window.parent.location.href; 
      alert("The art has been added to your collection")
      console.log("val",res.events.buyEvent.returnValues)
    })
  };


  render(){


    return(


      <div class="card" style={{width:"400px",padding:"10px"}}>
        <img class="card-img-top" src={`https://ipfs.io/ipfs/${this.props.ipfsHash}`} alt="Card image"/>
        <div class="card-body">
        <h4 class="card-title">{this.props.name}</h4>
        <p class="card-text">{this.props.desc}</p>
        <p class="card-text"  style={{fontWeight:"bold"}}>{"Price : "+this.props.val+" Ethers"}</p>
        <a id={this.props.id} onClick={this.handler} class="btn btn-primary">Buy</a>
        </div>
      </div>

        
     
    )
  }
}

export default Card1;