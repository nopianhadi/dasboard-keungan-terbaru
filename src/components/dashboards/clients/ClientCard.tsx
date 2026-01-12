import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Avatar,
  IconButton,
  Box,
  Stack,
  Tooltip,
  Rating,
} from '@mui/material';
import {
  IconDotsVertical,
  IconMail,
  IconPhone,
  IconBriefcase,
  IconBrandWhatsapp,
  IconBrandInstagram,
} from '@tabler/icons-react';
import { formatCurrency, getStatusColor, type Client } from 'src/data/mockData';

interface ClientCardProps {
  client: Client;
  onMenuClick: (event: React.MouseEvent<HTMLElement>, client: Client) => void;
}

const ClientCard: React.FC<ClientCardProps> = ({ client, onMenuClick }) => {
  return (
    <Card
      sx={{
        height: '100%',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="start" mb={2}>
          <Stack direction="row" spacing={2} flex={1}>
            <Avatar
              sx={{
                width: 56,
                height: 56,
                bgcolor: 'primary.main',
                fontSize: '1.5rem',
                fontWeight: 700,
              }}
            >
              {client.name.charAt(0).toUpperCase()}
            </Avatar>
            <Box flex={1}>
              <Typography variant="h6" gutterBottom noWrap>
                {client.name}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Chip
                  label={client.status}
                  color={getStatusColor(client.status)}
                  size="small"
                />
                {client.clientType === 'Vendor' && (
                  <Chip label="Vendor" size="small" variant="outlined" />
                )}
              </Stack>
            </Box>
          </Stack>
          <Tooltip title="Opsi">
            <IconButton size="small" onClick={(e) => onMenuClick(e, client)}>
              <IconDotsVertical size={18} />
            </IconButton>
          </Tooltip>
        </Stack>

        <Stack spacing={1.5} mb={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconMail size={16} color="#5D87FF" />
            <Typography variant="body2" color="textSecondary" noWrap>
              {client.email}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconPhone size={16} color="#5D87FF" />
            <Typography variant="body2" color="textSecondary">
              {client.phone}
            </Typography>
          </Stack>
          {client.whatsapp && (
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconBrandWhatsapp size={16} color="#25D366" />
              <Typography variant="body2" color="textSecondary">
                {client.whatsapp}
              </Typography>
            </Stack>
          )}
          {client.instagram && (
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconBrandInstagram size={16} color="#E4405F" />
              <Typography variant="body2" color="textSecondary">
                {client.instagram}
              </Typography>
            </Stack>
          )}
        </Stack>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          pt={2}
          borderTop={1}
          borderColor="divider"
        >
          <Box>
            <Stack direction="row" alignItems="center" spacing={1} mb={0.5}>
              <IconBriefcase size={16} />
              <Typography variant="caption" color="textSecondary">
                {client.totalProjects || 0} Proyek
              </Typography>
            </Stack>
            <Typography variant="h6" fontWeight={600} color="primary.main">
              {formatCurrency(client.totalSpent || 0)}
            </Typography>
          </Box>
          {client.rating && client.rating > 0 && (
            <Box>
              <Rating value={client.rating} readOnly size="small" precision={0.5} />
              <Typography variant="caption" color="textSecondary" display="block" textAlign="center">
                {client.rating.toFixed(1)}
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ClientCard;
