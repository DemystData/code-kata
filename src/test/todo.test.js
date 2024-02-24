const axios = require("axios");
const TodoDataController = require("../controllers/TodoController");

jest.mock("axios");

describe("TodoDataController", () => {
  let todoDataController;

  beforeEach(() => {
    todoDataController = new TodoDataController();
  });

  describe("fetchEvenTodosAsObjects", () => {
    it("should fetch todo item with ID 2", async () => {
      const mockResponse = { id: 2, title: "Todo 2", completed: false };
      axios.mockResolvedValueOnce({ data: mockResponse });
      const todo = await todoDataController.fetchEvenTodoList(1);
      const returnResponse = Object.assign(mockResponse);
      delete returnResponse.id;
      expect(todo.data).toEqual([returnResponse]);
    });
  });
});