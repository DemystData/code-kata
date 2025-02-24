import os
import csv
import hashlib

INPUT_FILE = "app/input.csv"
OUTPUT_FILE = "app/anonymized_output.csv"
LARGE_FILE_MODE = True  # Set to True for handling 2GB+ files efficiently

def hash_value(value):
    return hashlib.sha256(value.encode()).hexdigest()[:10]

def generate_sample_csv():
    """Creates input.csv if it doesn't exist."""
    if not os.path.exists(INPUT_FILE):
        with open(INPUT_FILE, "w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow(["first_name", "last_name", "address", "date_of_birth"])
            writer.writerow(["John", "Doe", "123 Main St", "1990-01-01"])
            writer.writerow(["Jane", "Smith", "456 Elm St", "1992-05-10"])
        print("Generated sample input.csv")

def anonymize_large_csv(input_file, output_file):
    """Handles large CSVs using streaming (row-by-row processing)."""
    generate_sample_csv()  # Ensure input file exists

    with open(input_file, "r", encoding="utf-8") as infile,          open(output_file, "w", newline="", encoding="utf-8") as outfile:

        reader = csv.DictReader(infile)
        writer = csv.DictWriter(outfile, fieldnames=reader.fieldnames)
        writer.writeheader()

        for row in reader:
            row["first_name"] = hash_value(row["first_name"])
            row["last_name"] = hash_value(row["last_name"])
            row["address"] = hash_value(row["address"])
            writer.writerow(row)

    print(f"Anonymized CSV generated: {output_file}")

if __name__ == "__main__":
    anonymize_large_csv(INPUT_FILE, OUTPUT_FILE)
