const axios = require('axios');
/**
 * Method to execute API calls
 * @param {*} url 
 * @param {*} method 
 * @param {*} data 
 * @returns 
 */
const request = async (url, method = 'get', data = null) => {
    if(url && url.length){
        try {
            const response = await axios({
                method: method,
                url: url,
                data: data
            });
            if(response && response.data){
                return response.data
            } else {
                return response;
            }
        } catch (error) {
            console.log(error);
            return (error)
        }
    } else {
        return 'Missing Params';
    }
}


module.exports = {request}