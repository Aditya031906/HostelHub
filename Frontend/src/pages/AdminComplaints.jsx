import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Clock, ChevronRight, Filter, AlertTriangle, Bell, Info } from 'lucide-react';
import { API_URL } from '../config';

const importanceConfig = {
  low: { label: 'Low', icon: Info, color: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-200', dot: 'bg-gray-400', badge: 'bg-gray-100 text-gray-600' },
  normal: { label: 'Normal', icon: Bell, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', dot: 'bg-blue-500', badge: 'bg-blue-100 text-blue-700' },
  important: { label: 'Important', icon: AlertCircle, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200', dot: 'bg-orange-500', badge: 'bg-orange-100 text-orange-700' },
  urgent: { label: 'Urgent', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', dot: 'bg-red-500', badge: 'bg-red-100 text-red-700' }
};

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await fetch(`${API_URL}/api/complaints`);
      if (res.ok) {
        const data = await res.json();
        setComplaints(data);
      }
    } catch (err) {
      console.error('Failed to fetch complaints:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`${API_URL}/api/complaints/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setComplaints(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const filteredComplaints = filter === 'All' ? complaints : complaints.filter(c => c.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Complaints Overview</h2>
          <p className="text-sm text-gray-500 mt-1">Review and resolve student complaints</p>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
           <Filter size={16} className="text-gray-400" />
           {['All', 'Pending', 'Received', 'Resolved'].map(tab => (
             <button
               key={tab}
               onClick={() => setFilter(tab)}
               className={`px-3 py-1.5 rounded-lg text-sm font-bold whitespace-nowrap transition-colors border ${
                 filter === tab 
                   ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                   : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
               }`}
             >
               {tab}
             </button>
           ))}
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="animate-spin w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full mx-auto mb-3"></div>
          <p className="text-gray-500 font-medium">Loading complaints...</p>
        </div>
      ) : complaints.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-bold text-lg">No complaints registered</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredComplaints.length === 0 ? (
             <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                <p className="text-gray-500 font-bold">No complaints match this filter.</p>
             </div>
          ) : (
            filteredComplaints.map(complaint => {
              const impCfg = importanceConfig[complaint.importance || 'normal'];
              return (
              <div key={complaint.id} className={`bg-white rounded-xl shadow-sm border overflow-hidden flex flex-col md:flex-row ${impCfg.border} transition-all`}>
                 <div className={`p-5 flex-1 relative ${complaint.importance === 'urgent' ? impCfg.bg : ''}`}>
                    <div className={`absolute top-0 left-0 w-1 h-full ${impCfg.bg.replace('bg-', 'bg-').replace('-50', '-500')}`}></div>
                    <div className="flex justify-between items-start mb-2">
                       <div className="flex flex-col gap-1.5">
                         <div className="flex items-center gap-2">
                           <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold ${impCfg.badge}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${impCfg.dot}`}></span>
                              {impCfg.label} Priority
                           </span>
                         </div>
                         <h3 className="text-lg font-black text-gray-900 leading-tight">{complaint.title}</h3>
                       </div>
                       <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                         {formatDate(complaint.createdAt)}
                       </span>
                    </div>
                    <p className="text-sm font-bold text-indigo-600 mb-3">{complaint.studentName}</p>
                    <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">{complaint.description}</p>
                 </div>
                 
                 <div className="bg-gray-50 border-t md:border-t-0 md:border-l border-gray-100 p-5 md:w-64 flex flex-col justify-center">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 text-center">Update Status</p>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleStatusChange(complaint.id, 'Pending')}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-bold transition-all border ${
                          complaint.status === 'Pending' 
                           ? 'bg-red-50 text-red-700 border-red-200 shadow-sm' 
                           : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                           <Clock size={14} className={complaint.status === 'Pending' ? 'text-red-500' : 'text-gray-400'} /> Pending
                        </div>
                        {complaint.status === 'Pending' && <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>}
                      </button>
                      <button
                        onClick={() => handleStatusChange(complaint.id, 'Received')}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-bold transition-all border ${
                          complaint.status === 'Received' 
                           ? 'bg-yellow-50 text-yellow-700 border-yellow-200 shadow-sm' 
                           : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                           <AlertCircle size={14} className={complaint.status === 'Received' ? 'text-yellow-500' : 'text-gray-400'} /> Received
                        </div>
                        {complaint.status === 'Received' && <div className="w-1.5 h-1.5 rounded-full bg-yellow-600"></div>}
                      </button>
                      <button
                        onClick={() => handleStatusChange(complaint.id, 'Resolved')}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-bold transition-all border ${
                          complaint.status === 'Resolved' 
                           ? 'bg-green-50 text-green-700 border-green-200 shadow-sm' 
                           : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                           <CheckCircle size={14} className={complaint.status === 'Resolved' ? 'text-green-500' : 'text-gray-400'} /> Resolved
                        </div>
                        {complaint.status === 'Resolved' && <div className="w-1.5 h-1.5 rounded-full bg-green-600"></div>}
                      </button>
                    </div>
                 </div>
              </div>
            )})
          )}
        </div>
      )}
    </div>
  );
};

export default AdminComplaints;
