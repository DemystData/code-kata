#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@author: anam
"""

import os
import csv
import pytest
from Q1_final_def import parse_write_write
 
script_dir = os.path.dirname(os.path.abspath(__file__))
spec_file = os.path.join(script_dir, "spec.json")
fixed_width_file =  os.path.join(script_dir, "dummydata.txt")
csv_output_file =  os.path.join(script_dir, "dummyparsed.csv")
column_widths = [5, 12, 3, 2, 13, 7, 10, 13, 20, 13]
total_rows = 51  
 


# Test 1: Check if script runs without any errors
def test_for_errors():
    try:
        parse_write_write()
    except Exception as e:
        pytest.fail(f"Error found: {e}")


# Test 2-a: Check if fixed width file is created
def test_fixed_width_file_created():
    assert os.path.exists(fixed_width_file), "Fixed width file was not created"
    assert os.path.getsize(fixed_width_file) > 0, "Error: The fixed width file is empty!"
    print("Test Case 1 Passed, fixed width file is created!")


# Test 2-b: Check if CSV file is created
def test_csv_file_created():
    assert os.path.exists(csv_output_file), "CSV file was not created"
    print("Test Case 2 Passed, CSV file is created!")



# Test 3: Check row count in CSV
def test_total_row_count():
    with open(csv_output_file, 'r', encoding='utf-8') as csvfile:
        read_file = list(csv.reader(csvfile, delimiter='|'))
        assert len(read_file) == total_rows, f"Error: original file rows: {total_rows}, csv rows : {len(read_file)}"
        print("Test Case 3 Passed,Check row count in CSV!")


# Test 4: Check column widths in generated fixed width file
def test_column_widths():
    with open(fixed_width_file, 'r', encoding='utf-8') as txtfile:
        for line in txtfile:
            assert len(line.strip()) == sum(column_widths), "Generated fixed width data has incorrect column lengths"
        print("Test Case 4 Passed,Check column widths in generated fixed width file!")


# Test 5: Validation of fixed width and CSV
def test_data_validation():
    with open(fixed_width_file, 'r', encoding='utf-8') as txtfile, open(csv_output_file, 'r', encoding='utf-8') as csvfile:
        txtfile_reader = txtfile.readlines()
        csv_reader = list(csv.reader(csvfile, delimiter='|'))[1:]
        for txt_row, csv_row in zip(txtfile_reader, csv_reader):
            reconstructed = "".join([col.ljust(width)[:width] for col, width in zip(csv_row, column_widths)])
            assert txt_row.strip() == reconstructed.strip(), "Mismatch found between fixed width and CSV output"
        print("Test Case 5 Passed,Validation of fixed width and CSV!")

print("All test cases passed!")            
            


