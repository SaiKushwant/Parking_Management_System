// src/lib/mock-data.js

export const mockUsers = [
  {
    id: "1",
    email: "admin@parkease.com",
    password: "admin123",
    role: "admin",
    name: "Admin User",
    phone: "+1234567890",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    email: "vendor1@example.com",
    password: "vendor123",
    role: "vendor",
    name: "John Vendor",
    phone: "+1234567891",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "3",
    email: "client1@example.com",
    password: "client123",
    role: "client",
    name: "Jane Client",
    phone: "+1234567892",
    createdAt: new Date("2024-02-01"),
  },
]

export const mockVendors = [
  {
    id: "2",
    email: "vendor1@example.com",
    password: "vendor123",
    role: "vendor",
    name: "John Vendor",
    phone: "+1234567891",
    businessName: "Downtown Parking Solutions",
    businessAddress: "123 Main St, Downtown",
    isApproved: true,
    totalEarnings: 15420.5,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "4",
    email: "vendor2@example.com",
    password: "vendor123",
    role: "vendor",
    name: "Mike Parking",
    phone: "+1234567893",
    businessName: "City Center Parking",
    businessAddress: "456 Business Ave, City Center",
    isApproved: false,
    totalEarnings: 0,
    createdAt: new Date("2024-02-10"),
  },
]

export const mockParkingLots = [
  {
    id: "1",
    vendorId: "2",
    name: "Downtown Plaza Parking",
    address: "123 Main St, Downtown",
    description: "Secure parking in the heart of downtown with 24/7 security and covered spaces.",
    images: [
      "/modern-parking-garage-entrance.png",
      "/covered-parking-spaces-with-cars.png",
      "/parking-lot-security-camera-system.png",
    ],
    totalSpaces: 150,
    availableSpaces: 45,
    pricePerHour: 8.5,
    amenities: ["24/7 Security", "Covered Parking", "EV Charging", "Disabled Access"],
    coordinates: { lat: 40.7128, lng: -74.006 },
    isActive: true,
    createdAt: new Date("2024-01-20"),
  },
  {
    id: "2",
    vendorId: "2",
    name: "Business District Lot",
    address: "789 Corporate Blvd, Business District",
    description: "Premium parking for business professionals with valet service available.",
    images: ["/premium-business-parking-lot.png", "/valet-parking-service-area.png"],
    totalSpaces: 80,
    availableSpaces: 12,
    pricePerHour: 12.0,
    amenities: ["Valet Service", "Car Wash", "Reserved Spaces", "Business Lounge"],
    coordinates: { lat: 40.7589, lng: -73.9851 },
    isActive: true,
    createdAt: new Date("2024-02-01"),
  },
]

export const mockParkingSpaces = [
  // Downtown Plaza Parking spaces
  ...Array.from({ length: 150 }, (_, i) => ({
    id: `space-1-${i + 1}`,
    lotId: "1",
    spaceNumber: `A${i + 1}`,
    type: i < 10 ? "disabled" : i < 50 ? "compact" : i < 120 ? "regular" : "large",
    isOccupied: Math.random() > 0.7,
    isReserved: Math.random() > 0.9,
  })),

  // Business District Lot spaces
  ...Array.from({ length: 80 }, (_, i) => ({
    id: `space-2-${i + 1}`,
    lotId: "2",
    spaceNumber: `B${i + 1}`,
    type: i < 5 ? "disabled" : i < 20 ? "compact" : i < 60 ? "regular" : "large",
    isOccupied: Math.random() > 0.85,
    isReserved: Math.random() > 0.95,
  })),
]

export const mockBookings = [
  {
    id: "1",
    clientId: "3",
    lotId: "1",
    spaceId: "space-1-25",
    startTime: new Date("2024-03-15T09:00:00"),
    endTime: new Date("2024-03-15T17:00:00"),
    totalAmount: 68.0,
    status: "confirmed",
    paymentStatus: "paid",
    createdAt: new Date("2024-03-14T15:30:00"),
  },
  {
    id: "2",
    clientId: "3",
    lotId: "2",
    spaceId: "space-2-10",
    startTime: new Date("2024-03-16T08:30:00"),
    endTime: new Date("2024-03-16T18:30:00"),
    totalAmount: 120.0,
    status: "pending",
    paymentStatus: "pending",
    createdAt: new Date("2024-03-15T20:15:00"),
  },
]
