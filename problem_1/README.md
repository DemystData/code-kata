# Problem 1

## Parse fixed width file

- Generate a fixed width file using the provided spec (offset provided in the spec file represent the length of each field).
- Implement a parser that can parse the fixed width file and generate a delimited file, like CSV for example.
- DO NOT use python libraries like pandas for parsing. You can use the standard library to write out a csv file (If you feel like)
- Language choices (Python or Scala)
- Deliver source via github or bitbucket
- Bonus points if you deliver a docker container (Dockerfile) that can be used to run the code (too lazy to install stuff that you might use)
- Pay attention to encoding

## Install
```pip install -r requirements.txt```

### Create a test fixed width file with a spec.json
```python generate_fwf.py -o output.fwf -s spec.json```
Use the `-h` flag for more details

### Parse a fixed width file to an output csv
```python parse_fwf.py -f output.fwf -o output.csv -s spec.json```
Use the `-h` flag for more details

### Run tests
```python -m pytest```
or
```pytest```

## Docker container
You can run docker a docker container with something like the following:
```
sudo docker build -t fwf-parse .
sudo docker run -it fwf-parse /bin/bash -c "/bin/bash"
```
One inside the container you can run the following as a quick test:
```
python src/generate_fwf.py -o output.fwf -s src/spec.json
python src/parse_fwf.py -f output.fwf -o output.csv -s src/spec.json
```
