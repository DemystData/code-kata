package output

import (
	"demyst-code-kata/arg"
	"demyst-code-kata/todo"
	"testing"
)

func first(text string, _ error) string {
	return text
}

func second(_ string, err error) string {
	return err.Error()
}

func TestOutputString(t *testing.T) {
	todos := []todo.Todo{
		{Id: 1, UserId: 1, Title: "a", Completed: false},
		{Id: 2, UserId: 1, Title: "b", Completed: true},
		{Id: 3, UserId: 1, Title: "c", Completed: false},
		{Id: 4, UserId: 1, Title: "d", Completed: true},
	}
	tests := []struct {
		actual   string
		expected string
	}{
		{
			// CSV
			actual: first(String(todos, arg.Args{
				Format: arg.CSV,
				Limit:  10,
				Even:   true,
			})),
			expected: "title,completed\nb,true\nd,true\n",
		},
		{
			// JSON
			actual: first(String(todos, arg.Args{
				Format: arg.JSON,
				Limit:  10,
				Even:   true,
			})),
			expected: "[{\"title\":\"b\",\"completed\":true},{\"title\":\"d\",\"completed\":true}]",
		},
		{
			// Limit
			actual: first(String(todos, arg.Args{
				Format: arg.CSV,
				Limit:  2,
				Even:   true,
			})),
			expected: "title,completed\nb,true\n",
		},
		{
			// Not Even
			actual: first(String(todos, arg.Args{
				Format: arg.CSV,
				Limit:  10,
				Even:   false,
			})),
			expected: "title,completed\na,false\nb,true\nc,false\nd,true\n",
		},
		{
			// Error
			actual: second(String(todos, arg.Args{
				Format: "ASD",
				Limit:  10,
				Even:   false,
			})),
			expected: "Unreachable",
		},
	}
	for _, test := range tests {
		if test.actual != test.expected {
			t.Fatalf("expected %s, got %s", test.expected, test.actual)
		}
	}
}
