import argparse

from spec import Spec


def generate_fwf_line(row_data: list[str], cols_data: dict):
    """Convert list of strings to fixed width string"""
    line = ""
    for i in range(len(cols_data)):
        col_name, col_width = cols_data[i]

        # truncate and pad data before adding to line
        col_data = row_data[i][:col_width]
        col_data = col_data.ljust(col_width)

        line += col_data

    return line


def write_fwf_file(
    data_rows: list[list[str]],
    spec: type[Spec],
    output_filename: str = "output.fwf",
    header: bool = True,
):
    """Generate fixed width file"""
    with open(output_filename, "w", encoding=spec.fixed_width_encoding) as outfile:
        # write header
        if header:
            header_row = generate_fwf_line(spec.column_names, spec.columns)
            outfile.write(f"{header_row}\n")
        # write row data
        for row in data_rows:
            data_row = generate_fwf_line(row, spec.columns)
            outfile.write(f"{data_row}\n")

        print(f"Generated '{output_filename}'")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="This script generates a quick test fixed width file"
    )
    parser.add_argument(
        "-o", "--output", help="Output delimited csv file name", default="output.fwf"
    )
    parser.add_argument("-s", "--spec", help="Spec json file name", default="spec.json")
    args = parser.parse_args()

    output_filename = args.output
    spec_json_file = args.spec

    spec = Spec(spec_json_file)

    # generate example data_rows
    # [['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'],
    # ['k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't'],
    # ['u', 'v', 'w', 'x', 'y', 'z', '{', '|', '}', '~']]
    data = [chr(ord("a") + i) for i in range(len(spec.columns) * 3)]
    num_cols = len(spec.columns)
    num_rows = len(data) // num_cols
    data_rows = [data[num_cols * i : num_cols * (i + 1)] for i in range(num_rows)]

    write_fwf_file(data_rows, spec, output_filename, header=True)
