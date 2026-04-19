import { createBrowserRouter } from 'react-router';
import DashboardLayout from './layouts/DashboardLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import RoomManagement from './pages/RoomManagement';
import RoomForm from './pages/RoomForm';
import RoomDetail from './pages/RoomDetail';
import TenantManagement from './pages/TenantManagement';
import TenantForm from './pages/TenantForm';
import TenantDetail from './pages/TenantDetail';
import Maintenance from './pages/Maintenance';
import Settings from './pages/Settings';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Login,
  },
  {
    path: '/',
    Component: DashboardLayout,
    children: [
      {
        path: 'dashboard',
        Component: Dashboard,
      },
      {
        path: 'rooms',
        Component: RoomManagement,
      },
      {
        path: 'rooms/new',
        Component: RoomForm,
      },
      {
        path: 'rooms/:id',
        Component: RoomDetail,
      },
      {
        path: 'rooms/:id/edit',
        Component: RoomForm,
      },
      {
        path: 'tenants',
        Component: TenantManagement,
      },
      {
        path: 'tenants/new',
        Component: TenantForm,
      },
      {
        path: 'tenants/:id',
        Component: TenantDetail,
      },
      {
        path: 'tenants/:id/edit',
        Component: TenantForm,
      },
      {
        path: 'maintenance',
        Component: Maintenance,
      },
      {
        path: 'settings',
        Component: Settings,
      },
    ],
  },
]);
