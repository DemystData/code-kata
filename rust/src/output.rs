use color_eyre::Result;
use serde::Serialize;

use crate::{todo::Todo, Args, Format};

#[derive(Debug, Serialize)]
struct Output {
    title: String,
    completed: bool,
}

impl From<Todo> for Output {
    fn from(todo: Todo) -> Self {
        Self {
            title: todo.title,
            completed: todo.completed,
        }
    }
}

pub fn output(todos: Vec<Todo>, args: &Args) -> Result<String> {
    let output_todos: Vec<Todo> = todos
        .iter()
        .take(args.limit.into())
        .filter(|todo| if args.even { todo.id % 2 == 0 } else { true })
        .map(|todo| todo.clone())
        .collect();
    match args.format {
        Format::Csv => {
            let mut wtr = csv::WriterBuilder::new().from_writer(vec![]);
            for todo in output_todos {
                wtr.serialize(Output::from(todo))?;
            }
            wtr.flush()?;
            Ok(String::from_utf8(wtr.into_inner()?)?)
        }
        Format::Json => {
            let outputs: Vec<Output> = output_todos
                .iter()
                .map(|todo| Output::from(todo.clone()))
                .collect();
            Ok(serde_json::to_string(&outputs)?)
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_output_csv() -> Result<()> {
        let todos = vec![
            Todo {
                id: 1,
                user_id: 1,
                title: "a".into(),
                completed: false,
            },
            Todo {
                id: 2,
                user_id: 1,
                title: "b".into(),
                completed: true,
            },
        ];
        let args = Args {
            format: Format::Csv,
            limit: 10,
            even: true,
        };
        let output_string = output(todos, &args)?;
        assert_eq!(output_string, "title,completed\nb,true\n");
        Ok(())
    }

    #[test]
    fn test_output_json() -> Result<()> {
        let todos = vec![
            Todo {
                id: 1,
                user_id: 1,
                title: "a".into(),
                completed: false,
            },
            Todo {
                id: 2,
                user_id: 1,
                title: "b".into(),
                completed: true,
            },
        ];
        let args = Args {
            format: Format::Json,
            limit: 10,
            even: true,
        };
        let output_string = output(todos, &args)?;
        assert_eq!(output_string, "[{\"title\":\"b\",\"completed\":true}]");
        Ok(())
    }

    #[test]
    fn test_output_limit() -> Result<()> {
        let todos = vec![
            Todo {
                id: 1,
                user_id: 1,
                title: "a".into(),
                completed: false,
            },
            Todo {
                id: 2,
                user_id: 1,
                title: "b".into(),
                completed: true,
            },
            Todo {
                id: 3,
                user_id: 1,
                title: "c".into(),
                completed: true,
            },
            Todo {
                id: 4,
                user_id: 1,
                title: "d".into(),
                completed: true,
            },
        ];
        let args = Args {
            format: Format::Json,
            limit: 1,
            even: false,
        };
        let output_string = output(todos, &args)?;
        assert_eq!(output_string, "[{\"title\":\"a\",\"completed\":false}]");
        Ok(())
    }

    #[test]
    fn test_output_even() -> Result<()> {
        let todos = vec![
            Todo {
                id: 1,
                user_id: 1,
                title: "a".into(),
                completed: false,
            },
            Todo {
                id: 2,
                user_id: 1,
                title: "b".into(),
                completed: true,
            },
            Todo {
                id: 3,
                user_id: 1,
                title: "c".into(),
                completed: true,
            },
            Todo {
                id: 4,
                user_id: 1,
                title: "d".into(),
                completed: true,
            },
        ];
        let args = Args {
            format: Format::Json,
            limit: 10,
            even: true,
        };
        let output_string = output(todos, &args)?;
        assert_eq!(
            output_string,
            "[{\"title\":\"b\",\"completed\":true},{\"title\":\"d\",\"completed\":true}]"
        );
        Ok(())
    }

    #[test]
    fn test_output_not_even() -> Result<()> {
        let todos = vec![
            Todo {
                id: 1,
                user_id: 1,
                title: "a".into(),
                completed: false,
            },
            Todo {
                id: 2,
                user_id: 1,
                title: "b".into(),
                completed: true,
            },
        ];
        let args = Args {
            format: Format::Json,
            limit: 10,
            even: false,
        };
        let output_string = output(todos, &args)?;
        assert_eq!(
            output_string,
            "[{\"title\":\"a\",\"completed\":false},{\"title\":\"b\",\"completed\":true}]"
        );
        Ok(())
    }
}
