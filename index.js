require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const host = process.env.HOST || 'localhost'
const DEFAULT_LISTCOUNT = process.env.DEFAULT_LISTCOUNT || 20; // setting default list count

const TodoController = require("./src/controllers/TodoController")
const todoController = new TodoController();

/** 
 * This will call default API. It is taking all the params from ENV file. 
 */
app.get('/', async (req, res) => {
    const count = req && req.query && req.query.count? req.query.count: DEFAULT_LISTCOUNT; // if user want to list count in specific number or it will fetch default number
    console.log('Start time', new Date());
    const response = await todoController.fetchEvenTodoList(count);
    if(response && response.success){
      res.status(200).send(response.data)
    } else {
      res.status(500).send(response);
    }
    console.log('End time', new Date());
})

app.listen(port, () => {
  console.log(`Todo App listening on port ${port} on ${new Date()}. Access Url: ${host}:${port}`)
})