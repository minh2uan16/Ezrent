import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { rooms } from '../data/mockData';

export default function RoomForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const existingRoom = isEdit ? rooms.find(r => r.id === id) : null;

  const [formData, setFormData] = useState({
    number: existingRoom?.number || '',
    capacity: existingRoom?.capacity || 1,
    status: existingRoom?.status || 'available',
    notes: existingRoom?.notes || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/rooms');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'capacity' ? parseInt(value) : value,
    }));
  };

  return (
    <div className="max-w-2xl">
      <button
        onClick={() => navigate('/rooms')}
        className="flex items-center gap-2 text-[#6B7280] hover:text-[#111827] mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Rooms
      </button>

      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-[#111827] mb-6">
          {isEdit ? 'Edit Room' : 'Add New Room'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">
              Room Number
            </label>
            <input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleChange}
              placeholder="e.g., R101"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">
              Capacity
            </label>
            <select
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
              required
            >
              <option value={1}>1 person</option>
              <option value={2}>2 persons</option>
              <option value={3}>3 persons</option>
              <option value={4}>4 persons</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
              required
            >
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Additional information about the room"
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-[#2563EB] text-white py-3 rounded-lg font-medium hover:bg-[#1E40AF] transition-colors"
            >
              {isEdit ? 'Update Room' : 'Create Room'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/rooms')}
              className="flex-1 bg-gray-100 text-[#111827] py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
