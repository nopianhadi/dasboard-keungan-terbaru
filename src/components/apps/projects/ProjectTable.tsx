import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Collapse,
  Typography,
  Chip,
  LinearProgress,
  Stack,
  Avatar,
  AvatarGroup,
  Paper,
} from '@mui/material';
import {
  IconChevronDown,
  IconChevronUp,
  IconDotsVertical,
  IconCalendar,
  IconCurrencyDollar,
  IconUsers,
  IconMapPin,
} from '@tabler/icons-react';
import { formatCurrency, formatDate, getStatusColor, type Project } from 'src/data/mockData';

interface ProjectTableProps {
  projects: Project[];
  onMenuAction: (event: React.MouseEvent<HTMLElement>, project: Project) => void;
}

interface RowProps {
  project: Project;
  onMenuAction: (event: React.MouseEvent<HTMLElement>, project: Project) => void;
}

const ProjectRow: React.FC<RowProps> = ({ project, onMenuAction }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow
        hover
        sx={{
          '& > *': { borderBottom: 'unset' },
          cursor: 'pointer',
          bgcolor: open ? 'action.hover' : 'inherit',
        }}
      >
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <IconChevronUp size={18} /> : <IconChevronDown size={18} />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle2" fontWeight={600}>
            {project.projectName}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {project.clientName}
          </Typography>
        </TableCell>
        <TableCell>
          <Chip
            label={project.projectType}
            size="small"
            variant="outlined"
            sx={{ fontWeight: 500 }}
          />
        </TableCell>
        <TableCell>
          <Chip
            label={project.status}
            size="small"
            color={getStatusColor(project.status) as any}
          />
        </TableCell>
        <TableCell>
          <Box sx={{ minWidth: 120 }}>
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
              color={
                project.progress >= 80
                  ? 'success'
                  : project.progress >= 50
                  ? 'primary'
                  : 'warning'
              }
            />
          </Box>
        </TableCell>
        <TableCell>
          <Typography variant="body2" fontWeight={600}>
            {formatCurrency(project.totalCost)}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Paid: {formatCurrency(project.amountPaid)}
          </Typography>
        </TableCell>
        <TableCell>
          <Chip
            label={project.paymentStatus}
            size="small"
            color={getStatusColor(project.paymentStatus) as any}
          />
        </TableCell>
        <TableCell align="right">
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onMenuAction(e, project);
            }}
          >
            <IconDotsVertical size={18} />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom fontWeight={600} mb={2}>
                Detail Proyek
              </Typography>
              <Stack spacing={2}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                  {/* Left Column */}
                  <Box flex={1}>
                    <Stack spacing={1.5}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <IconCalendar size={18} />
                        <Box>
                          <Typography variant="caption" color="textSecondary">
                            Tanggal Proyek
                          </Typography>
                          <Typography variant="body2" fontWeight={600}>
                            {formatDate(project.date)}
                          </Typography>
                        </Box>
                      </Box>
                      {project.deadlineDate && (
                        <Box display="flex" alignItems="center" gap={1}>
                          <IconCalendar size={18} />
                          <Box>
                            <Typography variant="caption" color="textSecondary">
                              Deadline
                            </Typography>
                            <Typography variant="body2" fontWeight={600}>
                              {formatDate(project.deadlineDate)}
                            </Typography>
                          </Box>
                        </Box>
                      )}
                      {project.location && (
                        <Box display="flex" alignItems="center" gap={1}>
                          <IconMapPin size={18} />
                          <Box>
                            <Typography variant="caption" color="textSecondary">
                              Lokasi
                            </Typography>
                            <Typography variant="body2" fontWeight={600}>
                              {project.location}
                            </Typography>
                          </Box>
                        </Box>
                      )}
                    </Stack>
                  </Box>

                  {/* Right Column */}
                  <Box flex={1}>
                    <Stack spacing={1.5}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <IconCurrencyDollar size={18} />
                        <Box>
                          <Typography variant="caption" color="textSecondary">
                            Total Cost
                          </Typography>
                          <Typography variant="body2" fontWeight={600}>
                            {formatCurrency(project.totalCost)}
                          </Typography>
                        </Box>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <IconCurrencyDollar size={18} />
                        <Box>
                          <Typography variant="caption" color="textSecondary">
                            Amount Paid
                          </Typography>
                          <Typography variant="body2" fontWeight={600} color="success.main">
                            {formatCurrency(project.amountPaid)}
                          </Typography>
                        </Box>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <IconCurrencyDollar size={18} />
                        <Box>
                          <Typography variant="caption" color="textSecondary">
                            Remaining
                          </Typography>
                          <Typography variant="body2" fontWeight={600} color="error.main">
                            {formatCurrency(project.totalCost - project.amountPaid)}
                          </Typography>
                        </Box>
                      </Box>
                    </Stack>
                  </Box>
                </Stack>

                {/* Team Members */}
                {project.team && project.team.length > 0 && (
                  <Box>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <IconUsers size={18} />
                      <Typography variant="caption" color="textSecondary">
                        Tim Proyek
                      </Typography>
                    </Box>
                    <AvatarGroup max={5} sx={{ justifyContent: 'flex-start' }}>
                      {project.team.map((member, index) => (
                        <Avatar
                          key={index}
                          sx={{ width: 32, height: 32, fontSize: '0.875rem' }}
                          title={member}
                        >
                          {member.charAt(0)}
                        </Avatar>
                      ))}
                    </AvatarGroup>
                    <Stack direction="row" spacing={1} mt={1} flexWrap="wrap" gap={0.5}>
                      {project.team.map((member, index) => (
                        <Chip key={index} label={member} size="small" variant="outlined" />
                      ))}
                    </Stack>
                  </Box>
                )}

                {/* Package Info */}
                <Box>
                  <Typography variant="caption" color="textSecondary">
                    Package
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {project.packageName}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const ProjectTable: React.FC<ProjectTableProps> = ({ projects, onMenuAction }) => {
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: 'grey.50' }}>
            <TableCell width={50} />
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Proyek
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Tipe
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Status
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Progress
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Budget
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Payment
              </Typography>
            </TableCell>
            <TableCell width={50} />
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((project) => (
            <ProjectRow key={project.id} project={project} onMenuAction={onMenuAction} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProjectTable;
