import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Avatar,
  IconButton,
  Stack,
  Box,
  Chip,
  Tooltip,
} from '@mui/material';
import { IconDotsVertical, IconPigMoney, IconLock, IconChartBar, IconGift } from '@tabler/icons-react';
import { formatCurrency, type Pocket } from 'src/data/mockData';

interface PocketCardProps {
  pocket: Pocket;
  onMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const PocketCard: React.FC<PocketCardProps> = ({ pocket, onMenuClick }) => {
  const getPocketIcon = (icon: string) => {
    const icons: { [key: string]: any } = {
      'piggy-bank': IconPigMoney,
      'lock': IconLock,
      'clipboard-list': IconChartBar,
      'star': IconGift,
    };
    const IconComponent = icons[icon] || IconPigMoney;
    return <IconComponent size={24} />;
  };

  const getPocketColor = (type: string): 'primary' | 'warning' | 'success' | 'secondary' | 'info' => {
    const colors: { [key: string]: any } = {
      'Nabung & Bayar': 'primary',
      'Terkunci': 'warning',
      'Tabungan Hadiah Freelancer': 'success',
      'Anggaran Pengeluaran': 'secondary',
      'Bersama': 'info',
    };
    return colors[type] || 'primary';
  };

  const progress = pocket.goalAmount ? (pocket.amount / pocket.goalAmount) * 100 : 0;
  const color = getPocketColor(pocket.type);

  return (
    <Card 
      sx={{ 
        height: '100%',
        minHeight: 280,
        transition: 'all 0.3s ease',
        borderRadius: 2,
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        }
      }}
    >
      <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="start" mb={2.5}>
          <Avatar 
            sx={{ 
              bgcolor: `${color}.light`,
              width: 52, 
              height: 52,
              color: `${color}.main`,
            }}
          >
            {getPocketIcon(pocket.icon)}
          </Avatar>
          <Tooltip title="Opsi">
            <IconButton size="small" onClick={onMenuClick} sx={{ mt: -0.5 }}>
              <IconDotsVertical size={20} />
            </IconButton>
          </Tooltip>
        </Stack>

        <Typography variant="h6" gutterBottom noWrap fontWeight={600} fontSize="1.1rem">
          {pocket.name}
        </Typography>
        
        <Chip 
          label={pocket.type} 
          size="small" 
          color={color}
          sx={{ mb: 2, fontSize: '0.75rem' }} 
        />

        <Typography variant="h4" fontWeight={700} mb={2} color={`${color}.main`}>
          {formatCurrency(pocket.amount)}
        </Typography>

        {pocket.goalAmount && (
          <Box mt="auto">
            <Stack direction="row" justifyContent="space-between" mb={1}>
              <Typography variant="caption" color="textSecondary" fontSize="0.75rem">
                Target: {formatCurrency(pocket.goalAmount)}
              </Typography>
              <Typography variant="caption" fontWeight={600} color={`${color}.main`} fontSize="0.75rem">
                {progress.toFixed(0)}%
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={Math.min(progress, 100)}
              sx={{ 
                height: 6, 
                borderRadius: 3,
                bgcolor: `${color}.lighter`,
              }}
              color={color}
            />
          </Box>
        )}

        {pocket.description && !pocket.goalAmount && (
          <Typography variant="caption" color="textSecondary" mt="auto" display="block" fontSize="0.75rem">
            {pocket.description}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default PocketCard;
