// ============================================
// ADD-ON CARD COMPONENT
// ============================================

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';

import { formatCurrency } from '../../../data/mockData';
import type { AddOn } from '../../../types/packages';

interface AddOnCardProps {
  addOn: AddOn;
  onMenuClick: (event: React.MouseEvent<HTMLElement>, addon: AddOn) => void;
}

const AddOnCard: React.FC<AddOnCardProps> = ({ addOn, onMenuClick }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" component="h3">
            {addOn.name}
          </Typography>
          <IconButton
            size="small"
            onClick={(e) => onMenuClick(e, addOn)}
          >
            <MoreVertIcon />
          </IconButton>
        </Box>

        <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
          {formatCurrency(addOn.price)}
        </Typography>

        {addOn.region && (
          <Chip
            label={addOn.region}
            size="small"
            variant="outlined"
            sx={{ mb: 2 }}
          />
        )}

        {addOn.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {addOn.description}
          </Typography>
        )}

        <Chip
          label={addOn.is_active ? 'Aktif' : 'Tidak Aktif'}
          size="small"
          color={addOn.is_active ? 'success' : 'default'}
        />
      </CardContent>
    </Card>
  );
};

export default AddOnCard;