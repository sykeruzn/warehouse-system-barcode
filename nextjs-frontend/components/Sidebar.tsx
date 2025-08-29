import React from 'react';
import { FaUser, FaHome, FaThList, FaComments, FaStar, FaChartLine, FaCog } from 'react-icons/fa'; // Install react-icons: npm install react-icons

const Sidebar: React.FC = () => {
    return (
        <aside className="w-20 bg-white shadow-lg flex flex-col items-center py-6 h-screen sticky top-0 left-0">
            <div className="mb-10 text-gray-700">
                <FaUser size={24} />
            </div>
            <nav className="flex flex-col space-y-8">
                <button className="text-gray-500 hover:text-yellow-500 transition-colors">
                    <FaHome size={20} />
                </button>
                <button className="text-gray-500 hover:text-yellow-500 transition-colors">
                    <FaThList size={20} />
                </button>
                <button className="text-gray-500 hover:text-yellow-500  transition-colors">
                    <FaComments size={20} />
                </button>
                <button className="text-gray-500 hover:text-yellow-500  transition-colors">
                    <FaStar size={20} />
                </button>
                <button className="text-gray-500 hover:text-yellow-500  transition-colors">
                    <FaChartLine size={20} />
                </button>
                <button className="text-gray-500 hover:text-yellow-500  transition-colors">
                    <FaCog size={20} />
                </button>
            </nav>
        </aside>
    );
};

export default Sidebar;