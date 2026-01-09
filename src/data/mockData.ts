// ============================================
// MOCK DATA - Based on Database Schema
// ============================================

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  instagram?: string;
  website?: string;
  company?: string;
  source: 'WhatsApp' | 'Instagram' | 'Website' | 'Referral' | 'Email' | 'Phone' | 'Other';
  status: 'Diskusi' | 'Tindak Lanjut' | 'Dikonversi' | 'Ditolak';
  priority: 'Tinggi' | 'Sedang' | 'Rendah';
  projectType?: string;
  estimatedBudget?: number;
  notes?: string;
  createdAt: string;
  lastContact: string;
  convertedToClientId?: string;
  convertedToProjectId?: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  instagram?: string;
  status: 'Prospek' | 'Aktif' | 'Tidak Aktif' | 'Hilang';
  clientType: 'Langsung' | 'Vendor';
  since: string;
  lastContact: string;
  portalAccessId: string;
  totalProjects?: number;
  totalSpent?: number;
  rating?: number;
}

export interface Project {
  id: string;
  clientId: string;
  clientName: string;
  projectName: string;
  projectType: string;
  packageName: string;
  location?: string;
  date: string;
  deadlineDate?: string;
  status: string;
  progress: number;
  totalCost: number;
  amountPaid: number;
  paymentStatus: 'Lunas' | 'DP Terbayar' | 'Belum Bayar';
  team: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  standardFee: number;
  rewardBalance: number;
  rating: number;
  isActive: boolean;
  portalAccessId: string;
  totalProjects?: number;
  activeProjects?: number;
}

export interface FinanceCard {
  id: string;
  cardHolderName: string;
  bankName: string;
  lastFourDigits: string;
  cardType: 'Prabayar' | 'Kredit' | 'Debit' | 'Tunai';
  balance: number;
  colorGradient: string;
  isActive: boolean;
}

export interface Pocket {
  id: string;
  name: string;
  description?: string;
  type: 'Nabung & Bayar' | 'Terkunci' | 'Bersama' | 'Anggaran Pengeluaran' | 'Tabungan Hadiah Freelancer';
  amount: number;
  goalAmount?: number;
  icon: string;
  isActive: boolean;
}

export interface Transaction {
  id: string;
  projectId?: string;
  cardId?: string;
  pocketId?: string;
  date: string;
  description: string;
  amount: number;
  type: 'Pemasukan' | 'Pengeluaran';
  category: string;
  method: 'Transfer Bank' | 'Tunai' | 'E-Wallet' | 'Sistem' | 'Kartu';
}

