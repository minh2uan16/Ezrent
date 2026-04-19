import { useParams, useNavigate, Link } from 'react-router';
import { ArrowLeft, Edit, User, Phone, Building2, Calendar } from 'lucide-react';
import { tenants, rooms } from '../data/mockData';

export default function TenantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const tenant = tenants.find(t => t.id === id);
  const room = tenant?.roomId ? rooms.find(r => r.id === tenant.roomId) : null;

  if (!tenant) {
    return (
      <div className="text-center py-12">
        <p className="text-[#6B7280]">Tenant not found</p>
        <button
          onClick={() => navigate('/tenants')}
          className="mt-4 text-[#2563EB] hover:underline"
        >
          Back to Tenants
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate('/tenants')}
          className="flex items-center gap-2 text-[#6B7280] hover:text-[#111827]"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Tenants
        </button>
        <Link
          to={`/tenants/${id}/edit`}
          className="flex items-center gap-2 px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1E40AF] transition-colors"
        >
          <Edit className="w-5 h-5" />
          Edit Tenant
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-8 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#111827] mb-2">{tenant.name}</h2>
            <div className="flex items-center gap-2 text-[#6B7280]">
              <Phone className="w-4 h-4" />
              <span>{tenant.phone}</span>
            </div>
          </div>
          <div className="w-16 h-16 bg-[#EFF6FF] rounded-lg flex items-center justify-center">
            <User className="w-8 h-8 text-[#2563EB]" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-2 text-sm text-[#6B7280] mb-1">
              <Calendar className="w-4 h-4" />
              <span>Move-in Date</span>
            </div>
            <p className="font-medium text-[#111827]">{tenant.moveInDate || 'Not set'}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="flex items-center gap-2 mb-6">
          <Building2 className="w-5 h-5 text-[#2563EB]" />
          <h3 className="text-lg font-semibold text-[#111827]">Assigned Room</h3>
        </div>

        {room ? (
          <Link
            to={`/rooms/${room.id}`}
            className="block p-6 border border-gray-200 rounded-lg hover:border-[#2563EB] hover:bg-[#EFF6FF] transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-bold text-[#111827] mb-2">{room.number}</p>
                <div className="space-y-1">
                  <p className="text-sm text-[#6B7280]">Capacity: {room.capacity} person{room.capacity > 1 ? 's' : ''}</p>
                  {room.notes && <p className="text-sm text-[#6B7280]">{room.notes}</p>}
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                room.status === 'occupied'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-amber-100 text-amber-700'
              }`}>
                {room.status === 'occupied' ? 'Occupied' : 'Available'}
              </span>
            </div>
          </Link>
        ) : (
          <p className="text-[#6B7280] text-center py-8">No room assigned</p>
        )}
      </div>
    </div>
  );
}
