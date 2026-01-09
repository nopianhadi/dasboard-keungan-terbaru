import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Avatar, Box } from '@mui/material';
import { IconArrowUpLeft, IconArrowDownRight } from '@tabler/icons-react';
import DashboardCard from '../../shared/DashboardCard';
import { Props } from 'react-apexcharts';
import { formatCurrency } from 'src/data/mockData';

interface FinancialOverviewProps {
  totalIncome: number;
  totalExpense: number;
  netProfit: number;
  incomeGrowth: number;
  expenseGrowth: number;
}

const FinancialOverview: React.FC<FinancialOverviewProps> = ({
  totalIncome,
  totalExpense,
  netProfit,
  incomeGrowth,
  expenseGrowth,
}) => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = theme.palette.primary.light;
  const successlight = theme.palette.success.light;
  const errorlight = theme.palette.error.light;

  const optionscolumnchart: Props = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 155,
    },
    colors: [theme.palette.success.main, theme.palette.error.main, '#F9F9FD'],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: '75%',
          background: 'transparent',
        },
      },
    },
    tooltip: {
      enabled: true,
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  };

  const totalAmount = totalIncome + totalExpense;
  const incomePercentage = totalAmount > 0 ? (totalIncome / totalAmount) * 100 : 50;
  const expensePercentage = totalAmount > 0 ? (totalExpense / totalAmount) * 100 : 50;
  
  const seriescolumnchart = [incomePercentage, expensePercentage, 0];

  return (
    <DashboardCard title="Ringkasan Keuangan">
      <Grid container spacing={3}>
        <Grid size={{ xs: 7, sm: 7 }}>
          <Typography variant="h3" fontWeight="700">
            {formatCurrency(netProfit)}
          </Typography>
          <Stack direction="row" spacing={1} mt={1} alignItems="center">
            <Avatar sx={{ bgcolor: netProfit >= 0 ? successlight : errorlight, width: 27, height: 27 }}>
              {netProfit >= 0 ? (
                <IconArrowUpLeft width={20} color="#39B69A" />
              ) : (
                <IconArrowDownRight width={20} color="#FA896B" />
              )}
            </Avatar>
            <Typography variant="subtitle2" fontWeight="600">
              Net Profit
            </Typography>
          </Stack>
          <Stack spacing={3} mt={5} direction="row">
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: theme.palette.success.main, svg: { display: 'none' } }}
              ></Avatar>
              <Box>
                <Typography variant="caption" color="textSecondary">
                  Pemasukan
                </Typography>
                <Typography variant="subtitle2" fontWeight={600}>
                  {formatCurrency(totalIncome)}
                </Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: theme.palette.error.main, svg: { display: 'none' } }}
              ></Avatar>
              <Box>
                <Typography variant="caption" color="textSecondary">
                  Pengeluaran
                </Typography>
                <Typography variant="subtitle2" fontWeight={600}>
                  {formatCurrency(totalExpense)}
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Grid>
        <Grid size={{ xs: 5, sm: 5 }}>
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type="donut"
            height="150px"
          />
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default FinancialOverview;
