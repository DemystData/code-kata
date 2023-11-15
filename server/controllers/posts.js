import express from "express";
import sheet from "../models/balanceSheet.js";
const router = express.Router();

const logic = (sheet, name, amount) => {
    let avgAsset = 0;
    let prof = 0;
    for( let biz of sheet[name]) {
      avgAsset += biz.assetsValue;
      prof += biz.profitOrLoss;
    }
    avgAsset = avgAsset/12;
    if(avgAsset > amount){
      return 100;
    } 
    else if(prof > 0){
      return 60;
    }
    else{
      return 20;
    }

}


export const createPost = async (req, res) => {
  let preAssessment = logic(sheet, req.body.user.name, req.body.user.amount )
  res.status(200).json({"preAssessment": preAssessment});
};




export default router;
