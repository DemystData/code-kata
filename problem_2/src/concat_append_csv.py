import argparse

import dask.dataframe as dd


def append_csv(input_file: str, output_file: str, num_times: int = 2):
    """Appends the in"""
    df = dd.read_csv(input_file)

    # Concat dataframe with itself num_times
    appended_df = df
    if num_times > 0:
        # We always need num_times-1 loops as we already have initial df
        num_concats = num_times - 1
        for i in range(num_concats):
            appended_df = dd.concat([appended_df, df])

    # Write the final concatenated DataFrame to a single file
    appended_df.to_csv(output_file, index=False, single_file=True)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Concatenates csv contents multiple times into a larger csv"
    )
    parser.add_argument("-i", "--input", help="Input csv filename", required=True)
    parser.add_argument("-o", "--output", help="Output csv filename", required=True)
    parser.add_argument(
        "-n", "--num", help="Number of concatenations", type=int, default=2
    )
    args = parser.parse_args()

    input_file = args.input
    output_file = args.output
    num_times = args.num

    append_csv(input_file, output_file, num_times)
