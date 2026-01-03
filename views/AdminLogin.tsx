
import React from 'react';

interface AdminLoginProps {
  onLogin: () => void;
  onBack: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onBack }) => {
  return (
    <div className="fade-in min-h-screen flex flex-col items-center justify-center p-4 bg-backgroundLight dark:bg-backgroundDark">
      <div className="w-full max-w-[480px] bg-white dark:bg-[#1a222d] rounded-xl shadow-sm border border-[#dce0e5] dark:border-gray-800 overflow-hidden">
        <div className="px-8 pt-10 pb-6 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
              <span className="material-symbols-outlined text-[28px]">admin_panel_settings</span>
            </div>
          </div>
          <h1 className="text-[#111418] dark:text-white text-2xl font-bold">Gallery Admin</h1>
          <p className="text-[#637588] dark:text-gray-400 text-sm mt-2">Please sign in to manage the collection.</p>
        </div>
        
        <div className="px-8 pb-8">
          <div className="flex flex-col gap-5">
            <label className="flex flex-col gap-2">
              <span className="text-[#111418] dark:text-gray-200 text-sm font-medium">Email Address</span>
              <input className="form-input flex w-full rounded-lg border border-[#dce0e5] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#111418] dark:text-white h-12 px-4 placeholder:text-[#637588]" defaultValue="admin@artspace.com" type="email" />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-[#111418] dark:text-gray-200 text-sm font-medium">Password</span>
              <input className="form-input flex w-full rounded-lg border border-[#dce0e5] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#111418] dark:text-white h-12 px-4" defaultValue="••••••••" type="password" />
            </label>
            <button 
              onClick={onLogin}
              className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-primary hover:bg-primary/90 text-white text-base font-bold transition-colors shadow-sm mt-2"
            >
              Sign In
            </button>
          </div>
        </div>
        
        <div className="px-8 py-4 bg-gray-50 dark:bg-[#151b24] border-t border-[#dce0e5] dark:border-gray-800 text-center">
          <button onClick={onBack} className="text-[#637588] dark:text-gray-400 text-sm font-medium hover:text-[#111418] dark:hover:text-white transition-colors inline-flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Return to Gallery
          </button>
        </div>
      </div>
      <p className="mt-8 text-[#637588] dark:text-gray-500 text-xs">© 2024 ArtSpace Platform. All rights reserved.</p>
    </div>
  );
};

export default AdminLogin;