// ============================================
// MOCK LEADS
// ============================================
export const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Rina & Dimas',
    email: 'rina.dimas@email.com',
    phone: '081234567899',
    whatsapp: '081234567899',
    instagram: '@rinadimas',
    source: 'Instagram',
    status: 'Diskusi',
    priority: 'Tinggi',
    projectType: 'Wedding',
    estimatedBudget: 20000000,
    notes: 'Tertarik paket wedding premium, rencana nikah Mei 2026',
    createdAt: '2026-01-08',
    lastContact: '2026-01-09',
  },
  {
    id: '2',
    name: 'PT Digital Solutions',
    email: 'contact@digitalsolutions.com',
    phone: '082345678900',
    whatsapp: '082345678900',
    company: 'PT Digital Solutions',
    source: 'Website',
    status: 'Tindak Lanjut',
    priority: 'Tinggi',
    projectType: 'Corporate',
    estimatedBudget: 15000000,
    notes: 'Butuh dokumentasi event launching produk baru',
    createdAt: '2026-01-07',
    lastContact: '2026-01-08',
  },
  {
    id: '3',
    name: 'Sarah Boutique',
    email: 'sarah@boutique.com',
    phone: '083456789011',
    whatsapp: '083456789011',
    instagram: '@sarahboutique',
    company: 'Sarah Boutique',
    source: 'Instagram',
    status: 'Diskusi',
    priority: 'Sedang',
    projectType: 'Product',
    estimatedBudget: 5000000,
    notes: 'Perlu foto produk untuk katalog online',
    createdAt: '2026-01-06',
    lastContact: '2026-01-07',
  },
  {
    id: '4',
    name: 'Fajar & Lina',
    email: 'fajar.lina@email.com',
    phone: '084567890122',
    whatsapp: '084567890122',
    source: 'Referral',
    status: 'Tindak Lanjut',
    priority: 'Sedang',
    projectType: 'Prewedding',
    estimatedBudget: 10000000,
    notes: 'Referensi dari Budi & Ani, mau prewedding di Bali',
    createdAt: '2026-01-05',
    lastContact: '2026-01-06',
  },
  {
    id: '5',
    name: 'Toko Elektronik Jaya',
    email: 'info@elektronikjaya.com',
    phone: '085678901233',
    whatsapp: '085678901233',
    company: 'Toko Elektronik Jaya',
    source: 'Phone',
    status: 'Ditolak',
    priority: 'Rendah',
    projectType: 'Product',
    estimatedBudget: 3000000,
    notes: 'Budget tidak sesuai dengan scope pekerjaan',
    createdAt: '2026-01-03',
    lastContact: '2026-01-04',
  },
  {
    id: '6',
    name: 'Rudi Hartono',
    email: 'rudi@email.com',
    phone: '086789012344',
    whatsapp: '086789012344',
    source: 'WhatsApp',
    status: 'Dikonversi',
    priority: 'Tinggi',
    projectType: 'Wedding',
    estimatedBudget: 18000000,
    notes: 'Sudah deal, dikonversi menjadi klien',
    createdAt: '2026-01-01',
    lastContact: '2026-01-05',
    convertedToClientId: '6',
    convertedToProjectId: '5',
  },
];

// ============================================
// MOCK CLIENTS
// ============================================
export const mockClients: Client[] = [
  {
    id: '1',
    name: 'Budi & Ani',
    email: 'budi.ani@email.com',
    phone: '081234567890',
    whatsapp: '081234567890',
    instagram: '@budianicouple',
    status: 'Aktif',
    clientType: 'Langsung',
    since: '2025-01-15',
    lastContact: '2026-01-07',
    portalAccessId: 'portal-001',
    totalProjects: 2,
    totalSpent: 28500000,
    rating: 5,
  },
  {
    id: '2',
    name: 'PT Maju Jaya',
    email: 'info@majujaya.com',
    phone: '082345678901',
    whatsapp: '082345678901',
    status: 'Aktif',
    clientType: 'Vendor',
    since: '2024-08-20',
    lastContact: '2026-01-05',
    portalAccessId: 'portal-002',
    totalProjects: 5,
    totalSpent: 45000000,
    rating: 4.8,
  },
  {
    id: '3',
    name: 'Fashion Store XYZ',
    email: 'contact@fashionxyz.com',
    phone: '083456789012',
    whatsapp: '083456789012',
    instagram: '@fashionxyz',
    status: 'Aktif',
    clientType: 'Langsung',
    since: '2025-11-10',
    lastContact: '2026-01-03',
    portalAccessId: 'portal-003',
    totalProjects: 3,
    totalSpent: 18000000,
    rating: 4.5,
  },
  {
    id: '4',
    name: 'Ahmad & Siti',
    email: 'ahmad.siti@email.com',
    phone: '084567890123',
    whatsapp: '084567890123',
    status: 'Prospek',
    clientType: 'Langsung',
    since: '2026-01-05',
    lastContact: '2026-01-05',
    portalAccessId: 'portal-004',
    totalProjects: 0,
    totalSpent: 0,
    rating: 0,
  },
  {
    id: '5',
    name: 'Dewi Lestari',
    email: 'dewi@email.com',
    phone: '085678901234',
    status: 'Tidak Aktif',
    clientType: 'Langsung',
    since: '2024-03-15',
    lastContact: '2025-06-20',
    portalAccessId: 'portal-005',
    totalProjects: 1,
    totalSpent: 8500000,
    rating: 4,
  },
];

