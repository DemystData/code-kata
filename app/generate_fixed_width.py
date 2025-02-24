import json
import random
import string
import logging

logging.basicConfig(filename="app/fixed_width_generator.log", level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

CONFIG_FILE = "app/config.json"

def generate_random_string(length):
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))

def generate_fixed_width_file(output_file, num_rows=100):
    with open(CONFIG_FILE, "r") as file:
        config = json.load(file)

    offsets = list(map(int, config["Offsets"]))

    with open(output_file, "w", encoding=config["FixedWidthEncoding"]) as fw_file:
        for _ in range(num_rows):
            row = "".join(generate_random_string(width).ljust(width) for width in offsets)
            fw_file.write(row + "\n")

    logging.info(f"Generated fixed-width file: {output_file} with {num_rows} rows.")

if __name__ == "__main__":
    generate_fixed_width_file("app/fixed_width_input.txt", num_rows=100)
    print("Fixed width file generated: app/fixed_width_input.txt")
