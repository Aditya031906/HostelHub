import React from 'react';
import { Megaphone } from 'lucide-react';

const Announcements = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Announcements</h2>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="space-y-4">
          <div className="p-4 border border-blue-100 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Megaphone className="w-5 h-5 text-blue-600" />
              <h4 className="font-bold text-blue-900">Mandatory Hostel Meeting</h4>
            </div>
            <p className="text-sm text-blue-800">All students must attend the mandatory meeting in the common hall this Friday at 6:00 PM.</p>
            <p className="text-xs text-blue-600 mt-2">Posted 2 hours ago</p>
          </div>
          <div className="p-4 border border-gray-100 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Megaphone className="w-5 h-5 text-gray-600" />
              <h4 className="font-bold text-gray-800">Water Supply Maintenance</h4>
            </div>
            <p className="text-sm text-gray-600">Water supply will be interrupted tomorrow from 10:00 AM to 2:00 PM for maintenance work.</p>
            <p className="text-xs text-gray-500 mt-2">Posted yesterday</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
