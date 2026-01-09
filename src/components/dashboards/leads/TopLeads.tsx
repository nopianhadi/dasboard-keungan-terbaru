import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  Stack,
  Chip,
  LinearProgress,
} from '@mui/material';
import { IconStar } from '@tabler/icons-react';
import DashboardCard from 'src/components/shared/DashboardCard';
import { formatCurrency, type Lead } from 'src/data/mockData';

interface TopLeadsProps {
  leads: Lead[];
  limit?: number;
}

const TopLeads: React.FC<TopLeadsProps> = ({ leads, limit = 5 }) => {
  const topLeads = [...leads]
    .filter((lead) => lead.estimatedBudget && lead.estimatedBudget > 0)
    .sort((a, b) => (b.estimatedBudget || 0) - (a.estimatedBudget || 0))
    .slice(0, limit);

  const maxBudget = topLeads[0]?.estimatedBudget || 1;

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
    <DashboardCard
      title="Top Leads by Budget"
      subtitle="Prospek dengan estimasi budget tertinggi"
    >
      <Stack spacing={3} mt={3}>
        {topLeads.map((lead, index) => (
          <Box key={lead.id}>
            <Box display="flex" alignItems="center" gap={2} mb={1}>
              <Avatar
                sx={{
                  bgcolor: index === 0 ? 'warning.main' : 'primary.main',
                  width: 40,
                  height: 40,
                }}
              >
                {index === 0 ? (
                  <IconStar size={20} />
                ) : (
                  lead.name.charAt(0).toUpperCase()
                )}
              </Avatar>
              <Box flex={1}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Typography variant="subtitle2" fontWeight={600}>
                    {lead.name}
                  </Typography>
                  <Chip
                    size="small"
                    label={lead.priority}
                    color={getPriorityColor(lead.priority) as any}
                  />
                </Box>
                <Typography variant="caption" color="textSecondary">
                  {lead.projectType || 'N/A'}
                </Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={0.5}>
              <Typography variant="body2" fontWeight={600} color="primary">
                {formatCurrency(lead.estimatedBudget || 0)}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {((lead.estimatedBudget || 0) / maxBudget * 100).toFixed(0)}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(lead.estimatedBudget || 0) / maxBudget * 100}
              color={index === 0 ? 'warning' : 'primary'}
              sx={{ height: 6, borderRadius: 1 }}
            />
          </Box>
        ))}
      </Stack>
    </DashboardCard>
  );
};

export default TopLeads;
