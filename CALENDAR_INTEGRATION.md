# Integrasi Calendar dengan Data Bisnis

## 📅 Overview
Halaman Calendar di `http://localhost:5173/apps/calendar` telah diintegrasikan dengan data dari sistem:
- **Klien** (Clients)
- **Proyek** (Projects)
- **Keuangan** (Transactions)
- **Leads**

## 🎯 Fitur yang Ditambahkan

### 1. Event dari Proyek
- **📸 Tanggal Pemotretan**: Menampilkan jadwal pemotretan untuk setiap proyek
  - Warna: Biru (default) untuk proyek aktif, Hijau untuk proyek selesai
  - Info: Nama proyek, klien, dan lokasi

- **⏰ Deadline**: Menampilkan deadline pengiriman proyek
  - Warna: Merah untuk proyek aktif, Hijau untuk proyek selesai
  - Info: Progress proyek dalam persentase

### 2. Event dari Klien
- **👤 Kontak Terakhir**: Menampilkan riwayat kontak dengan klien (30 hari terakhir)
  - Warna: Azure (biru muda)
  - Info: Status klien

### 3. Event dari Leads
- **📞 Follow Up Reminder**: Otomatis membuat reminder 3 hari setelah kontak terakhir
  - Warna: Merah untuk priority tinggi, Kuning untuk priority sedang/rendah
  - Info: Tipe proyek dan priority level
  - Hanya untuk leads dengan status "Diskusi" atau "Tindak Lanjut"

### 4. Event dari Transaksi
- **💰 Transaksi Besar**: Menampilkan transaksi di atas Rp 5.000.000
  - Warna: Hijau untuk pemasukan, Kuning untuk pengeluaran
  - Info: Jumlah transaksi dalam format Rupiah

## 🎨 Kode Warna Event

| Warna | Jenis Event |
|-------|-------------|
| 🔵 Biru (Default) | Proyek aktif, pemotretan |
| 🟢 Hijau | Proyek selesai, pemasukan |
| 🔴 Merah | Deadline urgent, follow up priority tinggi |
| 🟡 Kuning | Pengeluaran, follow up priority rendah |
| 🔷 Azure | Kontak klien |

## 📁 File yang Dimodifikasi

1. **src/views/apps/calendar/Calendar.tsx** (Baru)
   - Wrapper component untuk BigCalendar

2. **src/views/apps/calendar/EventData.ts**
   - Import data dari mockData
   - Generate events otomatis dari data klien, proyek, transaksi, dan leads
   - Tambah interface EventType dengan field baru (type, description)

3. **src/views/apps/calendar/BigCalendar.tsx**
   - Tambah custom EventComponent untuk menampilkan description
   - Update type EvType dengan field baru

4. **src/views/apps/calendar/Calendar.css**
   - Tambah hover effect pada event
   - Styling untuk description text

5. **src/routes/Router.tsx**
   - Update import Calendar dari BigCalendar ke Calendar

## 🚀 Cara Menggunakan

1. Buka browser dan akses `http://localhost:5173/apps/calendar`
2. Calendar akan otomatis menampilkan semua event dari data yang ada
3. Klik pada event untuk melihat detail atau mengedit
4. Hover pada event untuk melihat tooltip dengan informasi lengkap

## 💡 Tips

- Event dengan emoji memudahkan identifikasi jenis event:
  - 📸 = Pemotretan
  - ⏰ = Deadline
  - 👤 = Kontak Klien
  - 📞 = Follow Up
  - 💰 = Transaksi

- Warna event membantu prioritas visual:
  - Merah = Perlu perhatian segera
  - Hijau = Selesai/Positif
  - Kuning = Perlu tindakan
  - Biru = Informasi

## 🔄 Data Real-time

Calendar menggunakan data dari `src/data/mockData.ts`. Untuk menggunakan data real dari database:
1. Ganti import dari mockData dengan API call
2. Update generateEvents() function untuk fetch data dari backend
3. Tambahkan loading state dan error handling

## 📝 Catatan

- Event otomatis di-generate setiap kali halaman di-load
- Follow up reminder dibuat 3 hari setelah last contact
- Hanya transaksi ≥ Rp 5.000.000 yang ditampilkan untuk menghindari clutter
- Kontak klien hanya menampilkan 30 hari terakhir
