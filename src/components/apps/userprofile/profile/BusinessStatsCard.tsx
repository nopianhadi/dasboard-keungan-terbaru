import React from 'react';
import { Grid, Typography, Box, Card, CardContent } from '@mui/material';
import { 
  IconCurrencyDollar, 
  IconUsers, 
  IconCamera,
  IconTrendingUp
} from '@tabler/icons-react';

interface BusinessStatsProps {
  stats?: {
    projects_count: number;
    clients_count: number;
    team_count: number;
    revenue_this_month: number;
  } | null;
}

const BusinessStatsCard: React.FC<BusinessStatsProps> = ({ stats }) => {
  const statsData = {
    projects_count: stats?.projects_count || 45,
    clients_count: stats?.clients_count || 128,
    team_count: stats?.team_count || 5,
    revenue_this_month: stats?.revenue_this_month || 75000000,
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const statItems = [
    {
      title: 'Total Proyek',
      value: statsData.projects_count,
      icon: <IconCamera size={24} />,
      color: '#3b82f6',
      description: 'Proyek selesai'
    },
    {
      title: 'Total Klien',
      value: statsData.clients_count,
      icon: <IconUsers size={24} />,
      color: '#10b981',
      description: 'Klien aktif'
    },
    {
      title: 'Anggota Tim',
      value: statsData.team_count,
      icon: <IconUsers size={24} />,
      color: '#f59e0b',
      description: 'Tim profesional'
    },
    {
      title: 'Pendapatan Bulan Ini',
      value: formatCurrency(statsData.revenue_this_month),
      icon: <IconCurrencyDollar size={24} />,
      color: '#ef4444',
      description: 'Revenue bulanan',
      isLarge: true
    }
  ];

  return (
    <Grid container spacing={3}>
      {statItems.map((item, index) => (
        <Grid 
          key={index} 
          size={{ 
            xs: 12, 
            sm: item.isLarge ? 12 : 6, 
            md: item.isLarge ? 6 : 3 
          }}
        >
          <Card 
            sx={{ 
              height: '100%',
              background: `linear-gradient(135deg, ${item.color}15 0%, ${item.color}05 100%)`,
              border: `1px solid ${item.color}20`,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: `0 8px 25px ${item.color}20`,
              }
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Box 
                  sx={{ 
                    p: 1, 
                    borderRadius: 2, 
                    backgroundColor: `${item.color}20`,
                    color: item.color,
                    mr: 2
                  }}
                >
                  {item.icon}
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight={600} color={item.color}>
                    {item.title}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {item.description}
                  </Typography>
                </Box>
              </Box>
              
              <Typography 
                variant={item.isLarge ? "h4" : "h3"} 
                fontWeight={700}
                color="textPrimary"
                sx={{ mb: 1 }}
              >
                {item.value}
              </Typography>
              
              {!item.isLarge && (
                <Box display="flex" alignItems="center">
                  <IconTrendingUp size={16} color="#10b981" />
                  <Typography variant="caption" color="#10b981" sx={{ ml: 0.5 }}>
                    +12% dari bulan lalu
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default BusinessStatsCard;