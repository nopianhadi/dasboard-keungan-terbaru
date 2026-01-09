import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Alert,
  CircularProgress,
} from '@mui/material';
import { IconSend, IconCheck } from '@tabler/icons-react';
import type { Lead } from 'src/data/mockData';

interface PublicLeadFormProps {
  onSubmit?: (lead: Partial<Lead>) => void;
}

const PublicLeadForm: React.FC<PublicLeadFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<Partial<Lead>>({
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    instagram: '',
    company: '',
    source: 'Website',
    projectType: '',
    estimatedBudget: undefined,
    notes: '',
    priority: 'Sedang',
    status: 'Diskusi',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name || !formData.email || !formData.phone) {
      setError('Nama, email, dan telepon wajib diisi');
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newLead: Lead = {
        id: `lead-${Date.now()}`,
        name: formData.name!,
        email: formData.email!,
        phone: formData.phone!,
        whatsapp: formData.whatsapp,
        instagram: formData.instagram,
        company: formData.company,
        source: formData.source || 'Website',
        status: 'Diskusi',
        priority: formData.priority || 'Sedang',
        projectType: formData.projectType,
        estimatedBudget: formData.estimatedBudget,
        notes: formData.notes,
        createdAt: new Date().toISOString().split('T')[0],
        lastContact: new Date().toISOString().split('T')[0],
      };

      if (onSubmit) {
        onSubmit(newLead);
      }

      setLoading(false);
      setSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          whatsapp: '',
          instagram: '',
          company: '',
          source: 'Website',
          projectType: '',
          estimatedBudget: undefined,
          notes: '',
          priority: 'Sedang',
          status: 'Diskusi',
        });
      }, 3000);
    }, 1000);
  };

  if (submitted) {
    return (
      <Card sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
        <CardContent sx={{ textAlign: 'center', py: 6 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              bgcolor: 'success.light',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3,
            }}
          >
            <IconCheck size={40} color="green" />
          </Box>
          <Typography variant="h4" mb={2}>
            Terima Kasih!
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Informasi Anda telah kami terima. Tim kami akan segera menghubungi Anda.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h4" mb={1}>
          Formulir Prospek
        </Typography>
        <Typography variant="body2" color="textSecondary" mb={3}>
          Isi formulir di bawah ini dan tim kami akan menghubungi Anda segera
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                fullWidth
                required
                label="Nama Lengkap"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                required
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                required
                label="Nomor Telepon"
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
              <TextField
                fullWidth
                label="Nama Perusahaan (Opsional)"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Dari Mana Anda Tahu Kami?</InputLabel>
                <Select
                  value={formData.source}
                  label="Dari Mana Anda Tahu Kami?"
                  onChange={(e) => setFormData({ ...formData, source: e.target.value as any })}
                >
                  <MenuItem value="Website">Website</MenuItem>
                  <MenuItem value="Instagram">Instagram</MenuItem>
                  <MenuItem value="WhatsApp">WhatsApp</MenuItem>
                  <MenuItem value="Referral">Referensi Teman</MenuItem>
                  <MenuItem value="Email">Email</MenuItem>
                  <MenuItem value="Phone">Telepon</MenuItem>
                  <MenuItem value="Other">Lainnya</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Tipe Proyek"
                placeholder="Wedding, Corporate, Product, dll"
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Estimasi Budget (Rp)"
                type="number"
                value={formData.estimatedBudget || ''}
                onChange={(e) => setFormData({ ...formData, estimatedBudget: Number(e.target.value) })}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Pesan / Kebutuhan Anda"
                multiline
                rows={4}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </Grid>
            <Grid size={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <IconSend />}
                disabled={loading}
              >
                {loading ? 'Mengirim...' : 'Kirim Formulir'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default PublicLeadForm;
