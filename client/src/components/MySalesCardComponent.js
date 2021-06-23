import React, { Component } from "react";


class MySalesCard extends Component {

  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      account: null,
      contract: null,
      
    }
    this.cancelSale = this.cancelSale.bind(this);
  
  }
  componentDidMount = async () => {

  
    console.log("PROPS",this.props.data)
    this.setState({
      web3: this.props.data.web3,
      contract: this.props.data.contract,
      account: this.props.data.address

    })
  };
  
  cancelSale(e){
    // cancel sale functionality

    console.log("PROPS",this.props)
    this.state.contract.methods.cancelSaleArt(this.props.id).send({from: this.props.data.address}).then((res) => {
      
      console.log('Result', res)
      console.log("val",res.events.saleCancelEvent.returnValues)
      window.parent.location = window.parent.location.href; 
      alert("removed art from marketplace and added to your collection")
    })
   




    // console.log("KEY",e.target.id);
    // console.log("CONTRACT",this.props.data.contract)
    // const tokId = e.target.id;
    // console.log("tokId",Number(tokId));
    // console.log("value",this.props.val);
    // this.props.data.contract.methods.buyArt(Number(tokId)).send({from: this.state.account,value:Number(this.props.val)*1000000000000000000}).then((res) => {
      
    //   console.log('Result', res)
    //   console.log("val",res.events.buyEvent.returnValues)
    // })
  };


  render(){
    return(

      <div class="card" style={{width:"400px",padding:"10px"}}>
        <img class="card-img-top" src={`https://ipfs.io/ipfs/${this.props.ipfsHash}`} alt="Card image"/>
        <div class="card-body">
        <h4 class="card-title">{this.props.name}</h4>
        <p class="card-text">{this.props.desc}</p>
        <p class="card-text"  style={{fontWeight:"bold"}}>{"Price : "+this.props.val+" Ethers"}</p>
        <a id={this.props.id} onClick={this.cancelSale} class="btn btn-primary">Cancel</a>
        </div>
        {
      //     <div>
      //     <img src={`https://ipfs.io/ipfs/${this.props.ipfsHash}`} alt=""/>
      //     <h2>{this.props.name}</h2>
      //     <h3>{this.props.desc}</h3>
      //     <h3>{this.props.val}</h3>
      //    { console.log("PROPS",this.props.data) }
      //     <button id={this.props.id} onClick={this.cancelSale} >Cancel</button>

      // </div>
        }
      </div>


      
    )
  }
}

export default MySalesCard;