// ============================================
// MOCK PROJECTS
// ============================================
export const mockProjects: Project[] = [
  {
    id: '1',
    clientId: '1',
    clientName: 'Budi & Ani',
    projectName: 'Wedding Photography - Budi & Ani',
    projectType: 'Wedding',
    packageName: 'Wedding Premium',
    location: 'Bandung',
    date: '2026-02-15',
    deadlineDate: '2026-03-15',
    status: 'Pemotretan',
    progress: 45,
    totalCost: 15000000,
    amountPaid: 7500000,
    paymentStatus: 'DP Terbayar',
    team: ['Andi Photographer', 'Budi Videographer'],
  },
  {
    id: '2',
    clientId: '2',
    clientName: 'PT Maju Jaya',
    projectName: 'Corporate Event - PT Maju Jaya',
    projectType: 'Corporate',
    packageName: 'Corporate Basic',
    location: 'Jakarta',
    date: '2026-01-20',
    deadlineDate: '2026-02-05',
    status: 'Editing',
    progress: 70,
    totalCost: 8500000,
    amountPaid: 8500000,
    paymentStatus: 'Lunas',
    team: ['Andi Photographer', 'Citra Editor'],
  },
  {
    id: '3',
    clientId: '3',
    clientName: 'Fashion Store XYZ',
    projectName: 'Product Shoot - Fashion Collection',
    projectType: 'Product',
    packageName: 'Product Photography',
    location: 'Studio',
    date: '2026-02-28',
    deadlineDate: '2026-03-10',
    status: 'Persiapan',
    progress: 20,
    totalCost: 5000000,
    amountPaid: 0,
    paymentStatus: 'Belum Bayar',
    team: ['Andi Photographer'],
  },
  {
    id: '4',
    clientId: '1',
    clientName: 'Budi & Ani',
    projectName: 'Prewedding - Budi & Ani',
    projectType: 'Prewedding',
    packageName: 'Prewedding Package',
    location: 'Bali',
    date: '2026-01-25',
    deadlineDate: '2026-02-10',
    status: 'Revisi',
    progress: 85,
    totalCost: 12000000,
    amountPaid: 12000000,
    paymentStatus: 'Lunas',
    team: ['Andi Photographer', 'Budi Videographer', 'Citra Editor'],
  },
];

// ============================================
// MOCK TEAM MEMBERS
// ============================================
export const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Andi Photographer',
    email: 'andi@venapictures.com',
    phone: '081234567896',
    role: 'Fotografer',
    standardFee: 1500000,
    rewardBalance: 5500000,
    rating: 4.8,
    isActive: true,
    portalAccessId: 'team-001',
    totalProjects: 45,
    activeProjects: 3,
  },
  {
    id: '2',
    name: 'Budi Videographer',
    email: 'budi@venapictures.com',
    phone: '082345678901',
    role: 'Videografer',
    standardFee: 2000000,
    rewardBalance: 3200000,
    rating: 4.9,
    isActive: true,
    portalAccessId: 'team-002',
    totalProjects: 38,
    activeProjects: 2,
  },
  {
    id: '3',
    name: 'Citra Editor',
    email: 'citra@venapictures.com',
    phone: '083456789012',
    role: 'Editor',
    standardFee: 1000000,
    rewardBalance: 2800000,
    rating: 4.7,
    isActive: true,
    portalAccessId: 'team-003',
    totalProjects: 52,
    activeProjects: 4,
  },
  {
    id: '4',
    name: 'Doni Prasetyo',
    email: 'doni@venapictures.com',
    phone: '084567890123',
    role: 'Fotografer & Videografer',
    standardFee: 1800000,
    rewardBalance: 1500000,
    rating: 4.6,
    isActive: true,
    portalAccessId: 'team-004',
    totalProjects: 28,
    activeProjects: 1,
  },
];

