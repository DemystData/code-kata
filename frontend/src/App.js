import './App.css';
import Home from './Home';
import ApplicationForm from './Application_Form';
import { BrowserRouter,Route,Routes} from 'react-router-dom';
import FormSucessPage from './FormSucessPage';
import FormErrorPage from './FormErrorPage';
import Review from './Review';
import { useState } from 'react';

function App() {
  const [formdata,setformdata]=useState([{}]);
  
  const[balancesheet,setbalancesheet]=useState([]);
  const [checkbox_value,setcheckbox_value]=useState(false);
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
