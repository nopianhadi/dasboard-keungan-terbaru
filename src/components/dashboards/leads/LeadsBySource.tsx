import React from 'react';
import { Box, Typography, Avatar, Stack } from '@mui/material';
import {
  IconBrandWhatsapp,
  IconBrandInstagram,
  IconWorld,
  IconPhone,
  IconMail,
  IconUsers,
} from '@tabler/icons-react';
import DashboardCard from 'src/components/shared/DashboardCard';
import type { Lead } from 'src/data/mockData';

interface LeadsBySourceProps {
  leads: Lead[];
}

const LeadsBySource: React.FC<LeadsBySourceProps> = ({ leads }) => {
  const sourceIcons: Record<string, { icon: React.ReactNode; color: string }> = {
    WhatsApp: { icon: <IconBrandWhatsapp size={20} />, color: '#25D366' },
    Instagram: { icon: <IconBrandInstagram size={20} />, color: '#E4405F' },
    Website: { icon: <IconWorld size={20} />, color: '#1976d2' },
    Phone: { icon: <IconPhone size={20} />, color: '#ff9800' },
    Email: { icon: <IconMail size={20} />, color: '#f44336' },
    Referral: { icon: <IconUsers size={20} />, color: '#9c27b0' },
  };

  const sourceCounts = leads.reduce((acc, lead) => {
    acc[lead.source] = (acc[lead.source] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sourceData = Object.entries(sourceCounts)
    .map(([source, count]) => ({
      source,
      count,
      percentage: (count / leads.length) * 100,
      ...sourceIcons[source],
    }))
    .sort((a, b) => b.count - a.count);

  return (
    <DashboardCard title="Leads by Source" subtitle="Sumber prospek terbanyak">
      <Stack spacing={2} mt={3}>
        {sourceData.map((item) => (
          <Box
            key={item.source}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            p={2}
            bgcolor="grey.50"
            borderRadius={2}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar
                sx={{
                  bgcolor: item.color,
                  width: 40,
                  height: 40,
                }}
              >
                {item.icon}
              </Avatar>
              <Box>
                <Typography variant="subtitle2" fontWeight={600}>
                  {item.source}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {item.percentage.toFixed(0)}% dari total
                </Typography>
              </Box>
            </Box>
            <Typography variant="h6" fontWeight={700}>
              {item.count}
            </Typography>
          </Box>
        ))}
      </Stack>
    </DashboardCard>
  );
};

export default LeadsBySource;
