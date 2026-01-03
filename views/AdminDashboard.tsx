
import React from 'react';
import { Artwork } from '../types';

interface AdminDashboardProps {
  artworks: Artwork[];
  onUploadClick: () => void;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ artworks, onUploadClick, onLogout }) => {
  // Calculate stats based on real data
  const totalValue = artworks.reduce((sum, art) => sum + (art.price || 0), 0);
  const availableCount = artworks.filter(a => a.status === 'Available').length;

  return (
    <div className="fade-in flex h-screen overflow-hidden bg-backgroundLight dark:bg-backgroundDark">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-[#1a2632] border-r border-slate-200 dark:border-slate-800 flex flex-col hidden md:flex transition-colors">
        <div className="p-6 pb-2">
          <div className="flex flex-col gap-1">
            <h1 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight">Gallery Admin</h1>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">Kigali Hub</p>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2">
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors group">
            <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">dashboard</span>
            <span className="text-sm font-medium">Dashboard</span>
          </button>
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary transition-colors">
            <span className="material-symbols-outlined icon-filled">image</span>
            <span className="text-sm font-medium">Artworks</span>
          </button>
          <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
            <button onClick={onLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group">
              <span className="material-symbols-outlined">logout</span>
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">Inventory</h2>
              <p className="text-slate-500 dark:text-slate-400 text-base">Managing Rwanda's creative assets</p>
            </div>
            <button 
              onClick={onUploadClick}
              className="bg-primary hover:bg-blue-600 text-white font-semibold py-2.5 px-5 rounded-lg flex items-center gap-2 transition-colors shadow-sm active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
              <span>Add New Piece</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Artworks', val: artworks.length.toString() },
              { label: 'Total Value', val: `${totalValue.toLocaleString()} RWF` },
              { label: 'Available', val: availableCount.toString() },
              { label: 'Active Collectors', val: '156' },
            ].map(stat => (
              <div key={stat.label} className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1a2632] shadow-sm">
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{stat.label}</p>
                <div className="flex items-end justify-between mt-2">
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{stat.val}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-[#1a2632] border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                    <th className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Artwork</th>
                    <th className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Price (RWF)</th>
                    <th className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {artworks.map(artwork => (
                    <tr key={artwork.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="h-16 w-16 rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-700 border border-slate-200">
                            <img className="h-full w-full object-cover" src={artwork.imageUrl || (artwork as any).image_url} alt="" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium text-slate-900 dark:text-white line-clamp-1">{artwork.title}</span>
                            <span className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">by {artwork.artist}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-slate-700 dark:text-slate-300 font-medium">{(artwork.price || 0).toLocaleString()}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${artwork.status === 'Available' ? 'bg-green-100 text-green-800 dark:bg-green-900/40' : 'bg-gray-100 text-gray-800 dark:bg-gray-700'}`}>
                          {artwork.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
