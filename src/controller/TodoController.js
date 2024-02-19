const TodoService = require("../service/TodoService");

class TodoController {
  constructor() {
    this.todoService = new TodoService();
  }

  async fetchAndPrintEvenTodos(limit) {
    const evenTodos = await this.todoService.fetchEvenTodos(limit);
    // eslint-disable-next-line no-console
    console.log(evenTodos);
    return evenTodos;
  }
}

module.exports = TodoController;
