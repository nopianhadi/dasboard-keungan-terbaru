import { Box, Typography, Stack, Avatar, Chip, LinearProgress } from '@mui/material';
import { IconClock, IconAlertCircle } from '@tabler/icons-react';
import DashboardCard from '../../shared/DashboardCard';
import { mockProjects, type Project } from 'src/data/mockData';

const UpcomingDeadlines = () => {
  const upcomingProjects = mockProjects
    .filter((p: Project) => p.status !== 'Selesai' && p.deadlineDate)
    .sort((a: Project, b: Project) => new Date(a.deadlineDate!).getTime() - new Date(b.deadlineDate!).getTime())
    .slice(0, 5);

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate).getTime();
    const now = Date.now();
    const days = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    return days;
  };

  const getUrgencyColor = (days: number): 'error' | 'warning' | 'success' => {
    if (days <= 3) return 'error';
    if (days <= 7) return 'warning';
    return 'success';
  };

  return (
    <DashboardCard title="Deadline Mendatang">
      <Stack spacing={3}>
        {upcomingProjects.map((project) => {
          const daysRemaining = getDaysRemaining(project.deadlineDate!);
          const urgencyColor = getUrgencyColor(daysRemaining);
          
          return (
            <Box key={project.id}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1}>
                <Stack direction="row" spacing={2} flex={1}>
                  <Avatar 
                    sx={{ 
                      bgcolor: `${urgencyColor}.light`,
                      width: 40,
                      height: 40
                    }}
                  >
                    {daysRemaining <= 3 ? (
                      <IconAlertCircle size={20} />
                    ) : (
                      <IconClock size={20} />
                    )}
                  </Avatar>
                  <Box flex={1}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {project.projectName}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {project.clientName}
                    </Typography>
                  </Box>
                </Stack>
                <Chip 
                  label={`${daysRemaining} hari`}
                  color={urgencyColor}
                  size="small"
                  sx={{ fontWeight: 600 }}
                />
              </Stack>
              <Stack spacing={0.5}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="caption" color="textSecondary">
                    Progress
                  </Typography>
                  <Typography variant="caption" fontWeight={600}>
                    {project.progress}%
                  </Typography>
                </Stack>
                <LinearProgress 
                  variant="determinate" 
                  value={project.progress}
                  color={urgencyColor}
                  sx={{ height: 6, borderRadius: 3 }}
                />
              </Stack>
            </Box>
          );
        })}
      </Stack>
    </DashboardCard>
  );
};

export default UpcomingDeadlines;
