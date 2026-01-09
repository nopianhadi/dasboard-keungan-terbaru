import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Avatar,
  IconButton,
  Stack,
} from '@mui/material';
import {
  IconDotsVertical,
  IconBrandWhatsapp,
  IconBrandInstagram,
  IconWorld,
  IconPhone,
  IconMail,
  IconUsers,
  IconCurrencyDollar,
} from '@tabler/icons-react';
import { getStatusColor, formatCurrency, type Lead } from 'src/data/mockData';

interface LeadCardProps {
  lead: Lead;
  onMenuClick?: (event: React.MouseEvent<HTMLElement>, lead: Lead) => void;
  onClick?: (lead: Lead) => void;
}

const LeadCard: React.FC<LeadCardProps> = ({ lead, onMenuClick, onClick }) => {
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
        return <IconUsers size={16} />;
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
    <Card
      elevation={0}
      sx={{
        height: '100%',
        border: '1px solid',
        borderColor: 'divider',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.3s',
        '&:hover': onClick
          ? {
              transform: 'translateY(-4px)',
              boxShadow: 3,
            }
          : {},
      }}
      onClick={() => onClick && onClick(lead)}
    >
      <CardContent>
        <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={2}>
          <Avatar
            sx={{
              bgcolor: 'primary.main',
              width: 48,
              height: 48,
            }}
          >
            {lead.name.charAt(0).toUpperCase()}
          </Avatar>
          {onMenuClick && (
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onMenuClick(e, lead);
              }}
            >
              <IconDotsVertical size={18} />
            </IconButton>
          )}
        </Box>

        <Typography variant="h6" fontWeight={600} mb={0.5} noWrap>
          {lead.name}
        </Typography>

        {lead.company && (
          <Typography variant="caption" color="textSecondary" display="block" mb={1}>
            {lead.company}
          </Typography>
        )}

        <Stack direction="row" spacing={0.5} mb={2} flexWrap="wrap" gap={0.5}>
          <Chip
            size="small"
            label={lead.status}
            color={getStatusColor(lead.status) as any}
          />
          <Chip
            size="small"
            label={lead.priority}
            color={getPriorityColor(lead.priority) as any}
          />
        </Stack>

        <Box display="flex" alignItems="center" gap={1} mb={1}>
          {getSourceIcon(lead.source)}
          <Typography variant="body2" color="textSecondary">
            {lead.source}
          </Typography>
        </Box>

        {lead.projectType && (
          <Typography variant="body2" color="textSecondary" mb={1}>
            <strong>Proyek:</strong> {lead.projectType}
          </Typography>
        )}

        {lead.estimatedBudget && (
          <Box display="flex" alignItems="center" gap={1} mt={2}>
            <IconCurrencyDollar size={18} />
            <Typography variant="body2" fontWeight={600} color="primary">
              {formatCurrency(lead.estimatedBudget)}
            </Typography>
          </Box>
        )}

        <Typography variant="caption" color="textSecondary" display="block" mt={2}>
          {lead.email}
        </Typography>
        <Typography variant="caption" color="textSecondary" display="block">
          {lead.phone}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default LeadCard;
