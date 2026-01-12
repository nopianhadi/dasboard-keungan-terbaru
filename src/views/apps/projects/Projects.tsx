import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  CircularProgress,
  Backdrop,
  ToggleButtonGroup,
  ToggleButton,
  Chip,
  Stack,
  Divider,
  Alert,
  Tooltip,
} from '@mui/material';
import {
  IconPlus,
  IconSearch,
  IconSortAscending,
  IconSortDescending,
  IconDownload,
  IconLayoutGrid,
  IconLayoutKanban,
  IconBriefcase,
  IconChecklist,
  IconCurrencyDollar,
  IconCalendarEvent,
  IconTable,
} from '@tabler/icons-react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/components/shared/DashboardCard';
import BlankCard from 'src/components/shared/BlankCard';
import ProjectKanban from 'src/components/apps/projects/ProjectKanban';
import ProjectTable from 'src/components/apps/projects/ProjectTable';
import { mockProjects, formatCurrency, type Project } from 'src/data/mockData';
import { useSnackbar } from 'src/context/SnackbarContext';

// Import Project Dashboard Components
import ProjectCard from 'src/components/dashboards/projects/ProjectCard';
import ProjectStatCard from 'src/components/dashboards/projects/ProjectStatCard';
import RevenueChart from 'src/components/dashboards/projects/RevenueChart';
import ProjectsOverview from 'src/components/dashboards/projects/ProjectsOverview';

const BCrumb = [
  {
    to: '/',
    title: 'Beranda',
  },
  {
    title: 'Proyek',
  },
];

