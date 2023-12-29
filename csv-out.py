import csv
import json

# Load JSON data from file
json_file_path = 'output.json'

with open(json_file_path, 'r') as json_file:
    json_data = json.load(json_file)

# Remove the leading "https://google.com" from RSS URLs
for entry in json_data:
    if 'rss' in entry:
        entry['rss'] = entry['rss'].replace('https://google.com', '')

# Define CSV file path
csv_file_path = 'output.csv'

# Extract id and rss fields
result = [(entry['id'], entry['rss']) for entry in json_data]

# Write to CSV
with open(csv_file_path, 'w', newline='') as csv_file:
    csv_writer = csv.writer(csv_file)
    
    # Write header
    csv_writer.writerow(['id', 'rss'])
    
    # Write data
    csv_writer.writerows(result)

print(f'CSV file exported to: {csv_file_path}')
