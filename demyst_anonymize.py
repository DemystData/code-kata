import dask.dataframe as dd
import random
import string
import os

# Import file to generate large dataset
import generate_large_file

# Function to anonymize a specific column by generating random strings
def anonymize_column(partition, column_name):
    # Checks to make sure column type is string, if not throws error
    if partition[column_name].dtype != 'object':
        raise ValueError(f"Column '{column_name}' is not of type string. Skipping anonymization.")
    # Applies anonymize function to dask dataframe by column called, expecting a string value
    partition[column_name] = partition[column_name].apply(anonymize, meta=('x', 'str'))
    return partition

# Helper function to generate random strings
def anonymize(x):
    # Randomizes the string, with k=10 for randomizing 10 elements
    return ''.join(random.choices(string.ascii_uppercase, k=10))

def apply_to_data():
    # Gets the current directory, and creates a directory if one does not exist
    current_directory = os.getcwd()
    # If directory already exists, nothing happens
    os.makedirs(current_directory, exist_ok=True)

    # Read the large CSV file using Dask
    df = dd.read_csv('generated_large_data.csv')

    # Anonymize specific columns using anonymize function
    df['first_name'] = df['first_name'].apply(anonymize, meta=('x', 'str'))
    df['last_name'] = df['last_name'].apply(anonymize, meta=('x', 'str'))
    df['address'] = df['address'].apply(anonymize, meta=('x', 'str'))

    # Write the anonymized DataFrame back to a new CSV file
    output_file_path = os.path.join(current_directory, 'anonymized_file-*.csv')
    df.to_csv(output_file_path, single_file=True)

    # Trigger computation to processe and save the data
    df.compute()

if __name__ == '__main__':
    apply_to_data()
    generate_large_file.generate_random_data()
    generate_large_file.generate_file()