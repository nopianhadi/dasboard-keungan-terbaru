// ============================================
// MOCK PACKAGES & ADD-ONS DATA
// ============================================

import type { Package, AddOn } from '../types/packages';

export const mockPackages: Package[] = [
  {
    id: '1',
    name: 'Wedding Premium',
    category: 'Photo + Video',
    region: 'Jakarta',
    price: 15000000,
    duration_options: ['8 Jam', '10 Jam', '12 Jam'],
    physical_items: [
      'Album 30x30 cm (50 halaman)',
      'USB Flashdisk Custom',
      'Frame 20x30 cm (2 pcs)',
      'Cetak 4R (100 lembar)'
    ],
    digital_items: [
      'Foto High Resolution (300+ foto)',
      'Video Highlight (3-5 menit)',
      'Raw Photos',
      'Online Gallery'
    ],
    processing_time: '14 hari kerja',
    photographers: '2 Fotografer',
    videographers: '1 Videografer',
    default_printing_cost: 2500000,
    default_transport_cost: 500000,
    cover_image: '/images/wedding-premium.jpg',
    is_active: true,
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Wedding Basic',
    category: 'Photo',
    region: 'Jakarta',
    price: 8500000,
    duration_options: ['6 Jam', '8 Jam'],
    physical_items: [
      'Album 20x30 cm (30 halaman)',
      'USB Flashdisk',
      'Cetak 4R (50 lembar)'
    ],
    digital_items: [
      'Foto High Resolution (200+ foto)',
      'Online Gallery'
    ],
    processing_time: '10 hari kerja',
    photographers: '1 Fotografer',
    videographers: '0',
    default_printing_cost: 1500000,
    default_transport_cost: 300000,
    cover_image: '/images/wedding-basic.jpg',
    is_active: true,
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
  {
    id: '3',
    name: 'Prewedding Package',
    category: 'Photo + Video',
    region: 'Bali',
    price: 12000000,
    duration_options: ['4 Jam', '6 Jam'],
    physical_items: [
      'Album 30x30 cm (40 halaman)',
      'USB Flashdisk Custom',
      'Frame 30x40 cm (1 pcs)'
    ],
    digital_items: [
      'Foto High Resolution (150+ foto)',
      'Video Cinematic (2-3 menit)',
      'Online Gallery'
    ],
    processing_time: '7 hari kerja',
    photographers: '1 Fotografer',
    videographers: '1 Videografer',
    default_printing_cost: 2000000,
    default_transport_cost: 1000000,
    cover_image: '/images/prewedding.jpg',
    is_active: true,
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
  {
    id: '4',
    name: 'Corporate Event',
    category: 'Photo + Video',
    region: 'Jakarta',
    price: 6000000,
    duration_options: ['4 Jam', '6 Jam', '8 Jam'],
    physical_items: [
      'USB Flashdisk',
      'Cetak 4R (30 lembar)'
    ],
    digital_items: [
      'Foto High Resolution (100+ foto)',
      'Video Documentation (5-10 menit)',
      'Online Gallery'
    ],
    processing_time: '5 hari kerja',
    photographers: '1 Fotografer',
    videographers: '1 Videografer',
    default_printing_cost: 500000,
    default_transport_cost: 200000,
    cover_image: '/images/corporate.jpg',
    is_active: true,
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
  {
    id: '5',
    name: 'Product Photography',
    category: 'Photo',
    region: 'Jakarta',
    price: 3500000,
    duration_options: ['2 Jam', '4 Jam'],
    physical_items: [
      'USB Flashdisk'
    ],
    digital_items: [
      'Foto High Resolution (50+ foto)',
      'Edited Photos',
      'Online Gallery'
    ],
    processing_time: '3 hari kerja',
    photographers: '1 Fotografer',
    videographers: '0',
    default_printing_cost: 0,
    default_transport_cost: 100000,
    cover_image: '/images/product.jpg',
    is_active: true,
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
];

export const mockAddOns: AddOn[] = [
  {
    id: '1',
    name: 'Tambahan Fotografer',
    price: 1500000,
    region: 'Jakarta',
    description: 'Menambah 1 fotografer untuk coverage yang lebih luas',
    is_active: true,
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Tambahan Videografer',
    price: 2000000,
    region: 'Jakarta',
    description: 'Menambah 1 videografer untuk angle video yang beragam',
    is_active: true,
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
  {
    id: '3',
    name: 'Drone Photography',
    price: 1000000,
    region: 'Jakarta',
    description: 'Foto dan video aerial menggunakan drone',
    is_active: true,
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
  {
    id: '4',
    name: 'Same Day Edit',
    price: 3000000,
    region: 'Jakarta',
    description: 'Video highlight siap di hari yang sama',
    is_active: true,
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
  {
    id: '5',
    name: 'Extra Album',
    price: 1200000,
    region: 'Jakarta',
    description: 'Album tambahan 20x30 cm (30 halaman)',
    is_active: true,
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
  {
    id: '6',
    name: 'Live Streaming',
    price: 2500000,
    region: 'Jakarta',
    description: 'Live streaming acara ke platform media sosial',
    is_active: true,
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
  {
    id: '7',
    name: 'Photo Booth',
    price: 1800000,
    region: 'Jakarta',
    description: 'Photo booth dengan props dan backdrop custom',
    is_active: true,
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
  {
    id: '8',
    name: 'Makeup Artist',
    price: 2200000,
    region: 'Jakarta',
    description: 'Makeup artist profesional untuk bride/talent',
    is_active: true,
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
];

// Helper functions
export const getPackagesByCategory = (category?: string) => {
  if (!category) return mockPackages;
  return mockPackages.filter(pkg => pkg.category === category);
};

export const getActivePackages = () => {
  return mockPackages.filter(pkg => pkg.is_active);
};

export const getActiveAddOns = () => {
  return mockAddOns.filter(addon => addon.is_active);
};

export const getPackageCategories = () => {
  const categories = [...new Set(mockPackages.map(pkg => pkg.category))];
  return categories;
};