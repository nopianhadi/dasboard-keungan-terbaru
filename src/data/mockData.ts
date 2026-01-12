// ============================================
// MOCK DATA - Based on Database Schema
// ============================================

export interface Lead {
  id: string;
  name: string;
  contact_channel: string;
  location?: string;
  status: string;
  date: string;
  notes?: string;
  whatsapp?: string;
  converted_to_client_id?: string;
  converted_at?: string;
  created_at: string;
  updated_at: string;
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
  client_id: string;
  package_id?: string;
  promo_code_id?: string;
  project_name: string;
  client_name: string;
  project_type: string;
  package_name: string;
  location?: string;
  date: string;
  deadline_date?: string;
  start_time?: string;
  end_time?: string;
  status: string;
  progress: number;
  active_sub_statuses: string[];
  confirmed_sub_statuses: string[];
  custom_sub_statuses: string[];
  booking_status?: 'Baru' | 'Terkonfirmasi' | 'Ditolak';
  rejection_reason?: string;
  total_cost: number;
  amount_paid: number;
  payment_status: 'Lunas' | 'DP Terbayar' | 'Belum Bayar';
  discount_amount: number;
  duration_selection?: string;
  unit_price?: number;
  custom_costs: any[];
  team: string[];
  drive_link?: string;
  client_drive_link?: string;
  final_drive_link?: string;
  image?: string;
  notes?: string;
  accommodation?: string;
  shipping_details?: string;
  is_editing_confirmed_by_client: boolean;
  is_printing_confirmed_by_client: boolean;
  is_delivery_confirmed_by_client: boolean;
  client_sub_status_notes: any;
  sub_status_confirmation_sent_at: any;
  completed_digital_items: string[];
  dp_proof_url?: string;
  invoice_signature?: string;
  chat_history: any[];
  created_at: string;
  updated_at: string;
  
  // Backward compatibility properties
  clientId: string;
  projectName: string;
  totalCost: number;
  amountPaid: number;
  paymentStatus: 'Lunas' | 'DP Terbayar' | 'Belum Bayar';
  deadlineDate?: string;
}

// ============================================
// FINANCIAL INTERFACES - Based on tabel2.sql
// ============================================

export interface FinanceCard {
  id: string;
  card_holder_name: string;
  bank_name: string;
  last_four_digits: string;
  card_type: 'Prabayar' | 'Kredit' | 'Debit' | 'Tunai';
  expiry_date?: string;
  balance: number;
  color_gradient: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  
  // Backward compatibility properties
  cardHolderName: string;
  bankName: string;
  lastFourDigits: string;
  cardType: 'Prabayar' | 'Kredit' | 'Debit' | 'Tunai';
  colorGradient: string;
  isActive: boolean;
}

export interface Pocket {
  id: string;
  name: string;
  description?: string;
  icon: string;
  type: string;
  amount: number;
  goal_amount?: number;
  lock_end_date?: string;
  source_card_id?: string;
  members: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
  
  // Backward compatibility properties
  goalAmount?: number;
  isActive: boolean;
}

export interface Transaction {
  id: string;
  project_id?: string;
  card_id?: string;
  pocket_id?: string;
  date: string;
  description: string;
  amount: number;
  type: 'Pemasukan' | 'Pengeluaran';
  category: string;
  method: string;
  printing_item_id?: string;
  vendor_signature?: string;
  created_at: string;
  updated_at: string;
  
  // Backward compatibility properties
  projectId?: string;
  cardId?: string;
  pocketId?: string;
}

// ============================================
// TEAM INTERFACES - Based on tabel2.sql
// ============================================

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  standard_fee: number;
  no_rek?: string;
  reward_balance: number;
  rating: number;
  performance_notes: any[];
  portal_access_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  
  // Backward compatibility properties
  standardFee: number;
  rewardBalance: number;
  isActive: boolean;
  portalAccessId: string;
  totalProjects?: number;
  activeProjects?: number;
}

