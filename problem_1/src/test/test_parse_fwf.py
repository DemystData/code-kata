import json
from unittest.mock import mock_open, patch

import pytest
from parse_fwf import parse_data, read_fwf_file, write_csv
from spec import Spec


@pytest.fixture
def spec():
    """Fixture spec"""
    return Spec("src/test/test_spec.json")


@pytest.fixture
def test_fwf():
    """Fixture spec"""
    return "src/test/test.fwf"


@pytest.fixture
def parsed_data():
    return [["hell", "world", "expand", "truncate th"], ["1", "2", "3", "a"]]


def test_read_fwf_file(spec, test_fwf):
    """Test reading the fixed-width file"""
    lines = read_fwf_file(test_fwf, spec)
    assert (
        lines
        == lines
        == [
            "f1  f2   f3        f4         ",
            "hellworldexpand    truncate th",
            "1   2    3         a          ",
        ]
    )


def test_parse_data(spec):
    """Test parsing the fixed-width file data"""
    raw_data = [
        "hellworldexpand    truncate th",
        "1   2    3         a          ",
        "",
    ]
    parsed_data = parse_data(raw_data, spec)

    assert len(parsed_data) == 2
    assert parsed_data[0] == ["hell", "world", "expand", "truncate th"]
    assert parsed_data[1] == ["1", "2", "3", "a"]


def test_write_csv(spec, parsed_data, tmp_path):
    """Test writing CSV data"""
    csv_file = f"{tmp_path}/output.csv"

    write_csv(csv_file, parsed_data, spec)

    with open(csv_file, "r") as file:
        lines = file.readlines()

    assert lines == [
        "f1,f2,f3,f4\n",
        "hell,world,expand,truncate th\n",
        "1,2,3,a\n",
    ]


def test_write_csv_no_header(spec, parsed_data, tmp_path):
    """Test writing CSV data"""
    csv_file = f"{tmp_path}/output.csv"

    spec.include_header = False
    write_csv(csv_file, parsed_data, spec)

    with open(csv_file, "r") as file:
        lines = file.readlines()

    assert lines == [
        "hell,world,expand,truncate th\n",
        "1,2,3,a\n",
    ]


def test_write_csv_tab_delimiter(spec, parsed_data, tmp_path):
    """Test writing CSV data"""
    csv_file = f"{tmp_path}/output.csv"

    write_csv(csv_file, parsed_data, spec, delimiter="\t")

    with open(csv_file, "r") as file:
        lines = file.readlines()

    assert lines == [
        "f1\tf2\tf3\tf4\n",
        "hell\tworld\texpand\ttruncate th\n",
        "1\t2\t3\ta\n",
    ]
