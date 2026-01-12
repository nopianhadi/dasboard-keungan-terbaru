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
  Button,
  Tooltip,
} from '@mui/material';
import {
  IconArrowDownLeft,
  IconArrowUpRight,
  IconCalendar,
  IconCreditCard,
} from '@tabler/icons-react';
import DashboardCard from '../../shared/DashboardCard';
import { formatCurrency, formatDate, type Transaction } from 'src/data/mockData';

interface RecentTransactionsProps {
  transactions: Transaction[];
  onAddNew: () => void;
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions, onAddNew }) => {
  return (
    <DashboardCard
      title="Transaksi Terbaru"
      subtitle="5 transaksi terakhir"
      action={
        <Button 
          variant="contained" 
          color="primary" 
          size="medium"
          onClick={onAddNew}
        >
          Transaksi Baru
        </Button>
      }
    >
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ py: 2 }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Tanggal
                </Typography>
              </TableCell>
              <TableCell sx={{ py: 2 }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Deskripsi
                </Typography>
              </TableCell>
              <TableCell sx={{ py: 2 }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Kategori
                </Typography>
              </TableCell>
              <TableCell sx={{ py: 2 }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Metode
                </Typography>
              </TableCell>
              <TableCell align="right" sx={{ py: 2 }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Jumlah
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow 
                key={transaction.id} 
                hover
                sx={{
                  '&:hover': {
                    bgcolor: 'action.hover',
                    cursor: 'pointer',
                  },
                }}
              >
                <TableCell sx={{ py: 2.5 }}>
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Avatar sx={{ bgcolor: 'primary.light', width: 36, height: 36 }}>
                      <IconCalendar size={18} />
                    </Avatar>
                    <Typography variant="body2" fontWeight={500}>
                      {formatDate(transaction.date)}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell sx={{ py: 2.5 }}>
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Avatar
                      sx={{
                        bgcolor:
                          transaction.type === 'Pemasukan' ? 'success.light' : 'error.light',
                        width: 40,
                        height: 40,
                      }}
                    >
                      {transaction.type === 'Pemasukan' ? (
                        <IconArrowDownLeft size={20} color="green" />
                      ) : (
                        <IconArrowUpRight size={20} color="red" />
                      )}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={600}>
                        {transaction.description}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {transaction.type}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell sx={{ py: 2.5 }}>
                  <Chip
                    label={transaction.category}
                    size="small"
                    color={transaction.type === 'Pemasukan' ? 'success' : 'default'}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell sx={{ py: 2.5 }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <IconCreditCard size={18} />
                    <Typography variant="body2">{transaction.method}</Typography>
                  </Stack>
                </TableCell>
                <TableCell align="right" sx={{ py: 2.5 }}>
                  <Tooltip title={transaction.type}>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      color={transaction.type === 'Pemasukan' ? 'success.main' : 'error.main'}
                    >
                      {transaction.type === 'Pemasukan' ? '+' : '-'}{' '}
                      {formatCurrency(transaction.amount)}
                    </Typography>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box mt={2} textAlign="center">
        <Button variant="text" size="medium" color="primary">
          Lihat Semua Transaksi
        </Button>
      </Box>
    </DashboardCard>
  );
};

export default RecentTransactions;
