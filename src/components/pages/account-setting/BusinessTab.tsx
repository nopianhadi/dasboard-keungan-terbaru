import React, { useState } from 'react';
import { 
  CardContent, 
  Grid, 
  Typography, 
  Box, 
  Button, 
  Stack,
  Chip,
  IconButton,
  TextField
} from '@mui/material';
import { IconPlus, IconX } from '@tabler/icons-react';

// components
import BlankCard from '../../shared/BlankCard';
import CustomTextField from '../../forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';

interface BusinessSettings {
  income_categories: string[];
  expense_categories: string[];
  project_types: string[];
  event_types: string[];
  asset_categories: string[];
  sop_categories: string[];
  package_categories: string[];
  brand_color: string;
}

const BusinessTab = () => {
  const [businessSettings, setBusinessSettings] = useState<BusinessSettings>({
    income_categories: ['Pembayaran Klien', 'Lainnya'],
    expense_categories: ['Operasional', 'Gaji Tim', 'Cetak', 'Transport', 'Lainnya'],
    project_types: ['Wedding', 'Prewedding', 'Engagement', 'Birthday', 'Corporate'],
    event_types: ['Indoor', 'Outdoor', 'Studio'],
    asset_categories: ['Kamera', 'Lensa', 'Lighting', 'Audio', 'Lainnya'],
    sop_categories: ['Shooting', 'Editing', 'Client Management', 'Finance'],
    package_categories: ['Photo', 'Video', 'Photo + Video'],
    brand_color: '#3b82f6',
  });

  const [newItems, setNewItems] = useState<Record<string, string>>({});

  const handleAddItem = (category: keyof BusinessSettings) => {
    const newItem = newItems[category];
    if (newItem && newItem.trim()) {
      setBusinessSettings(prev => ({
        ...prev,
        [category]: [...(prev[category] as string[]), newItem.trim()]
      }));
      setNewItems(prev => ({ ...prev, [category]: '' }));
    }
  };

  const handleRemoveItem = (category: keyof BusinessSettings, index: number) => {
    setBusinessSettings(prev => ({
      ...prev,
      [category]: (prev[category] as string[]).filter((_, i) => i !== index)
    }));
  };

  const handleNewItemChange = (category: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewItems(prev => ({ ...prev, [category]: event.target.value }));
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBusinessSettings(prev => ({ ...prev, brand_color: event.target.value }));
  };

  const handleSave = () => {
    console.log('Business Settings:', businessSettings);
    // TODO: Implement save functionality
  };

  const CategorySection = ({ 
    title, 
    category, 
    description 
  }: { 
    title: string; 
    category: keyof BusinessSettings; 
    description: string;
  }) => (
    <BlankCard>
      <CardContent>
        <Typography variant="h6" mb={1}>
          {title}
        </Typography>
        <Typography color="textSecondary" variant="body2" mb={3}>
          {description}
        </Typography>
        
        <Stack direction="row" gap={1} flexWrap="wrap" mb={2}>
          {(businessSettings[category] as string[]).map((item, index) => (
            <Chip
              key={index}
              label={item}
              onDelete={() => handleRemoveItem(category, index)}
              deleteIcon={<IconX size={16} />}
              variant="outlined"
              size="small"
            />
          ))}
        </Stack>

        <Stack direction="row" gap={1} alignItems="center">
          <TextField
            size="small"
            placeholder={`Tambah ${title.toLowerCase()}`}
            value={newItems[category] || ''}
            onChange={handleNewItemChange(category)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddItem(category);
              }
            }}
          />
          <IconButton 
            color="primary" 
            onClick={() => handleAddItem(category)}
            disabled={!newItems[category]?.trim()}
          >
            <IconPlus size={20} />
          </IconButton>
        </Stack>
      </CardContent>
    </BlankCard>
  );

  return (
    <Grid container spacing={3}>
      {/* Brand Settings */}
      <Grid size={12}>
        <BlankCard>
          <CardContent>
            <Typography variant="h5" mb={1}>
              Pengaturan Brand
            </Typography>
            <Typography color="textSecondary" mb={3}>
              Atur warna brand dan identitas visual perusahaan
            </Typography>
            
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <CustomFormLabel sx={{ mt: 0 }} htmlFor="brand-color">
                  Warna Brand
                </CustomFormLabel>
                <Box display="flex" alignItems="center" gap={2}>
                  <input
                    type="color"
                    id="brand-color"
                    value={businessSettings.brand_color}
                    onChange={handleColorChange}
                    style={{
                      width: '50px',
                      height: '40px',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  />
                  <CustomTextField
                    value={businessSettings.brand_color}
                    onChange={handleColorChange}
                    variant="outlined"
                    placeholder="#3b82f6"
                  />
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </BlankCard>
      </Grid>

      {/* Income Categories */}
      <Grid size={{ xs: 12, md: 6 }}>
        <CategorySection
          title="Kategori Pemasukan"
          category="income_categories"
          description="Atur kategori pemasukan untuk laporan keuangan"
        />
      </Grid>

      {/* Expense Categories */}
      <Grid size={{ xs: 12, md: 6 }}>
        <CategorySection
          title="Kategori Pengeluaran"
          category="expense_categories"
          description="Atur kategori pengeluaran untuk laporan keuangan"
        />
      </Grid>

      {/* Project Types */}
      <Grid size={{ xs: 12, md: 6 }}>
        <CategorySection
          title="Jenis Proyek"
          category="project_types"
          description="Atur jenis proyek yang ditawarkan"
        />
      </Grid>

      {/* Event Types */}
      <Grid size={{ xs: 12, md: 6 }}>
        <CategorySection
          title="Jenis Acara"
          category="event_types"
          description="Atur jenis acara yang dapat dilayani"
        />
      </Grid>

      {/* Asset Categories */}
      <Grid size={{ xs: 12, md: 6 }}>
        <CategorySection
          title="Kategori Aset"
          category="asset_categories"
          description="Atur kategori aset/peralatan"
        />
      </Grid>

      {/* SOP Categories */}
      <Grid size={{ xs: 12, md: 6 }}>
        <CategorySection
          title="Kategori SOP"
          category="sop_categories"
          description="Atur kategori Standard Operating Procedure"
        />
      </Grid>

      {/* Package Categories */}
      <Grid size={12}>
        <CategorySection
          title="Kategori Paket"
          category="package_categories"
          description="Atur kategori paket layanan yang ditawarkan"
        />
      </Grid>

      {/* Save Button */}
      <Grid size={12}>
        <Stack direction="row" spacing={2} sx={{ justifyContent: 'end' }}>
          <Button size="large" variant="contained" color="primary" onClick={handleSave}>
            Simpan Pengaturan
          </Button>
          <Button size="large" variant="text" color="error">
            Reset
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default BusinessTab;