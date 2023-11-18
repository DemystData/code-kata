import axios from "axios";
// import getConfig from "next/config";

class RequestSheetService{
    getBalanceSheet(id){
        // const { urls }=getConfig()
        // console.log("url", urls.REQUEST_SHEET_URL)
        const REQUEST_SHEET_URL='http://localhost:3002/balance-sheet/accounting-software/'+id.account_provider;
        return axios.get(REQUEST_SHEET_URL); 
    }

    getDecisionEngineResult(req){
        const DECISION_ENGINE_RESULT_URL='http://localhost:3002/balance-sheet/decision-engine'
        return axios.post(DECISION_ENGINE_RESULT_URL, req)
    }
}

export default new RequestSheetService();