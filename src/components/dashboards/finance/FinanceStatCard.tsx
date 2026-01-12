import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { CardContent, Typography, Stack, Box } from '@mui/material';
import BlankCard from '../../shared/BlankCard';
import { Props } from 'react-apexcharts';
import { formatCurrency } from 'src/data/mockData';

interface FinanceStatCardProps {
  title: string;
  amount: number;
  growth: number;
  data: number[];
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
}

const FinanceStatCard: React.FC<FinanceStatCardProps> = ({
  title,
  amount,
  growth,
  data,
  color = 'primary',
}) => {
  const theme = useTheme();
  const chartColor = theme.palette[color].main;

  const optionscolumnchart: Props = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 90,
      sparkline: {
        enabled: true,
      },
    },
    colors: [chartColor],
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [20, 180],
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      show: false,
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
  };

  const seriescolumnchart = [
    {
      name: title,
      data: data,
    },
  ];

  const isPositive = growth >= 0;

  return (
    <BlankCard>
      <CardContent sx={{ p: '30px' }}>
        <Typography variant="h4" fontWeight={600}>
          {formatCurrency(amount)}
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="space-between" mt={1}>
          <Typography variant="subtitle2" color="textSecondary">
            {title}
          </Typography>
          <Typography 
            variant="subtitle2" 
            color={isPositive ? 'success.main' : 'error.main'}
            fontWeight={600}
          >
            {isPositive ? '+' : ''}{growth.toFixed(2)}%
          </Typography>
        </Stack>
      </CardContent>
      <Chart options={optionscolumnchart} series={seriescolumnchart} type="area" height="90px" />
    </BlankCard>
  );
};

export default FinanceStatCard;
