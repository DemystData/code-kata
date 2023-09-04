import { connectToDB } from "@utils/database";
import BalanceSheet from "@models/balanceSheet";

export const GET = async (req) => {
    try {
        await connectToDB();

        const url = req.url;
        const paramsRaw = url.substring(42); 
        const paramArr = paramsRaw.split("/");
        for(let i = 0; i < paramArr.length; i++){
            paramArr[i] = decodeURI(paramArr[i]);
        }

        const balanceSheet = await BalanceSheet.findOne({
            businessName: paramArr[0],
            accountingProvider: paramArr[2]
        });
        
        return new Response(JSON.stringify(balanceSheet), {status: 200});
    } catch(error) {
        return new Response("Failed to fetch", {status: 500})
    }
}