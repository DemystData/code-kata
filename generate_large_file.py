import pandas as pd
import random
import string

# Function to generate random data
def generate_random_data(num_rows):
    data = []
    for _ in range(num_rows):
        first_name = ''.join(random.choices(string.ascii_uppercase, k=8))
        last_name = ''.join(random.choices(string.ascii_uppercase, k=12))
        address = ''.join(random.choices(string.ascii_uppercase + string.digits + ' ', k=20))
        dob = f'{random.randint(1, 31):02d}-{random.randint(1, 12):02d}-{random.randint(1900, 2000)}'
        data.append([first_name, last_name, address, dob])
    return data

# Number of rows required to create approximately a 2GB CSV file
# num_rows_per_chunk = 500000  
# Generate in chunks of 500k rows
# total_rows = 30000000   
# 30 million rows for ~2GB file

# Create and write data in chunks
def generate_file(num_rows_per_chunk = 500000, total_rows = 30000000, columns = ['first_name', 'last_name', 'address', 'date_of_birth']):
    output_file = 'generated_large_data.csv'
    with open(output_file, 'w') as f:
        # Write headers to the CSV file
        f.write(','.join(columns) + '\n')

        # Generate and write data in chunks
        for _ in range(total_rows // num_rows_per_chunk):
            data_chunk = generate_random_data(num_rows_per_chunk)
            # Write chunk to file
            for row in data_chunk:
                f.write(','.join(row) + '\n')