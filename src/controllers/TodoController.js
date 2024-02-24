const TodoService = require('../services/TodoService')
const DEFAULT_LISTCOUNT = process.env.DEFAULT_LISTCOUNT || 20

const printEvenList = async () => {
    const list = await TodoService.getEvenTodoList(Number(DEFAULT_LISTCOUNT));
    return list;

}

module.exports = {printEvenList};