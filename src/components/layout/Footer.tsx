import React from 'react';
import { VoteIcon, Github, Mail, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <VoteIcon className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-bold text-gray-900">VoteHub</span>
            </div>
            <p className="text-sm text-gray-600">
              Secure, transparent online voting platform for organizations of all sizes.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-blue-600">Documentation</a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-blue-600">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-blue-600">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-blue-600">FAQ</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail size={16} className="text-gray-500 mr-2" />
                <a href="mailto:info@votehub.com" className="text-sm text-gray-600 hover:text-blue-600">
                  info@votehub.com
                </a>
              </li>
              <li className="flex items-center">
                <Github size={16} className="text-gray-500 mr-2" />
                <a href="#" className="text-sm text-gray-600 hover:text-blue-600">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-sm text-center text-gray-500">
            &copy; {new Date().getFullYear()} VoteHub. All rights reserved. Made with <Heart size={14} className="inline text-red-500" /> by Developers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;