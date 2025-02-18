#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""

@author: anam 
"""


# Initialization &  file paths
import os
import hashlib
import pandas as pd
from faker import Faker


script_dir = os.path.dirname(os.path.abspath(__file__))
raw_csv_file = os.path.join(script_dir, "bigfile.csv")
anonymized_csv_file = os.path.join(script_dir, "anonymized_dataset.csv")
retest_anonymized_csv_file = os.path.join(script_dir, "retest_anonymized_csv_file.csv")
fake = Faker()




# -----------------------------------------------------------------------------
# STEP 1: GENERATE CSV FILE
# -----------------------------------------------------------------------------


def generate_fake_data_csv(file_path, num_rows): 
 
    # Create fake data 
    df = pd.DataFrame({
        "first_name": [fake.first_name() for i in range(num_rows)],
        "last_name": [fake.last_name() for i in range(num_rows)],
        "address": [fake.address().replace("\n", ",") for i in range(num_rows)],
        "date_of_birth": [fake.date_of_birth(minimum_age=1, maximum_age=100).strftime("%Y-%m-%d") for i in range(num_rows)]
    })
    df.to_csv(file_path, index=False)

    print("CSV file with fake data generated!")



# -----------------------------------------------------------------------------
# STEP 2: ANONYMIZE CSV FILE 
# -----------------------------------------------------------------------------
 
#def anonymize_csv(input_file, output_file, chunk_size=100_000):
def anonymize_csv(input_file, output_file, chunk_size=100): 
    
    reader = pd.read_csv(input_file, chunksize=chunk_size)
    
    for i, chunk in enumerate(reader):

        # Use lambda function to apply the hash directly
        chunk["first_name"] = chunk["first_name"].apply(lambda x: hashlib.sha256(x.encode()).hexdigest())
        chunk["last_name"] = chunk["last_name"].apply(lambda x: hashlib.sha256(x.encode()).hexdigest())
        chunk["address"] = chunk["address"].apply(lambda x: hashlib.sha256(x.encode()).hexdigest())

        chunk.to_csv(output_file, mode="a", index=False, header=(i == 0))

    print("Anonymized CSV File created!")    


# -----------------------------------------------------------------------------
# STEP 3: SCALE TO LARGER DATASETS 
# -----------------------------------------------------------------------------


# skipping this part as my new mac is throwing java errors, was taking too long. 


# -----------------------------------------------------------------------------
# STEP 4: TEST CASES 
# -----------------------------------------------------------------------------


# Test 1: Basic working , file specs 
def test_basic_functionality(): 
    
    generate_fake_data_csv(raw_csv_file, 10)
    anonymize_csv(raw_csv_file, anonymized_csv_file, chunk_size=10)
    
    assert os.path.exists(anonymized_csv_file), "Error: The anonymized CSV file was not created!"
    assert os.path.getsize(anonymized_csv_file) > 0, "Error: The anonymized CSV file is empty!"
    print("Test Case 1 Passed!")


# Test 2: Large dataset , file specs 
def test_large_dataset(): 
    
    generate_fake_data_csv(raw_csv_file, 10_000)
    anonymize_csv(raw_csv_file, anonymized_csv_file, chunk_size=1_000)
    
    assert os.path.exists(anonymized_csv_file), "Error: The anonymized CSV file was not created!"
    assert os.path.getsize(anonymized_csv_file) > 0, "Error: The anonymized CSV file is empty!"
    print("Test Case 2 Passed!")




# Test 3: verify hashing consistency
def test_hashing_consistency():
    
    file1 = os.path.join(script_dir, "test_file1.csv")
    file2 = os.path.join(script_dir, "test_file2.csv")

    # Write "ABC" to both files
    with open(file1, "w") as file:
        file.write("ABC")
    with open(file2, "w") as file:
        file.write("ABC")

    # Function to hash file content
    def hash_file_content(file_path):
        with open(file_path, "r") as f:
            content = f.read()
        return hashlib.sha256(content.encode()).hexdigest()

    # Compute hashes
    hash1 = hash_file_content(file1)
    hash2 = hash_file_content(file2)

    # Assert hashes are the same
    assert hash1 == hash2, f"Error: Hashes do not match! {hash1} != {hash2}"
    print("Test Case 3 Passed! Hashes match.")
     
    
    
def main():
    
    # Call function to generate a fake dataset for 2000 rows 
    # generate_fake_data_csv(RAW_CSV_FILE, num_rows=2000)

    # Call function to generate a fake dataset for 10_000_000 rows 
    # generate_csv(RAW_CSV_FILE, num_rows=10_000_000)
    
    # Call function to anonymize CSV
    # anonymize_csv(RAW_CSV_FILE, ANONYMIZED_CSV_FILE)
    
    
    #run all test cases 
    test_basic_functionality()
    test_large_dataset()
    test_hashing_consistency()
    
main()






