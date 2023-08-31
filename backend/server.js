const express = require('express')
const bodyParser =require('body-parser');
const cors =require('cors');

const app=express();
const port=8080;

app.use(bodyParser.json());
app.use(cors());

app.get("/Xero",(req,res)=>{
    const sheet = [
        {
            "year": 2020,
            "month": 12,
            "profitOrLoss": 250000,
            "assetsValue": 1234
        },
        {
            "year": 2020,
            "month": 11,
            "profitOrLoss": 1150,
            "assetsValue": 5789
        },
        {
            "year": 2020,
            "month": 10,
            "profitOrLoss": 2500,
            "assetsValue": 22345
        },
        {
            "year": 2020,
            "month": 9,
            "profitOrLoss": -187000,
            "assetsValue": 223452
        }
    ]
    res.send(sheet);
});

app.get("/MYOB",(req,res)=>{
    const sheet = [
        {
            "year": 2020,
            "month": 12,
            "profitOrLoss": 250000,
            "assetsValue": 1234
        },
        {
            "year": 2020,
            "month": 11,
            "profitOrLoss": 1150,
            "assetsValue": 5789
        },
        {
            "year": 2020,
            "month": 10,
            "profitOrLoss": 2500,
            "assetsValue": 22345
        },
        {
            "year": 2020,
            "month": 9,
            "profitOrLoss": -187000,
            "assetsValue": 223452
        }
    ]
    res.send(sheet);
});

app.post("/decision_maker",(req,res)=>{
  const data = req.body;
  var profit=0;
  var assetvalue=0;
  var pre_assessment=0;
  const formdata=data.formdata;
  const balancesheet=data.balancesheet;
  var request_decisionmaker=[];
  balancesheet.map((list,index)=>{
    profit+=list.profitOrLoss;
    assetvalue+=list.assetsValue;
    assetvalue=assetvalue/balancesheet.length;
})
if(assetvalue>formdata[0].loan_amount){
    pre_assessment=100;
}
else if(profit>0){
    pre_assessment=60;
}
else{
    pre_assessment=20;
}
    request_decisionmaker=[{business_name:formdata[0].company_name,year_established:formdata[0].year_established,balancesheet:balancesheet,pre_assessment:pre_assessment}]
  //console.log(JSON.stringify(request_decisionmaker, null, 2));
  res.status(200).json(request_decisionmaker);
});

app.listen(port,()=>{
    console.log(`Server was running on ${port}`);
});


