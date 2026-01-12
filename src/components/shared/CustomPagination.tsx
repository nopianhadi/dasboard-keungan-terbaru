import React from 'react';
import { Box, Pagination, Typography, Select, MenuItem, FormControl } from '@mui/material';

interface CustomPaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mt={3}
      flexWrap="wrap"
      gap={2}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Typography variant="body2" color="textSecondary">
          Menampilkan {startItem}-{endItem} dari {totalItems} item
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="body2" color="textSecondary">
            Per halaman:
          </Typography>
          <FormControl size="small">
            <Select
              value={itemsPerPage}
              onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
              sx={{ minWidth: 70 }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      
      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(_e, page) => onPageChange(page)}
          color="primary"
          shape="rounded"
          showFirstButton
          showLastButton
        />
      )}
    </Box>
  );
};

export default CustomPagination;
