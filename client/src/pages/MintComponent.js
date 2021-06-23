import React, { Component } from "react";
import SimpleStorageContract from "../contracts/SimpleStorage.json";
import getWeb3 from "../getWeb3.js";

import "../App.css";
import ipfs from "../ipfs"

class Mint extends Component{

 constructor(props) {
    super(props)

    this.state = {
      ipfsHash: '',
      web3: null,
      buffer: null,
      account: null,
      instance:null,
      contract: null,
      accounts:null,

      //nft stuff
      nftName:"",
      nftDesc:"",
      nftVal:"",
      nftFileName:null
      
    }
    this.captureFile = this.captureFile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  
  }
  componentDidMount = async () => {

    this.setState({
      web3: this.props.data.web3,
      instance: this.props.data.instance,
      contract: this.props.data.instance,
      account: this.props.data.address

    })
    
      document.body.style.backgroundColor = "#3f3e3e"
  

    console.log("DATA",this.props.data)



    // try {


    //   // Get network provider and web3 instance.
    //   const web3 = await getWeb3();

    //   // Use web3 to get the user's accounts.
    //   const accounts = await web3.eth.getAccounts();

    //   // Get the contract instance.
    //   const networkId = await web3.eth.net.getId();
    //   const deployedNetwork = SimpleStorageContract.networks[networkId];
    //   const instance = new web3.eth.Contract(
    //     SimpleStorageContract.abi,
    //     deployedNetwork && deployedNetwork.address,
    //   );

    //   this.setState({instance:instance,address:accounts[0]})
  
    //   // Set web3, accounts, and contract to the state, and then proceed with an
    //   // example of interacting with the contract's methods.
    //   this.setState({ web3, accounts, contract: instance }, this.runExample);
    // } catch (error) {
    //   // Catch any errors for any of the above operations.
    //   alert(
    //     `Failed to load web3, accounts, or contract. Check console for details.`,
    //   );
    //   console.error(error);
    // }
  };



  // runExample = async () => {
  //   const { accounts, contract } = this.state;

  //   // Stores a given value, 5 by default.
  //   await contract.methods.set(5).send({ from: accounts[0] });

  //   // Get the value from the contract to prove it worked.
  //   const response = await contract.methods.get().call();

  //   // Update state with the result.
  //   this.setState({ storageValue: response });
  // };


  captureFile(event) {
    event.preventDefault()
    const file = event.target.files[0]

    //Checking image dimension
    let img = new Image()
    img.src = window.URL.createObjectURL(event.target.files[0])
    img.onload = () => {
       if(img.width === 200 && img.height === 200){
            this.setState({
              nftFileName:URL.createObjectURL(file)
            })
            const reader = new window.FileReader()
            reader.readAsArrayBuffer(file)
            reader.onloadend = () => {
              this.setState({ buffer: Buffer(reader.result) })
              console.log('buffer', this.state.buffer)
            }
            } else {
            alert(`Sorry, this image doesn't look like the size we wanted. It's ${img.width} x ${img.height} but we require 200 x 200 size image.`);
           
       }                
    }
    //Checking image dimension...ends



    
  }

  onSubmit(event) {
    event.preventDefault()

    //ADDING IPFS TO FILES
    ipfs.files.add(this.state.buffer, (error, result) => {
      if(error) {
        console.error(error)
        return
      }
      console.log("IPFS hash",result[0].hash)
      console.log("instance",this.state.instance)
      console.log("address",this.state.address)

      console.log("NFT DATA",this.state.nftName+" "+this.state.nftDesc+" "+this.state.nftVal)
      this.setState({ ipfsHash: result[0].hash })

      this.props.data.contract.methods.mintArt(this.state.ipfsHash,this.state.nftName,this.state.nftDesc,this.state.nftVal).send({from: this.state.account}).then((res) => {
      
        console.log('Result', res)
        window.parent.location = window.parent.location.href; 
        alert("Created and added to marketplace")
       
        console.log("val",res.events.mintEvent.returnValues)
      })
    })
  }


  handleChange(event){
    const {name,value} = event.target
    this.setState({
      [name]:value
    })
  }


  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h2 style={{color:"#fff"}}>Create Art</h2>

      <div className="card container" style={{width:"800px",padding:"10px"}}>
      <form onSubmit={this.onSubmit}>
      <img src={this.state.nftFileName} alt=""/>
      <div className="form-group" style={{marginLeft:"30px",marginRight:"30px",padding:"10px"}}>

      
      
      
          <label >Title</label>
          <input type="text" className="form-control" name="nftName" onChange={this.handleChange} value={this.state.nftName} placeholder="Name" />
        </div>  
        <div className="form-group" style={{marginLeft:"30px",marginRight:"30px",padding:"10px"}}>
          <label >Description</label>
          <input type="text"  className="form-control"  name="nftDesc" onChange={this.handleChange} value={this.state.nftDesc} placeholder="Description" /> 
        </div>
        <div className="form-group" style={{marginLeft:"30px",marginRight:"30px",padding:"10px"}}>
          <label >Price</label>
          <input type="number" className="form-control" min="0" name="nftVal" onChange={this.handleChange} value={this.state.nftVal} placeholder="Value" />
          <small class="form-text text-muted"><b>Note : </b>Specify amount in ethers</small>
        </div>
        <br></br>
        <br></br>
        <div>
        <input type='file' onChange={this.captureFile} />
        </div>
        <br></br>
        <br></br>
  
  
          <button type="submit" style={{width:"200px",padding:"10px"}} class="btn btn-primary">Submit</button>
        </form>
      </div>
      </div>
    );
  }
}

export default Mint;