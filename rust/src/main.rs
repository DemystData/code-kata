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

#[derive(Clone, Debug, Parser)]
#[command(version, about, long_about = None)]
pub struct Args {
    #[arg(short, long, default_value_t = Format::Csv)]
    format: Format,

    #[arg(short, long, default_value_t = 20)]
    limit: u16,

    #[arg(short, long, default_value_t = true)]
    even: bool,
}

fn main() -> Result<()> {
    let args = Args::parse();
    let input = std::io::read_to_string(std::io::stdin())?;
    let todos = Todo::parse(input.as_str(), &args)?;
    println!("{}", output::output(todos, &args)?);
    Ok(())
}
