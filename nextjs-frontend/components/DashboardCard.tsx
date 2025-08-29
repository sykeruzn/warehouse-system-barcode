import React from 'react';

interface DashboardCardProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
    headerContent?: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, children, className, headerContent }) => {
    return (
        <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
            {(title || headerContent) && (
                <div className="flex justify-between items-center mb-4">
                    {title && <h3 className="text-xl font-semibold text-gray-800">{title}</h3>}
                    {headerContent}
                </div>
            )}
            {children}
        </div>
    );
};

export default DashboardCard;