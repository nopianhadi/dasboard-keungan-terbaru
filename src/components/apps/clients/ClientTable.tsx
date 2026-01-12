import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Collapse,
  Typography,
  Chip,
  Stack,
  Avatar,
  Paper,
  Rating,
} from '@mui/material';
import {
  IconChevronDown,
  IconChevronUp,
  IconDotsVertical,
  IconCalendar,
  IconCurrencyDollar,
  IconMail,
  IconPhone,
  IconBrandWhatsapp,
  IconBrandInstagram,
  IconStar,
  IconBriefcase,
} from '@tabler/icons-react';
import { formatCurrency, formatDate, getStatusColor, type Client } from 'src/data/mockData';

interface ClientTableProps {
  clients: Client[];
  onMenuAction: (event: React.MouseEvent<HTMLElement>, client: Client) => void;
}

interface RowProps {
  client: Client;
  onMenuAction: (event: React.MouseEvent<HTMLElement>, client: Client) => void;
}

const ClientRow: React.FC<RowProps> = ({ client, onMenuAction }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow
        hover
        sx={{
          '& > *': { borderBottom: 'unset' },
          cursor: 'pointer',
          bgcolor: open ? 'action.hover' : 'inherit',
        }}
      >
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <IconChevronUp size={18} /> : <IconChevronDown size={18} />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Box display="flex" alignItems="center" gap={1.5}>
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: 'primary.main',
                fontSize: '0.875rem',
              }}
            >
              {client.name.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                {client.name}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {client.email}
              </Typography>
            </Box>
          </Box>
        </TableCell>
        <TableCell>
          <Typography variant="body2">{client.phone}</Typography>
        </TableCell>
        <TableCell>
          <Chip
            label={client.clientType}
            size="small"
            variant="outlined"
            sx={{ fontWeight: 500 }}
          />
        </TableCell>
        <TableCell>
          <Chip
            label={client.status}
            size="small"
            color={getStatusColor(client.status) as any}
          />
        </TableCell>
        <TableCell>
          <Box display="flex" alignItems="center" gap={0.5}>
            <Rating value={client.rating || 0} readOnly size="small" precision={0.5} />
            <Typography variant="caption" color="textSecondary">
              ({client.rating?.toFixed(1) || '0.0'})
            </Typography>
          </Box>
        </TableCell>
        <TableCell>
          <Typography variant="body2" fontWeight={600}>
            {formatCurrency(client.totalSpent || 0)}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {client.totalProjects || 0} proyek
          </Typography>
        </TableCell>
        <TableCell align="right">
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onMenuAction(e, client);
            }}
          >
            <IconDotsVertical size={18} />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom fontWeight={600} mb={2}>
                Detail Klien
              </Typography>
              <Stack spacing={2}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                  {/* Left Column - Contact Info */}
                  <Box flex={1}>
                    <Typography variant="subtitle2" fontWeight={600} mb={1.5}>
                      Informasi Kontak
                    </Typography>
                    <Stack spacing={1.5}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <IconMail size={18} />
                        <Box>
                          <Typography variant="caption" color="textSecondary">
                            Email
                          </Typography>
                          <Typography variant="body2" fontWeight={600}>
                            {client.email}
                          </Typography>
                        </Box>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <IconPhone size={18} />
                        <Box>
                          <Typography variant="caption" color="textSecondary">
                            Telepon
                          </Typography>
                          <Typography variant="body2" fontWeight={600}>
                            {client.phone}
                          </Typography>
                        </Box>
                      </Box>
                      {client.whatsapp && (
                        <Box display="flex" alignItems="center" gap={1}>
                          <IconBrandWhatsapp size={18} />
                          <Box>
                            <Typography variant="caption" color="textSecondary">
                              WhatsApp
                            </Typography>
                            <Typography variant="body2" fontWeight={600}>
                              {client.whatsapp}
                            </Typography>
                          </Box>
                        </Box>
                      )}
                      {client.instagram && (
                        <Box display="flex" alignItems="center" gap={1}>
                          <IconBrandInstagram size={18} />
                          <Box>
                            <Typography variant="caption" color="textSecondary">
                              Instagram
                            </Typography>
                            <Typography variant="body2" fontWeight={600}>
                              {client.instagram}
                            </Typography>
                          </Box>
                        </Box>
                      )}
                    </Stack>
                  </Box>

                  {/* Right Column - Stats & Info */}
                  <Box flex={1}>
                    <Typography variant="subtitle2" fontWeight={600} mb={1.5}>
                      Statistik & Informasi
                    </Typography>
                    <Stack spacing={1.5}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <IconBriefcase size={18} />
                        <Box>
                          <Typography variant="caption" color="textSecondary">
                            Total Proyek
                          </Typography>
                          <Typography variant="body2" fontWeight={600}>
                            {client.totalProjects || 0} proyek
                          </Typography>
                        </Box>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <IconCurrencyDollar size={18} />
                        <Box>
                          <Typography variant="caption" color="textSecondary">
                            Total Spending
                          </Typography>
                          <Typography variant="body2" fontWeight={600} color="success.main">
                            {formatCurrency(client.totalSpent || 0)}
                          </Typography>
                        </Box>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <IconStar size={18} />
                        <Box>
                          <Typography variant="caption" color="textSecondary">
                            Rating
                          </Typography>
                          <Box display="flex" alignItems="center" gap={0.5}>
                            <Rating
                              value={client.rating || 0}
                              readOnly
                              size="small"
                              precision={0.5}
                            />
                            <Typography variant="body2" fontWeight={600}>
                              {client.rating?.toFixed(1) || '0.0'}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <IconCalendar size={18} />
                        <Box>
                          <Typography variant="caption" color="textSecondary">
                            Klien Sejak
                          </Typography>
                          <Typography variant="body2" fontWeight={600}>
                            {formatDate(client.since)}
                          </Typography>
                        </Box>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <IconCalendar size={18} />
                        <Box>
                          <Typography variant="caption" color="textSecondary">
                            Kontak Terakhir
                          </Typography>
                          <Typography variant="body2" fontWeight={600}>
                            {formatDate(client.lastContact)}
                          </Typography>
                        </Box>
                      </Box>
                    </Stack>
                  </Box>
                </Stack>

                {/* Portal Access Info */}
                {client.portalAccessId && (
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: 'primary.light',
                      borderRadius: 1,
                      border: '1px solid',
                      borderColor: 'primary.main',
                    }}
                  >
                    <Typography variant="caption" color="textSecondary" display="block" mb={0.5}>
                      Portal Access ID
                    </Typography>
                    <Typography variant="body2" fontWeight={600} color="primary.dark">
                      {client.portalAccessId}
                    </Typography>
                  </Box>
                )}

                {/* Additional Info */}
                <Box>
                  <Stack direction="row" spacing={1} flexWrap="wrap" gap={0.5}>
                    <Chip
                      label={`Tipe: ${client.clientType}`}
                      size="small"
                      variant="outlined"
                      color="primary"
                    />
                    <Chip
                      label={`Status: ${client.status}`}
                      size="small"
                      color={getStatusColor(client.status) as any}
                    />
                    {client.totalProjects && client.totalProjects > 0 && (
                      <Chip
                        label={`${client.totalProjects} Proyek Selesai`}
                        size="small"
                        variant="outlined"
                        color="success"
                      />
                    )}
                  </Stack>
                </Box>
              </Stack>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const ClientTable: React.FC<ClientTableProps> = ({ clients, onMenuAction }) => {
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: 'grey.50' }}>
            <TableCell width={50} />
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Klien
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Telepon
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Tipe
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Status
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Rating
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Spending
              </Typography>
            </TableCell>
            <TableCell width={50} />
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((client) => (
            <ClientRow key={client.id} client={client} onMenuAction={onMenuAction} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ClientTable;
