const TodoService = require('../services/TodoService')

class TodoController {
    async fetchEvenTodoList(count){
        const indexArray = await TodoService.generateNumArray(count, 0, 2)
        const requests = indexArray.map(async (i) =>
            await TodoService.fetchTodoList(i)
        );
        try {
            const result = await Promise.all(requests);
            const output = result.map((todo) => ({
                title: todo.title,
                completed: todo.completed
            }));
            return {'success': true, 'data': output};
          } catch (err) {
            return {'error': true, 'err': err, 'message': 'Unable to process request'};

          }
    }
}
module.exports = TodoController;