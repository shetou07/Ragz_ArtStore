
import React from 'react';
import { ViewType } from '../types';

interface FooterProps {
  onNavigate: (view: ViewType) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white dark:bg-[#111921] border-t border-[#f0f2f4] dark:border-gray-800 mt-auto">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="size-6 text-primary">
              <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4ZM24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263Z" fill="currentColor" fillRule="evenodd"></path>
              </svg>
            </div>
            <span className="text-[#111418] dark:text-white font-bold text-lg">ArtSpace</span>
          </div>
          <div className="text-[#637588] dark:text-gray-500 text-sm text-center md:text-right">
            <p>© 2024 ArtSpace. Connecting artists with collectors.</p>
          </div>
          <div className="flex gap-4">
            <a href="#" className="text-[#637588] dark:text-gray-500 hover:text-primary transition-colors">
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>thumb_up</span>
            </a>
            <a href="#" className="text-[#637588] dark:text-gray-500 hover:text-primary transition-colors">
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>photo_camera</span>
            </a>
            <a href="#" className="text-[#637588] dark:text-gray-500 hover:text-primary transition-colors">
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>mail</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
