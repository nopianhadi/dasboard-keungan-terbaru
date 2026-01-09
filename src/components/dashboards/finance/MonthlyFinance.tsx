import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Fab } from '@mui/material';
import { IconArrowDownRight, IconArrowUpLeft, IconTrendingUp } from '@tabler/icons-react';
import DashboardCard from '../../shared/DashboardCard';
import { Props } from 'react-apexcharts';
import { formatCurrency } from 'src/data/mockData';

interface MonthlyFinanceProps {
  amount: number;
  title: string;
  growth: number;
  data: number[];
  type: 'income' | 'expense' | 'profit';
}

const MonthlyFinance: React.FC<MonthlyFinanceProps> = ({ amount, title, growth, data, type }) => {
  const theme = useTheme();
  
  const getColor = () => {
    switch (type) {
      case 'income':
        return {
          main: theme.palette.success.main,
          light: theme.palette.success.light,
        };
      case 'expense':
        return {
          main: theme.palette.error.main,
          light: theme.palette.error.light,
        };
      default:
        return {
          main: theme.palette.primary.main,
          light: theme.palette.primary.light,
        };
    }
  };

  const colors = getColor();
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
      colors: [colors.light],
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
      color: colors.main,
      data: data,
    },
  ];

  const getIcon = () => {
    switch (type) {
      case 'income':
        return <IconArrowDownRight width={24} />;
      case 'expense':
        return <IconArrowUpLeft width={24} />;
      default:
        return <IconTrendingUp width={24} />;
    }
  };

  return (
    <DashboardCard
      title={title}
      action={
        <Fab 
          sx={{ 
            bgcolor: colors.light,
            color: colors.main,
            '&:hover': { bgcolor: colors.light }
          }} 
          size="medium"
        >
          {getIcon()}
        </Fab>
      }
      footer={
        <Chart options={optionscolumnchart} series={seriescolumnchart} type="area" height="60px" />
      }
    >
      <>
        <Typography variant="h3" fontWeight="700" mt="-20px">
          {formatCurrency(amount)}
        </Typography>
        <Stack direction="row" spacing={1} my={1} alignItems="center">
          <Avatar 
            sx={{ 
              bgcolor: isPositive ? theme.palette.success.light : theme.palette.error.light, 
              width: 27, 
              height: 27 
            }}
          >
            {isPositive ? (
              <IconArrowUpLeft width={20} color="#39B69A" />
            ) : (
              <IconArrowDownRight width={20} color="#FA896B" />
            )}
          </Avatar>
          <Typography variant="subtitle2" fontWeight="600">
            {isPositive ? '+' : ''}{growth.toFixed(1)}%
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            bulan lalu
          </Typography>
        </Stack>
      </>
    </DashboardCard>
  );
};

export default MonthlyFinance;
