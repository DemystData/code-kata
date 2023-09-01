import './App.css';
import Home from './Home';
import ApplicationForm from './Application_Form';
import { BrowserRouter,Route,Routes} from 'react-router-dom';
import FormSucessPage from './FormSucessPage';
import FormErrorPage from './FormErrorPage';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path={'/'} element={<Home/>}/>
      <Route path={'/form'} element={<ApplicationForm/>}/>
      <Route path={'/sucess'} element={<FormSucessPage/>}/>
      <Route path={'/error'} element={<FormErrorPage/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
