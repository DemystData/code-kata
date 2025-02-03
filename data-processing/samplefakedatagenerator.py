import csv
from faker import Faker
import time

fake = Faker()
fake.seed_instance(42)

INITIAL_ROWS = 10_000_000    # First batch of data
ADDITIONAL_ROWS = 15_000_000 # Second batch to reach ~25 million total
BATCH_SIZE = 100_000 
FILE_NAME = 'large_dataset.csv'

HEADERS = ['first_name', 'last_name', 'address', 'date_of_birth']

start_time = time.time()

def generate_data(num_rows, mode='w'):
    data_buffer = []
    with open(FILE_NAME, mode=mode, newline='', encoding='utf-8') as file:
        writer = csv.writer(file)

        if mode == 'w':
            writer.writerow(HEADERS)

        for i in range(1, num_rows + 1):
            data_buffer.append([
                fake.first_name(),
                fake.last_name(),
                fake.address().replace("\n", ", "), 
                fake.date_of_birth(minimum_age=18, maximum_age=90)
            ])

            if i % BATCH_SIZE == 0:
                writer.writerows(data_buffer)
                data_buffer = []
                print(f"Added {i:,} rows...")

        if data_buffer:
            writer.writerows(data_buffer)

# First Batch: 10 Million Rows
print("initial dataset (10 million rows)...")
generate_data(INITIAL_ROWS, mode='w') 

# Second Batch: Append 15 Million More Rows
fake.seed_instance(None)
print("Appending additional dataset (15 million rows)...")
generate_data(ADDITIONAL_ROWS, mode='a')

end_time = time.time()
total_rows = INITIAL_ROWS + ADDITIONAL_ROWS
print(f"Generated {total_rows:,} rows in {end_time - start_time:.2f} seconds!")
