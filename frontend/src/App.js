import './App.css';
import Home from './Home';
import ApplicationForm from './Application_Form';
import { BrowserRouter,Route,Routes} from 'react-router-dom';
import FormSucessPage from './FormSucessPage';
import FormErrorPage from './FormErrorPage';
import Review from './Review';
import { useState ,useEffect} from 'react';
/**
 * App.js is a react component has rect router elements.
 * @parm - no paramters
 * @returns {JSX.Element}-React Component 
 */
function App() {

  /**
 * @param {Array} formdata - The state variable to store form data.
 * @description The `formdata` parameter represents the state variable used to store form data like contact details, bussiness details etc..,
 * It is initialized as an array containing an empty object by default.
 */
  const [formdata,setformdata]=useState([{}]);
  /**
 * @param {Array} balancesheet - The state variable to store balance sheet entries.
 * @description The `balancesheet` parameter represents the state variable used to store balance sheet entries, including year, month, etc.
 * It is initialized as an array containing empty objects by default.
 */
  const[balancesheet,setbalancesheet]=useState([]);
  /**
 * @param {boolean} checkbox_value - A boolean variable that stores checkbox values.
 * @description The `checkbox_value` parameter is used to toggle the value of the checkbox between true and false.
 * It is initialized as a boolean variable with a default value of false.
 */
  const [checkbox_value,setcheckbox_value]=useState(false);
/**
 * Effect to fetch balance sheet data based on checkbox_value or formdata account provider changes.
 * @function
 * @returns {void}
 * 
 * This effect runs whenever the data of `checkbox_value` or `formdata.account_provider` changes.
 * It fetches balance sheet data from a URL determined by the `account_provider` value.
 * If the error happens while fetching the data the error will be displayed in console.
 */
  useEffect(()=>{
    if(checkbox_value==true && formdata[0].account_provider){
    fetch(`https://effective-memory-rj96j9jx6vwhqwx-8080.app.github.dev/${formdata[0].account_provider}`)
    .then(response=>response.json())
    .then(data=>setbalancesheet(data))
    .catch(error=>console.error(error))
    }
    else{
        setbalancesheet([]);
    }
    
},[checkbox_value,formdata[0].account_provider])
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path={'/'} element={<Home/>}/>
      <Route path={'/form'} element={<ApplicationForm formdata={formdata} setformdata={setformdata} balancesheet={balancesheet} setbalancesheet={setbalancesheet} checkbox_value={checkbox_value} setcheckbox_value={setcheckbox_value} />}/>
      <Route path={'/sucess'} element={<FormSucessPage setformdata={setformdata} setbalancesheet={setbalancesheet}/>}/>
      <Route path={'/error'} element={<FormErrorPage setformdata={setformdata} setbalancesheet={setbalancesheet} />}/>
      <Route path={'/review'} element={<Review formdata={formdata}  balancesheet={balancesheet} />}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