// ============================================
// MOCK FINANCE CARDS
// ============================================
export const mockFinanceCards: FinanceCard[] = [
  {
    id: '1',
    cardHolderName: 'Vena Pictures',
    bankName: 'BCA',
    lastFourDigits: '1234',
    cardType: 'Debit',
    balance: 125500000,
    colorGradient: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
    isActive: true,
  },
  {
    id: '2',
    cardHolderName: 'Vena Pictures',
    bankName: 'Mandiri',
    lastFourDigits: '5678',
    cardType: 'Kredit',
    balance: 15000000,
    colorGradient: 'linear-gradient(135deg, #d32f2f 0%, #f44336 100%)',
    isActive: true,
  },
  {
    id: '3',
    cardHolderName: 'Vena Pictures',
    bankName: 'Cash',
    lastFourDigits: 'CASH',
    cardType: 'Tunai',
    balance: 5000000,
    colorGradient: 'linear-gradient(135deg, #388e3c 0%, #66bb6a 100%)',
    isActive: true,
  },
];

// ============================================
// MOCK POCKETS
// ============================================
export const mockPockets: Pocket[] = [
  {
    id: '1',
    name: 'Dana Operasional',
    description: 'Dana untuk operasional harian',
    type: 'Nabung & Bayar',
    amount: 45000000,
    goalAmount: 50000000,
    icon: 'piggy-bank',
    isActive: true,
  },
  {
    id: '2',
    name: 'Dana Darurat',
    description: 'Dana cadangan untuk keperluan darurat',
    type: 'Terkunci',
    amount: 30000000,
    goalAmount: 50000000,
    icon: 'lock',
    isActive: true,
  },
  {
    id: '3',
    name: 'Hadiah Freelancer',
    description: 'Pool untuk bonus dan hadiah freelancer',
    type: 'Tabungan Hadiah Freelancer',
    amount: 12500000,
    icon: 'star',
    isActive: true,
  },
  {
    id: '4',
    name: 'Anggaran Marketing',
    description: 'Budget untuk kegiatan marketing',
    type: 'Anggaran Pengeluaran',
    amount: 8000000,
    goalAmount: 15000000,
    icon: 'clipboard-list',
    isActive: true,
  },
];

// ============================================
// MOCK TRANSACTIONS
// ============================================
export const mockTransactions: Transaction[] = [
  {
    id: '1',
    projectId: '1',
    cardId: '1',
    date: '2026-01-08',
    description: 'Pembayaran DP Wedding - Budi & Ani',
    amount: 7500000,
    type: 'Pemasukan',
    category: 'Pemasukan Proyek',
    method: 'Transfer Bank',
  },
  {
    id: '2',
    projectId: '1',
    cardId: '1',
    date: '2026-01-07',
    description: 'Pembayaran Fee - Andi Photographer',
    amount: 1500000,
    type: 'Pengeluaran',
    category: 'Gaji Freelancer',
    method: 'Transfer Bank',
  },
  {
    id: '3',
    cardId: '2',
    date: '2026-01-06',
    description: 'Pembelian Lensa Kamera',
    amount: 8500000,
    type: 'Pengeluaran',
    category: 'Peralatan',
    method: 'Kartu',
  },
  {
    id: '4',
    projectId: '2',
    cardId: '1',
    date: '2026-01-05',
    description: 'Pelunasan Corporate Event - PT Maju',
    amount: 8500000,
    type: 'Pemasukan',
    category: 'Pemasukan Proyek',
    method: 'Transfer Bank',
  },
  {
    id: '5',
    cardId: '3',
    date: '2026-01-04',
    description: 'Biaya Transport Shooting',
    amount: 500000,
    type: 'Pengeluaran',
    category: 'Operasional',
    method: 'Tunai',
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const getStatusColor = (status: string): 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' => {
  const statusColors: Record<string, 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = {
    // Client Status
    'Prospek': 'info',
    'Aktif': 'success',
    'Tidak Aktif': 'warning',
    'Hilang': 'error',
    // Project Status
    'Diskusi': 'info',
    'Persiapan': 'warning',
    'Pemotretan': 'primary',
    'Editing': 'secondary',
    'Revisi': 'error',
    'Selesai': 'success',
    // Payment Status
    'Lunas': 'success',
    'DP Terbayar': 'warning',
    'Belum Bayar': 'error',
  };
  return statusColors[status] || 'default';
};
