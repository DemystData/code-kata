package output

import (
	"demyst-code-kata/arg"
	"demyst-code-kata/todo"
	"testing"
)

func TestOutputPrint(t *testing.T) {
	todos := []todo.Todo{
		{Id: 1, UserId: 1, Title: "a", Completed: false},
		{Id: 2, UserId: 1, Title: "b", Completed: true},
	}
	tests := []struct {
		actual   string
		expected string
	}{
		{
			// CSV
			actual: Print(todos, arg.Args{
				Format: arg.CSV,
				Limit:  10,
				Even:   true,
			}),
			expected: "title,completed\na,false\nb,true\n",
		},
		{
			// JSON
			actual: Print(todos, arg.Args{
				Format: arg.JSON,
				Limit:  10,
				Even:   true,
			}),
			expected: "[{\"title\":\"a\",\"completed\":false},{\"title\":\"b\",\"completed\":true}]",
		},
	}
	for _, test := range tests {
		if test.actual != test.expected {
			t.Fatalf("expected %s, got %s", test.expected, test.actual)
		}
	}
}
