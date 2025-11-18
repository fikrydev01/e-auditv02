import React from 'react';
import { app_version } from '../utils/api';

const Footer = () => (
  <footer className="sticky bottom-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-t border-pink-200/50 dark:border-gray-700/50 px-4 py-3">
    <div className="max-w-screen-2xl mx-auto">
      <div className='w-full flex items-center justify-center gap-4'>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        © 2025 SPI UINJKT & PT.SNS
      </p>
      <span className='text-white text-xs bg-orange-500 px-2 py-1 rounded'>V.{app_version}</span>

      </div>
    </div>
  </footer>
);

export default Footer;
