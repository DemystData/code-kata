package todo

import (
	"demyst-code-kata/arg"
	"encoding/json"
	"fmt"

	"github.com/gocarina/gocsv"
)

type Todo struct {
	Id        int16  `csv:"id" json:"id"`
	UserId    int16  `csv:"user_id" json:"user_id"`
	Title     string `csv:"title" json:"title"`
	Completed bool   `csv:"completed" json:"completed"`
}

func Parse(input string, format arg.Format) ([]Todo, error) {
	var todos []Todo
	switch format {
	case arg.CSV:
		err := gocsv.UnmarshalBytes([]byte(input), &todos)
		if err != nil {
			return nil, fmt.Errorf("error parsing csv: %v", err)
		}
	case arg.JSON:
		err := json.Unmarshal([]byte(input), &todos)
		if err != nil {
			return nil, fmt.Errorf("error parsing json: %v", err)
		}
	}
	return todos, nil
}
