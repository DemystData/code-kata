.PHONY: build build-go build-rust run run-go run-rust benchmark

FORMAT ?= "csv"

build-go:
	echo "Building demyst-code-kata-go"
	docker build -t demyst-code-kata-go go/

build-rust:
	echo "Building demyst-code-kata-rust"
	docker build -t demyst-code-kata-rust rust/

build: build-go build-rust

run-go: build-go
	@echo "Running demyst-code-kata-go format: $(FORMAT)"
	@if [ $(FORMAT) = "csv" ]; then\
		docker run --rm -i demyst-code-kata-go < todos.csv;\
	else\
		docker run --rm -i demyst-code-kata-go -f json < todos.json;\
	fi

run-rust: build-rust
	@echo "Running demyst-code-kata-rust, format: $(FORMAT)"
	@if [ $(FORMAT) = "csv" ]; then\
		docker run --rm -i demyst-code-kata-rust < todos.csv;\
	else\
		docker run --rm -i demyst-code-kata-rust -f json < todos.json;\
	fi

run: run-go run-rust

benchmark: build
	time docker run --rm -i demyst-code-kata-go < todos.csv
	time docker run --rm -i demyst-code-kata-rust < todos.csv
