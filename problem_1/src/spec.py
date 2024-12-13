import json


class Spec:
    def __init__(self, spec_file: str):
        self.spec_data: str = load_spec_json(spec_file)
        self.column_names: list[str] = self.spec_data["ColumnNames"]
        self.offsets: list[str] = self.spec_data["Offsets"]
        self.fixed_width_encoding: str = self.spec_data["FixedWidthEncoding"]
        self.include_header: bool = self.spec_data["IncludeHeader"]
        self.delimited_encoding: str = self.spec_data["DelimitedEncoding"]

        if len(self.column_names) != len(self.offsets):
            raise Exception(f"Spec ColumnNames and Offsets are different lengths")

        # Create dict with key: column_index, value: tuple(column_name, column_width)
        self.columns: dict = {}
        for i in range(len(self.column_names)):
            self.columns[i] = (self.column_names[i], int(self.offsets[i]))

        self.num_columns: int = len(self.columns)


def load_spec_json(spec_file: str):
    try:
        with open(spec_file) as file:
            spec = json.load(file)
        return spec
    except FileNotFoundError:
        raise FileNotFoundError(f"'{spec_file}' not found.")
    except json.JSONDecodeError as e:
        raise Exception(f"Error decoding '{spec_file}': {e}")
