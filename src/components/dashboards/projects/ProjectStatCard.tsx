import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Fab } from '@mui/material';
import DashboardCard from '../../shared/DashboardCard';
import { Props } from 'react-apexcharts';

interface ProjectStatCardProps {
  title: string;
  value: string | number;
  growth: number;
  data: number[];
  icon: React.ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
}

const ProjectStatCard: React.FC<ProjectStatCardProps> = ({
  title,
  value,
  growth,
  data,
  icon,
  color = 'primary',
}) => {
  const theme = useTheme();
  const chartColor = theme.palette[color].main;
  const chartColorLight = theme.palette[color].light;
  const isPositive = growth >= 0;

  const optionscolumnchart: Props = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      colors: [chartColorLight],
      type: 'solid',
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      x: {
        show: false,
      },
    },
  };

  const seriescolumnchart = [
    {
      name: title,
      color: chartColor,
      data: data,
    },
  ];

  return (
    <DashboardCard
      title={title}
      action={
        <Fab
          sx={{
            bgcolor: chartColorLight,
            color: chartColor,
            '&:hover': { bgcolor: chartColorLight },
          }}
          size="medium"
        >
          {icon}
        </Fab>
      }
      footer={
        <Chart options={optionscolumnchart} series={seriescolumnchart} type="area" height="60px" />
      }
    >
      <>
        <Typography variant="h3" fontWeight="700" mt="-20px">
          {value}
        </Typography>
        <Stack direction="row" spacing={1} my={1} alignItems="center">
          <Avatar
            sx={{
              bgcolor: isPositive ? theme.palette.success.light : theme.palette.error.light,
              width: 27,
              height: 27,
            }}
          >
            <Typography variant="caption" fontWeight={600} color={isPositive ? 'success.main' : 'error.main'}>
              {isPositive ? '+' : ''}{growth.toFixed(1)}%
            </Typography>
          </Avatar>
          <Typography variant="subtitle2" color="textSecondary">
            bulan lalu
          </Typography>
        </Stack>
      </>
    </DashboardCard>
  );
};

export default ProjectStatCard;
