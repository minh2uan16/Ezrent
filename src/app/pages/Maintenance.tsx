import { useState } from 'react';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { maintenanceRequests as initialRequests } from '../data/mockData';

export default function Maintenance() {
  const [requests, setRequests] = useState(initialRequests);
  const [filter, setFilter] = useState<'all' | 'pending' | 'resolved'>('all');

  const filteredRequests = requests.filter(req =>
    filter === 'all' || req.status === filter
  );

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const resolvedCount = requests.filter(r => r.status === 'resolved').length;

  const toggleStatus = (id: string) => {
    setRequests(requests.map(req =>
      req.id === id
        ? { ...req, status: req.status === 'pending' ? 'resolved' : 'pending' }
        : req
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#111827] mb-2">Maintenance Requests</h2>
        <p className="text-[#6B7280]">Track and manage maintenance issues</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#6B7280] mb-1">Total Requests</p>
              <p className="text-2xl font-bold text-[#111827]">{requests.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#6B7280] mb-1">Pending</p>
              <p className="text-2xl font-bold text-[#111827]">{pendingCount}</p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#6B7280] mb-1">Resolved</p>
              <p className="text-2xl font-bold text-[#111827]">{resolvedCount}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-[#2563EB] text-white'
                  : 'bg-gray-100 text-[#6B7280] hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'pending'
                  ? 'bg-[#2563EB] text-white'
                  : 'bg-gray-100 text-[#6B7280] hover:bg-gray-200'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter('resolved')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'resolved'
                  ? 'bg-[#2563EB] text-white'
                  : 'bg-gray-100 text-[#6B7280] hover:bg-gray-200'
              }`}
            >
              Resolved
            </button>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredRequests.map((request) => (
            <div key={request.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-medium text-[#2563EB]">{request.roomNumber}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      request.status === 'pending'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {request.status === 'pending' ? 'Pending' : 'Resolved'}
                    </span>
                  </div>
                  <p className="text-[#111827] mb-2">{request.description}</p>
                  <p className="text-sm text-[#6B7280]">Created: {request.createdAt}</p>
                </div>
                <button
                  onClick={() => toggleStatus(request.id)}
                  className="ml-4 px-4 py-2 bg-gray-100 text-[#111827] rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  Mark as {request.status === 'pending' ? 'Resolved' : 'Pending'}
                </button>
              </div>
            </div>
          ))}

          {filteredRequests.length === 0 && (
            <div className="p-12 text-center text-[#6B7280]">
              No {filter !== 'all' && filter} requests found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
