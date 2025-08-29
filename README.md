# Warehouse Inventory Dashboard

A full-stack dashboard for warehouse inventory analytics. It visualizes product movement and status trends, helping users monitor top SKUs, track IN/OUT activity, and analyze scan history.

## Features

- **Top SKUs Moved**: Bar chart showing the SKUs with the highest total quantity moved.
- **Status IN vs OUT**: Pie chart summarizing the distribution of IN and OUT inventory events.
- **Time Series of Scanned Items**: Line graph displaying the number of items scanned per day.

## Tech Stack

- **Frontend**: Next.js (React), Chart.js, Tailwind CSS.
- **Backend**: Flask (Python), PostgreSQL.
- **Data Source**: CSV inventory data and REST API endpoints.

## Getting Started

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-org/warehouse-system-barcode.git
   cd warehouse-system-barcode
   ```

2. **Configure environment variables**:

   - Edit `.env` in `flask-service` for database credentials.

3. **Seed the database**:

   ```bash
   cd flask-service
   python seed_db.py
   ```

4. **Start the backend API**:

   ```bash
   python app.py
   ```

5. **Start the frontend**:

   ```bash
   cd ../nextjs-frontend
   npm install
   npm run dev
   ```

6. **Access the dashboard**:
   - Open [http://localhost:3000](http://localhost:3000) in your browser.

## Directory Structure

```
data/
├── inventory.csv
│
flask-service/
├── app.py
├── requirements.txt
├── seed_db.py
│
nextjs-frontend/
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── Charts.tsx
│   └── DashboardCard.tsx
└── └── Sidebar.tsx
```

## Customization

- Chart components are in [`nextjs-frontend/components`](nextjs-frontend/components).
- API endpoints are defined in [`flask-service/app.py`](flask-service/app.py).

## License

This project is for educational and demonstration purposes.
