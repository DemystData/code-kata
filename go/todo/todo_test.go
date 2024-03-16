package todo

import (
	"demyst-code-kata/arg"
	"strings"
	"testing"
)

func TestParseCSV(t *testing.T) {
	input := `
    id,user_id,title,completed
    1,1,"delectus aut autem",false
    2,1,"quis ut nam facilis et officia qui",true`
	todos, _ := Parse(input, arg.CSV)
	if len(todos) != 2 {
		t.Fatalf("Expected %d, actual %d", 2, len(todos))
	}
	if todos[0].Title != "delectus aut autem" {
		t.Fatalf("Expected First Todo Title %s, actual %s", "delectus aut autem", todos[0].Title)
	}
	if todos[1].Title != "quis ut nam facilis et officia qui" {
		t.Fatalf("Expected Second Todo Title %s, actual %s", "quis ut nam facilis et officia qui", todos[1].Title)
	}
}

func TestParseCSVError(t *testing.T) {
	input := `[
              {
                "id": 1,
                "userId": 1,
                "title": "delectus aut autem",
                "completed": false
              },
              {
                "id": 2,
                "userId": 1,
                "title": "quis ut nam facilis et officia qui",
                "completed": true
              }
            ]`
	_, err := Parse(input, arg.CSV)
	if !strings.HasPrefix(err.Error(), "error parsing csv") {
		t.Fatalf("Expected error parsing csv, but got none")
	}
}

func TestParseJSON(t *testing.T) {
	input := `[
              {
                "id": 1,
                "userId": 1,
                "title": "delectus aut autem",
                "completed": false
              },
              {
                "id": 2,
                "userId": 1,
                "title": "quis ut nam facilis et officia qui",
                "completed": true
              }
            ]`
	todos, _ := Parse(input, arg.JSON)
	if len(todos) != 2 {
		t.Fatalf("Expected %d, actual %d", 2, len(todos))
	}
	if todos[0].Title != "delectus aut autem" {
		t.Fatalf("Expected First Todo Title %s, actual %s", "delectus aut autem", todos[0].Title)
	}
	if todos[1].Title != "quis ut nam facilis et officia qui" {
		t.Fatalf("Expected Second Todo Title %s, actual %s", "quis ut nam facilis et officia qui", todos[1].Title)
	}
}

func TestParseJSONError(t *testing.T) {
	input := `
    id,user_id,title,completed
    1,1,"delectus aut autem",false
    2,1,"quis ut nam facilis et officia qui",true`
	_, err := Parse(input, arg.JSON)
	if !strings.HasPrefix(err.Error(), "error parsing json") {
		t.Fatalf("Expected error parsing json, but got none")
	}
}
