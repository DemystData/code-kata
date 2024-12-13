import pytest

from concat_append_csv import append_csv


@pytest.fixture
def test_data():
    return [
        "first_name,last_name,address,date_of_birth\n",
        'Jeffery,Lang,"00322 Jeremy Prairie, West Amandaton, AS 07867",1951-11-08\n',
        'Ashley,Logan,"369 Gilbert Views, Debraport, WA 49523",1985-01-17\n',
        'Judy,Guerrero,"PSC 8719, Box 1493, APO AA 21480",1981-11-21\n',
        'Jill,Curry,"Unit 9369 Box 1276, DPO AE 80549",1973-03-29\n',
    ]


def test_append_csv(test_data, tmp_path):
    """Expect orig number rows multiplied by number of times"""
    input_file = f"{tmp_path}/input.csv"
    output_file = f"{tmp_path}/output.csv"

    with open(input_file, "w") as input:
        for row in test_data:
            input.write(row)

    num_times = 3
    append_csv(input_file, output_file, num_times)

    with open(output_file, "r") as file:
        lines = file.readlines()

    assert len(lines[1:]) == 12


def test_append_csv_negative(test_data, tmp_path):
    """Expect same number rows as input"""
    input_file = f"{tmp_path}/input.csv"
    output_file = f"{tmp_path}/output.csv"

    with open(input_file, "w") as input:
        for row in test_data:
            input.write(row)

    num_times = -2
    append_csv(input_file, output_file, num_times)

    with open(output_file, "r") as file:
        lines = file.readlines()

    assert len(lines[1:]) == 4
