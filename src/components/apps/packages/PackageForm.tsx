// ============================================
// PACKAGE FORM COMPONENT
// ============================================

import React, { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Chip,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

import { getPackageCategories } from '../../../data/mockPackages';
import type { PackageFormData } from '../../../types/packages';

interface PackageFormProps {
  formData: PackageFormData;
  onChange: (data: PackageFormData) => void;
  readOnly?: boolean;
}

const PackageForm: React.FC<PackageFormProps> = ({ formData, onChange, readOnly = false }) => {
  const [newDuration, setNewDuration] = useState('');
  const [newPhysicalItem, setNewPhysicalItem] = useState('');
  const [newDigitalItem, setNewDigitalItem] = useState('');

  const categories = getPackageCategories();

  const handleAddDuration = () => {
    if (newDuration.trim()) {
      onChange({
        ...formData,
        duration_options: [...formData.duration_options, newDuration.trim()]
      });
      setNewDuration('');
    }
  };

  const handleRemoveDuration = (index: number) => {
    onChange({
      ...formData,
      duration_options: formData.duration_options.filter((_, i) => i !== index)
    });
  };

  const handleAddPhysicalItem = () => {
    if (newPhysicalItem.trim()) {
      onChange({
        ...formData,
        physical_items: [...formData.physical_items, newPhysicalItem.trim()]
      });
      setNewPhysicalItem('');
    }
  };

  const handleRemovePhysicalItem = (index: number) => {
    onChange({
      ...formData,
      physical_items: formData.physical_items.filter((_, i) => i !== index)
    });
  };

  const handleAddDigitalItem = () => {
    if (newDigitalItem.trim()) {
      onChange({
        ...formData,
        digital_items: [...formData.digital_items, newDigitalItem.trim()]
      });
      setNewDigitalItem('');
    }
  };

  const handleRemoveDigitalItem = (index: number) => {
    onChange({
      ...formData,
      digital_items: formData.digital_items.filter((_, i) => i !== index)
    });
  };

  return (
    <Box sx={{ pt: 1 }}>
      <Grid container spacing={3}>
        {/* Basic Information */}
        <Grid size={{ xs: 12 }}>
          <Typography variant="h6" gutterBottom>
            Informasi Dasar
          </Typography>
        </Grid>
        
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Nama Paket"
            value={formData.name}
            onChange={(e) => onChange({ ...formData, name: e.target.value })}
            disabled={readOnly}
          />
        </Grid>
        
        <Grid size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <InputLabel>Kategori</InputLabel>
            <Select
              value={formData.category}
              label="Kategori"
              onChange={(e) => onChange({ ...formData, category: e.target.value })}
              disabled={readOnly}
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Region"
            value={formData.region}
            onChange={(e) => onChange({ ...formData, region: e.target.value })}
            disabled={readOnly}
          />
        </Grid>
        
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Harga"
            type="number"
            value={formData.price}
            onChange={(e) => onChange({ ...formData, price: Number(e.target.value) })}
            disabled={readOnly}
          />
        </Grid>

        {/* Team Information */}
        <Grid size={{ xs: 12 }}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            Informasi Tim
          </Typography>
        </Grid>
        
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Fotografer"
            value={formData.photographers}
            onChange={(e) => onChange({ ...formData, photographers: e.target.value })}
            disabled={readOnly}
            placeholder="e.g., 2 Fotografer"
          />
        </Grid>
        
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Videografer"
            value={formData.videographers}
            onChange={(e) => onChange({ ...formData, videographers: e.target.value })}
            disabled={readOnly}
            placeholder="e.g., 1 Videografer"
          />
        </Grid>
        
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Waktu Pengerjaan"
            value={formData.processing_time}
            onChange={(e) => onChange({ ...formData, processing_time: e.target.value })}
            disabled={readOnly}
            placeholder="e.g., 14 hari kerja"
          />
        </Grid>

        {/* Cost Information */}
        <Grid size={{ xs: 12 }}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            Biaya Tambahan
          </Typography>
        </Grid>
        
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Biaya Cetak Default"
            type="number"
            value={formData.default_printing_cost}
            onChange={(e) => onChange({ ...formData, default_printing_cost: Number(e.target.value) })}
            disabled={readOnly}
          />
        </Grid>
        
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Biaya Transport Default"
            type="number"
            value={formData.default_transport_cost}
            onChange={(e) => onChange({ ...formData, default_transport_cost: Number(e.target.value) })}
            disabled={readOnly}
          />
        </Grid>

        {/* Duration Options */}
        <Grid size={{ xs: 12 }}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            Opsi Durasi
          </Typography>
          
          {!readOnly && (
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                size="small"
                label="Tambah Durasi"
                value={newDuration}
                onChange={(e) => setNewDuration(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddDuration()}
                placeholder="e.g., 8 Jam"
              />
              <Button
                variant="outlined"
                onClick={handleAddDuration}
                startIcon={<AddIcon />}
              >
                Tambah
              </Button>
            </Box>
          )}
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {formData.duration_options.map((duration, index) => (
              <Chip
                key={index}
                label={duration}
                onDelete={readOnly ? undefined : () => handleRemoveDuration(index)}
                color="primary"
                variant="outlined"
              />
            ))}
          </Box>
        </Grid>

        {/* Physical Items */}
        <Grid size={{ xs: 12 }}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            Item Fisik
          </Typography>
          
          {!readOnly && (
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                size="small"
                label="Tambah Item Fisik"
                value={newPhysicalItem}
                onChange={(e) => setNewPhysicalItem(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddPhysicalItem()}
                placeholder="e.g., Album 30x30 cm"
                sx={{ flexGrow: 1 }}
              />
              <Button
                variant="outlined"
                onClick={handleAddPhysicalItem}
                startIcon={<AddIcon />}
              >
                Tambah
              </Button>
            </Box>
          )}
          
          <List dense>
            {formData.physical_items.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={item} />
                {!readOnly && (
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => handleRemovePhysicalItem(index)}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                )}
              </ListItem>
            ))}
          </List>
        </Grid>

        {/* Digital Items */}
        <Grid size={{ xs: 12 }}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            Item Digital
          </Typography>
          
          {!readOnly && (
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                size="small"
                label="Tambah Item Digital"
                value={newDigitalItem}
                onChange={(e) => setNewDigitalItem(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddDigitalItem()}
                placeholder="e.g., Foto High Resolution"
                sx={{ flexGrow: 1 }}
              />
              <Button
                variant="outlined"
                onClick={handleAddDigitalItem}
                startIcon={<AddIcon />}
              >
                Tambah
              </Button>
            </Box>
          )}
          
          <List dense>
            {formData.digital_items.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={item} />
                {!readOnly && (
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => handleRemoveDigitalItem(index)}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                )}
              </ListItem>
            ))}
          </List>
        </Grid>

        {/* Status */}
        <Grid size={{ xs: 12 }}>
          <Divider sx={{ my: 2 }} />
          <FormControlLabel
            control={
              <Switch
                checked={formData.is_active}
                onChange={(e) => onChange({ ...formData, is_active: e.target.checked })}
                disabled={readOnly}
              />
            }
            label="Paket Aktif"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PackageForm;