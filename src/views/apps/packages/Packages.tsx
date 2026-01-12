// ============================================
// PACKAGES MANAGEMENT PAGE
// ============================================

import React, { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  Button,
  Grid,
  Tabs,
  Tab,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Switch,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';

import { mockPackages, mockAddOns } from '../../../data/mockPackages';
import type { Package, AddOn, PackageFormData, AddOnFormData } from '../../../types/packages';
import PackageCard from '../../../components/apps/packages/PackageCard';
import AddOnCard from '../../../components/apps/packages/AddOnCard';
import PackageForm from '../../../components/apps/packages/PackageForm';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`packages-tabpanel-${index}`}
      aria-labelledby={`packages-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const Packages: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [packages, setPackages] = useState<Package[]>(mockPackages);
  const [addOns, setAddOns] = useState<AddOn[]>(mockAddOns);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = useState<Package | AddOn | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'add' | 'edit' | 'view'>('add');
  const [currentTab, setCurrentTab] = useState<'packages' | 'addons'>('packages');

  // Package form state
  const [packageForm, setPackageForm] = useState<PackageFormData>({
    name: '',
    category: '',
    region: '',
    price: 0,
    duration_options: [],
    physical_items: [],
    digital_items: [],
    processing_time: '',
    photographers: '',
    videographers: '',
    default_printing_cost: 0,
    default_transport_cost: 0,
    cover_image: '',
    is_active: true,
  });

  // Add-on form state
  const [addOnForm, setAddOnForm] = useState<AddOnFormData>({
    name: '',
    price: 0,
    region: '',
    description: '',
    is_active: true,
  });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setCurrentTab(newValue === 0 ? 'packages' : 'addons');
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, item: Package | AddOn) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };

  const handleAddNew = () => {
    if (currentTab === 'packages') {
      setPackageForm({
        name: '',
        category: '',
        region: '',
        price: 0,
        duration_options: [],
        physical_items: [],
        digital_items: [],
        processing_time: '',
        photographers: '',
        videographers: '',
        default_printing_cost: 0,
        default_transport_cost: 0,
        cover_image: '',
        is_active: true,
      });
    } else {
      setAddOnForm({
        name: '',
        price: 0,
        region: '',
        description: '',
        is_active: true,
      });
    }
    setDialogType('add');
    setDialogOpen(true);
    handleMenuClose();
  };

  const handleEdit = () => {
    if (selectedItem && currentTab === 'packages') {
      const pkg = selectedItem as Package;
      setPackageForm({
        name: pkg.name,
        category: pkg.category,
        region: pkg.region || '',
        price: pkg.price,
        duration_options: pkg.duration_options,
        physical_items: pkg.physical_items,
        digital_items: pkg.digital_items,
        processing_time: pkg.processing_time || '',
        photographers: pkg.photographers || '',
        videographers: pkg.videographers || '',
        default_printing_cost: pkg.default_printing_cost,
        default_transport_cost: pkg.default_transport_cost,
        cover_image: pkg.cover_image || '',
        is_active: pkg.is_active,
      });
    } else if (selectedItem && currentTab === 'addons') {
      const addon = selectedItem as AddOn;
      setAddOnForm({
        name: addon.name,
        price: addon.price,
        region: addon.region || '',
        description: addon.description || '',
        is_active: addon.is_active,
      });
    }
    setDialogType('edit');
    setDialogOpen(true);
    handleMenuClose();
  };

  const handleView = () => {
    setDialogType('view');
    setDialogOpen(true);
    handleMenuClose();
  };

  const handleDelete = () => {
    if (selectedItem) {
      if (currentTab === 'packages') {
        setPackages(packages.filter(pkg => pkg.id !== selectedItem.id));
      } else {
        setAddOns(addOns.filter(addon => addon.id !== selectedItem.id));
      }
    }
    handleMenuClose();
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedItem(null);
  };

  const handleSave = () => {
    // In real app, this would make API calls
    console.log('Saving...', currentTab === 'packages' ? packageForm : addOnForm);
    setDialogOpen(false);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Manajemen Paket
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddNew}
        >
          Tambah {tabValue === 0 ? 'Paket' : 'Add-on'}
        </Button>
      </Box>

      {/* Tabs */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Paket Layanan" />
            <Tab label="Add-ons" />
          </Tabs>
        </Box>

        {/* Packages Tab */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            {packages.map((pkg) => (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={pkg.id}>
                <PackageCard
                  package={pkg}
                  onMenuClick={handleMenuClick}
                />
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Add-ons Tab */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            {addOns.map((addon) => (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={addon.id}>
                <AddOnCard
                  addOn={addon}
                  onMenuClick={handleMenuClick}
                />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      </Card>

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleView}>
          <ViewIcon sx={{ mr: 1 }} />
          Lihat Detail
        </MenuItem>
        <MenuItem onClick={handleEdit}>
          <EditIcon sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <DeleteIcon sx={{ mr: 1 }} />
          Hapus
        </MenuItem>
      </Menu>

      {/* Dialog for Add/Edit/View */}
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {dialogType === 'add' && `Tambah ${currentTab === 'packages' ? 'Paket' : 'Add-on'} Baru`}
          {dialogType === 'edit' && `Edit ${currentTab === 'packages' ? 'Paket' : 'Add-on'}`}
          {dialogType === 'view' && `Detail ${currentTab === 'packages' ? 'Paket' : 'Add-on'}`}
        </DialogTitle>
        <DialogContent>
          {currentTab === 'packages' ? (
            <PackageForm
              formData={packageForm}
              onChange={setPackageForm}
              readOnly={dialogType === 'view'}
            />
          ) : (
            <Box sx={{ pt: 1 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Nama Add-on"
                    value={addOnForm.name}
                    onChange={(e) => setAddOnForm({ ...addOnForm, name: e.target.value })}
                    disabled={dialogType === 'view'}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Harga"
                    type="number"
                    value={addOnForm.price}
                    onChange={(e) => setAddOnForm({ ...addOnForm, price: Number(e.target.value) })}
                    disabled={dialogType === 'view'}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Region"
                    value={addOnForm.region}
                    onChange={(e) => setAddOnForm({ ...addOnForm, region: e.target.value })}
                    disabled={dialogType === 'view'}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Deskripsi"
                    multiline
                    rows={3}
                    value={addOnForm.description}
                    onChange={(e) => setAddOnForm({ ...addOnForm, description: e.target.value })}
                    disabled={dialogType === 'view'}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={addOnForm.is_active}
                        onChange={(e) => setAddOnForm({ ...addOnForm, is_active: e.target.checked })}
                        disabled={dialogType === 'view'}
                      />
                    }
                    label="Aktif"
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>
            {dialogType === 'view' ? 'Tutup' : 'Batal'}
          </Button>
          {dialogType !== 'view' && (
            <Button onClick={handleSave} variant="contained">
              Simpan
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Packages;