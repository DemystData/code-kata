# Problem 2

### Data processing

- Generate a csv file containing first_name, last_name, address, date_of_birth
- Process the csv file to anonymise the data
- Columns to anonymise are first_name, last_name and address
- You might be thinking  that is silly
- Now make this work on 2GB csv file (should be doable on a laptop)
- Demonstrate that the same can work on bigger dataset
- Hint - You would need some distributed computing platform

## Install
```pip install -r requirements.txt```

### Generate csv file with data
You can create an initial csv file with starting number of rows 
and then concat the result to generate a larger csv file
```
python generate_csv.py -o {output_filename} -n {num_rows}
python concat_append.py -i {input_filename} -o {output_filename} -n {num_times}
```

For example, you can start off with 15000 rows using this:
```python generate_csv.py -o data.csv -n 15000```

And then you can take that resulting csv and duplicate it 4 times:
```python concat_append.py -i data.csv -o data_large.csv -n 4```

Concating will be allow you to generate large csv files much quicker.

### Anonymise columns csv file
You can anonymise the csv file with the following:
```python anonymise_csv.py -i {input_filename} -o {output_filename}```

For example:
```python anonymise_csv.py -i data_large.csv -o data_large_anonymised.csv```
