import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Stack,
  Chip,
  Tooltip,
} from '@mui/material';
import { IconDotsVertical, IconCreditCard } from '@tabler/icons-react';
import { formatCurrency, type FinanceCard } from 'src/data/mockData';

interface BankCardProps {
  card: FinanceCard;
  onMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const BankCard: React.FC<BankCardProps> = ({ card, onMenuClick }) => {
  return (
    <Card
      sx={{
        background: card.color_gradient || card.colorGradient,
        color: 'white',
        height: '100%',
        minHeight: 220,
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        borderRadius: 3,
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 8,
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -50,
          right: -50,
          width: 150,
          height: 150,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: -30,
          left: -30,
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.05)',
        },
      }}
    >
      <CardContent sx={{ position: 'relative', zIndex: 1, p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="start" mb={2}>
          <Box>
            <Chip 
              label={card.card_type || card.cardType}
              size="small"
              sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.25)',
                color: 'white',
                fontWeight: 600,
                mb: 1,
                fontSize: '0.75rem',
              }}
            />
            <Typography variant="h6" fontWeight={600} fontSize="1rem">
              {card.bank_name || card.bankName}
            </Typography>
          </Box>
          <Tooltip title="Opsi">
            <IconButton size="small" sx={{ color: 'white', mt: -0.5 }} onClick={onMenuClick}>
              <IconDotsVertical size={20} />
            </IconButton>
          </Tooltip>
        </Stack>

        <Box mb={2} flex={1}>
          <Typography variant="caption" sx={{ opacity: 0.85, mb: 0.5, display: 'block' }}>
            Saldo Tersedia
          </Typography>
          <Typography variant="h4" fontWeight={700}>
            {formatCurrency(card.balance)}
          </Typography>
        </Box>

        <Stack direction="row" justifyContent="space-between" alignItems="center" mt="auto">
          <Stack direction="row" spacing={1} alignItems="center">
            <IconCreditCard size={18} />
            <Typography variant="body2" sx={{ opacity: 0.9, fontSize: '0.875rem' }}>
              **** {card.last_four_digits || card.lastFourDigits}
            </Typography>
          </Stack>
          <Typography variant="body2" fontWeight={600} fontSize="0.875rem">
            {card.card_holder_name || card.cardHolderName}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default BankCard;
