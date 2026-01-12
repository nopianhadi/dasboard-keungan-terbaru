# Panduan Manajemen Paket - Vena Pictures CRM

## Overview
Fitur Manajemen Paket memungkinkan Anda untuk mengelola paket layanan dan add-ons yang ditawarkan oleh studio fotografi. Sistem ini terintegrasi dengan database PostgreSQL dan menyediakan interface yang user-friendly untuk CRUD operations.

## Struktur Database

### Tabel Packages
```sql
CREATE TABLE packages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    region VARCHAR(100),
    price DECIMAL(15,2) NOT NULL DEFAULT 0,
    duration_options JSONB DEFAULT '[]'::jsonb,
    physical_items JSONB DEFAULT '[]'::jsonb,
    digital_items JSONB DEFAULT '[]'::jsonb,
    processing_time VARCHAR(100),
    photographers VARCHAR(100),
    videographers VARCHAR(100),
    default_printing_cost DECIMAL(15,2) DEFAULT 0,
    default_transport_cost DECIMAL(15,2) DEFAULT 0,
    cover_image TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### Tabel Add-ons
```sql
CREATE TABLE add_ons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    price DECIMAL(15,2) NOT NULL DEFAULT 0,
    region VARCHAR(100),
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

## Fitur Utama

### 1. Manajemen Paket Layanan
- **Tambah Paket Baru**: Membuat paket layanan dengan detail lengkap
- **Edit Paket**: Mengubah informasi paket yang sudah ada
- **Lihat Detail**: Melihat semua informasi paket secara detail
- **Hapus Paket**: Menghapus paket yang tidak diperlukan
- **Status Aktif/Nonaktif**: Mengatur ketersediaan paket

#### Informasi Paket:
- Nama paket
- Kategori (Photo, Video, Photo + Video)
- Region/lokasi
- Harga dasar
- Opsi durasi (array)
- Item fisik yang disertakan (array)
- Item digital yang disertakan (array)
- Waktu pengerjaan
- Jumlah fotografer dan videografer
- Biaya cetak dan transport default
- Cover image

### 2. Manajemen Add-ons
- **Tambah Add-on**: Membuat layanan tambahan
- **Edit Add-on**: Mengubah informasi add-on
- **Lihat Detail**: Melihat informasi add-on
- **Hapus Add-on**: Menghapus add-on
- **Status Aktif/Nonaktif**: Mengatur ketersediaan add-on

#### Informasi Add-on:
- Nama add-on
- Harga
- Region/lokasi
- Deskripsi layanan
- Status aktif

## Komponen Frontend

### 1. Packages.tsx (Main Component)
- Halaman utama manajemen paket
- Tab interface untuk paket dan add-ons
- Dialog untuk add/edit/view
- Context menu untuk actions

### 2. PackageCard.tsx
- Komponen card untuk menampilkan paket
- Menampilkan informasi ringkas paket
- Action menu untuk edit/view/delete

### 3. AddOnCard.tsx
- Komponen card untuk menampilkan add-on
- Informasi ringkas add-on
- Action menu

### 4. PackageForm.tsx
- Form komprehensif untuk paket
- Dynamic arrays untuk duration, items
- Validation dan input handling

## Integrasi dengan Sistem

### 1. Projects Integration
Paket dan add-ons terintegrasi dengan sistem project:
- Paket dipilih saat membuat project baru
- Add-ons dapat ditambahkan ke project
- Harga otomatis terhitung berdasarkan paket + add-ons

### 2. Pricing Calculation
- Harga dasar dari paket
- Biaya tambahan dari add-ons
- Biaya cetak dan transport default
- Diskon dan promo code

### 3. Team Assignment
- Informasi fotografer dan videografer dari paket
- Digunakan untuk assignment tim ke project
- Kalkulasi fee berdasarkan standard rate

## Mock Data
File `src/data/mockPackages.ts` berisi:
- 5 sample packages dengan berbagai kategori
- 8 sample add-ons dengan variasi layanan
- Helper functions untuk filtering dan kategorisasi

## API Integration (Future)
Struktur untuk integrasi API:
```typescript
// Package Service
export const packageService = {
  getPackages: () => Promise<Package[]>,
  getPackageById: (id: string) => Promise<Package>,
  createPackage: (data: PackageFormData) => Promise<Package>,
  updatePackage: (id: string, data: PackageFormData) => Promise<Package>,
  deletePackage: (id: string) => Promise<void>,
  
  getAddOns: () => Promise<AddOn[]>,
  getAddOnById: (id: string) => Promise<AddOn>,
  createAddOn: (data: AddOnFormData) => Promise<AddOn>,
  updateAddOn: (id: string, data: AddOnFormData) => Promise<AddOn>,
  deleteAddOn: (id: string) => Promise<void>,
};
```

## Best Practices

### 1. Data Validation
- Validasi harga tidak boleh negatif
- Nama paket harus unik per kategori
- Array items tidak boleh kosong untuk paket aktif

### 2. User Experience
- Loading states saat CRUD operations
- Confirmation dialog untuk delete
- Toast notifications untuk feedback
- Responsive design untuk mobile

### 3. Performance
- Lazy loading untuk images
- Pagination untuk large datasets
- Caching untuk frequently accessed data
- Optimistic updates untuk better UX

## Penggunaan

### Menambah Paket Baru
1. Klik tombol "Tambah Paket"
2. Isi informasi dasar (nama, kategori, harga)
3. Tambahkan opsi durasi
4. Daftarkan item fisik dan digital
5. Set informasi tim dan biaya
6. Simpan paket

### Mengelola Add-ons
1. Switch ke tab "Add-ons"
2. Klik "Tambah Add-on"
3. Isi nama, harga, dan deskripsi
4. Set region dan status
5. Simpan add-on

### Tips Penggunaan
- Gunakan kategori yang konsisten
- Berikan deskripsi yang jelas untuk add-ons
- Update harga secara berkala
- Nonaktifkan paket yang sudah tidak ditawarkan
- Gunakan cover image yang menarik untuk paket

## Troubleshooting

### Common Issues
1. **Paket tidak muncul di project**: Pastikan status aktif
2. **Harga tidak terhitung**: Check format number input
3. **Image tidak load**: Verify image path dan permissions
4. **Form tidak submit**: Check required fields validation

### Database Issues
1. **UUID generation error**: Ensure uuid-ossp extension installed
2. **JSONB format error**: Validate JSON structure
3. **Trigger not working**: Check function exists and permissions

## Future Enhancements
- Bulk import/export paket
- Template paket untuk kategori
- Pricing calculator dengan dynamic rules
- Integration dengan payment gateway
- Analytics untuk paket populer
- Multi-language support
- Advanced filtering dan search