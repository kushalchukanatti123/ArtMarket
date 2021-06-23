import React, { Component } from "react";
import Card1 from "../components/CardComponent";
import GridList from '@material-ui/core/GridList';
import Grid from '@material-ui/core/Grid';
import GridListTile from '@material-ui/core/GridListTile';

class Home extends Component {


  constructor(props) {
    super(props)

    this.state = {
      ipfsHash: '',
      web3: null,
      buffer: null,
      account: null,
      contract: null,
      accounts:null,
      Data:[]
      
    }
   
  
  
  }
  componentDidMount = async () => {

    console.log("PROPS",this.props.data)
    this.setState({
      web3: this.props.data.web3,
      contract: this.props.data.instance,
      account: this.props.data.address

    })
    this.GetData()
    document.body.style.backgroundColor = "#3f3e3e"

  
  
  };

  GetData = async () => {
 
    const data = [];
    
    console.log("Contract",this.props.data.contract)
     const tot = await this.props.data.contract.methods.totalSupply().call();
        for(var i=0;i<tot;i++){
         const dataa = await this.props.data.contract.methods.getArtInfo(i).call()
         data.push(dataa)
        }
        console.log("DATA",data)
        this.setState({
          Data:data
        })

  };

 

  

  
  render(){
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
      
    return(
      
      <div >
       {
        // this.state.Data.map(item => <h1>{item[0].toString()}</h1>)


        console.log("Data",this.state.Data)
       }

    
      <Grid container justify="center" alignItems="center" spacing={4} style={{paddingLeft:"60px",paddingRight:"60px",paddingTop:"60px",paddingBottom:"60px"}}>
      { this.state.Data.map(item =>item[5]? <Grid style={{paddingLeft:"30px",paddingRight:"30px",paddingTop:"30px",paddingBottom:"30px"}} item xs={4}><Card1 key={item[0]} id={item[0]} name={item[1]} desc={item[2]} val={item[3]} data={this.props.data} ipfsHash={item[7]}/></Grid>:null) }
      </Grid>
         
      </div>
    )
  }
}

export default Home;