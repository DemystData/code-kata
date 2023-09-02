import './App.css'
import {Link} from 'react-router-dom';
/**
 * Home_Section.js has a react component of the home page
 * @returns {JSX.Element}
 * It renders the JSX elements of the react component Home_Section.
 */
const Home_Section=()=>{
return(
<div className='first_page_section'>
          
        <div style={{width:"40%",height:"40%",float:"right",marginTop:"150px",borderRadius:"25px 0px 0px 25px",background:"#0C4EA3"}}>
            <div style={{marginTop:"10%",width:"100%",textAlign:"center",fontSize:"20px",fontWeight:"bold",color:"white"}}>Click the button below to fill the form</div>
        <Link to={"/form"}>
        <button type='button'  style={{backgroundColor:"white",border:"2px solid transparent",marginLeft:"35%",marginTop:"20px",height:"45px",fontSize:"20px",borderRadius:"30px",padding:"5px"}}>Application Form</button>
        </Link>
        </div>
</div>
);
}
export default Home_Section;