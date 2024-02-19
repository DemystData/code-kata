const TodoController = require("./controller/TodoController");

const todoController = new TodoController();

// Fetch and print the first 20 even numbered TODOs
const limit = 20;
(async () => {
  await todoController.fetchAndPrintEvenTodos(limit);
})();
