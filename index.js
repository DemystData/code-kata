require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const host = process.env.HOST || 'localhost'

const TodoController = require("./src/controllers/TodoController")

/** 
 * This will call default API. It is taking all the params from ENV file. 
 */
app.get('/', async (req, res) => {
    const data = await TodoController.printEvenList();
    res.send(data)
})

app.listen(port, () => {
  console.log(`Todo App listening on port ${port} on ${new Date()}. Access Url: ${host}:${port}`)
})