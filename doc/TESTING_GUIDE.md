# Testing Guide - Mock Data Implementation

## 🚀 Quick Start

### 1. Start Development Server
Server sudah berjalan di: **http://localhost:5174/**

### 2. Access Pages

#### Dashboard
- URL: `http://localhost:5174/dashboards/modern`
- Fitur: TopCards dengan data dinamis dari mock data
  - Total Saldo: Rp 145.500.000
  - Proyek Aktif: 3
  - Klien Aktif: 3
  - Total Freelancer: 4

#### Halaman Proyek
- URL: `http://localhost:5174/apps/projects`
- Menu: Sidebar → **Proyek** (badge: 24)
- Fitur yang bisa dilihat:
  - ✅ 4 project cards
  - ✅ Progress bar untuk setiap proyek
  - ✅ Status chips (Pemotretan, Editing, Persiapan, Revisi)
  - ✅ Payment status (Lunas, DP Terbayar, Belum Bayar)
  - ✅ Collapsible detail section
  - ✅ Dialog untuk tambah proyek baru

#### Halaman Klien
- URL: `http://localhost:5174/apps/clients`
- Menu: Sidebar → **Klien** (badge: 156)
- Fitur yang bisa dilihat:
  - ✅ 5 client cards
  - ✅ Tabs filter: Semua (5), Aktif (3), Prospek (1), Tidak Aktif (1)
  - ✅ Client type badge (Langsung/Vendor)
  - ✅ Rating stars
  - ✅ Total projects dan spending
  - ✅ Dialog untuk tambah klien baru

#### Halaman Keuangan
- URL: `http://localhost:5174/apps/finance`
- Menu: Sidebar → **Keuangan**
- Fitur yang bisa dilihat:
  - ✅ Total Balance Card (gradient purple)
  - ✅ Tab 1: Kartu & Rekening (3 cards dengan gradient)
    - BCA Debit: Rp 125.500.000
    - Mandiri Kredit: Rp 15.000.000
    - Cash: Rp 5.000.000
  - ✅ Tab 2: Kantong Keuangan (4 pockets dengan progress)
    - Dana Operasional
    - Dana Darurat
    - Hadiah Freelancer
    - Anggaran Marketing
  - ✅ Tab 3: Transaksi (5 transactions)
  - ✅ Dialog untuk tambah kartu, kantong, transaksi

#### Halaman Tim & Freelancer
- URL: `http://localhost:5174/apps/team`
- Menu: Sidebar → **Tim & Freelancer** (badge: 48)
- Fitur yang bisa dilihat:
  - ✅ 4 freelancer cards
  - ✅ Rating stars untuk setiap freelancer
  - ✅ Role icons (Camera, Video, Edit)
  - ✅ Progress bar proyek aktif
  - ✅ Reward balance
  - ✅ Tab 1: Daftar Freelancer
  - ✅ Tab 2: Riwayat Pembayaran
  - ✅ Dialog untuk pembayaran dan tambah freelancer

## 🔍 Troubleshooting

### Halaman Tidak Muncul?

1. **Hard Refresh Browser**
   - Windows: `Ctrl + Shift + R` atau `Ctrl + F5`
   - Mac: `Cmd + Shift + R`

2. **Clear Browser Cache**
   - Chrome: Settings → Privacy → Clear browsing data
   - Firefox: Options → Privacy → Clear Data

3. **Check Developer Console**
   - Tekan `F12` untuk buka DevTools
   - Lihat tab **Console** untuk error messages
   - Lihat tab **Network** untuk failed requests

4. **Restart Dev Server**
   ```bash
   # Stop server (Ctrl + C)
   # Start again
   npm run dev
   ```

### Error TypeScript?

Jika ada error TypeScript:
```bash
# Install missing types
npm install --save-dev @types/lodash

# Restart server
npm run dev
```

### Port Already in Use?

Server akan otomatis mencari port lain:
- Default: `http://localhost:5173/`
- Alternative: `http://localhost:5174/`
- Check terminal output untuk port yang digunakan

## ✅ What to Test

### Visual Testing
- [ ] Cards tampil dengan benar
- [ ] Hover effects bekerja
- [ ] Colors dan gradients tampil
- [ ] Icons muncul
- [ ] Progress bars animated
- [ ] Chips dengan warna yang benar

### Functional Testing
- [ ] Tabs bisa diklik dan switch
- [ ] Dialogs bisa dibuka dan ditutup
- [ ] Buttons responsive
- [ ] Menu dropdown bekerja
- [ ] Collapsible sections expand/collapse
- [ ] Forms bisa diisi (belum save ke backend)

### Data Testing
- [ ] Mock data tampil dengan benar
- [ ] Currency format: Rp 15.000.000
- [ ] Date format: 8 Januari 2026
- [ ] Status colors sesuai
- [ ] Calculations benar (total, progress, dll)

## 📊 Expected Data

### Dashboard TopCards
```
Total Saldo: Rp 145.500.000 (sum of all cards)
Proyek Aktif: 3 (projects not "Selesai")
Klien Aktif: 3 (clients with status "Aktif")
Total Freelancer: 4 (active team members)
```

### Projects
```
Total: 4 projects
- Wedding Photography - Budi & Ani (45% progress, DP Terbayar)
- Corporate Event - PT Maju Jaya (70% progress, Lunas)
- Product Shoot - Fashion Collection (20% progress, Belum Bayar)
- Prewedding - Budi & Ani (85% progress, Lunas)
```

### Clients
```
Total: 5 clients
Aktif: 3 (Budi & Ani, PT Maju Jaya, Fashion Store XYZ)
Prospek: 1 (Ahmad & Siti)
Tidak Aktif: 1 (Dewi Lestari)
```

### Finance
```
Cards: 3 (BCA, Mandiri, Cash)
Pockets: 4 (Operasional, Darurat, Hadiah, Marketing)
Transactions: 5 (mix income & expense)
Total Balance: Rp 145.500.000
```

### Team
```
Total: 4 freelancers
- Andi Photographer (4.8 rating, 45 projects)
- Budi Videographer (4.9 rating, 38 projects)
- Citra Editor (4.7 rating, 52 projects)
- Doni Prasetyo (4.6 rating, 28 projects)
```

## 🎯 Success Criteria

✅ All pages load without errors
✅ Mock data displays correctly
✅ UI components render properly
✅ Interactions work (clicks, hovers, etc)
✅ No console errors
✅ Responsive design works

## 📝 Notes

- Data is **mock data** - tidak tersimpan ke database
- Forms belum connected ke backend
- Dialogs hanya UI - tidak ada actual CRUD operations
- Perfect untuk development dan UI testing
- Ready untuk API integration

## 🚀 Next Steps After Testing

1. ✅ Verify all pages work
2. ✅ Test all interactions
3. ✅ Check responsive design
4. → Start API integration
5. → Connect forms to backend
6. → Add real CRUD operations
7. → Implement state management

---

**Happy Testing!** 🎉

If you encounter any issues, check the console for error messages or refer to the documentation in `src/data/README.md`.
