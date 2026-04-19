export interface Room {
  id: string;
  number: string;
  capacity: number;
  status: 'available' | 'occupied';
  notes?: string;
  tenant?: Tenant;
  moveInDate?: string;
}

export interface Tenant {
  id: string;
  name: string;
  phone: string;
  roomId?: string;
  moveInDate?: string;
}

export interface MaintenanceRequest {
  id: string;
  roomNumber: string;
  description: string;
  status: 'pending' | 'resolved';
  createdAt: string;
}

export const rooms: Room[] = [
  { id: '1', number: 'R101', capacity: 1, status: 'occupied', notes: 'Single room with AC' },
  { id: '2', number: 'R102', capacity: 2, status: 'occupied', notes: 'Double room' },
  { id: '3', number: 'R103', capacity: 1, status: 'available', notes: 'Single room' },
  { id: '4', number: 'R104', capacity: 2, status: 'available', notes: 'Double room with balcony' },
  { id: '5', number: 'R201', capacity: 1, status: 'occupied', notes: 'Single room' },
  { id: '6', number: 'R202', capacity: 2, status: 'occupied', notes: 'Double room with AC' },
  { id: '7', number: 'R203', capacity: 1, status: 'available', notes: 'Single room' },
  { id: '8', number: 'R204', capacity: 2, status: 'available', notes: 'Double room' },
];

export const tenants: Tenant[] = [
  { id: '1', name: 'Nguyen Van A', phone: '+84 123 456 789', roomId: '1', moveInDate: '2026-01-15' },
  { id: '2', name: 'Nguyen Van B', phone: '+84 123 456 783', roomId: '2', moveInDate: '2026-02-01' },
  { id: '3', name: 'Nguyen Van C', phone: '+84 123 456 735', roomId: '5', moveInDate: '2025-12-10' },
  { id: '4', name: 'Nguyen Van D', phone: '+84 123 456 726', roomId: '6', moveInDate: '2026-03-05' },
  { id: '5', name: 'Nguyen Van E', phone: '+84 123 456 732', roomId: '2', moveInDate: '2026-02-01' },
  { id: '6', name: 'Nguyen Van F', phone: '+84 123 456 712', roomId: '6', moveInDate: '2026-03-05' },
];

export const maintenanceRequests: MaintenanceRequest[] = [
  { id: '1', roomNumber: 'R101', description: 'Air conditioner not cooling properly', status: 'pending', createdAt: '2026-04-08' },
  { id: '2', roomNumber: 'R202', description: 'Leaking faucet in bathroom', status: 'pending', createdAt: '2026-04-09' },
  { id: '3', roomNumber: 'R103', description: 'Light bulb replacement needed', status: 'resolved', createdAt: '2026-04-05' },
  { id: '4', roomNumber: 'R201', description: 'Door lock issue', status: 'pending', createdAt: '2026-04-10' },
];
