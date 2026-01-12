import React from 'react';
import { 
  Typography, 
  Box, 
  Chip, 
  Stack, 
  Grid,
  Card,
  CardContent
} from '@mui/material';
import { 
  IconPalette,
  IconCategory,
  IconPhoto,
  IconVideo,
  IconCash,
  IconReceipt
} from '@tabler/icons-react';
import { Profile } from 'src/types/apps/database';

interface BusinessInfoCardProps {
  profile?: Profile | null;
}

const BusinessInfoCard: React.FC<BusinessInfoCardProps> = ({ profile }) => {
  const businessData = {
    income_categories: profile?.income_categories || ['Pembayaran Klien', 'Sewa Peralatan', 'Workshop', 'Lainnya'],
    expense_categories: profile?.expense_categories || ['Operasional', 'Gaji Tim', 'Cetak', 'Transport', 'Peralatan', 'Marketing', 'Lainnya'],
    project_types: profile?.project_types || ['Wedding', 'Prewedding', 'Engagement', 'Birthday', 'Corporate', 'Product Photography'],
    event_types: profile?.event_types || ['Indoor', 'Outdoor', 'Studio', 'Destination'],
    package_categories: profile?.package_categories || ['Photo', 'Video', 'Photo + Video', 'Cinematic'],
    brand_color: profile?.brand_color || '#3b82f6',
  };

  const CategorySection = ({ 
    title, 
    items, 
    icon, 
    color 
  }: { 
    title: string; 
    items: string[]; 
    icon: React.ReactNode;
    color: string;
  }) => (
    <Card sx={{ height: '100%', border: `1px solid ${color}20` }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Box 
            sx={{ 
              p: 1, 
              borderRadius: 2, 
              backgroundColor: `${color}20`,
              color: color,
              mr: 2
            }}
          >
            {icon}
          </Box>
          <Typography variant="h6" fontWeight={600}>
            {title}
          </Typography>
        </Box>
        
        <Stack direction="row" gap={1} flexWrap="wrap">
          {items.map((item, index) => (
            <Chip 
              key={index} 
              label={item} 
              variant="outlined" 
              size="small"
              sx={{ 
                borderColor: `${color}40`,
                color: color,
                '&:hover': {
                  backgroundColor: `${color}10`,
                }
              }}
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} mb={3}>
        Pengaturan Bisnis
      </Typography>
      
      <Grid container spacing={3}>
        {/* Brand Color */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: '100%', border: `1px solid ${businessData.brand_color}20` }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Box 
                  sx={{ 
                    p: 1, 
                    borderRadius: 2, 
                    backgroundColor: `${businessData.brand_color}20`,
                    color: businessData.brand_color,
                    mr: 2
                  }}
                >
                  <IconPalette size={20} />
                </Box>
                <Typography variant="h6" fontWeight={600}>
                  Warna Brand
                </Typography>
              </Box>
              
              <Box display="flex" alignItems="center" gap={2}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    backgroundColor: businessData.brand_color,
                    border: '2px solid #fff',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}
                />
                <Typography variant="body1" fontWeight={500}>
                  {businessData.brand_color}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Project Types */}
        <Grid size={{ xs: 12, md: 6 }}>
          <CategorySection
            title="Jenis Proyek"
            items={businessData.project_types}
            icon={<IconPhoto size={20} />}
            color="#3b82f6"
          />
        </Grid>

        {/* Event Types */}
        <Grid size={{ xs: 12, md: 6 }}>
          <CategorySection
            title="Jenis Acara"
            items={businessData.event_types}
            icon={<IconCategory size={20} />}
            color="#10b981"
          />
        </Grid>

        {/* Package Categories */}
        <Grid size={{ xs: 12, md: 6 }}>
          <CategorySection
            title="Kategori Paket"
            items={businessData.package_categories}
            icon={<IconVideo size={20} />}
            color="#f59e0b"
          />
        </Grid>

        {/* Income Categories */}
        <Grid size={{ xs: 12, md: 6 }}>
          <CategorySection
            title="Kategori Pemasukan"
            items={businessData.income_categories}
            icon={<IconCash size={20} />}
            color="#10b981"
          />
        </Grid>

        {/* Expense Categories */}
        <Grid size={{ xs: 12, md: 6 }}>
          <CategorySection
            title="Kategori Pengeluaran"
            items={businessData.expense_categories}
            icon={<IconReceipt size={20} />}
            color="#ef4444"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default BusinessInfoCard;