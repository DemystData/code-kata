import json
import csv

# Load the specifications from our json file
with open('spec.json', 'r') as f:
    spec = json.load(f)

# Extract the details
columns = spec['ColumnNames']                      # Column names
offsets = list(map(int, spec['Offsets']))          # Convert strings to integers
fixed_encoding = spec.get('FixedWidthEncoding', 'utf-8')    # Encoding used in fixed-width file
csv_encoding = spec.get('DelimitedEncoding', 'utf-8')       # output CSV file

# Now, time for calculating the beginning and end positions for each field
indices = []
begin = 0
for width in offsets:
    end = begin + width
    indices.append((begin, end))  # Save the begin and end positions
    begin = end  # Move to next starting point

# Parse and write that to a CSV file
with open('data.fixed', 'r', encoding=fixed_encoding) as infile, \
     open('data.csv', 'w', newline='', encoding=csv_encoding) as outfile:

    writer = csv.writer(outfile)  # Create a CSV writer object
    writer.writerow(columns)      # Write the header row in the CSV

    # Skip the header row if it already exists
    if spec.get('IncludeHeader', 'False').lower() == 'true':
        infile.readline()

    # Now, let's go through each line of the file and pull out the data we need
    for line in infile:
        # Extracting each field from the line using its position range
        row = [line[start:end].strip() for (start, end) in indices]
        writer.writerow(row)  # Write the final extracted row to our CSV file

# print the results
print("Fixed-width file has been parsed with 'data.csv' file")
