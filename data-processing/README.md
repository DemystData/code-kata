**Problem Statement**
The objective was to:

Generate a CSV file containing the following columns:

first_name
last_name
address
date_of_birth
Process the generated CSV file to anonymize sensitive information. The columns to be anonymized are:

first_name
last_name
address
Ensure the solution works with a large dataset, specifically around 2GB in size, and demonstrate that it can handle even larger datasets efficiently.

Utilize a distributed computing platform to process large datasets effectively. In this project, Snowflake was chosen for this purpose.

**Approach:**
Python: For generating synthetic data using the Faker library.
Snowflake: A cloud-based data warehousing platform used for large-scale data processing and anonymization.
SQL: To perform data manipulation and anonymization within Snowflake.
GitHub: sharing the project.
Google Drive: For sharing large datasets, as GitHub has file size limitations.

Step 1: Data Generation
 Python’s Faker library was used to create names, addresses, and dates of birth.
**Python code can be seen in repository as samplefakedatagenerator.py**

Step 2: Loading Data into Snowflake
Since Snowflake’s web UI has a file upload limit of 250MB, the generated dataset needed to be split into smaller parts before loading.

Splitting the Large CSV File - **large_dataset.csv**
To split the large CSV file into manageable parts, the following command was used in the terminal:

command:
split -b 200m large_dataset.csv part 

this resulted files named part_aa, part_ab, part_ac, to part aj.

Step 3: Data Anonymization:
create table and performed Anonymization using SHA-256 hashing algorithm.
**SQL script attached - Anonymization.sql**
and Exporting Anonymized Data in a final csv file named **anonymized_data.csv**

Attaching the google drive link: https://drive.google.com/drive/folders/1tnv5quKsPEqH7pZsuEiPP-go8kLkg8sO?usp=sharing
 