export interface ProjectTeamAssignment {
  id: string;
  project_id: string;
  team_member_id: string;
  role: string;
  fee: number;
  reward: number;
  sub_job?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TeamProjectPayment {
  id: string;
  project_id: string;
  team_member_id: string;
  team_member_name: string;
  date: string;
  fee: number;
  reward: number;
  status: 'Paid' | 'Unpaid';
  created_at: string;
  updated_at: string;
}

export interface TeamPaymentRecord {
  id: string;
  team_member_id: string;
  record_number: string;
  date: string;
  total_amount: number;
  project_payment_ids: string[];
  vendor_signature?: string;
  created_at: string;
  updated_at: string;
}

export interface RewardLedgerEntry {
  id: string;
  team_member_id: string;
  project_id?: string;
  date: string;
  description: string;
  amount: number;
  created_at: string;
  updated_at: string;
}

// ============================================
// MOCK LEADS
// ============================================
export const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Rina & Dimas',
    contact_channel: 'Instagram',
    location: 'Jakarta',
    status: 'Sedang Diskusi',
    date: '2026-01-08',
    notes: 'Tertarik paket wedding premium, rencana nikah Mei 2026',
    whatsapp: '081234567899',
    created_at: '2026-01-08T10:00:00Z',
    updated_at: '2026-01-09T15:30:00Z',
  },
  {
    id: '2',
    name: 'PT Digital Solutions',
    contact_channel: 'Website',
    location: 'Bandung',
    status: 'Menunggu Follow Up',
    date: '2026-01-07',
    notes: 'Butuh dokumentasi event launching produk baru',
    whatsapp: '082345678900',
    created_at: '2026-01-07T09:00:00Z',
    updated_at: '2026-01-08T14:20:00Z',
  },
  {
    id: '3',
    name: 'Sarah Boutique',
    contact_channel: 'Instagram',
    location: 'Surabaya',
    status: 'Sedang Diskusi',
    date: '2026-01-06',
    notes: 'Perlu foto produk untuk katalog online',
    whatsapp: '083456789011',
    created_at: '2026-01-06T11:30:00Z',
    updated_at: '2026-01-07T16:45:00Z',
  },
  {
    id: '4',
    name: 'Fajar & Lina',
    contact_channel: 'Referensi',
    location: 'Bali',
    status: 'Menunggu Follow Up',
    date: '2026-01-05',
    notes: 'Referensi dari Budi & Ani, mau prewedding di Bali',
    whatsapp: '084567890122',
    created_at: '2026-01-05T13:15:00Z',
    updated_at: '2026-01-06T10:30:00Z',
  },
  {
    id: '5',
    name: 'Toko Elektronik Jaya',
    contact_channel: 'Telepon',
    location: 'Medan',
    status: 'Ditolak',
    date: '2026-01-03',
    notes: 'Budget tidak sesuai dengan scope pekerjaan',
    whatsapp: '085678901233',
    created_at: '2026-01-03T08:45:00Z',
    updated_at: '2026-01-04T12:00:00Z',
  },
  {
    id: '6',
    name: 'Rudi Hartono',
    contact_channel: 'WhatsApp',
    location: 'Yogyakarta',
    status: 'Dikonversi',
    date: '2026-01-01',
    notes: 'Sudah deal, dikonversi menjadi klien',
    whatsapp: '086789012344',
    converted_to_client_id: '6',
    converted_at: '2026-01-05T16:00:00Z',
    created_at: '2026-01-01T14:20:00Z',
    updated_at: '2026-01-05T16:00:00Z',
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
    client_id: '1',
    package_id: 'pkg-1',
    project_name: 'Wedding Photography - Budi & Ani',
    client_name: 'Budi & Ani',
    project_type: 'Wedding',
    package_name: 'Wedding Premium',
    location: 'Bandung',
    date: '2026-02-15',
    deadline_date: '2026-03-15',
    start_time: '08:00',
    end_time: '22:00',
    status: 'Pemotretan',
    progress: 45,
    active_sub_statuses: ['Persiapan Alat', 'Koordinasi Tim'],
    confirmed_sub_statuses: ['Booking Venue'],
    custom_sub_statuses: [],
    booking_status: 'Terkonfirmasi',
    total_cost: 15000000,
    amount_paid: 7500000,
    payment_status: 'DP Terbayar',
    discount_amount: 0,
    duration_selection: '12 Jam',
    unit_price: 15000000,
    custom_costs: [],
    team: ['Andi Photographer', 'Budi Videographer'],
    drive_link: 'https://drive.google.com/folder1',
    client_drive_link: 'https://drive.google.com/client1',
    notes: 'Wedding outdoor dengan tema rustic',
    is_editing_confirmed_by_client: false,
    is_printing_confirmed_by_client: false,
    is_delivery_confirmed_by_client: false,
    client_sub_status_notes: {},
    sub_status_confirmation_sent_at: {},
    completed_digital_items: [],
    chat_history: [],
    created_at: '2026-01-10T10:00:00Z',
    updated_at: '2026-01-10T15:30:00Z',
    // Backward compatibility
    clientId: '1',
    projectName: 'Wedding Photography - Budi & Ani',
    totalCost: 15000000,
    amountPaid: 7500000,
    paymentStatus: 'DP Terbayar',
    deadlineDate: '2026-03-15',
  },
  {
    id: '2',
    client_id: '2',
    package_id: 'pkg-2',
    project_name: 'Corporate Event - PT Maju Jaya',
    client_name: 'PT Maju Jaya',
    project_type: 'Corporate',
    package_name: 'Corporate Basic',
    location: 'Jakarta',
    date: '2026-01-20',
    deadline_date: '2026-02-05',
    start_time: '09:00',
    end_time: '17:00',
    status: 'Editing',
    progress: 70,
    active_sub_statuses: ['Post Processing'],
    confirmed_sub_statuses: ['Pemotretan Selesai', 'Review Klien'],
    custom_sub_statuses: [],
    booking_status: 'Terkonfirmasi',
    total_cost: 8500000,
    amount_paid: 8500000,
    payment_status: 'Lunas',
    discount_amount: 0,
    duration_selection: '8 Jam',
    unit_price: 8500000,
    custom_costs: [],
    team: ['Andi Photographer', 'Citra Editor'],
    drive_link: 'https://drive.google.com/folder2',
    client_drive_link: 'https://drive.google.com/client2',
    final_drive_link: 'https://drive.google.com/final2',
    notes: 'Event peluncuran produk baru',
    is_editing_confirmed_by_client: true,
    is_printing_confirmed_by_client: false,
    is_delivery_confirmed_by_client: false,
    client_sub_status_notes: {},
    sub_status_confirmation_sent_at: {},
    completed_digital_items: ['Foto High Resolution', 'Video Highlight'],
    chat_history: [],
    created_at: '2026-01-05T09:00:00Z',
    updated_at: '2026-01-10T14:20:00Z',
    // Backward compatibility
    clientId: '2',
    projectName: 'Corporate Event - PT Maju Jaya',
    totalCost: 8500000,
    amountPaid: 8500000,
    paymentStatus: 'Lunas',
    deadlineDate: '2026-02-05',
  },
  {
    id: '3',
    client_id: '3',
    package_id: 'pkg-3',
    project_name: 'Product Shoot - Fashion Collection',
    client_name: 'Fashion Store XYZ',
    project_type: 'Product',
    package_name: 'Product Photography',
    location: 'Studio',
    date: '2026-02-28',
    deadline_date: '2026-03-10',
    start_time: '10:00',
    end_time: '16:00',
    status: 'Persiapan',
    progress: 20,
    active_sub_statuses: ['Persiapan Studio', 'Koordinasi Produk'],
    confirmed_sub_statuses: [],
    custom_sub_statuses: [],
    booking_status: 'Terkonfirmasi',
    total_cost: 5000000,
    amount_paid: 0,
    payment_status: 'Belum Bayar',
    discount_amount: 0,
    duration_selection: '6 Jam',
    unit_price: 5000000,
    custom_costs: [],
    team: ['Andi Photographer'],
    notes: 'Foto produk fashion untuk katalog online',
    is_editing_confirmed_by_client: false,
    is_printing_confirmed_by_client: false,
    is_delivery_confirmed_by_client: false,
    client_sub_status_notes: {},
    sub_status_confirmation_sent_at: {},
    completed_digital_items: [],
    chat_history: [],
    created_at: '2026-01-08T11:30:00Z',
    updated_at: '2026-01-08T11:30:00Z',
    // Backward compatibility
    clientId: '3',
    projectName: 'Product Shoot - Fashion Collection',
    totalCost: 5000000,
    amountPaid: 0,
    paymentStatus: 'Belum Bayar',
    deadlineDate: '2026-03-10',
  },
  {
    id: '4',
    client_id: '1',
    package_id: 'pkg-4',
    project_name: 'Prewedding - Budi & Ani',
    client_name: 'Budi & Ani',
    project_type: 'Prewedding',
    package_name: 'Prewedding Package',
    location: 'Bali',
    date: '2026-01-25',
    deadline_date: '2026-02-10',
    start_time: '06:00',
    end_time: '18:00',
    status: 'Revisi',
    progress: 85,
    active_sub_statuses: ['Revisi Editing'],
    confirmed_sub_statuses: ['Pemotretan Selesai', 'Editing Selesai', 'Review Klien'],
    custom_sub_statuses: [],
    booking_status: 'Terkonfirmasi',
    total_cost: 12000000,
    amount_paid: 12000000,
    payment_status: 'Lunas',
    discount_amount: 0,
    duration_selection: '12 Jam',
    unit_price: 12000000,
    custom_costs: [],
    team: ['Andi Photographer', 'Budi Videographer', 'Citra Editor'],
    drive_link: 'https://drive.google.com/folder4',
    client_drive_link: 'https://drive.google.com/client4',
    final_drive_link: 'https://drive.google.com/final4',
    notes: 'Prewedding di pantai Bali dengan tema sunset',
    accommodation: 'Hotel disediakan untuk tim',
    is_editing_confirmed_by_client: true,
    is_printing_confirmed_by_client: true,
    is_delivery_confirmed_by_client: false,
    client_sub_status_notes: { 'editing': 'Perlu penyesuaian warna' },
    sub_status_confirmation_sent_at: {},
    completed_digital_items: ['Foto High Resolution', 'Video Cinematic'],
    chat_history: [],
    created_at: '2025-12-20T13:15:00Z',
    updated_at: '2026-01-10T16:45:00Z',
    // Backward compatibility
    clientId: '1',
    projectName: 'Prewedding - Budi & Ani',
    totalCost: 12000000,
    amountPaid: 12000000,
    paymentStatus: 'Lunas',
    deadlineDate: '2026-02-10',
  },
];

