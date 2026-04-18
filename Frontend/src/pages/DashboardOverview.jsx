import React, { useState, useEffect } from 'react';
import { Home, AlertCircle, Shirt, CreditCard, Utensils, Megaphone } from 'lucide-react';
import { API_URL } from '../config';

const DashboardOverview = ({ profileData, setActiveTab }) => {
  const [recentAnnouncements, setRecentAnnouncements] = useState([]);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const res = await fetch(`${API_URL}/api/announcements`);
      if (res.ok) {
        const data = await res.json();
        // Just take the top 2 most recent for the overview
        setRecentAnnouncements(data.slice(0, 2));
      }
    } catch (err) {
      console.error('Failed to fetch announcements:', err);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHrs = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHrs / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHrs < 24) return `${diffHrs} hr${diffHrs > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Welcome back, {profileData.name.split(' ')[0]}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Summary Cards */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Room Status</p>
              <p className="text-xl font-bold text-gray-900 mt-1">Room 514, Block B</p>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <Home className="w-6 h-6" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Open Complaints</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">0</p>
            </div>
            <div className="p-3 bg-red-50 text-red-600 rounded-lg">
              <AlertCircle className="w-6 h-6" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Laundry used</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">5 Times</p>
            </div>
            <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
              <Shirt className="w-6 h-6" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Your Current due</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">50000</p>
            </div>
            <div className="p-3 bg-green-50 text-green-600 rounded-lg">
              <CreditCard className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-4 pb-4 border-b border-gray-50">
              <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg"><Utensils className="w-5 h-5" /></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Rated Dinner</p>
                <p className="text-xs text-gray-500">Today at 8:30 PM</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 pb-4 border-b border-gray-50">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Shirt className="w-5 h-5" /></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Laundry load completed</p>
                <p className="text-xs text-gray-500">Yesterday at 2:15 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Announcements Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
               <Megaphone className="w-5 h-5 text-indigo-600" />
               Recent Announcements
            </h3>
            <button onClick={() => setActiveTab('announcements')} className="text-sm text-indigo-600 hover:text-indigo-800 font-bold transition-colors">View All</button>
          </div>
          
          <div className="space-y-3 flex-1">
            {recentAnnouncements.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No recent announcements.</p>
            ) : (
              recentAnnouncements.map(a => {
                let borderClass = 'border-gray-100';
                let tagClass = 'bg-gray-100 text-gray-600';
                let titleClass = 'text-gray-800';
                let tagLabel = 'Normal';
                
                if (a.importance === 'urgent') {
                  borderClass = 'border-red-200 bg-red-50 border-l-4 border-l-red-500';
                  tagClass = 'bg-red-100 text-red-700';
                  titleClass = 'text-red-900';
                  tagLabel = 'Urgent';
                } else if (a.importance === 'important') {
                  borderClass = 'border-orange-200 bg-orange-50 border-l-4 border-l-orange-500';
                  tagClass = 'bg-orange-100 text-orange-700';
                  titleClass = 'text-orange-900';
                  tagLabel = 'Important';
                }

                return (
                  <div key={a.id} className={`p-4 border rounded-lg transition-all ${borderClass}`}>
                    <div className="flex justify-between items-start mb-1">
                      <h4 className={`font-bold leading-tight line-clamp-1 ${titleClass}`}>{a.title}</h4>
                      {(a.importance === 'urgent' || a.importance === 'important') && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ml-2 shrink-0 ${tagClass}`}>
                          {tagLabel}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{a.content}</p>
                    <p className="text-[11px] text-gray-400 font-medium mt-2">{formatDate(a.createdAt)}</p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
