import pytest

from generate_csv import generate_csv


def test_generate_csv(tmp_path):
    """Expect num rows to be generated + header"""
    output_file = f"{tmp_path}/output_csv"

    num_rows = 10
    generate_csv(output_file, num_rows)

    with open(output_file, "r") as file:
        lines = file.readlines()

    assert len(lines) == num_rows + 1


def test_generate_no_rows(tmp_path):
    """Expect just header"""
    output_file = f"{tmp_path}/output_csv"

    num_rows = 0
    generate_csv(output_file, num_rows)

    with open(output_file, "r") as file:
        lines = file.readlines()

    assert len(lines) == num_rows + 1