// ============================================
// MOCK TEAM MEMBERS - Updated to match tabel2.sql
// ============================================
export const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Andi Photographer',
    email: 'andi@venapictures.com',
    phone: '081234567896',
    role: 'Fotografer',
    standard_fee: 1500000,
    no_rek: '1234567890',
    reward_balance: 5500000,
    rating: 4.8,
    performance_notes: [
      { date: '2026-01-01', note: 'Excellent work on wedding project', rating: 5 },
      { date: '2025-12-15', note: 'Great creativity in product shoot', rating: 4.8 }
    ],
    portal_access_id: 'team-001',
    is_active: true,
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2026-01-10T10:00:00Z',
    // Backward compatibility
    standardFee: 1500000,
    rewardBalance: 5500000,
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
    standard_fee: 2000000,
    no_rek: '2345678901',
    reward_balance: 3200000,
    rating: 4.9,
    performance_notes: [
      { date: '2026-01-05', note: 'Outstanding video quality', rating: 5 },
      { date: '2025-12-20', note: 'Professional handling of equipment', rating: 4.9 }
    ],
    portal_access_id: 'team-002',
    is_active: true,
    created_at: '2025-02-01T00:00:00Z',
    updated_at: '2026-01-10T10:00:00Z',
    // Backward compatibility
    standardFee: 2000000,
    rewardBalance: 3200000,
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
    standard_fee: 1000000,
    no_rek: '3456789012',
    reward_balance: 2800000,
    rating: 4.7,
    performance_notes: [
      { date: '2026-01-03', note: 'Fast turnaround time', rating: 4.8 },
      { date: '2025-12-25', note: 'Creative editing style', rating: 4.6 }
    ],
    portal_access_id: 'team-003',
    is_active: true,
    created_at: '2025-03-01T00:00:00Z',
    updated_at: '2026-01-10T10:00:00Z',
    // Backward compatibility
    standardFee: 1000000,
    rewardBalance: 2800000,
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
    standard_fee: 1800000,
    no_rek: '4567890123',
    reward_balance: 1500000,
    rating: 4.6,
    performance_notes: [
      { date: '2025-12-30', note: 'Versatile skills in both photo and video', rating: 4.7 },
      { date: '2025-12-10', note: 'Good teamwork', rating: 4.5 }
    ],
    portal_access_id: 'team-004',
    is_active: true,
    created_at: '2025-04-01T00:00:00Z',
    updated_at: '2026-01-10T10:00:00Z',
    // Backward compatibility
    standardFee: 1800000,
    rewardBalance: 1500000,
    isActive: true,
    portalAccessId: 'team-004',
    totalProjects: 28,
    activeProjects: 1,
  },
];

