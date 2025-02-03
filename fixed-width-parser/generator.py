#Making the code with comments helpful for reference/understanding

import json

# Let's start with loading the specs from our very own json file
with open('spec.json', 'r') as f:
    spec = json.load(f)

# Now, let's extract the Columns, Offsets, Encoding details from our json file
columns = spec['ColumnNames']                      # Lists out the column names such as f1, f2, f3 etc
offsets = list(map(int, spec['Offsets']))           # Convert strings to integers
encoding = spec.get('FixedWidthEncoding', 'utf-8')      # Encoding purpose as we follow windows-1252

# generating some sample data
data = [
    {"f1": "1001", "f2": "Michael Jordan", "f3": "MJ", "f4": "J", "f5": "michael.jordan@nba.com", "f6": "USA", "f7": "3125557890", "f8": "Chicago", "f9": "Basketball Legend", "f10": "Retired"},
    {"f1": "1002", "f2": "Emma Watson", "f3": "EW", "f4": "W", "f5": "emma.watson@hollywood.org", "f6": "UK", "f7": "2075554321", "f8": "London", "f9": "Actress & Activist", "f10": "Celebrity"},
    {"f1": "1003", "f2": "Elon Musk", "f3": "EM", "f4": "M", "f5": "elon.musk@tesla.com", "f6": "USA", "f7": "6505551234", "f8": "Austin", "f9": "Tech Entrepreneur", "f10": "CEO"},
    {"f1": "1004", "f2": "Olivia Brown", "f3": "OB", "f4": "B", "f5": "olivia.brown@edu.edu", "f6": "CAN", "f7": "4165556789", "f8": "Toronto", "f9": "", "f10": "Teacher"}
]



# Let's define a function for making the match as per the required width, like truncating or padding
def pad_or_truncate(text, width):
    return str(text)[:width].ljust(width)

# Now let's generate the fixed-width file
with open('data.fixed', 'w', encoding=encoding) as f:
    if spec.get('IncludeHeader', 'False').lower() == 'true': #including header
        header = ''.join(pad_or_truncate(col, width) for col, width in zip(columns, offsets))
        f.write(header + '\n')  # Let's have a newline after the header

    # next comes, writing the actual data
    for row in data:
        line = ''.join(pad_or_truncate(row.get(col, ''), width) for col, width in zip(columns, offsets))
        f.write(line + '\n') # for newline

# print the results
print("Fixed-width file named 'data.fixed' has been generated")
