import './App.css'
import {Link} from 'react-router-dom';
const Home_Section=()=>{
return(
<div className='first_page_section'>
        <Link to={"/form"}>  
        <button type='button'  style={{backgroundColor:"white",border:"2px solid green",float:"right",marginRight:"200px",marginTop:"200px",height:"45px",fontSize:"20px",borderRadius:"30px",padding:"5px"}}>Application Form</button>
        </Link>
</div>
);
}
export default Home_Section;