// ============================================
// MOCK FINANCE CARDS - Updated to match tabel2.sql
// ============================================
export const mockFinanceCards: FinanceCard[] = [
  {
    id: '1',
    card_holder_name: 'Vena Pictures',
    bank_name: 'BCA',
    last_four_digits: '1234',
    card_type: 'Debit',
    expiry_date: '12/2028',
    balance: 125500000,
    color_gradient: 'from-blue-500 to-sky-400',
    is_active: true,
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2026-01-10T10:00:00Z',
    // Backward compatibility
    cardHolderName: 'Vena Pictures',
    bankName: 'BCA',
    lastFourDigits: '1234',
    cardType: 'Debit',
    colorGradient: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
    isActive: true,
  },
  {
    id: '2',
    card_holder_name: 'Vena Pictures',
    bank_name: 'Mandiri',
    last_four_digits: '5678',
    card_type: 'Kredit',
    expiry_date: '06/2027',
    balance: 15000000,
    color_gradient: 'from-yellow-500 to-orange-400',
    is_active: true,
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2026-01-10T10:00:00Z',
    // Backward compatibility
    cardHolderName: 'Vena Pictures',
    bankName: 'Mandiri',
    lastFourDigits: '5678',
    cardType: 'Kredit',
    colorGradient: 'linear-gradient(135deg, #d32f2f 0%, #f44336 100%)',
    isActive: true,
  },
  {
    id: '3',
    card_holder_name: 'Vena Pictures',
    bank_name: 'Cash',
    last_four_digits: 'CASH',
    card_type: 'Tunai',
    balance: 5000000,
    color_gradient: 'from-green-500 to-emerald-400',
    is_active: true,
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2026-01-10T10:00:00Z',
    // Backward compatibility
    cardHolderName: 'Vena Pictures',
    bankName: 'Cash',
    lastFourDigits: 'CASH',
    cardType: 'Tunai',
    colorGradient: 'linear-gradient(135deg, #388e3c 0%, #66bb6a 100%)',
    isActive: true,
  },
];

