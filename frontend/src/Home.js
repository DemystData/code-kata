import "./App.css";
import Home_Header from "./Home_Header";
import Home_Section from "./Home_Section";
import Home_Footer from "./Home_Footer";
const Home=()=>{
return(
<>
    <div className='first_page'>
      <Home_Header/>
      <Home_Section/>
      <Home_Footer/>
    </div>
    </>
)
}    
export default  Home;