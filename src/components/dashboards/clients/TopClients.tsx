import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Avatar,
  Stack,
  Chip,
  Box,
  Rating,
  Tooltip,
} from '@mui/material';
import { IconTrophy, IconBriefcase } from '@tabler/icons-react';
import DashboardCard from '../../shared/DashboardCard';
import { formatCurrency, getStatusColor, type Client } from 'src/data/mockData';

interface TopClientsProps {
  clients: Client[];
}

const TopClients: React.FC<TopClientsProps> = ({ clients }) => {
  // Sort by totalSpent and get top 5
  const topClients = [...clients]
    .sort((a, b) => (b.totalSpent || 0) - (a.totalSpent || 0))
    .slice(0, 5);

  return (
    <DashboardCard
      title="Top 5 Klien"
      subtitle="Berdasarkan total transaksi"
      action={
        <Tooltip title="Top Clients">
          <Avatar sx={{ bgcolor: 'warning.light', width: 40, height: 40 }}>
            <IconTrophy size={20} color="#FFAE1F" />
          </Avatar>
        </Tooltip>
      }
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Rank
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Klien
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Status
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Proyek
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2" fontWeight={600}>
                  Total Transaksi
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="subtitle2" fontWeight={600}>
                  Rating
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topClients.map((client, index) => (
              <TableRow
                key={client.id}
                hover
                sx={{
                  '&:hover': {
                    bgcolor: 'action.hover',
                    cursor: 'pointer',
                  },
                }}
              >
                <TableCell>
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor:
                        index === 0
                          ? 'warning.main'
                          : index === 1
                          ? 'grey.400'
                          : index === 2
                          ? '#CD7F32'
                          : 'grey.300',
                      fontSize: '0.875rem',
                      fontWeight: 700,
                    }}
                  >
                    {index + 1}
                  </Avatar>
                </TableCell>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Avatar
                      sx={{
                        bgcolor: 'primary.main',
                        width: 36,
                        height: 36,
                        fontSize: '1rem',
                      }}
                    >
                      {client.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={600}>
                        {client.name}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {client.email}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Chip
                    label={client.status}
                    size="small"
                    color={getStatusColor(client.status)}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <IconBriefcase size={16} />
                    <Typography variant="body2">{client.totalProjects || 0}</Typography>
                  </Stack>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6" fontWeight={700} color="primary.main">
                    {formatCurrency(client.totalSpent || 0)}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  {client.rating && client.rating > 0 ? (
                    <Box>
                      <Rating value={client.rating} readOnly size="small" precision={0.5} />
                      <Typography variant="caption" color="textSecondary">
                        {client.rating.toFixed(1)}
                      </Typography>
                    </Box>
                  ) : (
                    <Typography variant="caption" color="textSecondary">
                      -
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardCard>
  );
};

export default TopClients;
