import "./App.css"
const FormSucessPage=(props)=>{
    const{setformdata,setbalancesheet}=props;
    setformdata([{}]);
    setbalancesheet([]);
    return(
    <div className="response_body">
        <p style={{marginLeft:"15px",fontSize:"25px",fontWeight:"lighter"}}>Response was successfully recorded</p>
    </div>
    );
}
export default FormSucessPage;