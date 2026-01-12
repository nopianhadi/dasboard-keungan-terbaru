import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { MenuItem, Grid, Stack, Typography, Button, Avatar, Box } from '@mui/material';
import { IconGridDots } from '@tabler/icons-react';
import DashboardCard from '../../shared/DashboardCard';
import CustomSelect from '../../forms/theme-elements/CustomSelect';
import { Props } from 'react-apexcharts';
import { formatCurrency } from 'src/data/mockData';

interface RevenueChartProps {
  totalRevenue: number;
  paidAmount: number;
  pendingAmount: number;
}

const RevenueChart: React.FC<RevenueChartProps> = ({
  totalRevenue,
  paidAmount,
  pendingAmount,
}) => {
  const [month, setMonth] = React.useState('1');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMonth(event.target.value);
  };

  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const success = theme.palette.success.main;

  const optionscolumnchart: Props = {
    chart: {
      type: 'bar',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: true,
      },
      height: 370,
      stacked: true,
    },
    colors: [success, primary],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: '60%',
        columnWidth: '20%',
        borderRadius: [6],
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'all',
      },
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
    grid: {
      borderColor: 'rgba(0,0,0,0.1)',
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      tickAmount: 4,
    },
    xaxis: {
      categories: ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'],
      axisBorder: {
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
      name: 'Terbayar',
      data: [15, 18, 12, 20],
    },
    {
      name: 'Pending',
      data: [5, 8, 6, 10],
    },
  ];

  return (
    <DashboardCard
      title="Revenue Proyek"
      subtitle="Grafik Pembayaran"
      action={
        <CustomSelect
          labelId="month-dd"
          id="month-dd"
          size="small"
          value={month}
          onChange={handleChange}
        >
          <MenuItem value={1}>Januari 2026</MenuItem>
          <MenuItem value={2}>Desember 2025</MenuItem>
          <MenuItem value={3}>November 2025</MenuItem>
        </CustomSelect>
      }
    >
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 8 }}>
          <Box className="rounded-bars">
            <Chart
              options={optionscolumnchart}
              series={seriescolumnchart}
              type="bar"
              height="370px"
            />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Stack spacing={3} mt={3}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                width={40}
                height={40}
                bgcolor="primary.light"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography color="primary" variant="h6" display="flex">
                  <IconGridDots width={21} />
                </Typography>
              </Box>
              <Box>
                <Typography variant="h3" fontWeight="700">
                  {formatCurrency(totalRevenue)}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Total Revenue
                </Typography>
              </Box>
            </Stack>
          </Stack>
          <Stack spacing={3} my={5}>
            <Stack direction="row" spacing={2}>
              <Avatar
                sx={{ width: 9, mt: 1, height: 9, bgcolor: success, svg: { display: 'none' } }}
              ></Avatar>
              <Box>
                <Typography variant="subtitle1" color="textSecondary">
                  Terbayar
                </Typography>
                <Typography variant="h5">{formatCurrency(paidAmount)}</Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Avatar
                sx={{ width: 9, mt: 1, height: 9, bgcolor: primary, svg: { display: 'none' } }}
              ></Avatar>
              <Box>
                <Typography variant="subtitle1" color="textSecondary">
                  Pending
                </Typography>
                <Typography variant="h5">{formatCurrency(pendingAmount)}</Typography>
              </Box>
            </Stack>
          </Stack>
          <Button color="primary" variant="contained" fullWidth>
            Lihat Laporan Lengkap
          </Button>
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default RevenueChart;
