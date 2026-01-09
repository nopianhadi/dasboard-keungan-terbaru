import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  CircularProgress,
  Backdrop,
  ToggleButtonGroup,
  ToggleButton,
  Chip,
  Stack,
  Divider,
  Alert,
  Tooltip,
} from '@mui/material';
import {
  IconPlus,
  IconSearch,
  IconSortAscending,
  IconSortDescending,
  IconDownload,
  IconUsers,
  IconUserCheck,
  IconCurrencyDollar,
  IconLayoutGrid,
  IconTable,
} from '@tabler/icons-react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/components/shared/DashboardCard';
import BlankCard from 'src/components/shared/BlankCard';
import CustomPagination from 'src/components/shared/CustomPagination';
import { mockClients, formatCurrency, type Client } from 'src/data/mockData';
import { useSnackbar } from 'src/context/SnackbarContext';
import { usePagination } from 'src/hooks/usePagination';

// Import Client Dashboard Components
import ClientCard from 'src/components/dashboards/clients/ClientCard';
import ClientsOverview from 'src/components/dashboards/clients/ClientsOverview';
import ClientStatCard from 'src/components/dashboards/clients/ClientStatCard';
import TopClients from 'src/components/dashboards/clients/TopClients';
import ClientTable from 'src/components/apps/clients/ClientTable';

const BCrumb = [
  {
    to: '/',
    title: 'Beranda',
  },
  {
    title: 'Klien',
  },
];

