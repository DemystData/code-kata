import './App.css';
import Form from './Form';
const Application_Form=(props)=>{
    const{formdata,setformdata,balancesheet,setbalancesheet,checkbox_value,setcheckbox_value}=props;
    
return(
    <>
    <div style={{backgroundColor:"blueviolet",position:"absolute",top:0,width:"100%"}}>
    <Form formdata={formdata} setformdata={setformdata} balancesheet={balancesheet} setbalancesheet={setbalancesheet} checkbox_value={checkbox_value} setcheckbox_value={setcheckbox_value}/>
    </div>
    </>
)
}
export default Application_Form