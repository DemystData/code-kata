import './App.css';
import { useEffect, useState } from 'react';
import ReactDOM  from 'react-dom/client';
import FormSucessPage from './FormSucessPage';
import FormErrorPage from './FormErrorPage';
const Application_Form=()=>{
    const select_option=['Xero','MYOB'];
    const [checkbox_value,setcheckbox_value]=useState(false);
    const [formdata,setformdata]=useState([{
        company_name:"",
        business_type:"",
        year_established:"",
        industry:"",
        contact_name:"",
        email_address:"",
        phone_number:"",
        loan_amount:"",
        purpose_of_Loan:"",
        account_provider:"",
    }]);
    

    const Enter_value=(e)=>{
        const {id,value} =e.target;
        setformdata(form=>form.map((list,index)=>(index===0?{...list,[id]:value}:list)));
    }

    const[balancesheet,setbalancesheet]=useState([]);
    const [input_disable,setinput_disable]=useState(true);

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

    const ChangeBalanceSheet=(e)=>{
        const {name,id,value}=e.target;
        console.log(name,id,value);
        setbalancesheet(bs=>bs.map((list,index)=>(index==id?({...list,[name]:value}):(list))))
    }

    const SubmitForm=(e)=>{
        e.preventDefault();
        const senddata={formdata:formdata,balancesheet:balancesheet};
        const response=fetch('https://effective-memory-rj96j9jx6vwhqwx-8080.app.github.dev/decision_maker',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(senddata),
        })
        
        .then(response=>{
            const root=ReactDOM.createRoot(document.getElementById("root"));
            if(response.ok){
                root.render(<FormSucessPage/>);
            }
            else{
                root.render(<FormErrorPage/>);
            }
        })
        .catch(error=>console.log(error));
       

    }
    
return(
    <>
    <div style={{backgroundColor:"blueviolet",position:"absolute",top:0,width:"100%"}}>
    <div className='form_body'>
    <form>
        <h2 style={{textAlign:"center",paddingTop:"30px"}}>Loan Application Form</h2>
        <div style={{marginLeft:"5%",marginTop:"5%",width:"90%"}}>
        <h4>Business Information</h4>
        <div className="form_label">
        <div><label>Business Name<span className='red_star'>*</span></label></div><div><input className='form_input' type="text" name="company_name" id="company_name" placeholder='Enter comapany name' value={formdata[0].company_name} onChange={(e)=>{Enter_value(e)}} required autoFocus/></div>
        </div>
       <div className="form_label">
        <div><label>Business Type<span className='red_star'>*</span></label></div><div><input className='form_input' type="text" name="business_type" id="business_type" placeholder='Enter business type' value={formdata[0].business_type} onChange={(e)=>{Enter_value(e)}} required/></div>
        </div>
       <div className="form_label">
        <div><label >Year Established<span className='red_star'>*</span></label></div><div><input className='form_input' min="1950" max={(new Date().getFullYear())} type="number" name="year_established" id="year_established" placeholder='Enter year established' value={formdata[0].year_established} onChange={(e)=>{Enter_value(e)}} required/></div>
        </div>
       <div className="form_label">
        <div><label >Industry<span className='red_star'>*</span></label></div><div><input className='form_input' type="text" name="industry" id="industry" placeholder='Enter industry' value={formdata[0].industry} onChange={(e)=>{Enter_value(e)}} required/></div>
        </div>

        <h4>Contact Details</h4>

       <div className="form_label">
        <div><label >Contact Name<span className='red_star'>*</span></label></div><div><input className='form_input' type="text" name="contact_name" id="contact_name" placeholder='Enter contact name' value={formdata[0].contact_number} onChange={(e)=>{Enter_value(e)}} required/></div>
        </div>

       <div className="form_label">
        <div><label >Email Address<span className='red_star'>*</span></label></div><div><input className='form_input' type="email" name="email_address" id="email_address" placeholder='Enter email address' value={formdata[0].email_address} onChange={(e)=>{Enter_value(e)}} required/></div>
        </div>

       <div className="form_label">
        <div><label >Phone Number<span className='red_star'>*</span></label></div><div><input className='form_input' type="text" name="phone_number" id="phone_number" placeholder='Enter phone number' value={formdata[0].phone_number} onChange={(e)=>{Enter_value(e)}} required/></div>
        </div>
       
        <h4>Financial Information</h4>
        <div className='form_label'>
        <div><label>Loan Amount Required<span className='red_star'>*</span></label></div>
        <div><input className='form_input' type='number' id="loan_amount" name='loan_Amount' placeholder='Enter Loan amount' value={formdata[0].loan_amount} onChange={(e)=>{Enter_value(e)}} required /></div>
        </div>
        <div className='form_label'>
        <div><label>Purpose of Loan<span className='red_star'>*</span></label></div>
        <div><input className='form_input' type='text' name='purpose_of_Loan' id="purpose_of_Loan" placeholder='Enter purpose of loan' value={formdata[0].purpose_of_Loan} onChange={(e)=>{Enter_value(e)}} required /></div>
        </div>
        
       <div className="form_label">
        <div><label>Accounting Provider<span className='red_star'>*</span></label></div>
        <div><select className="form_select" id="account_provider"  name="account_provider" onChange={(e)=>{Enter_value(e)}}>
            <option disabled selected>Select</option>
              {
                select_option.map((list,index)=>{
                    return(
                        <>
                        <option key={index}  value={list}>{list}</option>
                        </>
                    );
                })
              }  
        </select>
        </div>
        </div>
        </div>
        <div className='form_label'>
        <div><input className="form_checkbox" type='checkbox' checked={checkbox_value} onChange={()=>checkbox_value==true?(setcheckbox_value(false)):setcheckbox_value(true)} required></input> <span><span className='red_star'>*</span>Click hear to fetch balance sheet</span></div></div>
        {
            balancesheet.length>0?(
        <div className='balance_sheet_table'>
        <div style={{marginBottom:"10px",width:"100%",height:"20px"}}>
        <button onClick={(e)=>{e.preventDefault();setinput_disable(false)}} className='table_button red'>Edit</button>
        <button onClick={(e)=>{e.preventDefault();setinput_disable(true)}} className='table_button grey'>Lock</button>
        </div>
        <table>
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
                            <td className='balance_sheet_data'><input className='balance_sheet_input' value={balancesheet[index].year} name={"year"} id={index} disabled={input_disable} onChange={(e)=>ChangeBalanceSheet(e)}/></td>
                            <td className='balance_sheet_data'><input className='balance_sheet_input' value={list.month} name={"month"} id={index} disabled={input_disable} onChange={(e)=>ChangeBalanceSheet(e)}/></td>
                            <td className='balance_sheet_data'><input className='balance_sheet_input' value={list.profitOrLoss} name={"profitOrLoss"} id={index} disabled={input_disable} onChange={(e)=>ChangeBalanceSheet(e)}/></td>
                            <td className='balance_sheet_data'><input className='balance_sheet_input' value={list.assetsValue} name={"assetsValue"} id={index} disabled={input_disable} onChange={(e)=>ChangeBalanceSheet(e)}/></td>
                        </tr>
                    );
                })
            }
        </table>
        </div>
            ):null
        }
        <button className='submit_button' onClick={(e)=>SubmitForm(e)}>Submit</button>
    </form>
    </div>
    </div>
    </>
)
}
export default Application_Form