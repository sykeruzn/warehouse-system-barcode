import csv, psycopg2, os
from datetime import datetime

conn = psycopg2.connect(
    host="localhost", dbname="warehouse", user="postgres", password="PSGRdb0723;"
)
cur = conn.cursor()

with open("../data/inventory.csv", newline='') as f:
    reader = csv.DictReader(f)
    for row in reader:
        cur.execute("""
            INSERT INTO inventory (sku, product_name, quantity, last_scanned, status, created_at, updated_at)
            VALUES (%s, %s, %s, %s, %s, NOW(), NOW());
        """, (
            row['sku'],
            row['product_name'],
            int(row['quantity']),
            datetime.fromisoformat(row['last_scanned']),
            row['status']
        ))

conn.commit()
cur.close()
conn.close()
