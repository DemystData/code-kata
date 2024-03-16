package api

import (
	"demyst-code-kata/arg"
	"demyst-code-kata/todo"
	"encoding/json"
	"fmt"
	"net/http"
	"sync"
)

func GetTodo(endpoint string, id int, tchan chan<- *todo.Todo, wg *sync.WaitGroup) {
	var todo todo.Todo
	resp, err := http.Get(fmt.Sprintf("%s/%d", endpoint, id))
	if err != nil {
		fmt.Println("Error:", err)
		tchan <- nil
		wg.Done()
		return
	}
	json.NewDecoder(resp.Body).Decode(&todo)
	tchan <- &todo
	wg.Done()
}

func GetTodos(args arg.Args) []todo.Todo {
	todos := []todo.Todo{}
	var wg sync.WaitGroup
	tchan := make(chan *todo.Todo, args.Limit)

	for i := 1; i <= args.Limit; i++ {
		if !args.Even || (args.Even && i%2 == 0) {
			wg.Add(1)
			go GetTodo(args.Endpoint, i, tchan, &wg)
		}
	}

	go func() {
		wg.Wait()
		close(tchan)
	}()

	for todo := range tchan {
		todos = append(todos, *todo)
	}
	return todos
}
