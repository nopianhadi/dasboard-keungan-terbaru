import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Stack,
  LinearProgress,
} from '@mui/material';
import { IconDotsVertical } from '@tabler/icons-react';
import { formatCurrency, formatDate, getStatusColor, type Project } from 'src/data/mockData';

interface ProjectKanbanProps {
  projects: Project[];
  onProjectMove?: (projectId: string, newStatus: string) => void;
  onProjectClick: (project: Project) => void;
  onMenuAction: (event: React.MouseEvent<HTMLElement>, project: Project) => void;
}

const ProjectKanban: React.FC<ProjectKanbanProps> = ({
  projects,
  onProjectMove,
  onProjectClick,
  onMenuAction,
}) => {
  const statuses = ['Diskusi', 'Persiapan', 'Pemotretan', 'Editing', 'Revisi', 'Selesai'];

  const getProjectsByStatus = (status: string) => {
    return projects.filter((p) => p.status === status);
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 2 }}>
      {statuses.map((status) => {
        const statusProjects = getProjectsByStatus(status);
        return (
          <Box
            key={status}
            sx={{
              minWidth: 300,
              maxWidth: 300,
              bgcolor: 'grey.50',
              borderRadius: 2,
              p: 2,
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight={600}>
                {status}
              </Typography>
              <Chip label={statusProjects.length} size="small" color={getStatusColor(status)} />
            </Stack>

            <Stack spacing={2}>
              {statusProjects.map((project) => (
                <Card
                  key={project.id}
                  sx={{
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': {
                      boxShadow: 3,
                      transform: 'translateY(-2px)',
                    },
                  }}
                  onClick={() => onProjectClick(project)}
                >
                  <CardContent>
                    <Stack direction="row" justifyContent="space-between" alignItems="start" mb={1}>
                      <Typography variant="subtitle1" fontWeight={600} sx={{ flex: 1 }}>
                        {project.projectName}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          onMenuAction(e, project);
                        }}
                      >
                        <IconDotsVertical size={16} />
                      </IconButton>
                    </Stack>

                    <Typography variant="body2" color="textSecondary" mb={1}>
                      {project.clientName}
                    </Typography>

                    <Chip label={project.projectType} size="small" variant="outlined" sx={{ mb: 2 }} />

                    <Box mb={1}>
                      <Stack direction="row" justifyContent="space-between" mb={0.5}>
                        <Typography variant="caption">Progress</Typography>
                        <Typography variant="caption" fontWeight={600}>
                          {project.progress}%
                        </Typography>
                      </Stack>
                      <LinearProgress
                        variant="determinate"
                        value={project.progress}
                        sx={{ height: 6, borderRadius: 3 }}
                      />
                    </Box>

                    <Stack direction="row" justifyContent="space-between" alignItems="center" mt={2}>
                      <Typography variant="caption" color="textSecondary">
                        {formatDate(project.date)}
                      </Typography>
                      <Typography variant="caption" fontWeight={600} color="primary">
                        {formatCurrency(project.totalCost)}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              ))}

              {statusProjects.length === 0 && (
                <Box
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    border: '1px dashed',
                    borderColor: 'divider',
                  }}
                >
                  <Typography variant="body2" color="textSecondary">
                    Tidak ada proyek
                  </Typography>
                </Box>
              )}
            </Stack>
          </Box>
        );
      })}
    </Box>
  );
};

export default ProjectKanban;
