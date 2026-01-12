// Mock API service for user and profile data
import { User, Profile, UserFormData, ProfileFormData } from '../types/apps/database';

// Mock data
const mockUser: User = {
  id: '550e8400-e29b-41d4-a716-446655440000',
  email: 'info@maximastudio.com',
  password: 'hashed_password',
  full_name: 'Mathew Anderson',
  role: 'Admin',
  permissions: ['read', 'write', 'delete'],
  restricted_cards: [],
  is_active: true,
  last_login: new Date('2024-01-10T10:00:00Z'),
  created_at: new Date('2020-01-15T00:00:00Z'),
  updated_at: new Date('2024-01-10T10:00:00Z'),
};

const mockProfile: Profile = {
  id: '550e8400-e29b-41d4-a716-446655440001',
  admin_user_id: '550e8400-e29b-41d4-a716-446655440000',
  full_name: 'Mathew Anderson',
  email: 'info@maximastudio.com',
  phone: '+62 812 3456 7890',
  company_name: 'Maxima Studio',
  website: 'www.maximastudio.com',
  instagram: '@maximastudio',
  address: 'Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 10110',
  bank_account: 'BCA 1234567890 a.n. Maxima Studio',
  authorized_signer: 'Mathew Anderson',
  id_number: '3171234567890123',
  bio: 'Professional photography and videography studio specializing in weddings and corporate events. Kami telah berpengalaman lebih dari 5 tahun dalam industri fotografi dan videografi, melayani berbagai jenis acara mulai dari pernikahan, prewedding, hingga acara korporat.',
  income_categories: ['Pembayaran Klien', 'Sewa Peralatan', 'Workshop', 'Lainnya'],
  expense_categories: ['Operasional', 'Gaji Tim', 'Cetak', 'Transport', 'Peralatan', 'Marketing', 'Lainnya'],
  project_types: ['Wedding', 'Prewedding', 'Engagement', 'Birthday', 'Corporate', 'Product Photography'],
  event_types: ['Indoor', 'Outdoor', 'Studio', 'Destination'],
  asset_categories: ['Kamera', 'Lensa', 'Lighting', 'Audio', 'Drone', 'Aksesoris', 'Lainnya'],
  sop_categories: ['Shooting', 'Editing', 'Client Management', 'Finance', 'Marketing'],
  package_categories: ['Photo', 'Video', 'Photo + Video', 'Cinematic'],
  project_status_config: [
    { status: 'inquiry', label: 'Inquiry', color: '#f39c12' },
    { status: 'booked', label: 'Booked', color: '#3498db' },
    { status: 'in_progress', label: 'In Progress', color: '#e74c3c' },
    { status: 'completed', label: 'Completed', color: '#27ae60' },
  ],
  notification_settings: {
    email_notifications: true,
    sms_notifications: false,
    push_notifications: true,
    marketing_emails: false,
  },
  security_settings: {
    two_factor_enabled: false,
    login_alerts: true,
    session_timeout: 30,
  },
  briefing_template: 'Template briefing untuk klien...',
  terms_and_conditions: 'Syarat dan ketentuan layanan...',
  contract_template: 'Template kontrak kerja...',
  package_share_template: 'Template sharing paket...',
  booking_form_template: 'Template form booking...',
  chat_templates: [
    { name: 'Greeting', message: 'Halo! Terima kasih telah menghubungi Maxima Studio.' },
    { name: 'Follow Up', message: 'Bagaimana kabar persiapan acara Anda?' },
  ],
  logo_base64: '',
  brand_color: '#3b82f6',
  public_page_config: {
    show_portfolio: true,
    show_testimonials: true,
    show_pricing: false,
  },
  created_at: new Date('2020-01-15T00:00:00Z'),
  updated_at: new Date('2024-01-10T10:00:00Z'),
};

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const userService = {
  // Get current user
  async getCurrentUser(): Promise<User> {
    await delay(500);
    return mockUser;
  },

  // Get user profile
  async getUserProfile(_userId: string): Promise<Profile> {
    await delay(500);
    return mockProfile;
  },

  // Update user basic info
  async updateUser(_userId: string, userData: Partial<UserFormData>): Promise<User> {
    await delay(1000);
    // Simulate update
    const updatedUser = { ...mockUser, ...userData, updated_at: new Date() };
    console.log('Updated user:', updatedUser);
    return updatedUser;
  },

  // Update user profile
  async updateProfile(_userId: string, profileData: Partial<ProfileFormData>): Promise<Profile> {
    await delay(1000);
    // Simulate update
    const updatedProfile = { ...mockProfile, ...profileData, updated_at: new Date() };
    console.log('Updated profile:', updatedProfile);
    return updatedProfile;
  },

  // Update business settings
  async updateBusinessSettings(_userId: string, businessData: any): Promise<Profile> {
    await delay(1000);
    // Simulate update
    const updatedProfile = { 
      ...mockProfile, 
      ...businessData, 
      updated_at: new Date() 
    };
    console.log('Updated business settings:', updatedProfile);
    return updatedProfile;
  },

  // Change password
  async changePassword(userId: string, _passwordData: { current_password: string; new_password: string }): Promise<boolean> {
    await delay(1000);
    // Simulate password change
    console.log('Password changed for user:', userId);
    return true;
  },

  // Upload profile picture
  async uploadProfilePicture(_userId: string, file: File): Promise<string> {
    await delay(2000);
    // Simulate file upload
    const imageUrl = URL.createObjectURL(file);
    console.log('Profile picture uploaded:', imageUrl);
    return imageUrl;
  },

  // Get user statistics
  async getUserStats(_userId: string): Promise<{
    projects_count: number;
    clients_count: number;
    team_count: number;
    revenue_this_month: number;
  }> {
    await delay(500);
    return {
      projects_count: 45,
      clients_count: 128,
      team_count: 5,
      revenue_this_month: 75000000, // in IDR
    };
  },
};

export default userService;