const Projects = () => {
  const { showSnackbar } = useSnackbar();
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openNewProject, setOpenNewProject] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'projectName' | 'date' | 'progress'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'kanban' | 'table'>('grid');

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, project: Project) => {
    setAnchorEl(event.currentTarget);
    setSelectedProject(project);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = () => {
    setOpenDialog(true);
    handleMenuClose();
  };

  const handleEditProject = () => {
    setOpenEditDialog(true);
    handleMenuClose();
  };

  const handleDeleteProject = () => {
    setOpenDeleteDialog(true);
    handleMenuClose();
  };

  const confirmDelete = () => {
    if (selectedProject) {
      setLoading(true);
      setTimeout(() => {
        setProjects(projects.filter((p) => p.id !== selectedProject.id));
        setOpenDeleteDialog(false);
        setLoading(false);
        showSnackbar(`Proyek ${selectedProject.projectName} berhasil dihapus!`, 'info');
        setSelectedProject(null);
      }, 500);
    }
  };

  // Filter by tab
  let filteredProjects = projects.filter((project) => {
    if (tabValue === 0) return true; // Semua
    if (tabValue === 1) return ['Pemotretan', 'Editing', 'Revisi'].includes(project.status);
    if (tabValue === 2) return project.status === 'Selesai';
    if (tabValue === 3) return ['Diskusi', 'Persiapan'].includes(project.status);
    return true;
  });

  // Filter by search
  if (searchQuery) {
    filteredProjects = filteredProjects.filter(
      (project) =>
        project.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.projectType.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Sort projects
  filteredProjects = [...filteredProjects].sort((a, b) => {
    let aValue: any = a[sortBy];
    let bValue: any = b[sortBy];

    if (sortBy === 'projectName') {
      aValue = a.projectName.toLowerCase();
      bValue = b.projectName.toLowerCase();
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Calculate statistics
  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => ['Pemotretan', 'Editing', 'Revisi'].includes(p.status)).length;
  const completedProjects = projects.filter(p => p.status === 'Selesai').length;
  const preparationProjects = projects.filter(p => ['Diskusi', 'Persiapan'].includes(p.status)).length;
  const totalRevenue = projects.reduce((sum, p) => sum + p.totalCost, 0);
  const paidAmount = projects.reduce((sum, p) => sum + p.amountPaid, 0);
  const pendingAmount = totalRevenue - paidAmount;
  const avgProgress = projects.reduce((sum, p) => sum + p.progress, 0) / projects.length || 0;

  // Mock data for charts
  const projectsData = [8, 12, 10, 15, 13, 18, 20];
  const revenueData = [10, 15, 12, 20, 18, 25, 30];

  return (
    <PageContainer title="Dashboard Proyek" description="Dashboard manajemen proyek">
      <Breadcrumb title="Dashboard Proyek" items={BCrumb} />

      <Box>
        {/* Statistics Cards */}
        <Grid container spacing={3} mb={3}>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <ProjectStatCard
              title="Total Proyek"
              value={totalProjects}
              growth={15.2}
              data={projectsData}
              icon={<IconBriefcase width={24} />}
              color="primary"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <ProjectStatCard
              title="Proyek Aktif"
              value={activeProjects}
              growth={10.5}
              data={[5, 8, 6, 10, 8, 12, 15]}
              icon={<IconCalendarEvent width={24} />}
              color="warning"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <ProjectStatCard
              title="Total Revenue"
              value={formatCurrency(totalRevenue)}
              growth={18.7}
              data={revenueData}
              icon={<IconCurrencyDollar width={24} />}
              color="success"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <ProjectStatCard
              title="Avg Progress"
              value={`${avgProgress.toFixed(0)}%`}
              growth={7.3}
              data={[30, 40, 35, 50, 45, 60, 55]}
              icon={<IconChecklist width={24} />}
              color="info"
            />
          </Grid>
        </Grid>

        {/* Overview & Revenue Chart */}
        <Grid container spacing={3} mb={3}>
          <Grid size={{ xs: 12, lg: 4 }}>
            <ProjectsOverview
              totalProjects={totalProjects}
              activeProjects={activeProjects}
              completedProjects={completedProjects}
              preparationProjects={preparationProjects}
              growth={15.2}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 8 }}>
            <RevenueChart
              totalRevenue={totalRevenue}
              paidAmount={paidAmount}
              pendingAmount={pendingAmount}
            />
          </Grid>
        </Grid>

        {/* Projects List */}
        <DashboardCard
          title="Daftar Proyek"
          subtitle={`${filteredProjects.length} proyek ditemukan`}
          action={
            <Stack direction="row" spacing={1}>
              {/* View Mode Toggle */}
              <Tooltip title="Ubah Tampilan">
                <ToggleButtonGroup
                  value={viewMode}
                  exclusive
                  onChange={(_e, newMode) => newMode && setViewMode(newMode)}
                  size="small"
                >
                  <ToggleButton value="grid" title="Grid View">
                    <IconLayoutGrid size={18} />
                  </ToggleButton>
                  <ToggleButton value="table" title="Table View">
                    <IconTable size={18} />
                  </ToggleButton>
                  <ToggleButton value="kanban" title="Kanban Board">
                    <IconLayoutKanban size={18} />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Tooltip>

              <Button
                variant="outlined"
                size="small"
                startIcon={<IconDownload size={18} />}
                onClick={() => {
                  try {
                    const csv = [
                      ['Nama Proyek', 'Klien', 'Tipe', 'Status', 'Progress', 'Budget'].join(','),
                      ...filteredProjects.map((p) =>
                        [
                          p.projectName,
                          p.clientName,
                          p.projectType,
                          p.status,
                          p.progress,
                          p.totalCost,
                        ].join(',')
                      ),
                    ].join('\n');
                    const blob = new Blob([csv], { type: 'text/csv' });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'projects.csv';
                    a.click();
                    showSnackbar('Data proyek berhasil diekspor!', 'success');
                  } catch (error) {
                    showSnackbar('Gagal mengekspor data!', 'error');
                  }
                }}
              >
                Export
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<IconPlus size={18} />}
                onClick={() => setOpenNewProject(true)}
              >
                Proyek Baru
              </Button>
            </Stack>
          }
        >
          {/* Filter & Search Card */}
          <BlankCard>
            <Box sx={{ p: 2, bgcolor: 'grey.50' }}>
              <Stack spacing={2}>
                {/* Search and Sort Row */}
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Cari proyek (nama, klien, tipe)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    slotProps={{
                      input: {
                        startAdornment: <IconSearch size={20} style={{ marginRight: 8 }} />,
                      },
                    }}
                  />
                  <Stack direction="row" spacing={1}>
                    <FormControl size="small" sx={{ minWidth: 150 }}>
                      <InputLabel>Urutkan</InputLabel>
                      <Select
                        value={sortBy}
                        label="Urutkan"
                        onChange={(e) => setSortBy(e.target.value as any)}
                      >
                        <MenuItem value="projectName">Nama</MenuItem>
                        <MenuItem value="date">Tanggal</MenuItem>
                        <MenuItem value="progress">Progress</MenuItem>
                      </Select>
                    </FormControl>
                    <Tooltip title={sortOrder === 'asc' ? 'Urutkan Descending' : 'Urutkan Ascending'}>
                      <IconButton
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        color="primary"
                        size="small"
                      >
                        {sortOrder === 'asc' ? <IconSortAscending /> : <IconSortDescending />}
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Stack>

                {/* Status Tabs */}
                <Tabs 
                  value={tabValue} 
                  onChange={(_e, newValue) => setTabValue(newValue)}
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  <Tab 
                    label={
                      <Stack direction="row" spacing={1} alignItems="center">
                        <span>Semua</span>
                        <Chip label={projects.length} size="small" color="default" />
                      </Stack>
                    } 
                  />
                  <Tab 
                    label={
                      <Stack direction="row" spacing={1} alignItems="center">
                        <span>Aktif</span>
                        <Chip label={activeProjects} size="small" color="warning" />
                      </Stack>
                    } 
                  />
                  <Tab 
                    label={
                      <Stack direction="row" spacing={1} alignItems="center">
                        <span>Selesai</span>
                        <Chip label={completedProjects} size="small" color="success" />
                      </Stack>
                    } 
                  />
                  <Tab 
                    label={
                      <Stack direction="row" spacing={1} alignItems="center">
                        <span>Persiapan</span>
                        <Chip label={preparationProjects} size="small" color="info" />
                      </Stack>
                    } 
                  />
                </Tabs>
              </Stack>
            </Box>
          </BlankCard>

          <Divider sx={{ my: 0 }} />

          {/* Content Area */}
          <Box sx={{ mt: 3 }}>
            {filteredProjects.length === 0 ? (
              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="h6">
                  Tidak ada proyek ditemukan
                </Typography>
                <Typography variant="body2" mt={1}>
                  {searchQuery ? 'Coba kata kunci lain atau ubah filter' : 'Tambahkan proyek baru untuk memulai'}
                </Typography>
              </Alert>
            ) : viewMode === 'table' ? (
              <ProjectTable
                projects={filteredProjects}
                onMenuAction={(event: React.MouseEvent<HTMLElement>, project: Project) => {
                  handleMenuClick(event, project);
                }}
              />
            ) : viewMode === 'kanban' ? (
              <ProjectKanban
                projects={filteredProjects}
                onProjectMove={(projectId: string, newStatus: string) => {
                  setLoading(true);
                  setTimeout(() => {
                    setProjects(
                      projects.map((p) =>
                        p.id === projectId ? { ...p, status: newStatus } : p
                      )
                    );
                    setLoading(false);
                    showSnackbar(`Proyek berhasil dipindahkan ke ${newStatus}!`, 'success');
                  }, 500);
                }}
                onProjectClick={(project: Project) => {
                  setSelectedProject(project);
                  showSnackbar(`Detail proyek: ${project.projectName}`, 'info');
                }}
                onMenuAction={(event: React.MouseEvent<HTMLElement>, project: Project) => {
                  handleMenuClick(event, project);
                }}
              />
            ) : (
              <Grid container spacing={3}>
                {filteredProjects.map((project) => (
                  <Grid key={project.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <ProjectCard project={project} onMenuClick={handleMenuClick} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </DashboardCard>
      </Box>

      {/* Menu Aksi */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleStatusChange}>Ubah Status</MenuItem>
        <MenuItem onClick={handleMenuClose}>Lihat Detail</MenuItem>
        <MenuItem onClick={handleEditProject}>Edit Proyek</MenuItem>
        <MenuItem onClick={handleDeleteProject}>Hapus</MenuItem>
      </Menu>

      {/* Dialog Ubah Status */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Ubah Status Proyek</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={selectedProject?.status || ''}
              label="Status"
            >
              <MenuItem value="Diskusi">Diskusi</MenuItem>
              <MenuItem value="Persiapan">Persiapan</MenuItem>
              <MenuItem value="Pemotretan">Pemotretan</MenuItem>
              <MenuItem value="Editing">Editing</MenuItem>
              <MenuItem value="Revisi">Revisi</MenuItem>
              <MenuItem value="Selesai">Selesai</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Batal</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Simpan
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Edit Proyek */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Proyek</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Judul Proyek"
                defaultValue={selectedProject?.projectName}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Nama Klien" defaultValue={selectedProject?.clientName} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Tipe Proyek</InputLabel>
                <Select label="Tipe Proyek" defaultValue={selectedProject?.projectType}>
                  <MenuItem value="Wedding">Wedding</MenuItem>
                  <MenuItem value="Prewedding">Prewedding</MenuItem>
                  <MenuItem value="Corporate">Corporate</MenuItem>
                  <MenuItem value="Product">Product</MenuItem>
                  <MenuItem value="Event">Event</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Budget"
                type="number"
                defaultValue={selectedProject?.totalCost}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="Deadline"
                defaultValue={selectedProject?.deadlineDate}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Batal</Button>
          <Button variant="contained" onClick={() => setOpenEditDialog(false)}>
            Simpan
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Konfirmasi Hapus */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Hapus Proyek</DialogTitle>
        <DialogContent>
          <Typography>
            Apakah Anda yakin ingin menghapus proyek <strong>{selectedProject?.projectName}</strong>?
            Tindakan ini tidak dapat dibatalkan.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Batal</Button>
          <Button variant="contained" color="error" onClick={confirmDelete}>
            Hapus
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Proyek Baru */}
      <Dialog open={openNewProject} onClose={() => setOpenNewProject(false)} maxWidth="md" fullWidth>
        <DialogTitle>Buat Proyek Baru</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={12}>
              <TextField fullWidth label="Judul Proyek" required />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Nama Klien" required />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Tipe Proyek</InputLabel>
                <Select label="Tipe Proyek">
                  <MenuItem value="Wedding">Wedding</MenuItem>
                  <MenuItem value="Prewedding">Prewedding</MenuItem>
                  <MenuItem value="Corporate">Corporate</MenuItem>
                  <MenuItem value="Product">Product</MenuItem>
                  <MenuItem value="Event">Event</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Budget" placeholder="Rp 0" type="number" required />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="Deadline"
                required
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>
            <Grid size={12}>
              <TextField fullWidth label="Lokasi" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNewProject(false)}>Batal</Button>
          <Button variant="contained" onClick={() => setOpenNewProject(false)}>
            Buat Proyek
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Loading Backdrop */}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </PageContainer>
  );
};

export default Projects;