const Clients = () => {
  const { showSnackbar } = useSnackbar();
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [openNewClient, setOpenNewClient] = useState(false);
  const [openEditClient, setOpenEditClient] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'totalSpent' | 'rating'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, client: Client) => {
    setAnchorEl(event.currentTarget);
    setSelectedClient(client);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditClient = () => {
    setOpenEditClient(true);
    handleMenuClose();
  };

  const handleDeleteClient = () => {
    setOpenDeleteDialog(true);
    handleMenuClose();
  };

  const confirmDelete = () => {
    if (selectedClient) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setClients(clients.filter((c) => c.id !== selectedClient.id));
        setOpenDeleteDialog(false);
        setLoading(false);
        showSnackbar(`Klien ${selectedClient.name} berhasil dihapus!`, 'info');
        setSelectedClient(null);
      }, 500);
    }
  };

  const handleAddClient = (newClient: Partial<Client>) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const client: Client = {
        id: String(clients.length + 1),
        name: newClient.name || '',
        email: newClient.email || '',
        phone: newClient.phone || '',
        whatsapp: newClient.whatsapp,
        instagram: newClient.instagram,
        status: (newClient.status as Client['status']) || 'Prospek',
        clientType: (newClient.clientType as Client['clientType']) || 'Langsung',
        since: new Date().toISOString().split('T')[0],
        lastContact: new Date().toISOString().split('T')[0],
        portalAccessId: `portal-${clients.length + 1}`,
        totalProjects: 0,
        totalSpent: 0,
        rating: 0,
      };
      setClients([client, ...clients]);
      setOpenNewClient(false);
      setLoading(false);
      showSnackbar(`Klien ${client.name} berhasil ditambahkan!`, 'success');
    }, 500);
  };

  const handleUpdateClient = (updatedClient: Partial<Client>) => {
    if (selectedClient) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setClients(
          clients.map((c) => (c.id === selectedClient.id ? { ...c, ...updatedClient } : c))
        );
        setOpenEditClient(false);
        setSelectedClient(null);
        setLoading(false);
        showSnackbar('Data klien berhasil diperbarui!', 'success');
      }, 500);
    }
  };

  // Filter by tab
  let filteredClients = clients.filter((client) => {
    if (tabValue === 0) return true; // Semua
    if (tabValue === 1) return client.status === 'Aktif';
    if (tabValue === 2) return client.status === 'Prospek';
    if (tabValue === 3) return client.status === 'Tidak Aktif';
    return true;
  });

  // Filter by search
  if (searchQuery) {
    filteredClients = filteredClients.filter(client =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.includes(searchQuery)
    );
  }

  // Sort clients
  filteredClients = [...filteredClients].sort((a, b) => {
    let aValue: any = a[sortBy];
    let bValue: any = b[sortBy];

    if (sortBy === 'name') {
      aValue = a.name.toLowerCase();
      bValue = b.name.toLowerCase();
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Pagination
  const {
    paginatedItems,
    currentPage,
    itemsPerPage,
    totalItems,
    handlePageChange,
    handleItemsPerPageChange,
    resetPagination,
  } = usePagination({ items: filteredClients, initialItemsPerPage: 12 });

  // Reset pagination when filters change
  useEffect(() => {
    resetPagination();
  }, [searchQuery, tabValue, sortBy, sortOrder]);

  // Calculate statistics
  const totalClients = clients.length;
  const activeClients = clients.filter(c => c.status === 'Aktif').length;
  const prospectClients = clients.filter(c => c.status === 'Prospek').length;
  const inactiveClients = clients.filter(c => c.status === 'Tidak Aktif').length;
  const totalRevenue = clients.reduce((sum, c) => sum + (c.totalSpent || 0), 0);
  const avgRating = clients.filter(c => c.rating && c.rating > 0).reduce((sum, c) => sum + (c.rating || 0), 0) / clients.filter(c => c.rating && c.rating > 0).length || 0;

  // Mock data for charts
  const clientsData = [15, 20, 18, 25, 22, 28, 30];
  const revenueData = [5, 8, 6, 10, 9, 12, 15];

  return (
    <PageContainer title="Dashboard Klien" description="Dashboard manajemen klien">
      <Breadcrumb title="Dashboard Klien" items={BCrumb} />

      <Box>
        {/* Statistics Cards */}
        <Grid container spacing={3} mb={3}>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <ClientStatCard
              title="Total Klien"
              value={totalClients}
              growth={12.5}
              data={clientsData}
              icon={<IconUsers width={24} />}
              color="primary"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <ClientStatCard
              title="Klien Aktif"
              value={activeClients}
              growth={8.3}
              data={[12, 18, 15, 20, 18, 22, 25]}
              icon={<IconUserCheck width={24} />}
              color="success"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <ClientStatCard
              title="Total Revenue"
              value={formatCurrency(totalRevenue)}
              growth={15.7}
              data={revenueData}
              icon={<IconCurrencyDollar width={24} />}
              color="warning"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <ClientStatCard
              title="Avg Rating"
              value={avgRating.toFixed(1)}
              growth={5.2}
              data={[3.5, 3.8, 4.0, 4.2, 4.3, 4.5, 4.6]}
              icon={<IconUsers width={24} />}
              color="info"
            />
          </Grid>
        </Grid>

        {/* Overview & Top Clients */}
        <Grid container spacing={3} mb={3}>
          <Grid size={{ xs: 12, lg: 4 }}>
            <ClientsOverview
              totalClients={totalClients}
              activeClients={activeClients}
              prospectClients={prospectClients}
              inactiveClients={inactiveClients}
              growth={12.5}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 8 }}>
            <TopClients clients={clients} />
          </Grid>
        </Grid>

        {/* Clients List */}
        <DashboardCard
          title="Daftar Klien"
          subtitle={`${filteredClients.length} klien ditemukan`}
          action={
            <Stack direction="row" spacing={1}>
              {/* View Mode Toggle */}
              <Tooltip title="Ubah Tampilan">
                <ToggleButtonGroup
                  value={viewMode}
                  exclusive
                  onChange={(_e, newMode) => newMode && setViewMode(newMode)}
                  size="small"
                >
                  <ToggleButton value="grid" title="Grid View">
                    <IconLayoutGrid size={18} />
                  </ToggleButton>
                  <ToggleButton value="table" title="Table View">
                    <IconTable size={18} />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Tooltip>

              <Button
                variant="outlined"
                size="small"
                startIcon={<IconDownload size={18} />}
                onClick={() => {
                  try {
                    const csv = [
                      ['Nama', 'Email', 'Phone', 'Status', 'Total Projects', 'Total Spent'].join(','),
                      ...filteredClients.map(c =>
                        [c.name, c.email, c.phone, c.status, c.totalProjects, c.totalSpent].join(',')
                      )
                    ].join('\n');
                    const blob = new Blob([csv], { type: 'text/csv' });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'clients.csv';
                    a.click();
                    showSnackbar('Data klien berhasil diekspor!', 'success');
                  } catch (error) {
                    showSnackbar('Gagal mengekspor data!', 'error');
                  }
                }}
              >
                Export
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<IconPlus size={18} />}
                onClick={() => setOpenNewClient(true)}
              >
                Klien Baru
              </Button>
            </Stack>
          }
        >
          {/* Filter & Search Card */}
          <BlankCard>
            <Box sx={{ p: 2, bgcolor: 'grey.50' }}>
              <Stack spacing={2}>
                {/* Search and Sort Row */}
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Cari klien (nama, email, phone)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    slotProps={{
                      input: {
                        startAdornment: <IconSearch size={20} style={{ marginRight: 8 }} />,
                      },
                    }}
                  />
                  <Stack direction="row" spacing={1}>
                    <FormControl size="small" sx={{ minWidth: 150 }}>
                      <InputLabel>Urutkan</InputLabel>
                      <Select
                        value={sortBy}
                        label="Urutkan"
                        onChange={(e) => setSortBy(e.target.value as any)}
                      >
                        <MenuItem value="name">Nama</MenuItem>
                        <MenuItem value="totalSpent">Total Spending</MenuItem>
                        <MenuItem value="rating">Rating</MenuItem>
                      </Select>
                    </FormControl>
                    <Tooltip title={sortOrder === 'asc' ? 'Urutkan Descending' : 'Urutkan Ascending'}>
                      <IconButton
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        color="primary"
                        size="small"
                      >
                        {sortOrder === 'asc' ? <IconSortAscending /> : <IconSortDescending />}
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Stack>

                {/* Status Tabs */}
                <Tabs 
                  value={tabValue} 
                  onChange={(_e, newValue) => setTabValue(newValue)}
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  <Tab 
                    label={
                      <Stack direction="row" spacing={1} alignItems="center">
                        <span>Semua</span>
                        <Chip label={clients.length} size="small" color="default" />
                      </Stack>
                    } 
                  />
                  <Tab 
                    label={
                      <Stack direction="row" spacing={1} alignItems="center">
                        <span>Aktif</span>
                        <Chip label={activeClients} size="small" color="success" />
                      </Stack>
                    } 
                  />
                  <Tab 
                    label={
                      <Stack direction="row" spacing={1} alignItems="center">
                        <span>Prospek</span>
                        <Chip label={prospectClients} size="small" color="warning" />
                      </Stack>
                    } 
                  />
                  <Tab 
                    label={
                      <Stack direction="row" spacing={1} alignItems="center">
                        <span>Tidak Aktif</span>
                        <Chip label={inactiveClients} size="small" color="error" />
                      </Stack>
                    } 
                  />
                </Tabs>
              </Stack>
            </Box>
          </BlankCard>

          <Divider sx={{ my: 0 }} />

          {/* Content Area */}
          <Box sx={{ mt: 3 }}>
            {filteredClients.length === 0 ? (
              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="h6">
                  Tidak ada klien ditemukan
                </Typography>
                <Typography variant="body2" mt={1}>
                  {searchQuery ? 'Coba kata kunci lain atau ubah filter' : 'Tambahkan klien baru untuk memulai'}
                </Typography>
              </Alert>
            ) : viewMode === 'table' ? (
              <ClientTable
                clients={paginatedItems}
                onMenuAction={(event: React.MouseEvent<HTMLElement>, client: Client) => {
                  handleMenuClick(event, client);
                }}
              />
            ) : (
              <Grid container spacing={3}>
                {paginatedItems.map((client) => (
                  <Grid key={client.id} size={{ xs: 12, sm: 6, md: 4 }}>
                    <ClientCard client={client} onMenuClick={handleMenuClick} />
                  </Grid>
                ))}
              </Grid>
            )}

            {/* Pagination */}
            {filteredClients.length > 0 && (
              <Box mt={3}>
                <CustomPagination
                  totalItems={totalItems}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                  onItemsPerPageChange={handleItemsPerPageChange}
                />
              </Box>
            )}
          </Box>
        </DashboardCard>
      </Box>

      {/* Menu Aksi */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleMenuClose}>Lihat Detail</MenuItem>
        <MenuItem onClick={handleEditClient}>Edit Klien</MenuItem>
        <MenuItem onClick={handleMenuClose}>Lihat Proyek</MenuItem>
        <MenuItem onClick={handleMenuClose}>Lihat Transaksi</MenuItem>
        <MenuItem onClick={handleMenuClose}>Portal Klien</MenuItem>
        <MenuItem onClick={handleDeleteClient}>Hapus</MenuItem>
      </Menu>

      {/* Dialog Klien Baru */}
      <ClientFormDialog
        open={openNewClient}
        onClose={() => setOpenNewClient(false)}
        onSave={handleAddClient}
        title="Tambah Klien Baru"
      />

      {/* Dialog Edit Klien */}
      <ClientFormDialog
        open={openEditClient}
        onClose={() => setOpenEditClient(false)}
        onSave={handleUpdateClient}
        title="Edit Klien"
        initialData={selectedClient || undefined}
      />

      {/* Dialog Konfirmasi Hapus */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Hapus Klien</DialogTitle>
        <DialogContent>
          <Typography>
            Apakah Anda yakin ingin menghapus klien <strong>{selectedClient?.name}</strong>?
            Tindakan ini tidak dapat dibatalkan.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Batal</Button>
          <Button variant="contained" color="error" onClick={confirmDelete}>
            Hapus
          </Button>
        </DialogActions>
      </Dialog>

      {/* Loading Backdrop */}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </PageContainer>
  );
};