// ============================================
// MOCK POCKETS - Updated to match tabel2.sql
// ============================================
export const mockPockets: Pocket[] = [
  {
    id: '1',
    name: 'Dana Operasional',
    description: 'Dana untuk operasional harian',
    icon: 'piggy-bank',
    type: 'Nabung & Bayar',
    amount: 45000000,
    goal_amount: 50000000,
    source_card_id: '1',
    members: ['admin'],
    is_active: true,
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2026-01-10T10:00:00Z',
    // Backward compatibility
    goalAmount: 50000000,
    isActive: true,
  },
  {
    id: '2',
    name: 'Dana Darurat',
    description: 'Dana cadangan untuk keperluan darurat',
    icon: 'lock',
    type: 'Terkunci',
    amount: 30000000,
    goal_amount: 50000000,
    lock_end_date: '2026-12-31',
    source_card_id: '1',
    members: ['admin'],
    is_active: true,
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2026-01-10T10:00:00Z',
    // Backward compatibility
    goalAmount: 50000000,
    isActive: true,
  },
  {
    id: '3',
    name: 'Hadiah Freelancer',
    description: 'Pool untuk bonus dan hadiah freelancer',
    icon: 'star',
    type: 'Tabungan Hadiah Freelancer',
    amount: 12500000,
    source_card_id: '1',
    members: ['1', '2', '3', '4'],
    is_active: true,
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2026-01-10T10:00:00Z',
    // Backward compatibility
    isActive: true,
  },
  {
    id: '4',
    name: 'Anggaran Marketing',
    description: 'Budget untuk kegiatan marketing',
    icon: 'clipboard-list',
    type: 'Anggaran Pengeluaran',
    amount: 8000000,
    goal_amount: 15000000,
    source_card_id: '2',
    members: ['admin'],
    is_active: true,
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2026-01-10T10:00:00Z',
    // Backward compatibility
    goalAmount: 15000000,
    isActive: true,
  },
];

