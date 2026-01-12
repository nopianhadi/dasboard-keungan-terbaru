import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import DashboardCard from 'src/components/shared/DashboardCard';
import { getStatusColor, formatDate, type Lead } from 'src/data/mockData';

interface RecentLeadsProps {
  leads: Lead[];
  limit?: number;
}

const RecentLeads: React.FC<RecentLeadsProps> = ({ leads, limit = 5 }) => {
  const recentLeads = [...leads]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);

  return (
    <DashboardCard title="Recent Leads" subtitle="Prospek terbaru">
      <Box sx={{ overflow: 'auto', mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Lead
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Sumber
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Status
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Tanggal
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentLeads.map((lead) => (
              <TableRow key={lead.id} hover>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar sx={{ bgcolor: 'primary.main', width: 35, height: 35 }}>
                      {lead.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {lead.name}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {lead.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{lead.source}</Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    label={lead.status}
                    color={getStatusColor(lead.status) as any}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="textSecondary">
                    {formatDate(lead.createdAt)}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </DashboardCard>
  );
};

export default RecentLeads;
