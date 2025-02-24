import csv
import json
import logging

logging.basicConfig(filename="app/parser.log", level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

CONFIG_FILE = "app/config.json"

def parse_fixed_width(input_file, output_file):
    with open(CONFIG_FILE, "r") as file:
        config = json.load(file)

    column_names = config["ColumnNames"]
    offsets = list(map(int, config["Offsets"]))
    fixed_width_encoding = config["FixedWidthEncoding"]
    delimited_encoding = config["DelimitedEncoding"]
    include_header = config["IncludeHeader"].lower() == "true"

    with open(input_file, "r", encoding=fixed_width_encoding) as infile,          open(output_file, "w", newline="", encoding=delimited_encoding) as outfile:

        writer = csv.writer(outfile)
        if include_header:
            writer.writerow(column_names)
            logging.info("CSV header written successfully.")

        for line in infile:
            start = 0
            row = [line[start:start + width].strip() for width in offsets]
            writer.writerow(row)

    logging.info(f"Parsed fixed-width file: {input_file} to CSV: {output_file}")

if __name__ == "__main__":
    parse_fixed_width("app/fixed_width_input.txt", "app/output.csv")
    print("CSV file generated: app/output.csv")
