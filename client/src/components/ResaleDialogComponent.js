import React, {useState} from "react";

import Modal from 'react-modal'
  
  
  

function ResaleDialogComponent(props) {
  const[modalIsOpen,setModalIsOpen]=useState(false)
  
  function sellArt(e){
      e.preventDefault()
      var pr =  document.getElementById("newPrice").value
      //SALE HERE  
      props.data.data.contract.methods.saleArt(props.data.id,Number(pr)).send({from: props.data.data.address}).then((res) => {
      
        console.log('Result', res)
        setModalIsOpen(false)
        console.log("val",res.events.saleEvent.returnValues)
        window.parent.location = window.parent.location.href; 
        alert("Added for sale in marketplace")
      })
  }
  function closeModal(){
    setModalIsOpen(false);

  }

  return (
      
    <>
    <button style={{backgroundColor:"#ff00ff",width:"100px",color:"#fff",fonteight:"bold"}} onClick={()=>setModalIsOpen(true)}>Resale</button>
     <div  className="container">
     <Modal style={{backgroundColor: "#000"}} isOpen={modalIsOpen}>
         
         <div  className="container">
         <form style={{alignItems:"center",justifyContent:"center"}}>
           {
             console.log("PROPS>DATA",props.data)
           }
            <img style={{width:"400px"}} class="card-img-top" src={`https://ipfs.io/ipfs/${props.data.ipfsHash}`} alt="Card image"/>
    
            <div className="form-group">
            <h2>{props.data.name}</h2>
            </div>
            <div className="form-group">
            <h3>{props.data.desc}</h3>
            </div>
            <div className="form-group">
            <h3>{"Original price : "+props.data.val+" Ethers"}</h3>
            </div>
            <div style={{width:"200px"}} class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="number" class="form-control" id="newPrice" aria-describedby="emailHelp" placeholder="Price"/>
              <small id="emailHelp" class="form-text text-muted">Please specify price in ethers.</small>
            </div>
            <button style={{margin:"20px",width:"200px"}} class="btn btn-secondary" onClick={closeModal}>Cancel</button>
            <button style={{margin:"20px",width:"200px"}} type="submit" onClick={sellArt} class="btn btn-primary">Sell</button>
            
         </form>
         </div>
              
            
             
         </Modal>
     </div>
    </>
  );
}
  
export default ResaleDialogComponent;