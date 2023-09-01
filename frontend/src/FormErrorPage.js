const FormErrorPage=(props)=>{
    const{setformdata,setbalancesheet}=props;
    setformdata([{}]);
    setbalancesheet([]);
    return(
        <div className="response_body">
            <p style={{marginLeft:"15px",fontSize:"25px",fontWeight:"lighter"}}>Some Error occurred contact the customer service</p>
        </div>
        );
}
export default FormErrorPage;