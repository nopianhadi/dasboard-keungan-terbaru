import React, { useState } from 'react';
import {
  Box,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Button,
} from '@mui/material';
import { IconPlus } from '@tabler/icons-react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import {
  mockFinanceCards,
  mockPockets,
  mockTransactions,
  mockProjects,
  type FinanceCard,
  type Pocket,
  type Transaction,
} from 'src/data/mockData';

// Import Finance Dashboard Components
import FinancialOverview from 'src/components/dashboards/finance/FinancialOverview';
import MonthlyFinance from 'src/components/dashboards/finance/MonthlyFinance';
import CashflowChart from 'src/components/dashboards/finance/CashflowChart';
import FinanceStatCard from 'src/components/dashboards/finance/FinanceStatCard';
import BankCard from 'src/components/dashboards/finance/BankCard';
import PocketCard from 'src/components/dashboards/finance/PocketCard';
import RecentTransactions from 'src/components/dashboards/finance/RecentTransactions';
import DashboardCard from 'src/components/shared/DashboardCard';

const BCrumb = [
  {
    to: '/',
    title: 'Beranda',
  },
  {
    title: 'Keuangan',
  },
];

const Finance = () => {
  const [cards] = useState<FinanceCard[]>(mockFinanceCards);
  const [pockets] = useState<Pocket[]>(mockPockets);
  const [transactions] = useState<Transaction[]>(mockTransactions);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openNewCard, setOpenNewCard] = useState(false);
  const [openNewPocket, setOpenNewPocket] = useState(false);
  const [openNewTransaction, setOpenNewTransaction] = useState(false);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Calculate financial statistics
  const totalBalance = cards.reduce((sum, card) => sum + card.balance, 0);
  const totalPockets = pockets.reduce((sum, pocket) => sum + pocket.amount, 0);
  
  // Get current month transactions
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const monthlyTransactions = transactions.filter(t => {
    const tDate = new Date(t.date);
    return tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear;
  });
  
  const monthlyIncome = monthlyTransactions
    .filter(t => t.type === 'Pemasukan')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const monthlyExpense = monthlyTransactions
    .filter(t => t.type === 'Pengeluaran')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const monthlyProfit = monthlyIncome - monthlyExpense;
  
  // Calculate pending payments from projects
  const pendingPayments = mockProjects
    .filter(p => p.paymentStatus !== 'Lunas')
    .reduce((sum, p) => sum + (p.totalCost - p.amountPaid), 0);
  
  // Get recent transactions (last 5)
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
  
  // Calculate total income and expense (all time)
  const totalIncome = transactions
    .filter(t => t.type === 'Pemasukan')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpense = transactions
    .filter(t => t.type === 'Pengeluaran')
    .reduce((sum, t) => sum + t.amount, 0);

  const netProfit = totalIncome - totalExpense;

  // Mock data for charts
  const incomeData = [25, 66, 20, 40, 12, 58, 20];
  const expenseData = [20, 50, 15, 35, 10, 45, 18];
  const profitData = [5, 16, 5, 5, 2, 13, 2];

  return (
    <PageContainer title="Dashboard Keuangan" description="Dashboard keuangan komprehensif">
      <Breadcrumb title="Dashboard Keuangan" items={BCrumb} />

      <Box>
        {/* Top Statistics Cards - Monthly Finance */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <MonthlyFinance
              amount={monthlyIncome}
              title="Pemasukan Bulan Ini"
              growth={9.5}
              data={incomeData}
              type="income"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <MonthlyFinance
              amount={monthlyExpense}
              title="Pengeluaran Bulan Ini"
              growth={-3.2}
              data={expenseData}
              type="expense"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, lg: 4 }}>
            <MonthlyFinance
              amount={monthlyProfit}
              title="Profit Bulan Ini"
              growth={12.8}
              data={profitData}
              type="profit"
            />
          </Grid>
        </Grid>

        {/* Financial Overview & Stats */}
        <Grid container spacing={3} mt={0}>
          <Grid size={{ xs: 12, lg: 5 }}>
            <FinancialOverview
              totalIncome={totalIncome}
              totalExpense={totalExpense}
              netProfit={netProfit}
              incomeGrowth={9.5}
              expenseGrowth={-3.2}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4, lg: 2.33 }}>
            <FinanceStatCard
              title="Total Saldo"
              amount={totalBalance}
              growth={5.2}
              data={[0, 3, 1, 2, 8, 1, 5]}
              color="primary"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4, lg: 2.33 }}>
            <FinanceStatCard
              title="Total Kantong"
              amount={totalPockets}
              growth={3.8}
              data={[5, 1, 8, 2, 1, 3, 0]}
              color="success"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4, lg: 2.33 }}>
            <FinanceStatCard
              title="Piutang"
              amount={pendingPayments}
              growth={-2.5}
              data={[2, 8, 1, 3, 0, 5, 1]}
              color="warning"
            />
          </Grid>
        </Grid>

        {/* Cashflow Chart */}
        <Grid container spacing={3} mt={0}>
          <Grid size={12}>
            <CashflowChart
              monthlyIncome={monthlyIncome}
              monthlyExpense={monthlyExpense}
              totalRevenue={totalIncome}
            />
          </Grid>
        </Grid>

        {/* Cards & Accounts Section */}
        <Grid container spacing={3} mt={0}>
          <Grid size={12}>
            <DashboardCard
              title="Kartu & Rekening"
              subtitle="Kelola kartu dan rekening Anda"
              action={
                <Button
                  variant="contained"
                  color="primary"
                  size="medium"
                  startIcon={<IconPlus size={18} />}
                  onClick={() => setOpenNewCard(true)}
                >
                  Tambah Kartu
                </Button>
              }
            >
              <Grid container spacing={3}>
                {cards.map((card) => (
                  <Grid key={card.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                    <BankCard card={card} onMenuClick={handleMenuClick} />
                  </Grid>
                ))}
              </Grid>
            </DashboardCard>
          </Grid>
        </Grid>

        {/* Pockets Section */}
        <Grid container spacing={3} mt={0}>
          <Grid size={12}>
            <DashboardCard
              title="Kantong Keuangan"
              subtitle="Kelola kantong tabungan dan anggaran"
              action={
                <Button
                  variant="contained"
                  color="secondary"
                  size="medium"
                  startIcon={<IconPlus size={18} />}
                  onClick={() => setOpenNewPocket(true)}
                >
                  Kantong Baru
                </Button>
              }
            >
              <Grid container spacing={3}>
                {pockets.map((pocket) => (
                  <Grid key={pocket.id} size={{ xs: 12, sm: 6, lg: 3 }}>
                    <PocketCard pocket={pocket} onMenuClick={handleMenuClick} />
                  </Grid>
                ))}
              </Grid>
            </DashboardCard>
          </Grid>
        </Grid>

        {/* Recent Transactions Section */}
        <Grid container spacing={3} mt={0}>
          <Grid size={12}>
            <RecentTransactions
              transactions={recentTransactions}
              onAddNew={() => setOpenNewTransaction(true)}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Menu Aksi */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleMenuClose}>Lihat Detail</MenuItem>
        <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
        <MenuItem onClick={handleMenuClose}>Transfer</MenuItem>
        <MenuItem onClick={handleMenuClose}>Hapus</MenuItem>
      </Menu>

      {/* Dialog Kartu Baru */}
      <Dialog open={openNewCard} onClose={() => setOpenNewCard(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Tambah Kartu/Rekening Baru</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={12}>
              <TextField fullWidth label="Nama Pemegang Kartu" required />
            </Grid>
            <Grid size={12}>
              <FormControl fullWidth>
                <InputLabel>Tipe</InputLabel>
                <Select label="Tipe">
                  <MenuItem value="Debit">Debit</MenuItem>
                  <MenuItem value="Kredit">Kredit</MenuItem>
                  <MenuItem value="Tunai">Tunai</MenuItem>
                  <MenuItem value="Prabayar">Prabayar</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Nama Bank" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="4 Digit Terakhir" inputProps={{ maxLength: 4 }} />
            </Grid>
            <Grid size={12}>
              <TextField fullWidth label="Saldo Awal" type="number" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNewCard(false)}>Batal</Button>
          <Button variant="contained" onClick={() => setOpenNewCard(false)}>
            Simpan
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Kantong Baru */}
      <Dialog open={openNewPocket} onClose={() => setOpenNewPocket(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Buat Kantong Keuangan Baru</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={12}>
              <TextField fullWidth label="Nama Kantong" required />
            </Grid>
            <Grid size={12}>
              <FormControl fullWidth>
                <InputLabel>Tipe Kantong</InputLabel>
                <Select label="Tipe Kantong">
                  <MenuItem value="Nabung & Bayar">Nabung & Bayar</MenuItem>
                  <MenuItem value="Terkunci">Terkunci</MenuItem>
                  <MenuItem value="Bersama">Bersama</MenuItem>
                  <MenuItem value="Anggaran Pengeluaran">Anggaran Pengeluaran</MenuItem>
                  <MenuItem value="Tabungan Hadiah Freelancer">Tabungan Hadiah Freelancer</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Saldo Awal" type="number" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Target (Opsional)" type="number" />
            </Grid>
            <Grid size={12}>
              <TextField fullWidth label="Deskripsi" multiline rows={2} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNewPocket(false)}>Batal</Button>
          <Button variant="contained" onClick={() => setOpenNewPocket(false)}>
            Buat Kantong
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Transaksi Baru */}
      <Dialog
        open={openNewTransaction}
        onClose={() => setOpenNewTransaction(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Tambah Transaksi Baru</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={12}>
              <FormControl fullWidth>
                <InputLabel>Tipe Transaksi</InputLabel>
                <Select label="Tipe Transaksi">
                  <MenuItem value="Pemasukan">Pemasukan</MenuItem>
                  <MenuItem value="Pengeluaran">Pengeluaran</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={12}>
              <TextField fullWidth label="Deskripsi" required />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Jumlah" type="number" required />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth type="date" label="Tanggal" slotProps={{ inputLabel: { shrink: true } }} />
            </Grid>
            <Grid size={12}>
              <FormControl fullWidth>
                <InputLabel>Kategori</InputLabel>
                <Select label="Kategori">
                  <MenuItem value="Pemasukan Proyek">Pemasukan Proyek</MenuItem>
                  <MenuItem value="Gaji Freelancer">Gaji Freelancer</MenuItem>
                  <MenuItem value="Peralatan">Peralatan</MenuItem>
                  <MenuItem value="Operasional">Operasional</MenuItem>
                  <MenuItem value="Marketing">Marketing</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={12}>
              <FormControl fullWidth>
                <InputLabel>Metode Pembayaran</InputLabel>
                <Select label="Metode Pembayaran">
                  <MenuItem value="Transfer Bank">Transfer Bank</MenuItem>
                  <MenuItem value="Tunai">Tunai</MenuItem>
                  <MenuItem value="E-Wallet">E-Wallet</MenuItem>
                  <MenuItem value="Kartu">Kartu</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={12}>
              <FormControl fullWidth>
                <InputLabel>Kartu/Rekening</InputLabel>
                <Select label="Kartu/Rekening">
                  {cards.map((card) => (
                    <MenuItem key={card.id} value={card.id}>
                      {card.bankName} - **** {card.lastFourDigits}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNewTransaction(false)}>Batal</Button>
          <Button variant="contained" onClick={() => setOpenNewTransaction(false)}>
            Simpan
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default Finance;
