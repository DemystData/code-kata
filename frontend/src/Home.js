import "./App.css";
import {Link} from 'react-router-dom';
const Home=()=>{
return(
<>
    <div className='first_page'>
      <div className='first_page_header'>
        <h1 style={{marginLeft:"10px"}}>Company Name</h1>
        <nav>
          
        </nav>
      </div>
      <div className='first_page_section'>
        <Link to={"/form"}>  
        <button type='button'  style={{backgroundColor:"white",border:"2px solid green",float:"right",marginRight:"200px",marginTop:"200px",height:"45px",fontSize:"20px",borderRadius:"30px",padding:"5px"}}>Application Form</button>
        </Link>
      </div>

      <div className='first_page_footer'>
        <span style={{marginLeft:"10px"}}>&#169;</span>
      </div>
    </div>
    </>
)
}    
export default  Home;