const express = require('express')
const bodyParser =require('body-parser');
const cors =require('cors');
const {createLogger,transports, format}=require('winston');
// Create a Winston logger for logging
const logger=createLogger({
    level:"info",
    format:format.combine(
        format.timestamp(),
        format.json(),
    ),transports:[
        new transports.Console()
    ]
})

/**
   * Middleware: Request Logger
   * @function
   * @description Logs incoming requests.
   * @param {Object} req - The Express.js request object.
   * @param {Object} res - The Express.js response object.
   * @param {function} next - The next middleware function.
   */

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

/**
 * Endpoint to fetch data from Xero.
 * @route GET /Xero
 */
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
/**
     * Xero Data Response
     * @function
     * @description Logs successful data retrieval from Xero.
     * @param {Object} res - The Express.js response object.
     */
    logger.info({
        message:"Data fetched from Xero",
        status:res.statusCode,
        headers:res.getHeaders(),
    });
    res.status(200).json(sheet);
}
catch(error){
/**
     * Xero Data Error
     * @function
     * @description Logs errors that occur while fetching data from Xero.
     * @param {Object} error - The error object.
     */
    logger.error({
        message:"Error in /Xero",
        error:"Internal Server Error"
    })
    res.status(500).json({error: "Internal Server Error"});
}
});
/**
 * Endpoint to fetch data from MYOB.
 * @route GET /MYOB
 */

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
    /**
     * MYOB Data Response
     * @function
     * @description Logs successful data retrieval from MYOB.
     * @param {Object} res - The Express.js response object.
     */
        logger.info({
            message:"Data fetched from MYOB",
            status:res.statusCode,
            headers:res.getHeaders(),
        });
        res.status(200).json(sheet);
    }
    catch(error){
    /**
     * MYOB Data Error
     * @function
     * @description Logs errors that occur while fetching data from MYOB.
     * @param {Object} error - The error object.
     */
        logger.error({
            message:"Error in /Xero",
            error:"Internal Server Error"
        })
        res.status(500).json({error: "Internal Server Error"});
    }
});
/**
 * Endpoint to make a decision based on incoming data.
 * @route POST /decision_maker
 */
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
 // console.log(JSON.stringify(request_decisionmaker, null, 2));
 /**
     * Decision Maker Response
     * @function
     * @description Logs successful data processing and response.
     * @param {Object} res - The Express.js response object.
     */ 
 logger.info({
    message:"Data received and processed to the given format",
    status:res.statusCode,
    headers:res.getHeaders(),
});
  res.status(200).json(request_decisionmaker);
}
catch(error){
    // Log error in case of an exception
    /**
     * Decision Maker Error
     * @function
     * @description Logs errors that occur during data processing.
     * @param {Object} error - The error object.
     */
    logger.error({
        message:"Error in /decision_maker",
        error:"Internal Server Error"
    })
    res.status(500).json({error:"Internal Server Error"});
}
});
// Start the server
app.listen(port,()=>{
    console.log(`Server was running on ${port}`);
});


