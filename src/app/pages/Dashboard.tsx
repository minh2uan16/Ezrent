import { Building2, Home, Users, DoorOpen } from 'lucide-react';
import { rooms, tenants } from '../data/mockData';

export default function Dashboard() {
  const totalRooms = rooms.length;
  const occupiedRooms = rooms.filter(r => r.status === 'occupied').length;
  const availableRooms = rooms.filter(r => r.status === 'available').length;
  const totalTenants = tenants.length;

  const stats = [
    { label: 'Total Rooms', value: totalRooms, icon: Building2, color: 'bg-blue-500' },
    { label: 'Occupied Rooms', value: occupiedRooms, icon: Home, color: 'bg-green-500' },
    { label: 'Available Rooms', value: availableRooms, icon: DoorOpen, color: 'bg-amber-500' },
    { label: 'Total Tenants', value: totalTenants, icon: Users, color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[#111827] mb-2">Overview</h2>
        <p className="text-[#6B7280]">Current status of your boarding house</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-[#6B7280] mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-[#111827]">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-[#111827] mb-4">Recent Rooms</h3>
          <div className="space-y-3">
            {rooms.slice(0, 5).map((room) => (
              <div key={room.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-medium text-[#111827]">{room.number}</p>
                  <p className="text-sm text-[#6B7280]">Capacity: {room.capacity} person{room.capacity > 1 ? 's' : ''}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  room.status === 'occupied'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-amber-100 text-amber-700'
                }`}>
                  {room.status === 'occupied' ? 'Occupied' : 'Available'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-[#111827] mb-4">Recent Tenants</h3>
          <div className="space-y-3">
            {tenants.slice(0, 5).map((tenant) => {
              const room = rooms.find(r => r.id === tenant.roomId);
              return (
                <div key={tenant.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="font-medium text-[#111827]">{tenant.name}</p>
                    <p className="text-sm text-[#6B7280]">{tenant.phone}</p>
                  </div>
                  {room && (
                    <span className="text-sm font-medium text-[#2563EB]">{room.number}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
