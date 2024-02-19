const axios = require("axios");
const TodoDataController = require("../controller/TodoController");

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

      const todo = await todoDataController.fetchAndPrintEvenTodos(1);
      const returnResponse = Object.assign(mockResponse);
      delete returnResponse.id;

      expect(todo).toEqual([returnResponse]);
      expect(axios).toHaveBeenCalledWith({
        method: "GET",
        url: "https://jsonplaceholder.typicode.com/todos/2",
        data: null,
      });
    });

    it("should handle error when fetching todo item", async () => {
      const errorMessage = "Failed to fetch todo";
      axios.mockRejectedValueOnce(new Error(errorMessage));

      let res;
      try {
        res = await todoDataController.fetchAndPrintEvenTodos(1);
      } catch (error) {
        res = error;
      }
      expect(res.message).toEqual("Error fetching even todos");
      expect(axios).toHaveBeenCalledWith({
        method: "GET",
        url: "https://jsonplaceholder.typicode.com/todos/2",
        data: null,
      });
    });
  });
});
