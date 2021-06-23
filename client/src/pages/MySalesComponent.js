import React, { Component } from "react";
import MySalesCard from "../components/MySalesCardComponent"
import Grid from '@material-ui/core/Grid';


class MySales extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
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
         var own = await this.props.data.contract.methods.ownerOf(i).call();
         console.log("COMPARISON",own +" && " +this.state.account)
         console.log("dataa",dataa[5])
         if(own===this.state.account && dataa[5]===true){
          data.push(dataa)
         }
        
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
      <div>
      

        <div  >
       {
        // this.state.Data.map(item => <h1>{item[0].toString()}</h1>)
        console.log("Data",this.state.Data)
       }

    
      <Grid container spacing={4} style={{paddingLeft:"60px",paddingRight:"60px",paddingTop:"60px",paddingBottom:"60px"}}>
      { this.state.Data.map(item =><Grid style={{paddingLeft:"30px",paddingRight:"30px",paddingTop:"30px",paddingBottom:"30px"}} item xs={4}><MySalesCard key={item[0]} id={item[0]} name={item[1]} desc={item[2]} val={item[3]} data={this.props.data} ipfsHash={item[7]}/></Grid>) }
      </Grid>
         
      </div>




       {
        // this.state.Data.map(item => <h1>{item[0].toString()}</h1>)
        // console.log("Data",this.state.Data)
        // { this.state.Data.map(item =><MySalesCard key={item[0]} id={item[0]} name={item[1]} desc={item[2]} val={item[3]} data={this.props.data} ipfsHash={item[7]}/>) }

       }
         
      </div>
    )
  }

}

export default MySales;