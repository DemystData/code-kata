use color_eyre::{eyre::eyre, Result};
use serde::Deserialize;

use crate::{Args, Format};

#[derive(Clone, Debug, Deserialize, Eq, PartialEq)]
#[serde(rename_all = "camelCase")]
pub struct Todo {
    pub id: u16,

    #[allow(dead_code)]
    pub user_id: u16,

    pub title: String,
    pub completed: bool,
}

impl Todo {
    pub fn parse(input: &str, args: &Args) -> Result<Vec<Todo>> {
        match args.format {
            Format::Csv => {
                let mut ts = vec![];
                let mut rdr = csv::ReaderBuilder::new()
                    .has_headers(true)
                    .from_reader(std::io::Cursor::new(input));
                for result in rdr.deserialize() {
                    let todo: Todo = match result {
                        Ok(t) => t,
                        Err(_e) => {
                            return Err(eyre!("Invalid Input Format, expected CSV"));
                        }
                    };
                    ts.push(todo);
                }
                Ok(ts)
            }
            Format::Json => {
                let ts = match serde_json::from_str(input) {
                    Ok(t) => t,
                    Err(_e) => {
                        return Err(eyre!("Invalid Input Format, expected JSON"));
                    }
                };
                Ok(ts)
            }
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_parse_csv() -> Result<()> {
        let input =
            "1,1,\"delectus aut autem\",false\n2,1,\"quis ut nam facilis et officia qui\",true\n";
        let args = Args {
            format: Format::Csv,
            limit: 10,
            even: true,
        };
        let todos = Todo::parse(input, &args)?;
        assert_eq!(todos.len(), 2);

        let expected_todos = vec![
            Todo {
                id: 1,
                user_id: 1,
                title: "delectus aut autem".into(),
                completed: false,
            },
            Todo {
                id: 2,
                user_id: 1,
                title: "quis ut nam facilis et officia qui".into(),
                completed: true,
            },
        ];
        assert_eq!(&todos[..], &expected_todos[..]);
        Ok(())
    }

    #[test]
    fn test_parse_csv_error() {
        let input = "[
                      {
                        \"id\": 1,
                        \"userId\": 1,
                        \"title\": \"delectus aut autem\",
                        \"completed\": false
                      },
                      {
                        \"id\": 2,
                        \"userId\": 1,
                        \"title\": \"quis ut nam facilis et officia qui\",
                        \"completed\": true
                      }
                    ]";
        let args = Args {
            format: Format::Csv,
            limit: 10,
            even: true,
        };
        let todos = Todo::parse(input, &args);
        assert!(todos.is_err());
    }

    #[test]
    fn test_parse_json() -> Result<()> {
        let input = "[
                      {
                        \"id\": 1,
                        \"userId\": 1,
                        \"title\": \"delectus aut autem\",
                        \"completed\": false
                      },
                      {
                        \"id\": 2,
                        \"userId\": 1,
                        \"title\": \"quis ut nam facilis et officia qui\",
                        \"completed\": true
                      }
                    ]";
        let args = Args {
            format: Format::Json,
            limit: 10,
            even: true,
        };
        let todos = Todo::parse(input, &args)?;
        assert_eq!(todos.len(), 2);

        let expected_todos = vec![
            Todo {
                id: 1,
                user_id: 1,
                title: "delectus aut autem".into(),
                completed: false,
            },
            Todo {
                id: 2,
                user_id: 1,
                title: "quis ut nam facilis et officia qui".into(),
                completed: true,
            },
        ];
        assert_eq!(&todos[..], &expected_todos[..]);
        Ok(())
    }

    #[test]
    fn test_parse_json_error() {
        let input =
            "1,1,\"delectus aut autem\",false\n2,1,\"quis ut nam facilis et officia qui\",true\n";
        let args = Args {
            format: Format::Json,
            limit: 10,
            even: true,
        };
        let todos = Todo::parse(input, &args);
        assert!(todos.is_err());
    }
}
