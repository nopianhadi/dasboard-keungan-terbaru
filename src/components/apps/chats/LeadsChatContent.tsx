import React, { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Stack,
  Chip,
  IconButton,
  Button,
  TextField,
  Paper,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  IconBrandWhatsapp,
  IconMapPin,
  IconCalendar,
  IconNotes,
  IconSend,
  IconUserCheck,
  IconEdit,
  IconArrowRight,
} from '@tabler/icons-react';
import { type Lead, formatDate, getStatusColor } from 'src/data/mockData';
import { useSnackbar } from 'src/context/SnackbarContext';

interface LeadsChatContentProps {
  selectedLead: Lead | null;
  onLeadUpdate: (leadId: string, updates: Partial<Lead>) => void;
  onConvertToClient: (lead: Lead) => void;
}

const LeadsChatContent: React.FC<LeadsChatContentProps> = ({
  selectedLead,
  onLeadUpdate,
  onConvertToClient,
}) => {
  const { showSnackbar } = useSnackbar();
  const [message, setMessage] = useState('');
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openConvertDialog, setOpenConvertDialog] = useState(false);
  const [editData, setEditData] = useState<Partial<Lead>>({});

  const handleSendMessage = () => {
    if (!message.trim() || !selectedLead) return;
    
    // Simulate sending message and updating lead
    const updates = {
      notes: selectedLead.notes ? `${selectedLead.notes}\n\n[${new Date().toLocaleString()}] ${message}` : message,
      updated_at: new Date().toISOString(),
    };
    
    onLeadUpdate(selectedLead.id, updates);
    setMessage('');
    showSnackbar('Pesan berhasil dikirim!', 'success');
  };

  const handleStatusUpdate = (newStatus: string) => {
    if (!selectedLead) return;
    
    onLeadUpdate(selectedLead.id, { 
      status: newStatus,
      updated_at: new Date().toISOString(),
    });
    showSnackbar(`Status lead berhasil diubah ke ${newStatus}!`, 'success');
  };

  const handleEditLead = () => {
    if (!selectedLead) return;
    
    onLeadUpdate(selectedLead.id, {
      ...editData,
      updated_at: new Date().toISOString(),
    });
    setOpenEditDialog(false);
    showSnackbar('Data lead berhasil diperbarui!', 'success');
  };

  const handleConvert = () => {
    if (!selectedLead) return;
    
    onConvertToClient(selectedLead);
    setOpenConvertDialog(false);
    showSnackbar(`Lead ${selectedLead.name} berhasil dikonversi menjadi klien!`, 'success');
  };

  React.useEffect(() => {
    if (selectedLead) {
      setEditData({
        name: selectedLead.name,
        contact_channel: selectedLead.contact_channel,
        location: selectedLead.location,
        whatsapp: selectedLead.whatsapp,
        notes: selectedLead.notes,
      });
    }
  }, [selectedLead]);

  if (!selectedLead) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100%"
        bgcolor="grey.50"
      >
        <Stack alignItems="center" spacing={2}>
          <Avatar sx={{ width: 64, height: 64, bgcolor: 'grey.300' }}>
            <IconUserCheck size={32} />
          </Avatar>
          <Typography variant="h6" color="textSecondary">
            Pilih lead untuk memulai percakapan
          </Typography>
        </Stack>
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" height="100%">
      {/* Header */}
      <Paper
        elevation={1}
        sx={{
          p: 2,
          borderRadius: 0,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar
            sx={{
              width: 48,
              height: 48,
              bgcolor: 'primary.main',
            }}
          >
            {selectedLead.name.charAt(0).toUpperCase()}
          </Avatar>
          
          <Box flex={1}>
            <Typography variant="h6" fontWeight={600}>
              {selectedLead.name}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Chip
                label={selectedLead.status}
                size="small"
                color={getStatusColor(selectedLead.status) as any}
              />
              <Typography variant="caption" color="textSecondary">
                • {selectedLead.contact_channel}
              </Typography>
              {selectedLead.location && (
                <Typography variant="caption" color="textSecondary">
                  • {selectedLead.location}
                </Typography>
              )}
            </Stack>
          </Box>

          <Stack direction="row" spacing={1}>
            {selectedLead.whatsapp && (
              <IconButton
                color="success"
                onClick={() => window.open(`https://wa.me/${selectedLead.whatsapp?.replace(/\D/g, '')}`)}
              >
                <IconBrandWhatsapp />
              </IconButton>
            )}
            <IconButton onClick={() => setOpenEditDialog(true)}>
              <IconEdit />
            </IconButton>
            {selectedLead.status !== 'Dikonversi' && selectedLead.status !== 'Ditolak' && (
              <Button
                variant="contained"
                size="small"
                startIcon={<IconArrowRight />}
                onClick={() => setOpenConvertDialog(true)}
              >
                Konversi
              </Button>
            )}
          </Stack>
        </Stack>
      </Paper>

      {/* Lead Details */}
      <Box sx={{ p: 2, bgcolor: 'grey.50', borderBottom: 1, borderColor: 'divider' }}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={3}>
            <Box display="flex" alignItems="center" gap={1}>
              <IconCalendar size={16} />
              <Typography variant="body2">
                <strong>Tanggal:</strong> {formatDate(selectedLead.date)}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <IconMapPin size={16} />
              <Typography variant="body2">
                <strong>Lokasi:</strong> {selectedLead.location || 'Tidak ada'}
              </Typography>
            </Box>
          </Stack>
          
          {selectedLead.notes && (
            <Box>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <IconNotes size={16} />
                <Typography variant="body2" fontWeight={600}>
                  Catatan:
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', pl: 3 }}>
                {selectedLead.notes}
              </Typography>
            </Box>
          )}

          {selectedLead.converted_to_client_id && (
            <Alert severity="success">
              Lead ini telah dikonversi menjadi klien pada {formatDate(selectedLead.converted_at || selectedLead.updated_at)}
            </Alert>
          )}
        </Stack>
      </Box>

      {/* Quick Actions */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="subtitle2" fontWeight={600} mb={1}>
          Quick Actions:
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => handleStatusUpdate('Sedang Diskusi')}
            disabled={selectedLead.status === 'Sedang Diskusi'}
          >
            Sedang Diskusi
          </Button>
          <Button
            size="small"
            variant="outlined"
            onClick={() => handleStatusUpdate('Menunggu Follow Up')}
            disabled={selectedLead.status === 'Menunggu Follow Up'}
          >
            Follow Up
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={() => handleStatusUpdate('Ditolak')}
            disabled={selectedLead.status === 'Ditolak'}
          >
            Tolak
          </Button>
        </Stack>
      </Box>

      {/* Chat Area */}
      <Box flex={1} sx={{ p: 2, bgcolor: 'grey.50' }}>
        <Typography variant="body2" color="textSecondary" textAlign="center">
          Riwayat percakapan akan muncul di sini
        </Typography>
      </Box>

      {/* Message Input */}
      {selectedLead.status !== 'Dikonversi' && selectedLead.status !== 'Ditolak' && (
        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Stack direction="row" spacing={1} alignItems="flex-end">
            <TextField
              fullWidth
              multiline
              maxRows={3}
              placeholder="Tulis pesan atau catatan..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <IconButton
              color="primary"
              onClick={handleSendMessage}
              disabled={!message.trim()}
            >
              <IconSend />
            </IconButton>
          </Stack>
        </Box>
      )}

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Lead</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Nama"
              value={editData.name || ''}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            />
            <FormControl fullWidth>
              <InputLabel>Channel Kontak</InputLabel>
              <Select
                value={editData.contact_channel || ''}
                label="Channel Kontak"
                onChange={(e) => setEditData({ ...editData, contact_channel: e.target.value })}
              >
                <MenuItem value="WhatsApp">WhatsApp</MenuItem>
                <MenuItem value="Instagram">Instagram</MenuItem>
                <MenuItem value="Website">Website</MenuItem>
                <MenuItem value="Telepon">Telepon</MenuItem>
                <MenuItem value="Referensi">Referensi</MenuItem>
                <MenuItem value="Lainnya">Lainnya</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Lokasi"
              value={editData.location || ''}
              onChange={(e) => setEditData({ ...editData, location: e.target.value })}
            />
            <TextField
              fullWidth
              label="WhatsApp"
              value={editData.whatsapp || ''}
              onChange={(e) => setEditData({ ...editData, whatsapp: e.target.value })}
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Catatan"
              value={editData.notes || ''}
              onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Batal</Button>
          <Button variant="contained" onClick={handleEditLead}>Simpan</Button>
        </DialogActions>
      </Dialog>

      {/* Convert Dialog */}
      <Dialog open={openConvertDialog} onClose={() => setOpenConvertDialog(false)}>
        <DialogTitle>Konversi ke Klien</DialogTitle>
        <DialogContent>
          <Typography>
            Apakah Anda yakin ingin mengkonversi lead <strong>{selectedLead.name}</strong> menjadi klien?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConvertDialog(false)}>Batal</Button>
          <Button variant="contained" onClick={handleConvert}>Konversi</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LeadsChatContent;