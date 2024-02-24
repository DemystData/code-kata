const HttpService = require('./HttpService')
const APP_DATA_URL = process.env.APP_DATA_URL || 'https://jsonplaceholder.typicode.com/todos/2'

/**
 * Method to make http call from external api
 * @param {*} index 
 * @returns 
 */
async function fetchTodoList(index=1) {
    const todo = await HttpService.request(`${APP_DATA_URL}/${index}`);
    return todo
}
/**
 * Method to generate Number Array
 * @param {*} count : Total count of Array
 * @param {*} start : Start point. Default 0
 * @param {*} step : Step if defined. default 1
 * @returns 
 */
async function generateNumArray(count, start = 0, step = 1){
    const arr = [];
    for(let index = start; index < count; index++){
        start += step;
        arr.push(start);
    }  
    return arr
}
module.exports = {generateNumArray, fetchTodoList}