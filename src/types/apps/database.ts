// Database types matching the SQL schema

export interface User {
  id: string;
  email: string;
  password: string;
  full_name: string;
  role: 'Admin' | 'Member' | 'Kasir';
  permissions: string[];
  restricted_cards: string[];
  is_active: boolean;
  last_login?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface Profile {
  id: string;
  admin_user_id: string;
  full_name: string;
  email: string;
  phone: string;
  company_name: string;
  website?: string;
  instagram?: string;
  address?: string;
  bank_account?: string;
  authorized_signer?: string;
  id_number?: string;
  bio?: string;
  income_categories: string[];
  expense_categories: string[];
  project_types: string[];
  event_types: string[];
  asset_categories: string[];
  sop_categories: string[];
  package_categories: string[];
  project_status_config: any[];
  notification_settings: Record<string, any>;
  security_settings: Record<string, any>;
  briefing_template?: string;
  terms_and_conditions?: string;
  contract_template?: string;
  package_share_template?: string;
  booking_form_template?: string;
  chat_templates: any[];
  logo_base64?: string;
  brand_color: string;
  public_page_config: Record<string, any>;
  created_at: Date;
  updated_at: Date;
}

// Form data types for components
export interface UserFormData {
  full_name: string;
  email: string;
  phone: string;
  role: 'Admin' | 'Member' | 'Kasir';
  is_active: boolean;
}

export interface ProfileFormData {
  full_name: string;
  email: string;
  phone: string;
  company_name: string;
  website: string;
  instagram: string;
  address: string;
  bank_account: string;
  authorized_signer: string;
  id_number: string;
  bio: string;
  brand_color: string;
}

export interface SecurityFormData {
  current_password: string;
  new_password: string;
  confirm_password: string;
}