# Go Solution

## Getting Started

```sh
$ go build && ./demyst-code-kata -h
A command line tool that consumes the first 'limit', 'even' numbered TODO's in most performant way and output the 'title' and whether it's 'completed' or not

Usage:
  demyst-code-kata [flags]

Flags:
  -e, --even            Whether to filter only even numbered TODO's or not (default true)
  -f, --format Format   The data format. Supported formats: 'csv', 'json' (default csv)
  -h, --help            help for demyst-code-kata
  -l, --limit int       The number of TODO's to limit to (default 20)

$ go build && ./demyst-code-kata < todos.csv
title,completed
quis ut nam facilis et officia qui,true

λ go build && ./demyst-code-kata -f json < todos.json
[{"title":"quis ut nam facilis et officia qui","completed":false}]

$ go build && ./demyst-code-kata -f json < todos.json | jq .
[
  {
    "title": "quis ut nam facilis et officia qui",
    "completed": false
  }
]
```

## Tests

Just use `go test ./...` to run all the unit tests. Here's how it should look
like :

```sh
$ go test ./...
?       demyst-code-kata        [no test files]
?       demyst-code-kata/arg    [no test files]
?       demyst-code-kata/cmd    [no test files]
ok      demyst-code-kata/output 0.006s
ok      demyst-code-kata/todo   0.006s
```

## Code Coverage

For code coverage, we just use the coverage tools shipped with go

```sh
$ go test -cover ./...
?       demyst-code-kata        [no test files]
?       demyst-code-kata/arg    [no test files]
?       demyst-code-kata/cmd    [no test files]
ok      demyst-code-kata/output 0.006s  coverage: 100.0% of statements
ok      demyst-code-kata/todo   0.005s  coverage: 100.0% of statements
```

For more detailed coverage report we can do the following :

```sh
$ go test -coverprofile=c.out ./... && go tool cover -html=c.out -o coverage.html
?       demyst-code-kata        [no test files]
?       demyst-code-kata/arg    [no test files]
?       demyst-code-kata/cmd    [no test files]
ok      demyst-code-kata/output 0.007s  coverage: 100.0% of statements
ok      demyst-code-kata/todo   0.007s  coverage: 100.0% of statements
```

The generated `coverage.html` file has a detailed coverage report that you can
open in a web browser
