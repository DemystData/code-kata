import axios from "axios";

const getBalanceSheet = (provider) => {
    return new Promise(async(res,rej)=>{
        const response = await axios.get(`http://localhost:4001/accounts/balance-sheet/${provider}`);
        if(!response.data)
        {
            rej();
        }
        res(response.data);
    })
};

export default getBalanceSheet;
