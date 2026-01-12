import React from 'react';
import { Typography, Box, LinearProgress } from '@mui/material';
import DashboardCard from 'src/components/shared/DashboardCard';

interface LeadsOverviewProps {
  totalLeads: number;
  diskusiLeads: number;
  tindakLanjutLeads: number;
  dikonversiLeads: number;
  ditolakLeads: number;
  conversionRate: number;
}

const LeadsOverview: React.FC<LeadsOverviewProps> = ({
  totalLeads,
  diskusiLeads,
  tindakLanjutLeads,
  dikonversiLeads,
  ditolakLeads,
  conversionRate,
}) => {
  const statusData = [
    {
      label: 'Diskusi',
      value: diskusiLeads,
      percentage: (diskusiLeads / totalLeads) * 100,
      color: 'info',
    },
    {
      label: 'Tindak Lanjut',
      value: tindakLanjutLeads,
      percentage: (tindakLanjutLeads / totalLeads) * 100,
      color: 'warning',
    },
    {
      label: 'Dikonversi',
      value: dikonversiLeads,
      percentage: (dikonversiLeads / totalLeads) * 100,
      color: 'success',
    },
    {
      label: 'Ditolak',
      value: ditolakLeads,
      percentage: (ditolakLeads / totalLeads) * 100,
      color: 'error',
    },
  ];

  return (
    <DashboardCard title="Overview Leads" subtitle={`Total ${totalLeads} leads`}>
      <Box mt={3}>
        {statusData.map((status) => (
          <Box key={status.label} mb={3}>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="body2" fontWeight={600}>
                {status.label}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {status.value} ({status.percentage.toFixed(0)}%)
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={status.percentage}
              color={status.color as any}
              sx={{ height: 8, borderRadius: 1 }}
            />
          </Box>
        ))}

        <Box
          mt={4}
          p={2}
          bgcolor="success.light"
          borderRadius={2}
          textAlign="center"
        >
          <Typography variant="h4" color="success.dark" fontWeight={700}>
            {conversionRate.toFixed(1)}%
          </Typography>
          <Typography variant="body2" color="textSecondary" mt={0.5}>
            Conversion Rate
          </Typography>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default LeadsOverview;
