import pytest
from generate_fwf import generate_fwf_line, write_fwf_file
from spec import Spec


@pytest.fixture
def spec():
    """Fixture spec"""
    return Spec("src/test/test_spec.json")


def test_generate_fwf_line(spec):
    """Generate fix width line"""
    row_data = ["hello", "world", "expand", "truncate this"]
    generated_line = generate_fwf_line(row_data, spec.columns)

    assert len(generated_line) == sum(
        [col_width for col_name, col_width in spec.columns.values()]
    )
    assert generated_line == "hellworldexpand    truncate th"


def test_write_fwf_file_header(spec, tmp_path):
    output_file = f"{tmp_path}/output.fwf"
    data_rows = [["hello", "world", "expand", "truncate this"], ["1", "2", "3", "a"]]

    write_fwf_file(data_rows, spec, output_filename=output_file, header=True)

    with open(output_file, "r") as file:
        lines = file.readlines()

    assert lines == [
        "f1  f2   f3        f4         \n",
        "hellworldexpand    truncate th\n",
        "1   2    3         a          \n",
    ]


def test_write_fwf_file_no_header(spec, tmp_path):
    output_file = f"{tmp_path}/output.fwf"
    data_rows = [["hello", "world", "expand", "truncate this"], ["1", "2", "3", "a"]]

    write_fwf_file(data_rows, spec, output_filename=output_file, header=False)

    with open(output_file, "r") as file:
        lines = file.readlines()

    assert lines == [
        "hellworldexpand    truncate th\n",
        "1   2    3         a          \n",
    ]
