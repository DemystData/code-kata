import './App.css';
import Home from './Home';
import ApplicationForm from './Application_Form';
import { BrowserRouter,Route,Routes} from 'react-router-dom';
import FormSucessPage from './FormSucessPage';
import FormErrorPage from './FormErrorPage';
import Review from './Review';
import { useState ,useEffect} from 'react';

function App() {
  const [formdata,setformdata]=useState([{}]);
  
  const[balancesheet,setbalancesheet]=useState([]);
  const [checkbox_value,setcheckbox_value]=useState(false);

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
