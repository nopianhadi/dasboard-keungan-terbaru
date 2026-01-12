import React, { useState } from 'react';
import {
  Box,
  Grid,
  CardContent,
  Typography,
  Button,
  Chip,
  Avatar,
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
  Rating,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
  Stack,
  Tooltip,
} from '@mui/material';
import {
  IconDotsVertical,
  IconPlus,
  IconCamera,
  IconVideo,
  IconEdit,
  IconBriefcase,
  IconCash,
  IconSearch,
  IconSortAscending,
  IconSortDescending,
  IconDownload,
  IconMail,
  IconPhone,
} from '@tabler/icons-react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/components/shared/DashboardCard';
import BlankCard from 'src/components/shared/BlankCard';
import { mockTeamMembers, formatCurrency, type TeamMember } from 'src/data/mockData';

const BCrumb = [
  {
    to: '/',
    title: 'Beranda',
  },
  {
    title: 'Tim & Freelancer',
  },
];

const Team = () => {
  const [freelancers, setFreelancers] = useState<TeamMember[]>(mockTeamMembers);
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedFreelancer, setSelectedFreelancer] = useState<TeamMember | null>(null);
  const [openNewFreelancer, setOpenNewFreelancer] = useState(false);
  const [openEditFreelancer, setOpenEditFreelancer] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
  const [openBulkPayment, setOpenBulkPayment] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<string>('Semua');
  const [filterStatus, setFilterStatus] = useState<string>('Semua');
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'totalProjects' | 'rewardBalance'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, freelancer: TeamMember) => {
    setAnchorEl(event.currentTarget);
    setSelectedFreelancer(freelancer);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditFreelancer = () => {
    setOpenEditFreelancer(true);
    handleMenuClose();
  };

  const handleDeleteFreelancer = () => {
    setOpenDeleteDialog(true);
    handleMenuClose();
  };

  const confirmDelete = () => {
    if (selectedFreelancer) {
      setFreelancers(freelancers.filter((f) => f.id !== selectedFreelancer.id));
      setOpenDeleteDialog(false);
      setSelectedFreelancer(null);
    }
  };

  const getRoleIcon = (role: string) => {
    if (role.includes('Fotograf')) return <IconCamera size={18} />;
    if (role.includes('Videograf')) return <IconVideo size={18} />;
    if (role.includes('Editor')) return <IconEdit size={18} />;
    return <IconBriefcase size={18} />;
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'success' : 'error';
  };

  // Filter freelancers
  let filteredFreelancers = freelancers;

  // Filter by search
  if (searchQuery) {
    filteredFreelancers = filteredFreelancers.filter(
      (f) =>
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Filter by role
  if (filterRole !== 'Semua') {
    filteredFreelancers = filteredFreelancers.filter((f) => f.role.includes(filterRole));
  }

  // Filter by status
  if (filterStatus !== 'Semua') {
    filteredFreelancers = filteredFreelancers.filter((f) =>
      filterStatus === 'Aktif' ? f.isActive : !f.isActive
    );
  }

  // Sort freelancers
  filteredFreelancers = [...filteredFreelancers].sort((a, b) => {
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

  return (
    <PageContainer
      title="Manajemen Tim & Freelancer"
      description="Manajemen tim dan freelancer"
    >
      <Breadcrumb title="Tim & Freelancer" items={BCrumb} />

      <Box>
        <DashboardCard
          title="Tim & Freelancer"
          subtitle={`${filteredFreelancers.length} dari ${freelancers.length} freelancer`}
          action={
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                color="secondary"
                size="medium"
                startIcon={<IconDownload size={18} />}
                onClick={() => {
                  const csv = [
                    ['Nama', 'Role', 'Email', 'Phone', 'Rating', 'Total Projects', 'Saldo'].join(','),
                    ...filteredFreelancers.map((f) =>
                      [
                        f.name,
                        f.role,
                        f.email,
                        f.phone,
                        f.rating,
                        f.totalProjects,
                        f.rewardBalance,
                      ].join(',')
                    ),
                  ].join('\n');
                  const blob = new Blob([csv], { type: 'text/csv' });
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'team.csv';
                  a.click();
                }}
              >
                Export
              </Button>
              <Button
                variant="outlined"
                color="success"
                size="medium"
                startIcon={<IconCash size={18} />}
                onClick={() => setOpenBulkPayment(true)}
              >
                Pembayaran Massal
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                startIcon={<IconPlus size={18} />}
                onClick={() => setOpenNewFreelancer(true)}
              >
                Tambah Freelancer
              </Button>
            </Stack>
          }
        >
          <Box>
            <Tabs 
              value={tabValue} 
              onChange={(_e, newValue) => setTabValue(newValue)} 
              sx={{ 
                mb: 3,
                borderBottom: 1,
                borderColor: 'divider',
              }}
            >
              <Tab label="Daftar Freelancer" />
              <Tab label="Riwayat Pembayaran" />
            </Tabs>

            {/* Tab 1: Daftar Freelancer */}
            {tabValue === 0 && (
              <>
                {/* Search and Filters */}
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} mb={3}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Cari freelancer (nama, email, role)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    slotProps={{
                      input: {
                        startAdornment: <IconSearch size={20} style={{ marginRight: 8 }} />,
                      },
                    }}
                  />
                  <FormControl size="small" sx={{ minWidth: { xs: '100%', md: 140 } }}>
                    <InputLabel>Role</InputLabel>
                    <Select
                      value={filterRole}
                      label="Role"
                      onChange={(e) => setFilterRole(e.target.value)}
                    >
                      <MenuItem value="Semua">Semua</MenuItem>
                      <MenuItem value="Fotograf">Fotografer</MenuItem>
                      <MenuItem value="Videograf">Videografer</MenuItem>
                      <MenuItem value="Editor">Editor</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl size="small" sx={{ minWidth: { xs: '100%', md: 140 } }}>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={filterStatus}
                      label="Status"
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <MenuItem value="Semua">Semua</MenuItem>
                      <MenuItem value="Aktif">Aktif</MenuItem>
                      <MenuItem value="Tidak Aktif">Tidak Aktif</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl size="small" sx={{ minWidth: { xs: '100%', md: 160 } }}>
                    <InputLabel>Urutkan</InputLabel>
                    <Select
                      value={sortBy}
                      label="Urutkan"
                      onChange={(e) => setSortBy(e.target.value as any)}
                    >
                      <MenuItem value="name">Nama</MenuItem>
                      <MenuItem value="rating">Rating</MenuItem>
                      <MenuItem value="totalProjects">Total Proyek</MenuItem>
                      <MenuItem value="rewardBalance">Saldo</MenuItem>
                    </Select>
                  </FormControl>
                  <Tooltip title={sortOrder === 'asc' ? 'Urutkan Menurun' : 'Urutkan Menaik'}>
                    <IconButton
                      onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                      color="primary"
                      sx={{ 
                        border: 1, 
                        borderColor: 'primary.main',
                        borderRadius: 1,
                      }}
                    >
                      {sortOrder === 'asc' ? <IconSortAscending size={20} /> : <IconSortDescending size={20} />}
                    </IconButton>
                  </Tooltip>
                </Stack>

                {filteredFreelancers.length === 0 ? (
                  <Box textAlign="center" py={8}>
                    <Typography variant="h5" color="textSecondary" gutterBottom>
                      Tidak ada freelancer ditemukan
                    </Typography>
                    <Typography variant="body2" color="textSecondary" mb={3}>
                      {searchQuery ? 'Coba kata kunci lain' : 'Tambahkan freelancer baru untuk memulai'}
                    </Typography>
                    {!searchQuery && (
                      <Button
                        variant="contained"
                        startIcon={<IconPlus />}
                        onClick={() => setOpenNewFreelancer(true)}
                      >
                        Tambah Freelancer
                      </Button>
                    )}
                  </Box>
                ) : (
                  <Grid container spacing={3}>
                    {filteredFreelancers.map((freelancer) => (
                  <Grid key={freelancer.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                    <BlankCard>
                      <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="start" mb={2.5}>
                          <Stack direction="row" spacing={2} flex={1}>
                            <Avatar
                              sx={{
                                width: 60,
                                height: 60,
                                bgcolor: 'primary.main',
                                fontSize: '1.5rem',
                                fontWeight: 600,
                              }}
                            >
                              {freelancer.name.charAt(0)}
                            </Avatar>
                            <Box flex={1}>
                              <Typography variant="h6" gutterBottom fontWeight={600} fontSize="1.1rem">
                                {freelancer.name}
                              </Typography>
                              <Stack direction="row" alignItems="center" spacing={0.5}>
                                {getRoleIcon(freelancer.role)}
                                <Typography variant="body2" color="textSecondary" fontSize="0.875rem">
                                  {freelancer.role}
                                </Typography>
                              </Stack>
                              <Stack direction="row" spacing={1} mt={1}>
                                <Tooltip title={freelancer.email}>
                                  <IconButton size="small" sx={{ p: 0.5 }}>
                                    <IconMail size={16} />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title={freelancer.phone}>
                                  <IconButton size="small" sx={{ p: 0.5 }}>
                                    <IconPhone size={16} />
                                  </IconButton>
                                </Tooltip>
                              </Stack>
                            </Box>
                          </Stack>
                          <IconButton
                            size="small"
                            onClick={(e) => handleMenuClick(e, freelancer)}
                          >
                            <IconDotsVertical size={20} />
                          </IconButton>
                        </Stack>

                        <Stack direction="row" alignItems="center" spacing={1} mb={2.5}>
                          <Rating value={freelancer.rating} precision={0.1} size="small" readOnly />
                          <Typography variant="body2" fontWeight={600}>
                            {freelancer.rating.toFixed(1)}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            ({freelancer.totalProjects} proyek)
                          </Typography>
                        </Stack>

                        <Box mb={2.5}>
                          <Stack direction="row" justifyContent="space-between" mb={1}>
                            <Typography variant="body2" color="textSecondary" fontSize="0.875rem">
                              Proyek Aktif
                            </Typography>
                            <Typography variant="body2" fontWeight={600} fontSize="0.875rem">
                              {freelancer.activeProjects || 0} / {freelancer.totalProjects || 0}
                            </Typography>
                          </Stack>
                          <LinearProgress
                            variant="determinate"
                            value={((freelancer.activeProjects || 0) / (freelancer.totalProjects || 1)) * 100}
                            sx={{ height: 6, borderRadius: 3 }}
                            color="primary"
                          />
                        </Box>

                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          pt={2}
                          mt="auto"
                          borderTop={1}
                          borderColor="divider"
                        >
                          <Box>
                            <Typography variant="caption" color="textSecondary" fontSize="0.75rem">
                              Saldo Hadiah
                            </Typography>
                            <Typography variant="h6" fontWeight={700} color="success.main">
                              {formatCurrency(freelancer.rewardBalance)}
                            </Typography>
                          </Box>
                          <Chip
                            label={freelancer.isActive ? 'Aktif' : 'Tidak Aktif'}
                            color={getStatusColor(freelancer.isActive)}
                            size="small"
                            sx={{ fontWeight: 600 }}
                          />
                        </Stack>

                        <Button
                          fullWidth
                          variant="contained"
                          color="success"
                          size="medium"
                          sx={{ mt: 2 }}
                          onClick={() => {
                            setSelectedFreelancer(freelancer);
                            setOpenPayment(true);
                          }}
                        >
                          Proses Pembayaran
                        </Button>
                      </CardContent>
                    </BlankCard>
                  </Grid>
                    ))}
                  </Grid>
                )}
              </>
            )}

            {/* Tab 2: Riwayat Pembayaran */}
            {tabValue === 1 && (
              <DashboardCard title="Riwayat Pembayaran" subtitle="Daftar pembayaran ke freelancer">
                <TableContainer>
                  <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ py: 2 }}>
                          <Typography variant="subtitle2" fontWeight={600}>
                            Tanggal
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ py: 2 }}>
                          <Typography variant="subtitle2" fontWeight={600}>
                            Freelancer
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ py: 2 }}>
                          <Typography variant="subtitle2" fontWeight={600}>
                            Proyek
                          </Typography>
                        </TableCell>
                        <TableCell align="right" sx={{ py: 2 }}>
                          <Typography variant="subtitle2" fontWeight={600}>
                            Jumlah
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ py: 2 }}>
                          <Typography variant="subtitle2" fontWeight={600}>
                            Status
                          </Typography>
                        </TableCell>
                        <TableCell align="center" sx={{ py: 2 }}>
                          <Typography variant="subtitle2" fontWeight={600}>
                            Aksi
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          <Box py={8}>
                            <Typography variant="h6" color="textSecondary" gutterBottom>
                              Belum ada riwayat pembayaran
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Pembayaran yang diproses akan muncul di sini
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </DashboardCard>
            )}
          </Box>
        </DashboardCard>
      </Box>

      {/* Menu Aksi */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleMenuClose}>Lihat Detail</MenuItem>
        <MenuItem onClick={handleEditFreelancer}>Edit Freelancer</MenuItem>
        <MenuItem onClick={handleMenuClose}>Lihat Proyek</MenuItem>
        <MenuItem onClick={handleMenuClose}>Riwayat Pembayaran</MenuItem>
        <MenuItem onClick={handleMenuClose}>Portal Freelancer</MenuItem>
        <MenuItem onClick={handleMenuClose}>Akses SOP</MenuItem>
        <MenuItem onClick={handleDeleteFreelancer}>Hapus</MenuItem>
      </Menu>

      {/* Dialog Freelancer Baru */}
      <FreelancerFormDialog
        open={openNewFreelancer}
        onClose={() => setOpenNewFreelancer(false)}
        title="Tambah Freelancer Baru"
      />

      {/* Dialog Edit Freelancer */}
      <FreelancerFormDialog
        open={openEditFreelancer}
        onClose={() => setOpenEditFreelancer(false)}
        title="Edit Freelancer"
        initialData={selectedFreelancer || undefined}
      />

      {/* Dialog Konfirmasi Hapus */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Hapus Freelancer</DialogTitle>
        <DialogContent>
          <Typography>
            Apakah Anda yakin ingin menghapus freelancer <strong>{selectedFreelancer?.name}</strong>?
          </Typography>
          <Typography variant="body2" color="error" mt={2}>
            Tindakan ini tidak dapat dibatalkan.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setOpenDeleteDialog(false)} size="medium">
            Batal
          </Button>
          <Button variant="contained" color="error" onClick={confirmDelete} size="medium">
            Hapus
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Pembayaran */}
      <Dialog open={openPayment} onClose={() => setOpenPayment(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Proses Pembayaran</DialogTitle>
        <DialogContent>
          {selectedFreelancer && (
            <Box sx={{ mt: 2 }}>
              <Stack spacing={2} mb={3}>
                <Box>
                  <Typography variant="caption" color="textSecondary">
                    Freelancer
                  </Typography>
                  <Typography variant="h6" fontWeight={600}>
                    {selectedFreelancer.name}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="textSecondary">
                    Saldo Saat Ini
                  </Typography>
                  <Typography variant="h6" color="success.main" fontWeight={600}>
                    {formatCurrency(selectedFreelancer.rewardBalance)}
                  </Typography>
                </Box>
              </Stack>

              <Grid container spacing={2}>
                <Grid size={12}>
                  <FormControl fullWidth>
                    <InputLabel>Proyek</InputLabel>
                    <Select label="Proyek">
                      <MenuItem value="1">Wedding Photography - Budi & Ani</MenuItem>
                      <MenuItem value="2">Corporate Event - PT Maju</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={12}>
                  <TextField fullWidth label="Jumlah Pembayaran" type="number" required />
                </Grid>
                <Grid size={12}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Tanggal Pembayaran"
                    slotProps={{ inputLabel: { shrink: true } }}
                  />
                </Grid>
                <Grid size={12}>
                  <TextField fullWidth label="Catatan" multiline rows={3} />
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setOpenPayment(false)} size="medium">
            Batal
          </Button>
          <Button variant="contained" onClick={() => setOpenPayment(false)} size="medium">
            Proses & Tanda Tangan
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Pembayaran Massal */}
      <Dialog
        open={openBulkPayment}
        onClose={() => setOpenBulkPayment(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Pembayaran Massal</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
            Pilih freelancer yang akan dibayar untuk proyek tertentu
          </Typography>

          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <input type="checkbox" />
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Freelancer
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Proyek
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="subtitle2" fontWeight={600}>
                      Jumlah
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {freelancers.slice(0, 3).map((freelancer) => (
                  <TableRow key={freelancer.id} hover>
                    <TableCell padding="checkbox">
                      <input type="checkbox" />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                          {freelancer.name.charAt(0)}
                        </Avatar>
                        <Typography variant="body2" fontWeight={500}>
                          {freelancer.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        Wedding Photography - Budi & Ani
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" fontWeight={600}>
                        {formatCurrency(3500000)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ mt: 3, p: 2.5, bgcolor: 'success.lighter', borderRadius: 2 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="subtitle1" fontWeight={600}>
                Total Pembayaran
              </Typography>
              <Typography variant="h5" fontWeight={700} color="success.main">
                {formatCurrency(10500000)}
              </Typography>
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setOpenBulkPayment(false)} size="medium">
            Batal
          </Button>
          <Button 
            variant="contained" 
            color="success"
            onClick={() => setOpenBulkPayment(false)}
            size="medium"
          >
            Proses Pembayaran Massal
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

// Component untuk Form Dialog (reusable)
interface FreelancerFormDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  initialData?: TeamMember;
}

const FreelancerFormDialog: React.FC<FreelancerFormDialogProps> = ({
  open,
  onClose,
  title,
  initialData,
}) => {
  const [formData, setFormData] = useState<Partial<TeamMember>>({
    name: '',
    email: '',
    phone: '',
    role: 'Fotografer',
    standardFee: 0,
    isActive: true,
  });

  React.useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: 'Fotografer',
        standardFee: 0,
        isActive: true,
      });
    }
  }, [initialData, open]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2.5} sx={{ mt: 0.5 }}>
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
              <InputLabel>Role</InputLabel>
              <Select
                label="Role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <MenuItem value="Fotografer">Fotografer</MenuItem>
                <MenuItem value="Videografer">Videografer</MenuItem>
                <MenuItem value="Editor">Editor</MenuItem>
                <MenuItem value="Fotografer & Videografer">Fotografer & Videografer</MenuItem>
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
              label="Fee Standar"
              type="number"
              value={formData.standardFee}
              onChange={(e) => setFormData({ ...formData, standardFee: Number(e.target.value) })}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField fullWidth label="Nomor Rekening" />
          </Grid>
          <Grid size={12}>
            <TextField fullWidth label="Alamat" multiline rows={2} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} size="medium">
          Batal
        </Button>
        <Button variant="contained" onClick={onClose} size="medium">
          Simpan
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Team;
