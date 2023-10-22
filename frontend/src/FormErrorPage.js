const FormErrorPage=(props)=>{
    const{setformdata,setbalancesheet}=props;
    setformdata([{}]);
    setbalancesheet([]);
    return(
        <div style={{background:"#C5CBE3",width:"100%",height:"100%",position:"absolute",top:0}}>
        <div className="response_body">
            <p style={{marginLeft:"15px",fontSize:"25px",fontWeight:"bold",color:"white"}}>Some Error occurred contact the customer service</p>
        </div>
        </div>
        );
}
export default FormErrorPage;