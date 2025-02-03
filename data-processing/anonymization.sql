--creating  table called user_data
CREATE OR REPLACE TABLE user_data (
    first_name STRING,
    last_name STRING,
    address STRING,
    date_of_birth DATE
);

CREATE OR REPLACE STAGE my_stage;


SELECT count(*) FROM user_data;

--anonymization
UPDATE user_data
SET 
first_name = SHA2(first_name, 256),
last_name = SHA2(last_name, 256),
address = SHA2(address, 256

SELECT * FROM MY_STAGE LIMIT 10


--copying into csv 
COPY INTO @~/processed_anonymized_data.csv
FROM user_data
FILE_FORMAT = (TYPE = 'CSV', FIELD_OPTIONALLY_ENCLOSED_BY = '"');


LIST @~;


CREATE OR REPLACE TABLE temp_data AS
SELECT * FROM user_data;


LIST @~;

--testing
COPY INTO @~/final_anonymized_data.csv
FROM temp_data
FILE_FORMAT = (TYPE = 'CSV', FIELD_OPTIONALLY_ENCLOSED_BY = '"')
SINGLE = TRUE
MAX_FILE_SIZE = 5368709120;  -- 5 GB

