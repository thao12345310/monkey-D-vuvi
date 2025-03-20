import requests
import json

# API link containing the entire JSON data
api_url = "https://mixivivu.com/_next/data/Kg0OJ4DBVOZz67SHSNfJ8/khach-san.json"

try:
    response = requests.get(api_url, timeout=10)  # Send request with timeout
    response.raise_for_status()  # Check for HTTP errors

    data = response.json()  # Parse JSON

    # Save data to a JSON file
    with open("../data/hotel.json", "w", encoding="utf-8") as json_file:
        json.dump(data, json_file, ensure_ascii=False, indent=4)

    print("Data has been downloaded and saved")

except requests.RequestException as e:
    print(f"Error while downloading JSON: {e}")
