import { useParams, useNavigate, Link } from 'react-router';
import { ArrowLeft, Edit, Building2, Users, Calendar } from 'lucide-react';
import { rooms, tenants } from '../data/mockData';

export default function RoomDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const room = rooms.find(r => r.id === id);
  const roomTenants = tenants.filter(t => t.roomId === id);

  if (!room) {
    return (
      <div className="text-center py-12">
        <p className="text-[#6B7280]">Room not found</p>
        <button
          onClick={() => navigate('/rooms')}
          className="mt-4 text-[#2563EB] hover:underline"
        >
          Back to Rooms
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate('/rooms')}
          className="flex items-center gap-2 text-[#6B7280] hover:text-[#111827]"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Rooms
        </button>
        <Link
          to={`/rooms/${id}/edit`}
          className="flex items-center gap-2 px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1E40AF] transition-colors"
        >
          <Edit className="w-5 h-5" />
          Edit Room
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-8 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#111827] mb-2">Room {room.number}</h2>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
              room.status === 'occupied'
                ? 'bg-green-100 text-green-700'
                : 'bg-amber-100 text-amber-700'
            }`}>
              {room.status === 'occupied' ? 'Occupied' : 'Available'}
            </span>
          </div>
          <div className="w-16 h-16 bg-[#EFF6FF] rounded-lg flex items-center justify-center">
            <Building2 className="w-8 h-8 text-[#2563EB]" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-[#6B7280] mb-1">Capacity</p>
            <p className="font-medium text-[#111827]">{room.capacity} person{room.capacity > 1 ? 's' : ''}</p>
          </div>
          <div>
            <p className="text-sm text-[#6B7280] mb-1">Current Occupancy</p>
            <p className="font-medium text-[#111827]">{roomTenants.length} / {room.capacity}</p>
          </div>
        </div>

        {room.notes && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-[#6B7280] mb-1">Notes</p>
            <p className="text-[#111827]">{room.notes}</p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="flex items-center gap-2 mb-6">
          <Users className="w-5 h-5 text-[#2563EB]" />
          <h3 className="text-lg font-semibold text-[#111827]">Assigned Tenants</h3>
        </div>

        {roomTenants.length > 0 ? (
          <div className="space-y-4">
            {roomTenants.map((tenant) => (
              <Link
                key={tenant.id}
                to={`/tenants/${tenant.id}`}
                className="block p-4 border border-gray-200 rounded-lg hover:border-[#2563EB] hover:bg-[#EFF6FF] transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-[#111827] mb-1">{tenant.name}</p>
                    <p className="text-sm text-[#6B7280]">{tenant.phone}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm text-[#6B7280]">
                      <Calendar className="w-4 h-4" />
                      <span>Move-in: {tenant.moveInDate}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-[#6B7280] text-center py-8">No tenants assigned to this room</p>
        )}
      </div>
    </div>
  );
}
