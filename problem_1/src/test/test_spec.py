import json

import pytest
from spec import Spec, load_spec_json


@pytest.fixture
def spec():
    """Fixture spec"""
    return Spec("src/test/test_spec.json")


@pytest.fixture
def spec_json():
    """Fixture for spec json"""
    return load_spec_json("src/test/test_spec.json")


@pytest.fixture
def bad_spec_json():
    """Bad spec data with extra ColumnName"""
    return "src/test/test_spec_bad.json"


def test_load_spec(spec, spec_json):
    """Test json loading"""
    assert spec.column_names == spec_json["ColumnNames"]
    assert spec.offsets == spec_json["Offsets"]
    assert spec.fixed_width_encoding == spec_json["FixedWidthEncoding"]
    assert spec.include_header == spec_json["IncludeHeader"]
    assert spec.delimited_encoding == spec_json["DelimitedEncoding"]
    assert spec.columns == {0: ("f1", 4), 1: ("f2", 5), 2: ("f3", 10), 3: ("f4", 11)}
    assert spec.num_columns == len(spec.column_names)


def test_spec_bad_length(bad_spec_json):
    """Test spec json with bad ColumnNames and Offsets lengths"""
    with pytest.raises(
        Exception, match="Spec ColumnNames and Offsets are different lengths"
    ):
        Spec(bad_spec_json)
