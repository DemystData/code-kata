import './App.css';
import Home from './Home';
import ApplicationForm from './Application_Form';
import { BrowserRouter,Route,Routes} from 'react-router-dom';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path={'/home'} element={<Home/>}></Route>
      <Route path={'/form'} element={<ApplicationForm/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
