package output

import (
	"demyst-code-kata/arg"
	"demyst-code-kata/todo"
	"encoding/json"

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

func Print(todos []todo.Todo, args arg.Args) string {
	output_todos := []Output{}
	for _, todo := range todos {
		output_todos = append(output_todos, FromTodo(todo))
	}
	switch args.Format {
	case arg.CSV:
		csv, _ := gocsv.MarshalString(output_todos)
		return csv
	case arg.JSON:
		json, _ := json.Marshal(output_todos)
		return string(json)
	default:
		return ""
	}
}
