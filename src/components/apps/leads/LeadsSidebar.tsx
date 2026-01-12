import React, { useState } from 'react';
import {
  Box,
  Drawer,
  useMediaQuery,
  Theme,
  TextField,
  List,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Typography,
  Button,
  Tabs,
  Tab,
  IconButton,
  Badge,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
import {
  IconPlus,
  IconSearch,
  IconBrandWhatsapp,
  IconBrandInstagram,
  IconWorld,
  IconPhone,
  IconMail,
  IconUsers,
  IconFilter,
  IconForms,
} from '@tabler/icons-react';
import { useLeads } from 'src/context/LeadsContext';
import { getStatusColor, type Lead } from 'src/data/mockData';
import { useSnackbar } from 'src/context/SnackbarContext';
import PublicLeadForm from './PublicLeadForm';

interface LeadsSidebarProps {
  isMobileSidebarOpen: boolean;
  onSidebarClose: () => void;
}

const LeadsSidebar: React.FC<LeadsSidebarProps> = ({
  isMobileSidebarOpen,
  onSidebarClose,
}) => {
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const {
    leads,
    selectedLead,
    setSelectedLead,
    filterStatus,
    setFilterStatus,
    searchQuery,
    setSearchQuery,
    addLead,
  } = useLeads();
  const { showSnackbar } = useSnackbar();

  const [openNewLeadDialog, setOpenNewLeadDialog] = useState(false);
  const [openPublicFormDialog, setOpenPublicFormDialog] = useState(false);
  const [newLeadData, setNewLeadData] = useState<Partial<Lead>>({
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    instagram: '',
    company: '',
    source: 'Website',
    status: 'Diskusi',
    priority: 'Sedang',
    projectType: '',
    estimatedBudget: undefined,
    notes: '',
  });

  // Filter leads
  let filteredLeads = leads;
  if (filterStatus !== 'all') {
    filteredLeads = leads.filter(lead => lead.status === filterStatus);
  }
  if (searchQuery) {
    filteredLeads = filteredLeads.filter(lead =>
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      (lead.company && lead.company.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }

  // Count by status
  const statusCounts = {
    all: leads.length,
    Diskusi: leads.filter(l => l.status === 'Diskusi').length,
    'Tindak Lanjut': leads.filter(l => l.status === 'Tindak Lanjut').length,
    Dikonversi: leads.filter(l => l.status === 'Dikonversi').length,
    Ditolak: leads.filter(l => l.status === 'Ditolak').length,
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'WhatsApp':
        return <IconBrandWhatsapp size={16} />;
      case 'Instagram':
        return <IconBrandInstagram size={16} />;
      case 'Website':
        return <IconWorld size={16} />;
      case 'Phone':
        return <IconPhone size={16} />;
      case 'Email':
        return <IconMail size={16} />;
      case 'Referral':
        return <IconUsers size={16} />;
      default:
        return <IconFilter size={16} />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Tinggi':
        return 'error';
      case 'Sedang':
        return 'warning';
      case 'Rendah':
        return 'info';
      default:
        return 'default';
    }
  };

  const handleAddLead = () => {
    if (!newLeadData.name || !newLeadData.email || !newLeadData.phone) {
      showSnackbar('Nama, email, dan telepon wajib diisi!', 'error');
      return;
    }

    const lead: Lead = {
      id: `lead-${Date.now()}`,
      name: newLeadData.name!,
      email: newLeadData.email!,
      phone: newLeadData.phone!,
      whatsapp: newLeadData.whatsapp,
      instagram: newLeadData.instagram,
      company: newLeadData.company,
      source: newLeadData.source || 'Website',
      status: newLeadData.status || 'Diskusi',
      priority: newLeadData.priority || 'Sedang',
      projectType: newLeadData.projectType,
      estimatedBudget: newLeadData.estimatedBudget,
      notes: newLeadData.notes,
      createdAt: new Date().toISOString().split('T')[0],
      lastContact: new Date().toISOString().split('T')[0],
    };

    addLead(lead);
    setOpenNewLeadDialog(false);
    showSnackbar('Lead baru berhasil ditambahkan!', 'success');
    
    // Reset form
    setNewLeadData({
      name: '',
      email: '',
      phone: '',
      whatsapp: '',
      instagram: '',
      company: '',
      source: 'Website',
      status: 'Diskusi',
      priority: 'Sedang',
      projectType: '',
      estimatedBudget: undefined,
      notes: '',
    });
  };

  const handlePublicFormSubmit = (lead: Partial<Lead>) => {
    addLead(lead as Lead);
    showSnackbar('Lead dari formulir publik berhasil ditambahkan!', 'success');
  };

  const SidebarContent = (
    <Box sx={{ p: 3, height: '100%' }}>
      {/* Header */}
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h5">Leads</Typography>
        <Box display="flex" gap={1}>
          <IconButton
            color="primary"
            size="small"
            onClick={() => setOpenPublicFormDialog(true)}
            title="Form Publik"
          >
            <IconForms size={18} />
          </IconButton>
          <Button
            variant="contained"
            color="primary"
            startIcon={<IconPlus size={18} />}
            onClick={() => setOpenNewLeadDialog(true)}
            size="small"
          >
            Tambah
          </Button>
        </Box>
      </Box>

      {/* Search */}
      <TextField
        fullWidth
        size="small"
        placeholder="Cari leads..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        slotProps={{
          input: {
            startAdornment: <IconSearch size={20} style={{ marginRight: 8 }} />,
          },
        }}
        sx={{ mb: 2 }}
      />

      {/* Status Tabs */}
      <Tabs
        value={filterStatus}
        onChange={(_e, newValue) => setFilterStatus(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 2 }}
      >
        <Tab
          label={
            <Badge badgeContent={statusCounts.all} color="primary">
              <span style={{ marginRight: 16 }}>Semua</span>
            </Badge>
          }
          value="all"
        />
        <Tab
          label={
            <Badge badgeContent={statusCounts.Diskusi} color="info">
              <span style={{ marginRight: 16 }}>Diskusi</span>
            </Badge>
          }
          value="Diskusi"
        />
        <Tab
          label={
            <Badge badgeContent={statusCounts['Tindak Lanjut']} color="warning">
              <span style={{ marginRight: 16 }}>Tindak Lanjut</span>
            </Badge>
          }
          value="Tindak Lanjut"
        />
        <Tab
          label={
            <Badge badgeContent={statusCounts.Dikonversi} color="success">
              <span style={{ marginRight: 16 }}>Dikonversi</span>
            </Badge>
          }
          value="Dikonversi"
        />
        <Tab
          label={
            <Badge badgeContent={statusCounts.Ditolak} color="error">
              <span style={{ marginRight: 16 }}>Ditolak</span>
            </Badge>
          }
          value="Ditolak"
        />
      </Tabs>

      <Divider sx={{ mb: 2 }} />

      {/* Leads List */}
      <List sx={{ overflow: 'auto', maxHeight: 'calc(100vh - 400px)' }}>
        {filteredLeads.length === 0 ? (
          <Box textAlign="center" py={4}>
            <Typography variant="body2" color="textSecondary">
              Tidak ada leads ditemukan
            </Typography>
          </Box>
        ) : (
          filteredLeads.map((lead) => (
            <ListItemButton
              key={lead.id}
              selected={selectedLead?.id === lead.id}
              onClick={() => {
                setSelectedLead(lead);
                if (!lgUp) onSidebarClose();
              }}
              sx={{
                mb: 1,
                borderRadius: 2,
                '&.Mui-selected': {
                  backgroundColor: 'primary.light',
                  '&:hover': {
                    backgroundColor: 'primary.light',
                  },
                },
              }}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  {lead.name.charAt(0).toUpperCase()}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="subtitle2" noWrap>
                      {lead.name}
                    </Typography>
                    <Chip
                      size="small"
                      label={lead.priority}
                      color={getPriorityColor(lead.priority) as any}
                      sx={{ height: 20, fontSize: '0.7rem' }}
                    />
                  </Box>
                }
                secondary={
                  <Box>
                    <Box display="flex" alignItems="center" gap={0.5} mt={0.5}>
                      {getSourceIcon(lead.source)}
                      <Typography variant="caption" color="textSecondary">
                        {lead.source}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        • {lead.projectType || 'N/A'}
                      </Typography>
                    </Box>
                    <Chip
                      size="small"
                      label={lead.status}
                      color={getStatusColor(lead.status) as any}
                      sx={{ mt: 0.5, height: 18, fontSize: '0.65rem' }}
                    />
                  </Box>
                }
              />
            </ListItemButton>
          ))
        )}
      </List>
    </Box>
  );

  if (lgUp) {
    return (
      <>
        <Drawer
          anchor="left"
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: 360,
              position: 'relative',
              border: 0,
            },
          }}
        >
          {SidebarContent}
        </Drawer>

        {/* Dialogs */}
        <NewLeadDialog
          open={openNewLeadDialog}
          onClose={() => setOpenNewLeadDialog(false)}
          onSave={handleAddLead}
          formData={newLeadData}
          setFormData={setNewLeadData}
        />

        <Dialog
          open={openPublicFormDialog}
          onClose={() => setOpenPublicFormDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Formulir Prospek Publik</DialogTitle>
          <DialogContent>
            <PublicLeadForm onSubmit={handlePublicFormSubmit} />
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <>
      <Drawer
        anchor="left"
        open={isMobileSidebarOpen}
        onClose={onSidebarClose}
        PaperProps={{
          sx: {
            width: 360,
          },
        }}
        variant="temporary"
      >
        {SidebarContent}
      </Drawer>

      {/* Dialogs */}
      <NewLeadDialog
        open={openNewLeadDialog}
        onClose={() => setOpenNewLeadDialog(false)}
        onSave={handleAddLead}
        formData={newLeadData}
        setFormData={setNewLeadData}
      />

      <Dialog
        open={openPublicFormDialog}
        onClose={() => setOpenPublicFormDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Formulir Prospek Publik</DialogTitle>
        <DialogContent>
          <PublicLeadForm onSubmit={handlePublicFormSubmit} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LeadsSidebar;


// Dialog Components (outside main component for better organization)
const NewLeadDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  formData: Partial<Lead>;
  setFormData: (data: Partial<Lead>) => void;
}> = ({ open, onClose, onSave, formData, setFormData }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Tambah Lead Baru</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid size={12}>
            <TextField
              fullWidth
              required
              label="Nama Lengkap"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              required
              label="Email"
              type="email"
              value={formData.email || ''}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              required
              label="Nomor Telepon"
              value={formData.phone || ''}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="WhatsApp"
              value={formData.whatsapp || ''}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Instagram"
              placeholder="@username"
              value={formData.instagram || ''}
              onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Nama Perusahaan"
              value={formData.company || ''}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth>
              <InputLabel>Sumber</InputLabel>
              <Select
                value={formData.source || 'Website'}
                label="Sumber"
                onChange={(e) => setFormData({ ...formData, source: e.target.value as any })}
              >
                <MenuItem value="WhatsApp">WhatsApp</MenuItem>
                <MenuItem value="Instagram">Instagram</MenuItem>
                <MenuItem value="Website">Website</MenuItem>
                <MenuItem value="Referral">Referral</MenuItem>
                <MenuItem value="Email">Email</MenuItem>
                <MenuItem value="Phone">Phone</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth>
              <InputLabel>Prioritas</InputLabel>
              <Select
                value={formData.priority || 'Sedang'}
                label="Prioritas"
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
              >
                <MenuItem value="Tinggi">Tinggi</MenuItem>
                <MenuItem value="Sedang">Sedang</MenuItem>
                <MenuItem value="Rendah">Rendah</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Tipe Proyek"
              value={formData.projectType || ''}
              onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Estimasi Budget"
              type="number"
              value={formData.estimatedBudget || ''}
              onChange={(e) => setFormData({ ...formData, estimatedBudget: Number(e.target.value) })}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Catatan"
              multiline
              rows={3}
              value={formData.notes || ''}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Batal</Button>
        <Button variant="contained" onClick={onSave}>
          Simpan
        </Button>
      </DialogActions>
    </Dialog>
  );
};
