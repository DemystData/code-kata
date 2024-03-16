package api

import (
	"demyst-code-kata/arg"
	"demyst-code-kata/todo"
	"fmt"
	"testing"

	"github.com/google/go-cmp/cmp"
	"github.com/google/go-cmp/cmp/cmpopts"
	"github.com/jarcoal/httpmock"
)

func TestGetTodos(t *testing.T) {
	endpoint := "https://jsonplaceholder.typicode.com/todos"
	httpmock.Activate()
	defer httpmock.DeactivateAndReset()

	httpmock.RegisterResponder("GET", fmt.Sprintf("%s/%d", endpoint, 1),
		httpmock.NewStringResponder(200, `{
      "id": 1,
      "userId": 1,
      "title": "a",
      "completed": false
    }`))
	httpmock.RegisterResponder("GET", fmt.Sprintf("%s/%d", endpoint, 2),
		httpmock.NewStringResponder(200, `{
      "id": 2,
      "userId": 1,
      "title": "b",
      "completed": true
    }`))

	tests := []struct {
		args     arg.Args
		expected []todo.Todo
	}{
		{
			args: arg.Args{
				Format:   arg.CSV,
				Limit:    2,
				Even:     true,
				Endpoint: endpoint,
			},
			expected: []todo.Todo{
				{
					Id:        2,
					UserId:    1,
					Title:     "b",
					Completed: true,
				},
			},
		},
		{
			args: arg.Args{
				Format:   arg.CSV,
				Limit:    2,
				Even:     false,
				Endpoint: endpoint,
			},
			expected: []todo.Todo{
				{
					Id:        1,
					UserId:    1,
					Title:     "a",
					Completed: false,
				},
				{
					Id:        2,
					UserId:    1,
					Title:     "b",
					Completed: true,
				},
			},
		},
	}
	for _, test := range tests {
		todos := GetTodos(test.args)
		less := func(a, b todo.Todo) bool { return a.Id < b.Id }
		if cmp.Diff(todos, test.expected, cmpopts.SortSlices(less)) != "" {
			t.Fatalf("expected %v, got %v", test.expected, todos)
		}
	}
}
