import unittest
from app.parse_fixed_width import parse_fixed_width

class TestFixedWidthParser(unittest.TestCase):
    def test_parsing(self):
        parse_fixed_width("app/fixed_width_input.txt", "app/test_output.csv")

        with open("app/test_output.csv", "r") as f:
            lines = f.readlines()

        self.assertGreater(len(lines), 1)  # Check that data is written
        self.assertTrue(lines[0].startswith("f1,"))  # Ensure header exists

if __name__ == "__main__":
    unittest.main()
