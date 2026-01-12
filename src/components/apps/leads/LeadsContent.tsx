import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Chip,
  Grid,
  Card,
  CardContent,
  Divider,
  Avatar,
  Stack,
  LinearProgress,
} from '@mui/material';
import {
  IconMenu2,
  IconBrandWhatsapp,
  IconBrandInstagram,
  IconWorld,
  IconPhone,
  IconMail,
  IconUsers,
  IconCalendar,
  IconCurrencyDollar,
  IconNotes,
  IconBuilding,
  IconStar,
  IconTrendingUp,
  IconUserCheck,
  IconClock,
} from '@tabler/icons-react';
import { useLeads } from 'src/context/LeadsContext';
import { getStatusColor, formatCurrency, formatDate } from 'src/data/mockData';
import ChatTemplates from './ChatTemplates';

interface LeadsContentProps {
  toggleLeadsSidebar: () => void;
}

const LeadsContent: React.FC<LeadsContentProps> = ({ toggleLeadsSidebar }) => {
  const { selectedLead, leads } = useLeads();

  // Calculate statistics
  const totalLeads = leads.length;
  const diskusiLeads = leads.filter((l) => l.status === 'Diskusi').length;
  const tindakLanjutLeads = leads.filter((l) => l.status === 'Tindak Lanjut').length;
  const dikonversiLeads = leads.filter((l) => l.status === 'Dikonversi').length;
  const conversionRate = totalLeads > 0 ? (dikonversiLeads / totalLeads) * 100 : 0;

  if (!selectedLead) {
    return (
      <Box sx={{ p: 3 }}>
        {/* Mini Dashboard - Always visible */}
        <Grid container spacing={2} mb={3}>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Card elevation={0} sx={{ bgcolor: 'primary.light', height: '100%' }}>
              <CardContent sx={{ p: 2 }}>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <IconUsers size={18} />
                  <Typography variant="caption" fontWeight={600}>
                    Total
                  </Typography>
                </Box>
                <Typography variant="h5" fontWeight={700}>
                  {totalLeads}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Card elevation={0} sx={{ bgcolor: 'warning.light', height: '100%' }}>
              <CardContent sx={{ p: 2 }}>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <IconClock size={18} />
                  <Typography variant="caption" fontWeight={600}>
                    Follow Up
                  </Typography>
                </Box>
                <Typography variant="h5" fontWeight={700}>
                  {tindakLanjutLeads}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Card elevation={0} sx={{ bgcolor: 'success.light', height: '100%' }}>
              <CardContent sx={{ p: 2 }}>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <IconUserCheck size={18} />
                  <Typography variant="caption" fontWeight={600}>
                    Converted
                  </Typography>
                </Box>
                <Typography variant="h5" fontWeight={700}>
                  {dikonversiLeads}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Card elevation={0} sx={{ bgcolor: 'info.light', height: '100%' }}>
              <CardContent sx={{ p: 2 }}>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <IconTrendingUp size={18} />
                  <Typography variant="caption" fontWeight={600}>
                    Rate
                  </Typography>
                </Box>
                <Typography variant="h5" fontWeight={700}>
                  {conversionRate.toFixed(0)}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Quick Stats */}
        <Card variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="subtitle2" fontWeight={600} mb={2}>
              Status Overview
            </Typography>
            <Stack spacing={1.5}>
              <Box>
                <Box display="flex" justifyContent="space-between" mb={0.5}>
                  <Typography variant="caption">Diskusi</Typography>
                  <Typography variant="caption" fontWeight={600}>
                    {diskusiLeads}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(diskusiLeads / totalLeads) * 100}
                  color="info"
                  sx={{ height: 6, borderRadius: 1 }}
                />
              </Box>
              <Box>
                <Box display="flex" justifyContent="space-between" mb={0.5}>
                  <Typography variant="caption">Tindak Lanjut</Typography>
                  <Typography variant="caption" fontWeight={600}>
                    {tindakLanjutLeads}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(tindakLanjutLeads / totalLeads) * 100}
                  color="warning"
                  sx={{ height: 6, borderRadius: 1 }}
                />
              </Box>
              <Box>
                <Box display="flex" justifyContent="space-between" mb={0.5}>
                  <Typography variant="caption">Dikonversi</Typography>
                  <Typography variant="caption" fontWeight={600}>
                    {dikonversiLeads}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(dikonversiLeads / totalLeads) * 100}
                  color="success"
                  sx={{ height: 6, borderRadius: 1 }}
                />
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Empty State */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '40vh',
            flexDirection: 'column',
          }}
        >
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: 'primary.light',
              mb: 2,
            }}
          >
            <IconUsers size={40} />
          </Avatar>
          <Typography variant="h6" color="textSecondary">
            Pilih Lead untuk Melihat Detail
          </Typography>
          <Typography variant="body2" color="textSecondary" mt={1}>
            Klik pada lead di sidebar untuk melihat informasi lengkap
          </Typography>
        </Box>
      </Box>
    );
  }

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'WhatsApp':
        return <IconBrandWhatsapp size={20} />;
      case 'Instagram':
        return <IconBrandInstagram size={20} />;
      case 'Website':
        return <IconWorld size={20} />;
      case 'Phone':
        return <IconPhone size={20} />;
      case 'Email':
        return <IconMail size={20} />;
      case 'Referral':
        return <IconUsers size={20} />;
      default:
        return <IconUsers size={20} />;
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

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton onClick={toggleLeadsSidebar} sx={{ display: { lg: 'none' } }}>
            <IconMenu2 />
          </IconButton>
          <Avatar
            sx={{
              width: 45,
              height: 45,
              bgcolor: 'primary.main',
            }}
          >
            {selectedLead.name.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h6">{selectedLead.name}</Typography>
            <Box display="flex" alignItems="center" gap={0.5} mt={0.5}>
              <Chip
                size="small"
                label={selectedLead.status}
                color={getStatusColor(selectedLead.status) as any}
                sx={{ height: 20, fontSize: '0.7rem' }}
              />
              <Chip
                size="small"
                label={selectedLead.priority}
                color={getPriorityColor(selectedLead.priority) as any}
                sx={{ height: 20, fontSize: '0.7rem' }}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      <Divider />

      {/* Content */}
      <Box sx={{ p: 2, overflow: 'auto', maxHeight: 'calc(100vh - 280px)' }}>
        <Grid container spacing={2}>
          {/* Contact Information */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent sx={{ p: 2 }}>
                <Typography variant="subtitle2" fontWeight={600} mb={2}>
                  Informasi Kontak
                </Typography>
                <Stack spacing={1.5}>
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <IconMail size={18} />
                    <Box>
                      <Typography variant="caption" color="textSecondary" display="block">
                        Email
                      </Typography>
                      <Typography variant="body2">{selectedLead.email}</Typography>
                    </Box>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <IconPhone size={18} />
                    <Box>
                      <Typography variant="caption" color="textSecondary" display="block">
                        Telepon
                      </Typography>
                      <Typography variant="body2">{selectedLead.phone}</Typography>
                    </Box>
                  </Box>
                  {selectedLead.whatsapp && (
                    <Box display="flex" alignItems="center" gap={1.5}>
                      <IconBrandWhatsapp size={18} />
                      <Box>
                        <Typography variant="caption" color="textSecondary" display="block">
                          WhatsApp
                        </Typography>
                        <Typography variant="body2">{selectedLead.whatsapp}</Typography>
                      </Box>
                    </Box>
                  )}
                  {selectedLead.instagram && (
                    <Box display="flex" alignItems="center" gap={1.5}>
                      <IconBrandInstagram size={18} />
                      <Box>
                        <Typography variant="caption" color="textSecondary" display="block">
                          Instagram
                        </Typography>
                        <Typography variant="body2">{selectedLead.instagram}</Typography>
                      </Box>
                    </Box>
                  )}
                  {selectedLead.website && (
                    <Box display="flex" alignItems="center" gap={1.5}>
                      <IconWorld size={18} />
                      <Box>
                        <Typography variant="caption" color="textSecondary" display="block">
                          Website
                        </Typography>
                        <Typography variant="body2">{selectedLead.website}</Typography>
                      </Box>
                    </Box>
                  )}
                  {selectedLead.company && (
                    <Box display="flex" alignItems="center" gap={1.5}>
                      <IconBuilding size={18} />
                      <Box>
                        <Typography variant="caption" color="textSecondary" display="block">
                          Perusahaan
                        </Typography>
                        <Typography variant="body2">{selectedLead.company}</Typography>
                      </Box>
                    </Box>
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Lead Details */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent sx={{ p: 2 }}>
                <Typography variant="subtitle2" fontWeight={600} mb={2}>
                  Detail Lead
                </Typography>
                <Stack spacing={1.5}>
                  <Box display="flex" alignItems="center" gap={1.5}>
                    {getSourceIcon(selectedLead.source)}
                    <Box>
                      <Typography variant="caption" color="textSecondary" display="block">
                        Sumber Lead
                      </Typography>
                      <Typography variant="body2">{selectedLead.source}</Typography>
                    </Box>
                  </Box>
                  {selectedLead.projectType && (
                    <Box display="flex" alignItems="center" gap={1.5}>
                      <IconStar size={18} />
                      <Box>
                        <Typography variant="caption" color="textSecondary" display="block">
                          Tipe Proyek
                        </Typography>
                        <Typography variant="body2">{selectedLead.projectType}</Typography>
                      </Box>
                    </Box>
                  )}
                  {selectedLead.estimatedBudget && (
                    <Box display="flex" alignItems="center" gap={1.5}>
                      <IconCurrencyDollar size={18} />
                      <Box>
                        <Typography variant="caption" color="textSecondary" display="block">
                          Estimasi Budget
                        </Typography>
                        <Typography variant="body2" fontWeight={600} color="primary">
                          {formatCurrency(selectedLead.estimatedBudget)}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <IconCalendar size={18} />
                    <Box>
                      <Typography variant="caption" color="textSecondary" display="block">
                        Tanggal Dibuat
                      </Typography>
                      <Typography variant="body2">{formatDate(selectedLead.createdAt)}</Typography>
                    </Box>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <IconCalendar size={18} />
                    <Box>
                      <Typography variant="caption" color="textSecondary" display="block">
                        Kontak Terakhir
                      </Typography>
                      <Typography variant="body2">
                        {formatDate(selectedLead.lastContact)}
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Notes */}
          {selectedLead.notes && (
            <Grid size={12}>
              <Card variant="outlined">
                <CardContent sx={{ p: 2 }}>
                  <Box display="flex" alignItems="center" gap={1} mb={1.5}>
                    <IconNotes size={18} />
                    <Typography variant="subtitle2" fontWeight={600}>
                      Catatan
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="textSecondary">
                    {selectedLead.notes}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )}

          {/* Chat Templates */}
          <Grid size={12}>
            <ChatTemplates lead={selectedLead} />
          </Grid>

          {/* Conversion Info */}
          {selectedLead.status === 'Dikonversi' && (
            <Grid size={12}>
              <Card variant="outlined" sx={{ bgcolor: 'success.light' }}>
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="subtitle2" fontWeight={600} mb={1.5} color="success.dark">
                    ✓ Lead Berhasil Dikonversi
                  </Typography>
                  <Stack spacing={0.5}>
                    {selectedLead.convertedToClientId && (
                      <Typography variant="body2">
                        <strong>Client ID:</strong> {selectedLead.convertedToClientId}
                      </Typography>
                    )}
                    {selectedLead.convertedToProjectId && (
                      <Typography variant="body2">
                        <strong>Project ID:</strong> {selectedLead.convertedToProjectId}
                      </Typography>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default LeadsContent;
