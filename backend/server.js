const express = require('express')
const bodyParser =require('body-parser');
const cors =require('cors');
const {createLogger,transports, format}=require('winston');

const logger=createLogger({
    level:"info",
    format:format.combine(
        format.timestamp(),
        format.json(),
    ),transports:[
        new transports.Console()
    ]
})



const app=express();
const port=8080;
app.use(bodyParser.json());
app.use(cors());
app.use((req,res,next)=>{
    logger.info({
        message:"Incomming request",
        method:req.method,
        path:req.path,
        ip:req.ip,

    })
    next();
});


app.get("/Xero",(req,res)=>{
    try{
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

    logger.info({
        message:"Data fetched from Xero",
        status:res.statusCode,
        headers:res.getHeaders(),
    });
    res.status(200).json(sheet);
}
catch(error){

    logger.error({
        message:"Error in /Xero",
        error:"Internal Server Error"
    })
    res.status(500).json({error: "Internal Server Error"});
}
});

app.get("/MYOB",(req,res)=>{
    try{
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
    
        logger.info({
            message:"Data fetched from MYOB",
            status:res.statusCode,
            headers:res.getHeaders(),
        });
        res.status(200).json(sheet);
    }
    catch(error){
    
        logger.error({
            message:"Error in /Xero",
            error:"Internal Server Error"
        })
        res.status(500).json({error: "Internal Server Error"});
    }
});

app.post("/decision_maker",(req,res)=>{
    try{
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
}
catch(error){
    logger.error({
        message:"Error in /Xero",
        error:"Internal Server Error"
    })
    logger.info({
        message:"Data recived and processed to the given format",
        status:res.statusCode,
        headers:res.getHeaders(),
    });
    res.status(500).json({error:"Internal Server Error"});
}
});

app.listen(port,()=>{
    console.log(`Server was running on ${port}`);
});


