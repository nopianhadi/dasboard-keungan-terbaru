import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Avatar, Box } from '@mui/material';
import { IconArrowUpLeft } from '@tabler/icons-react';
import DashboardCard from '../../shared/DashboardCard';
import { Props } from 'react-apexcharts';

interface ProjectsOverviewProps {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  preparationProjects: number;
  growth: number;
}

const ProjectsOverview: React.FC<ProjectsOverviewProps> = ({
  totalProjects,
  activeProjects,
  completedProjects,
  preparationProjects,
  growth,
}) => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const success = theme.palette.success.main;
  const warning = theme.palette.warning.main;
  const successlight = theme.palette.success.light;

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
    colors: [primary, success, warning, '#F9F9FD'],
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
    labels: ['Aktif', 'Selesai', 'Persiapan'],
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

  const seriescolumnchart = [activeProjects, completedProjects, preparationProjects];

  return (
    <DashboardCard title="Ringkasan Proyek">
      <Grid container spacing={3}>
        <Grid size={{ xs: 7, sm: 7 }}>
          <Typography variant="h3" fontWeight="700">
            {totalProjects}
          </Typography>
          <Stack direction="row" spacing={1} mt={1} alignItems="center">
            <Avatar sx={{ bgcolor: successlight, width: 27, height: 27 }}>
              <IconArrowUpLeft width={20} color="#39B69A" />
            </Avatar>
            <Typography variant="subtitle2" fontWeight="600">
              +{growth.toFixed(1)}%
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              bulan lalu
            </Typography>
          </Stack>
          <Stack spacing={2} mt={4} direction="column">
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: primary, svg: { display: 'none' } }}
              ></Avatar>
              <Box>
                <Typography variant="caption" color="textSecondary">
                  Aktif
                </Typography>
                <Typography variant="subtitle2" fontWeight={600}>
                  {activeProjects} proyek
                </Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: success, svg: { display: 'none' } }}
              ></Avatar>
              <Box>
                <Typography variant="caption" color="textSecondary">
                  Selesai
                </Typography>
                <Typography variant="subtitle2" fontWeight={600}>
                  {completedProjects} proyek
                </Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: warning, svg: { display: 'none' } }}
              ></Avatar>
              <Box>
                <Typography variant="caption" color="textSecondary">
                  Persiapan
                </Typography>
                <Typography variant="subtitle2" fontWeight={600}>
                  {preparationProjects} proyek
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

export default ProjectsOverview;
