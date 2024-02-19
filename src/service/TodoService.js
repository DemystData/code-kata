const { request } = require("./HttpService");
const { TODO_BASE_URL } = require("../utils/constants");

class TodoService {
  async fetchTodoItem(index) {
    try {
      const url = `${TODO_BASE_URL}/${index}`;
      const todo = await request("GET", url);
      return todo;
    } catch (error) {
      throw new Error("Error fetching todo:", error);
    }
  }

  async fetchEvenTodos(limit) {
    const evenTodos = [];
    let count = 0;
    const evenVal = 2;
    let evenIndex = evenVal;

    try {
      while (count < limit) {
        const todo = this.fetchTodoItem(evenIndex);
        evenTodos.push(todo);
        count++;
        evenIndex += evenVal;
      }
      const evenTodoResponse = await Promise.all(evenTodos);
      return evenTodoResponse.map((todo) => ({
        title: todo.title,
        completed: todo.completed,
      }));
    } catch (error) {
      throw new Error("Error fetching even todos:", error);
    }
  }
}

module.exports = TodoService;
