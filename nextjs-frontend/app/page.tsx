import Charts from '@/components/Charts';
import Sidebar from '@/components/Sidebar';
import React from 'react';

const API_BASE_URL = 'http://localhost:5001/api';

interface ScannedItemsData {
    date: string;
    count: number;
}

interface StatusDistributionData {
    status: string;
    count: number;
}

interface TopMovedSKUsData {
    sku: string;
    total_quantity: number;
}

async function getChartData(): Promise<{
    scannedItems: ScannedItemsData[];
    statusDistribution: StatusDistributionData[];
    topMovedSKUs: TopMovedSKUsData[];
}> {
    try {
        const [scannedItemsRes, statusDistributionRes, topMovedSKUsRes] = await Promise.all([
            fetch(`${API_BASE_URL}/scanned-items`, { cache: 'no-store' }),
            fetch(`${API_BASE_URL}/status-distribution`, { cache: 'no-store' }),
            fetch(`${API_BASE_URL}/top-moved-skus`, { cache: 'no-store' }),
        ]);

        if (!scannedItemsRes.ok || !statusDistributionRes.ok || !topMovedSKUsRes.ok) {
            throw new Error('Failed to fetch data');
        }

        const scannedItems = await scannedItemsRes.json();
        const statusDistribution = await statusDistributionRes.json();
        const topMovedSKUs = await topMovedSKUsRes.json();

        return {
            scannedItems,
            statusDistribution,
            topMovedSKUs,
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            scannedItems: [],
            statusDistribution: [],
            topMovedSKUs: [],
        };
    }
}

export default async function Dashboard() {
    const { scannedItems, statusDistribution, topMovedSKUs } = await getChartData();

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <Sidebar />
            <main className="flex-1 p-8">
                <div className="container mx-auto">
                    <h1 className="text-4xl font-bold text-center mb-10 text-gray-800 hidden">
                        Warehouse Dashboard {/* Hidden as per image, relying on card titles */}
                    </h1>
                    <Charts
                        scannedItems={scannedItems}
                        statusDistribution={statusDistribution}
                        topMovedSKUs={topMovedSKUs}
                    />
                </div>
            </main>
        </div>
    );
}