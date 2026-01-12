import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockLeads, type Lead } from 'src/data/mockData';

interface LeadsContextType {
  leads: Lead[];
  selectedLead: Lead | null;
  setSelectedLead: (lead: Lead | null) => void;
  addLead: (lead: Lead) => void;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  deleteLead: (id: string) => void;
  convertToClient: (leadId: string, clientId: string, projectId?: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const LeadsContext = createContext<LeadsContextType | undefined>(undefined);

export const LeadsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const addLead = (lead: Lead) => {
    setLeads([lead, ...leads]);
  };

  const updateLead = (id: string, updates: Partial<Lead>) => {
    setLeads(leads.map(lead => lead.id === id ? { ...lead, ...updates } : lead));
    if (selectedLead?.id === id) {
      setSelectedLead({ ...selectedLead, ...updates });
    }
  };

  const deleteLead = (id: string) => {
    setLeads(leads.filter(lead => lead.id !== id));
    if (selectedLead?.id === id) {
      setSelectedLead(null);
    }
  };

  const convertToClient = (leadId: string, clientId: string, projectId?: string) => {
    updateLead(leadId, {
      status: 'Dikonversi',
      convertedToClientId: clientId,
      convertedToProjectId: projectId,
    });
  };

  return (
    <LeadsContext.Provider
      value={{
        leads,
        selectedLead,
        setSelectedLead,
        addLead,
        updateLead,
        deleteLead,
        convertToClient,
        filterStatus,
        setFilterStatus,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </LeadsContext.Provider>
  );
};

export const useLeads = () => {
  const context = useContext(LeadsContext);
  if (!context) {
    throw new Error('useLeads must be used within LeadsProvider');
  }
  return context;
};
