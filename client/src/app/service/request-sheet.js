import axios from "axios";

class RequestSheetService{
    getBalanceSheet(id){
        const REQUEST_SHEET_URL='http://localhost:3002/balance-sheet/'+id.account_provider;
        console.log("url: ", REQUEST_SHEET_URL)
        return axios.get(REQUEST_SHEET_URL); 
    }
}

export default new RequestSheetService();