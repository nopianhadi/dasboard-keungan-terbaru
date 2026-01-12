// ============================================
// PACKAGES & ADD-ONS TYPES
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

export interface PackageFormData {
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
}

export interface AddOnFormData {
  name: string;
  price: number;
  region?: string;
  description?: string;
  is_active: boolean;
}