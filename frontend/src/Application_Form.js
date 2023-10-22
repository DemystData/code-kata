import './App.css';
import Form from './Form';

/**
 * Application.js is a file that render the react component form.
 * @param {Object} `props` - props object conatins formdata, setformdata,balancesheet,setbalancesheet
 * @param {Array} `formdata`- formdata is state contains form field values and empty by default
 * @parm {Array}'setformdata'- setformdata is a state that changed the value of formdata array when ever the value changes.
 * @param {Array} `balancesheet`- balancesheet is state contains form field values and empty by default
 * @param {Array} `setbalancesheet`- setbalancesheet is a state that changed the value of balacesheet array when ever the value changes. 
 * @parem {checkbox_value} `checkbox_value` - checkbox_value is a state that has a value of form checkbox defualt value is false.
 * @parm {setcheckbox_value}`setcheckbox_value`-The `setcheckbox_value` parameter is used to toggle the value of the checkbox_value between true and false.
 * @returns {JSX.Element} - return the react component form.
 */
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