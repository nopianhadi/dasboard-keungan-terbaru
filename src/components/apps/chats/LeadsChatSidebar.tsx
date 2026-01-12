import React, { useState } from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  TextField,
  InputAdornment,
  Chip,
  Badge,
  Stack,
  Button,
  Menu,
  MenuItem,
  Alert,
} from '@mui/material';
import {
  IconSearch,
  IconChevronDown,
  IconBrandWhatsapp,
  IconMapPin,
  IconCalendar,
} from '@tabler/icons-react';
import { mockLeads, type Lead } from 'src/data/mockData';
import Scrollbar from '../../custom-scroll/Scrollbar';

interface LeadsChatSidebarProps {
  selectedLead: Lead | null;
  onLeadSelect: (lead: Lead) => void;
}

const LeadsChatSidebar: React.FC<LeadsChatSidebarProps> = ({
  selectedLead,
  onLeadSelect,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Filter leads based on search and status
  const filteredLeads = mockLeads.filter((lead) => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.whatsapp?.includes(searchQuery);
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Sedang Diskusi':
        return 'info';
      case 'Menunggu Follow Up':
        return 'warning';
      case 'Dikonversi':
        return 'success';
      case 'Ditolak':
        return 'error';
      default:
        return 'default';
    }
  };

  const getLastActivityText = (lead: Lead) => {
    const daysSince = Math.floor((new Date().getTime() - new Date(lead.updated_at).getTime()) / (1000 * 60 * 60 * 24));
    if (daysSince === 0) return 'Hari ini';
    if (daysSince === 1) return 'Kemarin';
    return `${daysSince} hari lalu`;
  };

  return (
    <Box sx={{ width: 320, height: '100%', borderRight: 1, borderColor: 'divider' }}>
      {/* Header */}
      <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Leads Chat
        </Typography>
        
        {/* Search */}
        <TextField
          fullWidth
          size="small"
          placeholder="Cari leads..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <IconSearch size={18} />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      {/* Filter */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Button
          onClick={handleMenuClick}
          color="inherit"
          endIcon={<IconChevronDown size={16} />}
          size="small"
        >
          {statusFilter === 'all' ? 'Semua Status' : statusFilter}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => { setStatusFilter('all'); handleMenuClose(); }}>
            Semua Status
          </MenuItem>
          <MenuItem onClick={() => { setStatusFilter('Sedang Diskusi'); handleMenuClose(); }}>
            Sedang Diskusi
          </MenuItem>
          <MenuItem onClick={() => { setStatusFilter('Menunggu Follow Up'); handleMenuClose(); }}>
            Menunggu Follow Up
          </MenuItem>
          <MenuItem onClick={() => { setStatusFilter('Dikonversi'); handleMenuClose(); }}>
            Dikonversi
          </MenuItem>
          <MenuItem onClick={() => { setStatusFilter('Ditolak'); handleMenuClose(); }}>
            Ditolak
          </MenuItem>
        </Menu>
      </Box>

      {/* Leads List */}
      <Scrollbar sx={{ height: 'calc(100vh - 200px)' }}>
        <List sx={{ p: 0 }}>
          {filteredLeads.length > 0 ? (
            filteredLeads.map((lead) => (
              <ListItemButton
                key={lead.id}
                selected={selectedLead?.id === lead.id}
                onClick={() => onLeadSelect(lead)}
                sx={{
                  py: 2,
                  px: 3,
                  borderBottom: 1,
                  borderColor: 'divider',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <ListItemAvatar>
                  <Badge
                    color={lead.whatsapp ? 'success' : 'default'}
                    variant="dot"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    overlap="circular"
                  >
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        bgcolor: 'primary.main',
                        fontSize: '0.875rem',
                      }}
                    >
                      {lead.name.charAt(0).toUpperCase()}
                    </Avatar>
                  </Badge>
                </ListItemAvatar>
                
                <ListItemText
                  primary={
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600} noWrap>
                        {lead.name}
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center" mt={0.5}>
                        <Chip
                          label={lead.status}
                          size="small"
                          color={getStatusColor(lead.status) as any}
                          sx={{ fontSize: '0.7rem', height: 20 }}
                        />
                      </Stack>
                    </Box>
                  }
                  secondary={
                    <Box mt={1}>
                      <Stack spacing={0.5}>
                        {lead.location && (
                          <Box display="flex" alignItems="center" gap={0.5}>
                            <IconMapPin size={12} />
                            <Typography variant="caption" color="textSecondary">
                              {lead.location}
                            </Typography>
                          </Box>
                        )}
                        <Box display="flex" alignItems="center" gap={0.5}>
                          <IconBrandWhatsapp size={12} />
                          <Typography variant="caption" color="textSecondary">
                            {lead.contact_channel}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={0.5}>
                          <IconCalendar size={12} />
                          <Typography variant="caption" color="textSecondary">
                            {getLastActivityText(lead)}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  }
                />
              </ListItemButton>
            ))
          ) : (
            <Box p={3}>
              <Alert severity="info">
                Tidak ada leads ditemukan
              </Alert>
            </Box>
          )}
        </List>
      </Scrollbar>
    </Box>
  );
};

export default LeadsChatSidebar;