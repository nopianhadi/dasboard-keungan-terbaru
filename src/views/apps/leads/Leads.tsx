import React, { useState, useEffect } from 'react';
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
  IconUsers,
  IconUserCheck,
  IconUserX,
  IconUserQuestion,
  IconLayoutGrid,
  IconTable,
  IconEye,
  IconEdit,
  IconTrash,
  IconArrowRight,
  IconPhone,
  IconMail,
  IconBrandWhatsapp,
  IconBrandInstagram,
} from '@tabler/icons-react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/components/shared/DashboardCard';
import BlankCard from 'src/components/shared/BlankCard';
import CustomPagination from 'src/components/shared/CustomPagination';
import { Lead, LeadFormData, ClientFormData } from 'src/types/apps/database';
import { useLeadData } from 'src/hooks/useClientData';
import { usePagination } from 'src/hooks/usePagination';

const Leads = () => {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const BCrumb = [
    {
      to: '/',
      title: 'Beranda',
    },
    {
      title: 'Leads',
    },
  ];
  
  return (
    <LeadsProvider>
      <PageContainer title="Leads Management" description="Halaman manajemen prospek dan konversi">
        <Breadcrumb title="Manajemen Leads" items={BCrumb} />
        <AppCard>
          {/* ------------------------------------------- */}
          {/* Left part - Leads List */}
          {/* ------------------------------------------- */}

          <LeadsSidebar
            isMobileSidebarOpen={isMobileSidebarOpen}
            onSidebarClose={() => setMobileSidebarOpen(false)}
          />
          
          {/* ------------------------------------------- */}
          {/* Right part - Lead Details & Actions */}
          {/* ------------------------------------------- */}

          <Box flexGrow={1}>
            <LeadsContent toggleLeadsSidebar={() => setMobileSidebarOpen(true)} />
            <Divider />
            <LeadsActions />
          </Box>
        </AppCard>
      </PageContainer>
    </LeadsProvider>
  );
};

export default Leads;
