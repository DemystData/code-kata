const HttpService = require('./HttpService')
const APP_DATA_URL = process.env.APP_DATA_URL || 'https://jsonplaceholder.typicode.com/todos/2'

/**
 * Method to get Even Todo List
 * @param {*} limit 
 * @returns 
 */
const getEvenTodoList = (limit = 20) => {
    return new Promise(async function (resolve, reject) {
        const todoList = [];
        const step =2;
        let index = 0; 
        try {
            for(count = 0; count < limit; count++){
                index += step;
                const todo = await filterEvenTodoList(index);
                todoList.push(todo);
            }
            Promise.all(todoList).then((res) =>{
                resolve(res.map((todo) => ({
                    title: todo.title,
                    completed: todo.completed
                })));
            });        
        } catch (error){
            console.log(error);
            reject(error)
            // throw new Error('Error in Generating ToDo List', error);
        }   
    })
}

/**
 * Method to make http call from external api
 * @param {*} index 
 * @returns 
 */
async function filterEvenTodoList(index=1) {
    const todo = await HttpService.request(`${APP_DATA_URL}/${index}`);
    return todo
}
module.exports = {getEvenTodoList}