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
