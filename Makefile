.PHONY: run run-go run-rust benchmark clean

FORMAT ?= "csv"
CSV_FILE ?= "todos.csv"
JSON_FILE ?= "todos.json"

clean:
	rm -rf build-go build-rust

build-go:
	echo "Building demyst-code-kata-go"
	docker build -t demyst-code-kata-go go/
	@touch build-go

build-rust:
	echo "Building demyst-code-kata-rust"
	docker build -t demyst-code-kata-rust rust/
	@touch build-rust

build: build-go build-rust

run-go: build-go
	@echo "Running demyst-code-kata-go format: $(FORMAT)"
	@if [ $(FORMAT) = "csv" ]; then\
		docker run --rm -i demyst-code-kata-go < $(CSV_FILE);\
	else\
		docker run --rm -i demyst-code-kata-go -f json < $(JSON_FILE);\
	fi

run-rust: build-rust
	@echo "Running demyst-code-kata-rust, format: $(FORMAT)"
	@if [ $(FORMAT) = "csv" ]; then\
		docker run --rm -i demyst-code-kata-rust < $(CSV_FILE);\
	else\
		docker run --rm -i demyst-code-kata-rust -f json < $(JSON_FILE);\
	fi

run: run-go run-rust

benchmark: build
	time docker run --rm -i demyst-code-kata-go < $(CSV_FILE)
	time docker run --rm -i demyst-code-kata-rust < $(CSV_FILE)
