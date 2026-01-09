import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Box,
  Stack,
  LinearProgress,
  Avatar,
  AvatarGroup,
  Tooltip,
} from '@mui/material';
import {
  IconDotsVertical,
  IconCalendar,
  IconMapPin,
  IconCurrencyDollar,
} from '@tabler/icons-react';
import { formatCurrency, formatDate, getStatusColor, type Project } from 'src/data/mockData';

interface ProjectCardProps {
  project: Project;
  onMenuClick: (event: React.MouseEvent<HTMLElement>, project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onMenuClick }) => {
  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'success';
    if (progress >= 50) return 'primary';
    if (progress >= 30) return 'warning';
    return 'error';
  };

  return (
    <Card
      sx={{
        height: '100%',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="start" mb={2}>
          <Box flex={1}>
            <Typography variant="h6" gutterBottom noWrap>
              {project.projectName}
            </Typography>
            <Typography variant="body2" color="textSecondary" noWrap>
              {project.clientName}
            </Typography>
          </Box>
          <Tooltip title="Opsi">
            <IconButton size="small" onClick={(e) => onMenuClick(e, project)}>
              <IconDotsVertical size={18} />
            </IconButton>
          </Tooltip>
        </Stack>

        <Stack direction="row" spacing={1} mb={2} flexWrap="wrap" gap={1}>
          <Chip
            label={project.status}
            color={getStatusColor(project.status)}
            size="small"
          />
          <Chip label={project.projectType} size="small" variant="outlined" />
          <Chip
            label={project.paymentStatus}
            color={getStatusColor(project.paymentStatus)}
            size="small"
            variant="outlined"
          />
        </Stack>

        <Box mb={2}>
          <Stack direction="row" justifyContent="space-between" mb={1}>
            <Typography variant="body2" color="textSecondary">
              Progress
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {project.progress}%
            </Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={project.progress}
            sx={{ height: 8, borderRadius: 5 }}
            color={getProgressColor(project.progress)}
          />
        </Box>

        <Stack spacing={1.5} mb={2}>
          {project.location && (
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconMapPin size={16} color="#5D87FF" />
              <Typography variant="body2" color="textSecondary" noWrap>
                {project.location}
              </Typography>
            </Stack>
          )}
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconCalendar size={16} color="#5D87FF" />
            <Typography variant="body2" color="textSecondary">
              {formatDate(project.deadlineDate || project.date)}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconCurrencyDollar size={16} color="#5D87FF" />
            <Typography variant="body2" color="textSecondary">
              {formatCurrency(project.totalCost)}
            </Typography>
          </Stack>
        </Stack>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          pt={2}
          borderTop={1}
          borderColor="divider"
        >
          <Box>
            <Typography variant="caption" color="textSecondary">
              Dibayar
            </Typography>
            <Typography variant="h6" fontWeight={600} color="success.main">
              {formatCurrency(project.amountPaid)}
            </Typography>
          </Box>
          <Tooltip title={project.team.join(', ')}>
            <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 32, height: 32, fontSize: '0.875rem' } }}>
              {project.team.map((member, index) => (
                <Avatar key={index} sx={{ bgcolor: 'primary.main' }}>
                  {member.charAt(0)}
                </Avatar>
              ))}
            </AvatarGroup>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
