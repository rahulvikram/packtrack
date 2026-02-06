// Package status types
export type PackageStatus = 
  | 'pending'
  | 'picked_up'
  | 'in_transit'
  | 'out_for_delivery'
  | 'delivered'
  | 'delayed';

// Status update in the timeline
export interface StatusUpdate {
  id: string;
  status: PackageStatus;
  timestamp: string;
  location: string;
  description: string;
}

// Package/Shipment
export interface Package {
  id: string;
  trackingId: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  origin: string;
  destination: string;
  status: PackageStatus;
  estimatedDelivery: string;
  actualDelivery?: string;
  driverId?: string;
  driverName?: string;
  weight: number;
  dimensions: string;
  createdAt: string;
  updatedAt: string;
  statusHistory: StatusUpdate[];
}

// Customer user
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
}

// Admin user
export interface Admin {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'operator';
  createdAt: string;
}

// Driver
export interface Driver {
  id: string;
  name: string;
  phone: string;
  vehicleId: string;
  status: 'available' | 'on_route' | 'off_duty';
  currentLocation?: string;
}

// Dashboard stats
export interface DashboardStats {
  totalPackagesToday: number;
  inTransit: number;
  delivered: number;
  delayed: number;
  successRate: number;
}

// Alert/Notification
export interface Alert {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  packageId?: string;
}

// Filter options for package list
export interface PackageFilters {
  status?: PackageStatus | 'all';
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}
