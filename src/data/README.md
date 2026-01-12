# Mock Data Documentation

File ini berisi mock data terpusat untuk aplikasi Vena Pictures CRM yang sesuai dengan struktur database.

## Struktur File

### `mockData.ts`

File utama yang berisi semua mock data dan helper functions.

## Data Types

### 1. Client
Data klien/customer dengan informasi lengkap:
- Personal info (nama, email, phone, whatsapp, instagram)
- Status (Prospek, Aktif, Tidak Aktif, Hilang)
- Client type (Langsung, Vendor)
- Metrics (total projects, total spent, rating)

### 2. Project
Data proyek fotografi/videografi:
- Project info (nama, tipe, lokasi, tanggal)
- Status dan progress
- Financial info (total cost, amount paid, payment status)
- Team assignment

### 3. TeamMember
Data freelancer/team member:
- Personal info
- Role dan skills
- Financial (standard fee, reward balance)
- Performance (rating, total projects)

### 4. FinanceCard
Data kartu/rekening bank:
- Card info (holder name, bank, last 4 digits)
- Card type (Debit, Kredit, Tunai, Prabayar)
- Balance
- UI customization (color gradient)

### 5. Pocket
Kantong keuangan untuk budget management:
- Pocket info (nama, deskripsi, icon)
- Type (Nabung & Bayar, Terkunci, Bersama, dll)
- Amount dan goal amount

### 6. Transaction
Transaksi keuangan:
- Transaction info (date, description, amount)
- Type (Pemasukan, Pengeluaran)
- Category dan method
- References (project, card, pocket)

## Helper Functions

### `formatCurrency(amount: number): string`
Format angka menjadi format mata uang Rupiah.

**Example:**
```typescript
formatCurrency(15000000) // "Rp 15.000.000"
```

### `formatDate(dateString: string): string`
Format tanggal menjadi format Indonesia.

**Example:**
```typescript
formatDate('2026-01-08') // "8 Januari 2026"
```

### `getStatusColor(status: string)`
Mendapatkan warna chip berdasarkan status.

**Supported Status:**
- Client: Prospek, Aktif, Tidak Aktif, Hilang
- Project: Diskusi, Persiapan, Pemotretan, Editing, Revisi, Selesai
- Payment: Lunas, DP Terbayar, Belum Bayar

## Usage

### Import Mock Data
```typescript
import { 
  mockClients, 
  mockProjects, 
  mockTeamMembers,
  mockFinanceCards,
  mockPockets,
  mockTransactions,
  formatCurrency,
  formatDate,
  getStatusColor,
  type Client,
  type Project,
  type TeamMember
} from 'src/data/mockData';
```

### Use in Component
```typescript
const MyComponent = () => {
  const [clients] = useState<Client[]>(mockClients);
  
  return (
    <div>
      {clients.map(client => (
        <div key={client.id}>
          <h3>{client.name}</h3>
          <p>{formatCurrency(client.totalSpent || 0)}</p>
          <Chip 
            label={client.status} 
            color={getStatusColor(client.status)} 
          />
        </div>
      ))}
    </div>
  );
};
```

## Data Relationships

Mock data sudah dirancang dengan relasi yang konsisten:

1. **Projects → Clients**: `project.clientId` merujuk ke `client.id`
2. **Projects → Team**: `project.team` berisi nama-nama dari `teamMembers`
3. **Transactions → Projects**: `transaction.projectId` merujuk ke `project.id`
4. **Transactions → Cards**: `transaction.cardId` merujuk ke `card.id`

## Extending Mock Data

Untuk menambah data baru, ikuti pattern yang ada:

```typescript
export const mockNewData: NewDataType[] = [
  {
    id: '1',
    // ... fields sesuai interface
  },
  // ... more items
];
```

Pastikan:
1. ID unik untuk setiap item
2. Relasi antar data konsisten
3. Format tanggal menggunakan ISO string (YYYY-MM-DD)
4. Nilai numerik dalam bentuk number, bukan string

## Database Schema Reference

Mock data ini mengikuti struktur database yang ada di folder `/database`:
- `02_create_users_table.sql`
- `04_create_clients_leads_tables.sql`
- `06_create_projects_table.sql`
- `07_create_financial_tables.sql`
- `08_create_team_tables.sql`

Lihat file-file tersebut untuk detail lengkap struktur data.
