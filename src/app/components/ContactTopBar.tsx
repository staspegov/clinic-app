import { Phone, Mail } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="bg-white border-b text-sm text-gray-700 hidden md:block">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex space-x-6">
          <a href="#" className="hover:text-blue-600">About</a>
          <a href="#" className="hover:text-blue-600">Doctors</a>
          <a href="#" className="hover:text-blue-600">Contact</a>
          <a href="#" className="hover:text-blue-600">FAQ</a>
        </div>
        <div className="flex space-x-6 items-center">
          <div className="flex items-center space-x-1">
            <Phone className="w-4 h-4 text-blue-600" />
            <span>+233 599 670295</span>
          </div>
          <div className="flex items-center space-x-1">
            <Mail className="w-4 h-4 text-blue-600" />
            <span>support@mail.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}
