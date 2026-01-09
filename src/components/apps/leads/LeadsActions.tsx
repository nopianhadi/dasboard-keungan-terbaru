import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  IconButton,
  Menu,
  MenuItem as MenuItemComponent,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import {
  IconEdit,
  IconTrash,
  IconUserCheck,
  IconDotsVertical,
  IconBrandWhatsapp,
  IconMail,
  IconPhone,
} from '@tabler/icons-react';
import { useLeads } from 'src/context/LeadsContext';
import { useSnackbar } from 'src/context/SnackbarContext';
import type { Lead } from 'src/data/mockData';

const LeadsActions: React.FC = () => {
  const { selectedLead, updateLead, deleteLead, convertToClient } = useLeads();
  const { showSnackbar } = useSnackbar();
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openConvertDialog, setOpenConvertDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [editFormData, setEditFormData] = useState<Partial<Lead>>({});

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    if (selectedLead) {
      setEditFormData(selectedLead);
      setOpenEditDialog(true);
    }
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
    handleMenuClose();
  };

  const handleConvertClick = () => {
    setOpenConvertDialog(true);
    handleMenuClose();
  };

  const handleUpdateLead = () => {
    if (selectedLead) {
      setLoading(true);
      setTimeout(() => {
        updateLead(selectedLead.id, editFormData);
        setOpenEditDialog(false);
        setLoading(false);
        showSnackbar('Lead berhasil diperbarui!', 'success');
      }, 500);
    }
  };

  const handleDeleteLead = () => {
    if (selectedLead) {
      setLoading(true);
      setTimeout(() => {
        deleteLead(selectedLead.id);
        setOpenDeleteDialog(false);
        setLoading(false);
        showSnackbar('Lead berhasil dihapus!', 'info');
      }, 500);
    }
  };

  const handleConvertToClient = () => {
    if (selectedLead) {
      setLoading(true);
      setTimeout(() => {
        const newClientId = `client-${Date.now()}`;
        const newProjectId = `project-${Date.now()}`;
        convertToClient(selectedLead.id, newClientId, newProjectId);
        setOpenConvertDialog(false);
        setLoading(false);
        showSnackbar('Lead berhasil dikonversi menjadi klien!', 'success');
      }, 500);
    }
  };

  const handleContactWhatsApp = () => {
    if (selectedLead?.whatsapp) {
      window.open(`https://wa.me/${selectedLead.whatsapp.replace(/\D/g, '')}`, '_blank');
      showSnackbar('Membuka WhatsApp...', 'info');
    }
  };

  const handleContactEmail = () => {
    if (selectedLead?.email) {
      window.location.href = `mailto:${selectedLead.email}`;
      showSnackbar('Membuka email client...', 'info');
    }
  };

  const handleContactPhone = () => {
    if (selectedLead?.phone) {
      window.location.href = `tel:${selectedLead.phone}`;
      showSnackbar('Membuka phone dialer...', 'info');
    }
  };

  if (!selectedLead) {
    return null;
  }

  return (
    <Box sx={{ p: 2, display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
      {/* Quick Contact Actions */}
      {selectedLead.whatsapp && (
        <Button
          variant="outlined"
          color="success"
          startIcon={<IconBrandWhatsapp size={18} />}
          onClick={handleContactWhatsApp}
          size="small"
        >
          WhatsApp
        </Button>
      )}
      <Button
        variant="outlined"
        color="primary"
        startIcon={<IconMail size={18} />}
        onClick={handleContactEmail}
        size="small"
      >
        Email
      </Button>
      <Button
        variant="outlined"
        color="info"
        startIcon={<IconPhone size={18} />}
        onClick={handleContactPhone}
        size="small"
      >
        Telepon
      </Button>

      <Box sx={{ flexGrow: 1 }} />

      {/* Main Actions */}
      {selectedLead.status !== 'Dikonversi' && (
        <Button
          variant="contained"
          color="success"
          startIcon={<IconUserCheck size={18} />}
          onClick={handleConvertClick}
        >
          Konversi ke Klien
        </Button>
      )}
      
      <IconButton onClick={handleMenuClick} color="primary">
        <IconDotsVertical />
      </IconButton>

      {/* Actions Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItemComponent onClick={handleEditClick}>
          <IconEdit size={18} style={{ marginRight: 8 }} />
          Edit Lead
        </MenuItemComponent>
        <MenuItemComponent onClick={handleDeleteClick}>
          <IconTrash size={18} style={{ marginRight: 8 }} />
          Hapus Lead
        </MenuItemComponent>
      </Menu>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Lead</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Nama"
                value={editFormData.name || ''}
                onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={editFormData.email || ''}
                onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Telepon"
                value={editFormData.phone || ''}
                onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="WhatsApp"
                value={editFormData.whatsapp || ''}
                onChange={(e) => setEditFormData({ ...editFormData, whatsapp: e.target.value })}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Instagram"
                value={editFormData.instagram || ''}
                onChange={(e) => setEditFormData({ ...editFormData, instagram: e.target.value })}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Perusahaan"
                value={editFormData.company || ''}
                onChange={(e) => setEditFormData({ ...editFormData, company: e.target.value })}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Sumber</InputLabel>
                <Select
                  value={editFormData.source || ''}
                  label="Sumber"
                  onChange={(e) => setEditFormData({ ...editFormData, source: e.target.value as any })}
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
                <InputLabel>Status</InputLabel>
                <Select
                  value={editFormData.status || ''}
                  label="Status"
                  onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value as any })}
                >
                  <MenuItem value="Diskusi">Diskusi</MenuItem>
                  <MenuItem value="Tindak Lanjut">Tindak Lanjut</MenuItem>
                  <MenuItem value="Dikonversi">Dikonversi</MenuItem>
                  <MenuItem value="Ditolak">Ditolak</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Prioritas</InputLabel>
                <Select
                  value={editFormData.priority || ''}
                  label="Prioritas"
                  onChange={(e) => setEditFormData({ ...editFormData, priority: e.target.value as any })}
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
                value={editFormData.projectType || ''}
                onChange={(e) => setEditFormData({ ...editFormData, projectType: e.target.value })}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Estimasi Budget"
                type="number"
                value={editFormData.estimatedBudget || ''}
                onChange={(e) => setEditFormData({ ...editFormData, estimatedBudget: Number(e.target.value) })}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Catatan"
                multiline
                rows={3}
                value={editFormData.notes || ''}
                onChange={(e) => setEditFormData({ ...editFormData, notes: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Batal</Button>
          <Button variant="contained" onClick={handleUpdateLead}>
            Simpan
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Hapus Lead</DialogTitle>
        <DialogContent>
          Apakah Anda yakin ingin menghapus lead <strong>{selectedLead.name}</strong>?
          Tindakan ini tidak dapat dibatalkan.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Batal</Button>
          <Button variant="contained" color="error" onClick={handleDeleteLead}>
            Hapus
          </Button>
        </DialogActions>
      </Dialog>

      {/* Convert to Client Dialog */}
      <Dialog open={openConvertDialog} onClose={() => setOpenConvertDialog(false)}>
        <DialogTitle>Konversi ke Klien</DialogTitle>
        <DialogContent>
          Apakah Anda yakin ingin mengkonversi lead <strong>{selectedLead.name}</strong> menjadi klien?
          Sistem akan membuat data klien baru dan proyek baru secara otomatis.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConvertDialog(false)}>Batal</Button>
          <Button variant="contained" color="success" onClick={handleConvertToClient}>
            Konversi
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
    </Box>
  );
};

export default LeadsActions;
