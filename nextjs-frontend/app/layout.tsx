import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Import Inter font

const inter = Inter({ subsets: ['latin'] }); // Initialize Inter font

export const metadata: Metadata = {
    title: 'Warehouse Dashboard',
    description: 'Professional dashboard for warehouse inventory management',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            {/* Apply Inter font to the body */}
            <body className={inter.className}>{children}</body>
        </html>
    );
}