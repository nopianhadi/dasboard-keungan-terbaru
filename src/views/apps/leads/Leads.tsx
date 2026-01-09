// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useState } from 'react';
import { Divider, Box } from '@mui/material';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import LeadsSidebar from 'src/components/apps/leads/LeadsSidebar';
import LeadsContent from 'src/components/apps/leads/LeadsContent';
import LeadsActions from 'src/components/apps/leads/LeadsActions';
import AppCard from 'src/components/shared/AppCard';
import { LeadsProvider } from 'src/context/LeadsContext';

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