// Component untuk Form Dialog (reusable)
interface ClientFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (client: Partial<Client>) => void;
  title: string;
  initialData?: Client;
}

const ClientFormDialog: React.FC<ClientFormDialogProps> = ({
  open,
  onClose,
  onSave,
  title,
  initialData,
}) => {
  const [formData, setFormData] = useState<Partial<Client>>({
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    instagram: '',
    status: 'Prospek',
    clientType: 'Langsung',
  });

  React.useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        whatsapp: '',
        instagram: '',
        status: 'Prospek',
        clientType: 'Langsung',
      });
    }
  }, [initialData, open]);

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Nama Lengkap"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth>
              <InputLabel>Tipe Klien</InputLabel>
              <Select
                label="Tipe Klien"
                value={formData.clientType}
                onChange={(e) => setFormData({ ...formData, clientType: e.target.value as any })}
              >
                <MenuItem value="Langsung">Langsung</MenuItem>
                <MenuItem value="Vendor">Vendor</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Nomor Telepon"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="WhatsApp"
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Instagram"
              placeholder="@username"
              value={formData.instagram}
              onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
            />
          </Grid>
          <Grid size={12}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              >
                <MenuItem value="Prospek">Prospek</MenuItem>
                <MenuItem value="Aktif">Aktif</MenuItem>
                <MenuItem value="Tidak Aktif">Tidak Aktif</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Batal</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Simpan
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Clients;
