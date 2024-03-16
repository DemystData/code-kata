# Rust Solution

## Getting Started

```sh
$ cargo run -- -h
    Finished dev [unoptimized + debuginfo] target(s) in 0.10s
     Running `target/debug/rust -h`
A command line tool that consumes the first `limit` `even` numbered TODO's in most performant way and output the `title` and whether it's `completed` or not

Usage: rust [OPTIONS]

Options:
  -f, --format <FORMAT>  The data format to use for both input parsing and output formatting [default: csv] [possible values: csv, json]
  -l, --limit <LIMIT>    The number of TODO's to limit the output to [default: 20]
  -e, --even             Whether to filter only even numbered TODO's or not
  -h, --help             Print help
  -V, --version          Print version

$ cargo run < todos.csv
    Finished dev [unoptimized + debuginfo] target(s) in 0.08s
     Running `target/debug/rust`
title,completed
quis ut nam facilis et officia qui,true

$ cargo run -- -f json < todos.json
    Finished dev [unoptimized + debuginfo] target(s) in 0.08s
     Running `target/debug/rust -f json`
[{"title":"quis ut nam facilis et officia qui","completed":false}]

$ cargo run -- -f json < todos.json | jq .
    Finished dev [unoptimized + debuginfo] target(s) in 0.12s
     Running `target/debug/rust -f json`
[
  {
    "title": "quis ut nam facilis et officia qui",
    "completed": false
  }
]
```

## Tests

Just use `cargo test` to run the unit tests. Here's how it should look like :

```sh
$ cargo test
    Finished test [unoptimized + debuginfo] target(s) in 0.04s
     Running unittests src/main.rs (target/debug/deps/rust-b4b39d6877e481c3)

running 10 tests
test tests::test_format_display ... ok
test output::tests::test_output_even ... ok
test output::tests::test_output_not_even ... ok
test output::tests::test_output_limit ... ok
test output::tests::test_output_json ... ok
test output::tests::test_output_csv ... ok
test todo::tests::test_parse_json ... ok
test todo::tests::test_parse_csv ... ok
test todo::tests::test_parse_json_error ... ok
test todo::tests::test_parse_csv_error ... ok

test result: ok. 10 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s
```

## Code Coverage

For code coverage, we can use https://github.com/xd009642/tarpaulin

```sh
$ cargo install cargo-tarpaulin
$ cargo tarpaulin
2024-02-22T03:59:38.371897Z  INFO cargo_tarpaulin::config: Creating config
2024-02-22T03:59:38.503984Z  INFO cargo_tarpaulin: Running Tarpaulin
2024-02-22T03:59:38.504001Z  INFO cargo_tarpaulin: Building project
2024-02-22T03:59:38.504025Z  INFO cargo_tarpaulin::cargo: Cleaning project
2024-02-22T03:59:47.306497Z  INFO cargo_tarpaulin::process_handling: running /Users/dhruva/src/interviews/demyst/demyst-code-kata/rust/target/debug/deps/rust-b4b39d6877e481c3
2024-02-22T03:59:47.306544Z  INFO cargo_tarpaulin::process_handling: Setting LLVM_PROFILE_FILE

running 10 tests
test output::tests::test_output_csv ... ok
test output::tests::test_output_even ... ok
test output::tests::test_output_json ... ok
test output::tests::test_output_limit ... ok
test output::tests::test_output_not_even ... ok
test tests::test_format_display ... ok
test todo::tests::test_parse_csv ... ok
test todo::tests::test_parse_csv_error ... ok
test todo::tests::test_parse_json ... ok
test todo::tests::test_parse_json_error ... ok

test result: ok. 10 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

2024-02-22T03:59:47.314199Z  INFO cargo_tarpaulin::statemachine::instrumented: For binary: target/debug/deps/rust-b4b39d6877e481c3
2024-02-22T03:59:47.314208Z  INFO cargo_tarpaulin::statemachine::instrumented: Generated: target/tarpaulin/profraws/rust-b4b39d6877e481c3_1766447303587524380_0-764.profraw
2024-02-22T03:59:47.314210Z  INFO cargo_tarpaulin::statemachine::instrumented: Merging coverage reports
2024-02-22T03:59:47.331437Z  INFO cargo_tarpaulin::statemachine::instrumented: Mapping coverage data to source
2024-02-22T03:59:47.523408Z  INFO cargo_tarpaulin::report: Coverage Results:
|| Uncovered Lines:
|| src/main.rs: 44-49
|| src/output.rs: 32
|| Tested/Total Lines:
|| src/main.rs: 4/10 +0.00%
|| src/output.rs: 16/17 +0.00%
|| src/todo.rs: 13/13 +0.00%
||
82.50% coverage, 33/40 lines covered, +0.00% change in coverage
```
