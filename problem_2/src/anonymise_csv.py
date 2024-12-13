import argparse
import hashlib

import dask.dataframe as dd


def hash_value(value) -> str:
    """Hash a value and return a fixed-length string."""
    # Combine value with salt to ensure uniqueness for each field
    return hashlib.sha256(str(value).encode("utf-8")).hexdigest()


def read_input_csv(input_file: str):
    """Read in input csv"""
    return dd.read_csv(input_file)


def write_output_csv(df, output_file: str):
    """Read in input csv"""
    df.to_csv(output_file, index=False, single_file=True)


def anonymize_with_hashing(input_file: str, output_file: str, cols: list[str]):
    """Read input csv, anonymize columns, write to output csv"""
    df = read_input_csv(input_file)

    # Hash each column to anonymize
    for col in cols:
        df[col] = df[col].map_partitions(lambda partition: partition.apply(hash_value))

    write_output_csv(df, output_file)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Anonymizes csv columns with hashing")
    parser.add_argument("-i", "--input", help="Input csv filename", required=True)
    parser.add_argument("-o", "--output", help="Output csv filename", required=True)
    args = parser.parse_args()

    input_file = args.input
    output_file = args.output

    columns_to_anonymize = ["first_name", "last_name", "address"]
    anonymize_with_hashing(input_file, output_file, cols=columns_to_anonymize)
    print(f"Anonymized: {columns_to_anonymize}\nin '{input_file}' to '{output_file}'")