// ============================================
// MOCK TRANSACTIONS - Updated to match tabel2.sql
// ============================================
export const mockTransactions: Transaction[] = [
  {
    id: '1',
    project_id: '1',
    card_id: '1',
    date: '2026-01-08',
    description: 'Pembayaran DP Wedding - Budi & Ani',
    amount: 7500000,
    type: 'Pemasukan',
    category: 'Pemasukan Proyek',
    method: 'Transfer Bank',
    created_at: '2026-01-08T10:00:00Z',
    updated_at: '2026-01-08T10:00:00Z',
    // Backward compatibility
    projectId: '1',
    cardId: '1',
  },
  {
    id: '2',
    project_id: '1',
    card_id: '1',
    date: '2026-01-07',
    description: 'Pembayaran Fee - Andi Photographer',
    amount: 1500000,
    type: 'Pengeluaran',
    category: 'Gaji Freelancer',
    method: 'Transfer Bank',
    vendor_signature: 'Andi Photographer',
    created_at: '2026-01-07T14:00:00Z',
    updated_at: '2026-01-07T14:00:00Z',
    // Backward compatibility
    projectId: '1',
    cardId: '1',
  },
  {
    id: '3',
    card_id: '2',
    date: '2026-01-06',
    description: 'Pembelian Lensa Kamera',
    amount: 8500000,
    type: 'Pengeluaran',
    category: 'Peralatan',
    method: 'Kartu',
    created_at: '2026-01-06T11:30:00Z',
    updated_at: '2026-01-06T11:30:00Z',
    // Backward compatibility
    cardId: '2',
  },
  {
    id: '4',
    project_id: '2',
    card_id: '1',
    date: '2026-01-05',
    description: 'Pelunasan Corporate Event - PT Maju',
    amount: 8500000,
    type: 'Pemasukan',
    category: 'Pemasukan Proyek',
    method: 'Transfer Bank',
    created_at: '2026-01-05T16:00:00Z',
    updated_at: '2026-01-05T16:00:00Z',
    // Backward compatibility
    projectId: '2',
    cardId: '1',
  },
  {
    id: '5',
    card_id: '3',
    date: '2026-01-04',
    description: 'Biaya Transport Shooting',
    amount: 500000,
    type: 'Pengeluaran',
    category: 'Operasional',
    method: 'Tunai',
    created_at: '2026-01-04T09:00:00Z',
    updated_at: '2026-01-04T09:00:00Z',
    // Backward compatibility
    cardId: '3',
  },
];

// ============================================
// MOCK PROJECT TEAM ASSIGNMENTS
// ============================================
export const mockProjectTeamAssignments: ProjectTeamAssignment[] = [
  {
    id: '1',
    project_id: '1',
    team_member_id: '1',
    role: 'Fotografer Utama',
    fee: 1500000,
    reward: 200000,
    sub_job: 'Wedding ceremony dan reception',
    is_active: true,
    created_at: '2026-01-10T10:00:00Z',
    updated_at: '2026-01-10T10:00:00Z',
  },
  {
    id: '2',
    project_id: '1',
    team_member_id: '2',
    role: 'Videografer',
    fee: 2000000,
    reward: 300000,
    sub_job: 'Video cinematic dan highlight',
    is_active: true,
    created_at: '2026-01-10T10:00:00Z',
    updated_at: '2026-01-10T10:00:00Z',
  },
  {
    id: '3',
    project_id: '2',
    team_member_id: '1',
    role: 'Fotografer',
    fee: 1500000,
    reward: 150000,
    sub_job: 'Corporate event documentation',
    is_active: true,
    created_at: '2026-01-05T09:00:00Z',
    updated_at: '2026-01-05T09:00:00Z',
  },
  {
    id: '4',
    project_id: '2',
    team_member_id: '3',
    role: 'Editor',
    fee: 1000000,
    reward: 100000,
    sub_job: 'Photo editing dan color grading',
    is_active: true,
    created_at: '2026-01-05T09:00:00Z',
    updated_at: '2026-01-05T09:00:00Z',
  },
];

