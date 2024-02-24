package output

import (
	"demyst-code-kata/arg"
	"demyst-code-kata/todo"
	"encoding/json"
	"errors"

	"github.com/gocarina/gocsv"
)

type Output struct {
	Title     string `csv:"title" json:"title"`
	Completed bool   `csv:"completed" json:"completed"`
}

func FromTodo(todo todo.Todo) Output {
	return Output{
		Title:     todo.Title,
		Completed: todo.Completed,
	}
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func String(todos []todo.Todo, args arg.Args) (string, error) {
	output_todos := []Output{}
	for _, todo := range todos[0:min(args.Limit, len(todos))] {
		if !args.Even || (args.Even && todo.Id%2 == 0) {
			output_todos = append(output_todos, FromTodo(todo))
		}
	}
	switch args.Format {
	case arg.CSV:
		csv, _ := gocsv.MarshalString(output_todos)
		return csv, nil
	case arg.JSON:
		json, _ := json.Marshal(output_todos)
		return string(json), nil
	default:
		return "", errors.New("Unreachable")
	}
}
