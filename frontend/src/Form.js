import "./App.css"
import {useState} from 'react';
import { useNavigate } from "react-router-dom";

/**
 * Form.js is a react component that render the business loan application form
 * @param {*} props - props is a object that contains formdata , setformdata,balancesheet,setbalancsheet,checkboc_value,setcheckbox_value
 * @param {Array} `formdata`- formdata is state contains form field values and empty by default
 * @parm {Array}'setformdata'- setformdata is a state that changed the value of formdata array when ever the value changes.
 * @param {Array} `balancesheet`- balancesheet is state contains form field values and empty by default
 * @param {Array} `setbalancesheet`- setbalancesheet is a state that changed the value of balacesheet array when ever the value changes. 
 * @parem {checkbox_value} `checkbox_value` - checkbox_value is a state that has a value of form checkbox defualt value is false.
 * @parm {setcheckbox_value}`setcheckbox_value`-The `setcheckbox_value` parameter is used to toggle the value of the checkbox_value between true and false.
 * 
 * @returns {JSX.Element}
 * renders the react component form.
 */
const Form =(props)=>{
    const{formdata,setformdata,balancesheet,setbalancesheet,checkbox_value,setcheckbox_value}=props;
    const navigate = useNavigate();
    const select_option=['Xero','MYOB'];
    /**
     * 
     * @param {*} e - `e` - It carries the property values of the input field in the form data like id , name etc..,
     * @param {String} `id`- id carries the form field name.
     * @param  `value` - value carries the form input values.
     * @returns changes the formdata array value coresponded to the id for the form. 
     */
    const enter_value=(e)=>{
        const {id,value} =e.target;
        setformdata(form=>form.map((list,index)=>(index==0?{...list,[id]:value}:list)));
    }
/**
 * 
 * @param {*} e - carries HTML properties
 * @param {number} `id`- contains index of the array.
 * @param  `value` - value carries the form input values. 
 * @param {String} 'name' - name as value of propertie names in the array.
 */
    const changeBalanceSheet=(e)=>{
        const {name,id,value}=e.target;
        setbalancesheet(bs=>bs.map((list,index)=>(index==id?{...list,[name]:value}:list)));
    }

    const [input_disable,setinput_disable]=useState(true);
/**
 * submitForm manages the form submission
 * @function
 * @param {*} e 
 * @return {void}
 * It navigate to the review path.
 */
    const submitForm=(e)=>{
        e.preventDefault();
       navigate("/review");
    }
    /**
 * mobilenumber function validate the mobile number input field in html
 * @function
 * @param {*} e - HTML property of the field
 * @retrun {void} 
 * validate the mobile number input field when ever the changes happed.
 * 
 */
        const mobilernumber=(e)=>{
            var numbers = /^[0-9]+$/;
            if(e.target.value.match(numbers)|| e.target.value.length==0){
                if(e.target.value.length<=10){
                enter_value(e);
                }
            }
        }
/**
 * year function validate the year input field in html
 * @function
 * @param {*} e - HTML property of the field
 * @retrun {void} 
 * validate the year input field when ever the changes happed.
 * 
 */
        const year=(e)=>{
            var numbers = /^[0-9]+$/;
            if(e.target.value.match(numbers)|| e.target.value.length==0){
                if(e.target.value.length<=4){
                enter_value(e);
                }
            }
        }
/**
 * loanamount function validate the loan amount input field in html
 * @function
 * @param {*} e - HTML property of the field
 * @retrun {void} 
 * validate the loan amount input field when ever the changes happed.
 * 
 */
        const loanamount=(e)=>{
            var numbers = /^[0-9]+$/;
            if(e.target.value.match(numbers)|| e.target.value.length==0){
                enter_value(e);
            }
        }
/**
 * removebutton function delete the object in balancesheet array
 * @function
 * @param {*} e - Html property of button.
 * @param {number} 'id'- carries the index number for the balance sheet entry.
 * @return{void}- alert message will be pops up and once it is confirm the purticular object will be deleted in the balancesheet array
 *  
 */
        const removebutton=(e)=>{
            e.preventDefault();
            const confirm=window.confirm("Want to delete this entry?")
            if(confirm){
            const arr=[...balancesheet];
            arr.splice(e.target.id,1);
            setbalancesheet(arr);
            }
        }
/**
 * addbutton function addes the new object in balancesheet array
 * @function
 * @param {*} e - Html propertys of button
 * @return{void}- alert message will be pops up and once it is confirm the new object will be added in the balancesheet array
 *  
 */
        const addbutton=(e)=>{
            e.preventDefault();
            const confirm=window.confirm("Want to add new entry?")
            if(confirm){
            setbalancesheet(l=>[...l,{}]);
            }
        }

return(
<div className='form_body'>
    <form style={{width:"100%"}}method="Post" id="form" onSubmit={(e)=>submitForm(e)} >
        <h2 style={{textAlign:"center",paddingTop:"30px"}}>Loan Application Form</h2>
        <div style={{marginLeft:"5%",marginTop:"5%",width:"90%"}}>
        <h4>Business Information</h4>
        <div className="form_label">
        <div><label>Business Name<span className='red_star'>*</span></label></div><div><input className='form_input' type="text" name="company_name" id="company_name" placeholder='Enter comapany name' value={formdata[0]?.company_name} onChange={(e)=>{enter_value(e)}} required autoFocus/></div>
        </div>
       <div className="form_label">
        <div><label>Business Type<span className='red_star'>*</span></label></div><div><input className='form_input' type="text" name="business_type" id="business_type" placeholder='Enter business type' value={formdata[0]?.business_type} onChange={(e)=>{enter_value(e)}} required/></div>
        </div>
       <div className="form_label">
        <div><label >Year Established<span className='red_star'>*</span></label></div><div><input className='form_input'  type="year" name="year_established" id="year_established" placeholder='Enter year established' value={formdata[0]?.year_established} onChange={(e)=>{year(e)}} required/></div>
        </div>
       <div className="form_label">
        <div><label >Industry<span className='red_star'>*</span></label></div><div><input className='form_input' type="text" name="industry" id="industry" placeholder='Enter industry' value={formdata[0]?.industry} onChange={(e)=>{enter_value(e)}} required/></div>
        </div>

        <h4>Contact Details</h4>

       <div className="form_label">
        <div><label >Contact Name<span className='red_star'>*</span></label></div><div><input className='form_input' type="text" name="contact_name" id="contact_name" placeholder='Enter contact name' value={formdata[0]?.contact_name} onChange={(e)=>{enter_value(e)}} required/></div>
        </div>

       <div className="form_label">
        <div><label >Email Address<span className='red_star'>*</span></label></div><div><input className='form_input' type="email" name="email_address" id="email_address" placeholder='Enter email address' value={formdata[0]?.email_address} onChange={(e)=>{enter_value(e)}} required/></div>
        </div>

       <div className="form_label">
        <div><label >Phone Number<span className='red_star'>*</span></label></div><div><input className='form_input' type="text" name="phone_number" id="phone_number" placeholder='Enter phone number' value={formdata[0]?.phone_number} onChange={(e)=>{mobilernumber(e)}} required/></div>
        </div>
       
        <h4>Financial Information</h4>
        <div className='form_label'>
        <div><label>Loan Amount Required<span className='red_star'>*</span></label></div>
        <div><input className='form_input' type='text' id="loan_amount" pattern="[0-9]*" name='loan_Amount' placeholder='Enter Loan amount' value={formdata[0]?.loan_amount} onChange={(e)=>{loanamount(e)}} required /></div>
        </div>
        <div className='form_label'>
        <div><label>Purpose of Loan<span className='red_star'>*</span></label></div>
        <div><input className='form_input' type='text'  name='purpose_of_Loan' id="purpose_of_Loan" placeholder='Enter purpose of loan' value={formdata[0]?.purpose_of_Loan} onChange={(e)=>{enter_value(e)}} required /></div>
        </div>
        
       <div className="form_label">
        <div><label>Accounting Provider<span className='red_star'>*</span></label></div>
        <div><select className="form_select" id="account_provider" value={formdata[0].account_provider} name="account_provider" onChange={(e)=>{enter_value(e)}} required >
            <option value="" disabled selected>Select</option>
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
        <div><input className="form_checkbox" type='checkbox' checked={checkbox_value} onChange={()=>checkbox_value===true?(setcheckbox_value(false)):setcheckbox_value(true)} required></input> <span><span className='red_star'>*</span>Click hear to fetch balance sheet</span></div></div>
        {
            balancesheet.length>0?(
        <div className='balance_sheet_table'>
        <div style={{marginBottom:"10px",width:"100%",height:"20px"}}>
        <button onClick={(e)=>{e.preventDefault();setinput_disable(false)}} className='table_button red'>Edit</button>
        <button onClick={(e)=>{e.preventDefault();setinput_disable(true)}} className='table_button grey'>Lock</button>
        </div>
        <table style={{width:"100%"}}>
            <tr>
            <th>Year</th>
            <th>Month</th>
            <th>Profit or Loss</th>
            <th>Assets Value</th>
            <th></th>
            </tr>
            {
                balancesheet.map((list,index)=>{
                    return(
                        <tr key={index}>
                            <td className='balance_sheet_data'><input className='balance_sheet_input' value={list.year} name={"year"} id={index} disabled={input_disable} onChange={(e)=>changeBalanceSheet(e)} required/></td>
                            <td className='balance_sheet_data'><input className='balance_sheet_input' value={list.month} name={"month"} id={index} disabled={input_disable} onChange={(e)=>changeBalanceSheet(e)} required/></td>
                            <td className='balance_sheet_data'><input className='balance_sheet_input' value={list.profitOrLoss} name={"profitOrLoss"} id={index} disabled={input_disable} onChange={(e)=>changeBalanceSheet(e)} required/></td>
                            <td className='balance_sheet_data'><input className='balance_sheet_input' value={list.assetsValue} name={"assetsValue"} id={index} disabled={input_disable} onChange={(e)=>changeBalanceSheet(e)} required/></td>
                            <td className='balance_sheet_remove'><button disabled={input_disable} className="remove_button" id={index} onClick={(e)=>removebutton(e)}>X</button></td>
                        </tr>
                    );
                })
            }
        </table>
                <button disabled={input_disable} className="add_button" onClick={(e)=>addbutton(e)}>+</button>
        </div>
            ):null
        }
        <div style={{width:"100%"}}>
        <button className='review_button' type="submit">Review</button>
        </div>
    </form>
    </div>
);
}
export default Form;