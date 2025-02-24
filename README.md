# Data Engineering Challenge (Complete Version)

## Setup Instructions

### 1. Clone the Repository
```sh
git clone <your-repository-url>
cd data-engineering-project
```

### 2. Set Up Virtual Environment & Install Dependencies
```sh
python -m venv venv
source venv/bin/activate  # On Windows use venv\Scripts\activate
pip install -r app/requirements.txt
```

### 3. Run Fixed Width File Scripts
```sh
python app/generate_fixed_width.py
python app/parse_fixed_width.py
```

### 4. Run CSV Anonymization (Streaming for 2GB+ Files)
```sh
python app/anonymize_csv.py
```

### 5. Run Tests
```sh
python -m unittest discover -s app -p "test_*.py"
```

### 6. Run in Docker
```sh
docker build -t data-engineering .
docker run --rm -v $(pwd):/app data-engineering
```

### 7. Troubleshooting
- **Ensure you have Docker installed before running Docker commands.**
- **If running tests, execute from the root directory:**
  ```sh
  python -m unittest discover -s app -p "test_*.py"
  ```
