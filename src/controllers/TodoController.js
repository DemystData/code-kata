const TodoService = require('../services/TodoService')

class TodoController {
    async printEvenList(count){
        const list = await TodoService.getEvenTodoList(count);
        return list;
    }
}
module.exports = TodoController;