// ============================================
// MOCK TEAM PROJECT PAYMENTS
// ============================================
export const mockTeamProjectPayments: TeamProjectPayment[] = [
  {
    id: '1',
    project_id: '2',
    team_member_id: '1',
    team_member_name: 'Andi Photographer',
    date: '2026-01-08',
    fee: 1500000,
    reward: 150000,
    status: 'Paid',
    created_at: '2026-01-08T14:00:00Z',
    updated_at: '2026-01-08T14:00:00Z',
  },
  {
    id: '2',
    project_id: '2',
    team_member_id: '3',
    team_member_name: 'Citra Editor',
    date: '2026-01-08',
    fee: 1000000,
    reward: 100000,
    status: 'Paid',
    created_at: '2026-01-08T14:00:00Z',
    updated_at: '2026-01-08T14:00:00Z',
  },
  {
    id: '3',
    project_id: '1',
    team_member_id: '1',
    team_member_name: 'Andi Photographer',
    date: '2026-01-10',
    fee: 1500000,
    reward: 200000,
    status: 'Unpaid',
    created_at: '2026-01-10T10:00:00Z',
    updated_at: '2026-01-10T10:00:00Z',
  },
  {
    id: '4',
    project_id: '1',
    team_member_id: '2',
    team_member_name: 'Budi Videographer',
    date: '2026-01-10',
    fee: 2000000,
    reward: 300000,
    status: 'Unpaid',
    created_at: '2026-01-10T10:00:00Z',
    updated_at: '2026-01-10T10:00:00Z',
  },
];

// ============================================
// MOCK TEAM PAYMENT RECORDS
// ============================================
export const mockTeamPaymentRecords: TeamPaymentRecord[] = [
  {
    id: '1',
    team_member_id: '1',
    record_number: 'PAY-2026-001',
    date: '2026-01-08',
    total_amount: 1650000,
    project_payment_ids: ['1'],
    vendor_signature: 'Andi Photographer',
    created_at: '2026-01-08T14:00:00Z',
    updated_at: '2026-01-08T14:00:00Z',
  },
  {
    id: '2',
    team_member_id: '3',
    record_number: 'PAY-2026-002',
    date: '2026-01-08',
    total_amount: 1100000,
    project_payment_ids: ['2'],
    vendor_signature: 'Citra Editor',
    created_at: '2026-01-08T14:00:00Z',
    updated_at: '2026-01-08T14:00:00Z',
  },
];

// ============================================
// MOCK REWARD LEDGER ENTRIES
// ============================================
export const mockRewardLedgerEntries: RewardLedgerEntry[] = [
  {
    id: '1',
    team_member_id: '1',
    project_id: '2',
    date: '2026-01-08',
    description: 'Reward untuk Corporate Event - PT Maju Jaya',
    amount: 150000,
    created_at: '2026-01-08T14:00:00Z',
    updated_at: '2026-01-08T14:00:00Z',
  },
  {
    id: '2',
    team_member_id: '3',
    project_id: '2',
    date: '2026-01-08',
    description: 'Reward untuk editing Corporate Event',
    amount: 100000,
    created_at: '2026-01-08T14:00:00Z',
    updated_at: '2026-01-08T14:00:00Z',
  },
  {
    id: '3',
    team_member_id: '1',
    date: '2026-01-05',
    description: 'Bonus kinerja bulan Desember 2025',
    amount: 500000,
    created_at: '2026-01-05T10:00:00Z',
    updated_at: '2026-01-05T10:00:00Z',
  },
  {
    id: '4',
    team_member_id: '2',
    date: '2026-01-05',
    description: 'Bonus kinerja bulan Desember 2025',
    amount: 750000,
    created_at: '2026-01-05T10:00:00Z',
    updated_at: '2026-01-05T10:00:00Z',
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

// ============================================
// PACKAGES & ADD-ONS INTERFACES
// ============================================
export interface Package {
  id: string;
  name: string;
  category: string;
  region?: string;
  price: number;
  duration_options: string[];
  physical_items: string[];
  digital_items: string[];
  processing_time?: string;
  photographers?: string;
  videographers?: string;
  default_printing_cost: number;
  default_transport_cost: number;
  cover_image?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  region?: string;
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
