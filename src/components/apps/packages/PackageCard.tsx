// ============================================
// PACKAGE CARD COMPONENT
// ============================================

import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  IconButton,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  PhotoCamera as PhotoIcon,
  Group as GroupIcon,
  Schedule as ScheduleIcon,
  LocalShipping as ShippingIcon,
  Print as PrintIcon,
} from '@mui/icons-material';

import { formatCurrency } from '../../../data/mockData';
import type { Package } from '../../../types/packages';

interface PackageCardProps {
  package: Package;
  onMenuClick: (event: React.MouseEvent<HTMLElement>, pkg: Package) => void;
}

const PackageCard: React.FC<PackageCardProps> = ({ package: pkg, onMenuClick }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {pkg.cover_image && (
        <CardMedia
          component="div"
          sx={{
            height: 200,
            backgroundImage: `url(${pkg.cover_image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
          }}
        >
          <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
            <IconButton
              size="small"
              sx={{ bgcolor: 'rgba(255,255,255,0.9)' }}
              onClick={(e) => onMenuClick(e, pkg)}
            >
              <MoreVertIcon />
            </IconButton>
          </Box>
        </CardMedia>
      )}
      
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" component="h3">
            {pkg.name}
          </Typography>
          {!pkg.cover_image && (
            <IconButton
              size="small"
              onClick={(e) => onMenuClick(e, pkg)}
            >
              <MoreVertIcon />
            </IconButton>
          )}
        </Box>

        <Box sx={{ mb: 2 }}>
          <Chip
            label={pkg.category}
            size="small"
            color="primary"
            sx={{ mr: 1 }}
          />
          {pkg.region && (
            <Chip
              label={pkg.region}
              size="small"
              variant="outlined"
            />
          )}
        </Box>

        <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
          {formatCurrency(pkg.price)}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <GroupIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {pkg.photographers} • {pkg.videographers}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <ScheduleIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {pkg.processing_time}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <PhotoIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {pkg.digital_items.length} item digital, {pkg.physical_items.length} item fisik
            </Typography>
          </Box>

          {pkg.default_printing_cost > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <PrintIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                Cetak: {formatCurrency(pkg.default_printing_cost)}
              </Typography>
            </Box>
          )}

          {pkg.default_transport_cost > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <ShippingIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                Transport: {formatCurrency(pkg.default_transport_cost)}
              </Typography>
            </Box>
          )}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Chip
            label={pkg.is_active ? 'Aktif' : 'Tidak Aktif'}
            size="small"
            color={pkg.is_active ? 'success' : 'default'}
          />
          <Typography variant="body2" color="text.secondary">
            {pkg.duration_options.length} opsi durasi
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PackageCard;