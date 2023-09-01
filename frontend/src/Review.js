import './App.css';
import { useNavigate } from 'react-router-dom';
const Review=(props)=>{
    const{formdata,balancesheet,setformdata,setbalancesheet}=props;
    const navigate=useNavigate();
    const submitForm=(e)=>{
        e.preventDefault();
        const senddata={formdata:formdata,balancesheet:balancesheet};
        fetch('https://effective-memory-rj96j9jx6vwhqwx-8080.app.github.dev/decision_maker',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(senddata),
        })
        
        .then(response=>{
            if(response.ok){
                
               navigate('/sucess',{replace:true});
            }
            else{
                navigate('/error',{replace:true});
            }
        })
        .catch(error=>console.log(error));
    }
return(
<div style={{backgroundColor:"blueviolet",position:"absolute",top:0,width:"100%"}}>
<div className='form_body'>
        <h2 style={{textAlign:"center",paddingTop:"30px"}}>Loan Application Form</h2>
        <div style={{marginLeft:"5%",marginTop:"5%",width:"90%"}}>
        <h4>Business Information</h4>
        <div className="form_label">
        <div><span>Business Name: </span><span>{formdata[0].company_name}</span></div>
        </div>
       <div className="form_label">
        <div><span>Business Type: </span><span>{formdata[0].business_type}</span></div>
        </div>
       <div className="form_label">
        <div><span>Year Established: </span><span>{formdata[0].year_established}</span></div>
        </div>
       <div className="form_label">
        <div><span >Industry: </span><span>{formdata[0].industry}</span></div>
        </div>

        <h4>Contact Details</h4>

       <div className="form_label">
        <div><span >Contact Name: </span><span>{formdata[0].contact_name}</span></div>
        </div>

       <div className="form_label">
        <div><span >Email Address: </span><span>{formdata[0].email_address}</span></div>
        </div>

       <div className="form_label">
        <div><span >Phone Number: </span><span>{formdata[0].phone_number}</span></div>
        </div>
       
        <h4>Financial Information</h4>
        <div className='form_label'>
        <div><span>Loan Amount Required: </span><span>{formdata[0].loan_amount}</span></div>
        </div>
        <div className='form_label'>
        <div><span>Purpose of Loan: </span><span>{formdata[0].purpose_of_Loan}</span></div>
        </div>
       <div className="form_label">
        <div><span>Accounting Provider: </span><span>{formdata[0].account_provider}</span></div>
        </div>
        </div>
        <div>
        <div className='balance_sheet_table_review'>
        <table style={{width:"100%"}}>
            <tr>
            <th>Year</th>
            <th>Month</th>
            <th>Profit or Loss</th>
            <th>Assets Value</th>
            </tr>
            {
                balancesheet.map((list,index)=>{
                    return(
                        <tr key={index}>
                            <td className='balance_sheet_data_review'><div>{list.year}</div></td>
                            <td className='balance_sheet_data_review'><div>{list.month}</div></td>
                            <td className='balance_sheet_data_review'><div>{list.profitOrLoss}</div></td>
                            <td className='balance_sheet_data_review'><div>{list.assetsValue}</div></td>
                        </tr>
                    );
                })
            }
        </table>
        </div>
        </div>
        <button className="back_button" onClick={(e)=>{e.preventDefault();navigate('/form')}}>Back</button>
        <button className='submit_button' type="submit" onClick={(e)=>submitForm(e)}>Submit</button>
    </div>
    </div>
);
}
export default Review;