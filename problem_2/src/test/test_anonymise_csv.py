import pytest

from anonymise_csv import anonymize_with_hashing

@pytest.fixture
def test_data():
    return [
        "first_name,last_name,address,date_of_birth\n",
        'Jeffery,Lang,"00322 Jeremy Prairie, West Amandaton, AS 07867",1951-11-08\n',
        'Ashley,Logan,"369 Gilbert Views, Debraport, WA 49523",1985-01-17\n',
        'Judy,Guerrero,"PSC 8719, Box 1493, APO AA 21480",1981-11-21\n',
        'Jill,Curry,"Unit 9369 Box 1276, DPO AE 80549",1973-03-29\n',
    ]

def test_anonymize_with_hashing(test_data, tmp_path):
    """Expect orig number rows multiplied by number of times"""
    input_file = f"{tmp_path}/input.csv"
    output_file = f"{tmp_path}/output.csv"

    with open(input_file, "w") as input:
        for row in test_data:
            input.write(row)

    columns_to_anonymize = ["first_name", "last_name", "address"]
    anonymize_with_hashing(input_file, output_file, cols=columns_to_anonymize)

    with open(output_file, "r") as file:
        lines = file.readlines()

    assert len(test_data) == len(lines)
    
    for i in range(1, len(test_data)):
        assert test_data[i] != lines[i]
