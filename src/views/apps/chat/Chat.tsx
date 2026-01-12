// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useState } from 'react';
import { Box } from '@mui/material';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import AppCard from 'src/components/shared/AppCard';
import LeadsChatSidebar from 'src/components/apps/chats/LeadsChatSidebar';
import LeadsChatContent from 'src/components/apps/chats/LeadsChatContent';
import { mockLeads, mockClients, type Lead, type Client } from 'src/data/mockData';

const Chats = () => {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [, setLeads] = useState<Lead[]>(mockLeads);
  const [, setClients] = useState<Client[]>(mockClients);

  const BCrumb = [
    {
      to: '/',
      title: 'Beranda',
    },
    {
      title: 'Leads Chat',
    },
  ];

  const handleLeadSelect = (lead: Lead) => {
    setSelectedLead(lead);
  };

  const handleLeadUpdate = (leadId: string, updates: Partial<Lead>) => {
    setLeads(prevLeads => 
      prevLeads.map(lead => 
        lead.id === leadId ? { ...lead, ...updates } : lead
      )
    );
    
    // Update selected lead if it's the one being updated
    if (selectedLead?.id === leadId) {
      setSelectedLead(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const handleConvertToClient = (lead: Lead) => {
    // Create new client from lead
    const newClient: Client = {
      id: `client-${Date.now()}`,
      name: lead.name,
      email: `${lead.name.toLowerCase().replace(/\s+/g, '.')}@email.com`, // Generate email
      phone: lead.whatsapp || '081234567890', // Use WhatsApp or default
      whatsapp: lead.whatsapp,
      status: 'Aktif',
      clientType: 'Langsung',
      since: new Date().toISOString().split('T')[0],
      lastContact: new Date().toISOString().split('T')[0],
      portalAccessId: `portal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      totalProjects: 0,
      totalSpent: 0,
      rating: 0,
    };

    // Add to clients
    setClients(prev => [newClient, ...prev]);

    // Update lead status
    const leadUpdates: Partial<Lead> = {
      status: 'Dikonversi',
      converted_to_client_id: newClient.id,
      converted_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    handleLeadUpdate(lead.id, leadUpdates);
  };

  return (
    <PageContainer title="Leads Chat" description="Chat dan manajemen leads">
      <Breadcrumb title="Leads Chat" items={BCrumb} />
      <AppCard>
        <Box display="flex" height="calc(100vh - 200px)">
          {/* Left Sidebar - Leads List */}
          <LeadsChatSidebar
            selectedLead={selectedLead}
            onLeadSelect={handleLeadSelect}
          />
          
          {/* Right Content - Chat Interface */}
          <Box flex={1}>
            <LeadsChatContent
              selectedLead={selectedLead}
              onLeadUpdate={handleLeadUpdate}
              onConvertToClient={handleConvertToClient}
            />
          </Box>
        </Box>
      </AppCard>
    </PageContainer>
  );
};

export default Chats;
