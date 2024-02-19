# Todo-data-service

The TodoDataService service fetches and transforms TODO items from an external API into objects, providing data access functionality for TODO-related operations.

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- Docker Desktop

### Installation

1. Install Docker Desktop on your local machine.
2. Clone the repository.
   ```sh
   git clone https://github.com/yourusername/yourrepository.git
   ```
3. Navigate to the project directory.
   ```sh
   cd code-kata
   ```
4. Run the following command to start the exercise.
   ```sh
   docker-compose up
   ```

# Exercise

The goal of the project is to build a command line tool.

Using Go, write a command line tool that consumes the first `20` `even` numbered TODO's in most performant way and output the `title` and whether it is `completed` or not.

- TODO at index 1 can be accessed at: <https://jsonplaceholder.typicode.com/todos/1>

- TODO at index 2 can be accessed at: <https://jsonplaceholder.typicode.com/todos/2>

Ensure you are submitting the code along with cli.

## Judging Criteria

- Engineering principles & standards
- System extensibility & Scalability
- Test coverage
- Brevity and Simplicity

## Bonus Points

- Docker

## FAQ

### What is the time-limit on exercise ?

There is none, ensure you submit your best attempt and as soon as you possibly can.

### How to submit ?

Submit a GitHub / Bitbucket repo for review. No ZIP files!

### Do I need to write tests for connecting to API ?

That can be ommitted.
