use std::fmt::Display;

use clap::{Parser, ValueEnum};
use color_eyre::Result;

use crate::todo::Todo;

mod output;
mod todo;

#[derive(Clone, Debug, ValueEnum)]
pub enum Format {
    Csv,
    Json,
}

impl Display for Format {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Format::Csv => write!(f, "csv"),
            Format::Json => write!(f, "json"),
        }
    }
}

/// A command line tool that consumes the first `limit` `even` numbered TODO's in most performant
/// way and output the `title` and whether it's `completed` or not.
#[derive(Clone, Debug, Parser)]
#[command(version, about, long_about = None)]
pub struct Args {
    /// The data format to use for both input parsing and output formatting
    #[arg(short, long, default_value_t = Format::Csv)]
    format: Format,

    /// The number of TODO's to limit the output to
    #[arg(short, long, default_value_t = 20)]
    limit: u16,

    /// Whether to filter only even numbered TODO's or not
    #[arg(short, long, action=clap::ArgAction::SetFalse)]
    even: bool,
}

fn main() -> Result<()> {
    let args = Args::parse();
    let input = std::io::read_to_string(std::io::stdin())?;
    let todos = Todo::parse(input.as_str(), &args)?;
    println!("{}", output::output(todos, &args)?);
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_format_display() {
        assert_eq!("csv", format!("{}", Format::Csv));
        assert_eq!("json", format!("{}", Format::Json));
    }
}
