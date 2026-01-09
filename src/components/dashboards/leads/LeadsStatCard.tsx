import React from 'react';
import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';
import { IconArrowUpRight, IconArrowDownRight } from '@tabler/icons-react';
import { useTheme } from '@mui/material/styles';

interface LeadsStatCardProps {
  title: string;
  value: number | string;
  growth?: number;
  icon: React.ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
}

const LeadsStatCard: React.FC<LeadsStatCardProps> = ({
  title,
  value,
  growth,
  icon,
  color = 'primary',
}) => {
  const theme = useTheme();
  const isPositive = growth && growth >= 0;

  return (
    <Card elevation={0} sx={{ height: '100%', bgcolor: `${color}.light` }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h6" color="textSecondary" mb={1}>
              {title}
            </Typography>
            <Typography variant="h3" fontWeight={600}>
              {value}
            </Typography>
            {growth !== undefined && (
              <Box display="flex" alignItems="center" gap={0.5} mt={1}>
                {isPositive ? (
                  <IconArrowUpRight size={18} color={theme.palette.success.main} />
                ) : (
                  <IconArrowDownRight size={18} color={theme.palette.error.main} />
                )}
                <Typography
                  variant="caption"
                  color={isPositive ? 'success.main' : 'error.main'}
                  fontWeight={600}
                >
                  {Math.abs(growth)}%
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  vs bulan lalu
                </Typography>
              </Box>
            )}
          </Box>
          <Avatar
            sx={{
              bgcolor: `${color}.main`,
              width: 56,
              height: 56,
            }}
          >
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LeadsStatCard;
