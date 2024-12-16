# Opens, reads, and closes the spec.json file
with open('spec.json', 'r') as spec_file:
    spec_dict = eval(spec_file.read().replace('\n', ''))

# Creates variables for each entry in spec.json file
column_names = spec_dict["ColumnNames"]
offsets = list(map(int, spec_dict["Offsets"])) # Convert 'offsets' from string type to integers type
    # Uses map function to efficiently cast each value of 'offsets' from string type to int type
fixed_width_encoding = spec_dict["FixedWidthEncoding"]
include_header = spec_dict["IncludeHeader"] == "True"
delimited_encoding = spec_dict["DelimitedEncoding"]

# Function to parse the fixed-width file and write to a CSV file
def parse_fixed_width_file(input_file_path, output_file_path):
   
    # Opens, reads, and closes each line of the file
    with open(input_file_path, 'r', encoding=fixed_width_encoding) as input_file:
        lines = input_file.readlines()
       
        # Opens and closes output file for writing
        with open(output_file_path, 'w', encoding=delimited_encoding) as output_file:
            
            # Write the header if specified
            if include_header:
                # Adds comma to make the file comma delimited per CSV format desired
                output_file.write(','.join(column_names) + '\n')
            
            # Parses each line based on column 'offsets'
            for line in lines:
                line = line.rstrip('\n')  # Remove any trailing newline
                row = []
                current_pos = 0
                for offset in offsets:
                    # Concatenates input line from current position to current position + the offest value
                    value = line[current_pos:current_pos + offset].strip()
                    
                    # Appends the concatenated value to the row of data
                    row.append(value)

                    # Moves current position to be at the start of the next offset column
                    current_pos += offset
                
                # Write the row to the CSV file by adding comma to each entry
                output_file.write(','.join(row) + '\n')

if __name__ == '__main__':
    # Standard test
    parse_fixed_width_file('input1.txt', 'output1.csv')

    # Values that are larger than width test
    parse_fixed_width_file('input2.txt', 'output2.csv')

    # Empty file test
    parse_fixed_width_file('input3.txt', 'output3.csv')

    # Single word test
    parse_fixed_width_file('input4.txt', 'output4.csv')

    # More than 98 characters test
    parse_fixed_width_file('input5.txt', 'output5.csv')

    # Commas test
    parse_fixed_width_file('input6.txt', 'output6.csv')