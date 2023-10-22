import "./App.css";
import Home_Header from "./Home_Header";
import Home_Section from "./Home_Section";
import Home_Footer from "./Home_Footer";
/**
 * Home.js has a react component of home page
 * @returns
 * It renders the react component.
 */
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