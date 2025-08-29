from flask import Flask, request, jsonify
from datetime import datetime
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv
from flask_cors import CORS

# Load variables from .env
load_dotenv()

DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_NAME = os.getenv("DB_NAME", "warehouse")
DB_USER = os.getenv("DB_USER", "postgres")
DB_PASS = os.getenv("DB_PASSWORD", "PSGRdb0723;")

def get_conn():
    return psycopg2.connect(
        host=DB_HOST,
        port=DB_PORT,
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASS
    )

app = Flask(__name__)
CORS(app) # Enable CORS for all routes

@app.route('/rfid-scan', methods=['POST'])
def scan_barcode():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid JSON"}), 400

    sku = data.get('sku')
    product_name = data.get('product_name', '')
    qty = int(data.get('quantity', 0))
    status = data.get('status', 'IN').upper()
    now = datetime.utcnow()

    insert_sql = """
        INSERT INTO inventory (sku, product_name, quantity, last_scanned, status, created_at, updated_at)
        VALUES (%s, %s, %s, %s, %s, NOW(), NOW());
    """

    try:
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(insert_sql, (sku, product_name, qty, now, status))
        conn.commit()
        cur.close()
        conn.close()
        return jsonify({"message": "Scanned successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# New endpoint for the inventory records
@app.route('/inventory', methods=['GET'])
def get_all_items():
    try:
        conn = get_conn()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        query = """
            SELECT id, sku, product_name, quantity, last_scanned, status
            FROM inventory
            ORDER BY id ASC;
        """
        cur.execute(query)
        data = cur.fetchall()
        cur.close()
        conn.close()
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# New endpoint for the time series chart
@app.route('/api/scanned-items', methods=['GET'])
def get_scanned_items_by_day():
    try:
        conn = get_conn()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        query = """
            SELECT DATE(last_scanned) as date, COUNT(*) as count
            FROM inventory
            GROUP BY DATE(last_scanned)
            ORDER BY date;
        """
        cur.execute(query)
        data = cur.fetchall()
        cur.close()
        conn.close()
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# New endpoint for the status distribution pie chart
@app.route('/api/status-distribution', methods=['GET'])
def get_status_distribution():
    try:
        conn = get_conn()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        query = """
            SELECT status, COUNT(*) as count
            FROM inventory
            GROUP BY status;
        """
        cur.execute(query)
        data = cur.fetchall()
        cur.close()
        conn.close()
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# New endpoint for the top moved SKUs bar chart
@app.route('/api/top-moved-skus', methods=['GET'])
def get_top_moved_skus():
    try:
        conn = get_conn()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        query = """
            SELECT sku, SUM(quantity) as total_quantity
            FROM inventory
            GROUP BY sku
            ORDER BY total_quantity DESC
            LIMIT 10;
        """
        cur.execute(query)
        data = cur.fetchall()
        cur.close()
        conn.close()
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001, debug=True)