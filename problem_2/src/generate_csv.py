import argparse
import csv

from faker import Faker

fake = Faker()


def generate_csv(filename: str, num_records: int = 10**5):
    """Use Faker to generate fake csv data"""
    with open(filename, mode="w", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)
        writer.writerow(["first_name", "last_name", "address", "date_of_birth"])

        count = 1
        for _ in range(num_records):
            print(f"{count} out of {num_records} written", end="\r")
            writer.writerow(
                [
                    fake.first_name(),
                    fake.last_name(),
                    fake.address().replace("\n", ", "),  # Flatten address
                    fake.date_of_birth(minimum_age=20, maximum_age=65).isoformat(),
                ]
            )
            count += 1


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Generates a csv with fake data for numer of rows"
    )
    parser.add_argument(
        "-o", "--output", help="Output csv file name", default="data.csv"
    )
    parser.add_argument(
        "-r", "--rows", help="Number of rows to generate", type=int, default=10**5
    )
    args = parser.parse_args()

    filename = args.output
    rows = args.rows

    generate_csv(filename, rows)
