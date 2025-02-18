
"""
@author: anam
"""

import csv
import json
from faker import Faker
import os 



def parse_write_write():
    
     
 
    script_dir = os.path.dirname(os.path.abspath(__file__))
    spec_file = os.path.join(script_dir, "spec.json")

    
    #spec_file = "/Users/anam/Documents/Assignment/fixed_width_parser/spec.json"
    fixed_width_file =  os.path.join(script_dir, "dummydata.txt")
    csv_output_file =  os.path.join(script_dir, "dummyparsed.csv")
    
    if os.path.exists(spec_file):
        print("Spec file exists!")
    else:
        print("Spec file does not exist!")
    
    
    # Step 1: Read spec.json
    with open(spec_file, 'r', encoding='utf-8') as f:
        spec = json.load(f)
    
    column_names = spec["ColumnNames"]
    column_widths = [int(offset_val) for offset_val in spec["Offsets"]]
    fixed_width_encoding = spec["FixedWidthEncoding"]
    delimited_encoding = spec["DelimitedEncoding"]
    header = spec.get("IncludeHeader", "false").lower() == "true"
    
    fake = Faker()
    
    # Step 2: Write dummy data to a fixed-width file
    with open(fixed_width_file, 'w', encoding=fixed_width_encoding) as fw_file:
        for i in range(50): 
            row_data = []
            row_data = [fake.word()[:width].ljust(width, '_') for width in column_widths]
            #row_data = [''.join(fake.random_letters(width)) for width in column_widths]
 
            row = "".join(row_data)
            fw_file.write(row + "\n")
        print("Fixed width file generated!")
    
    # Step 3: Read fixed-width file and write to CSV
    with open(fixed_width_file, 'r', encoding=fixed_width_encoding) as infile, open(csv_output_file, 'w', newline='', encoding=delimited_encoding) as outfile:
        writer = csv.writer(outfile, delimiter='|')

        
        if header:
            writer.writerow(column_names)
            #print("header inlcuded")
        
        for line in infile:
            start = 0
            row = []
            for width in column_widths:
                row.append(line[start:start+width].strip())
                start = width + start
            writer.writerow(row)
        print("CSV file generated using fixed width file!")


def main():
    parse_write_write()


main()


