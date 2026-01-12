import { mockProjects, mockClients, mockTransactions, mockLeads, Project, Client, Transaction, Lead } from '../../../data/mockData';

export interface EventType {
  title?: string;
  allDay?: boolean;
  start?: Date;
  end?: Date;
  color?: string;
  type?: 'project' | 'client' | 'transaction' | 'lead' | 'deadline';
  description?: string;
}

// Generate events from mock data
const generateEvents = (): EventType[] => {
  const events: EventType[] = [];

  // Events dari Projects (tanggal pemotretan dan deadline)
  mockProjects.forEach((project: Project) => {
    // Event untuk tanggal pemotretan
    if (project.date) {
      events.push({
        title: `📸 ${project.projectName}`,
        start: new Date(project.date),
        end: new Date(project.date),
        allDay: true,
        color: project.status === 'Selesai' ? 'green' : 'default',
        type: 'project',
        description: `Pemotretan - ${project.clientName} | ${project.location || 'TBD'}`,
      });
    }

    // Event untuk deadline
    if (project.deadlineDate) {
      events.push({
        title: `⏰ Deadline: ${project.projectName}`,
        start: new Date(project.deadlineDate),
        end: new Date(project.deadlineDate),
        allDay: true,
        color: project.status === 'Selesai' ? 'green' : 'red',
        type: 'deadline',
        description: `Deadline pengiriman - Progress: ${project.progress}%`,
      });
    }
  });

  // Events dari Clients (last contact)
  mockClients.forEach((client: Client) => {
    if (client.lastContact) {
      const contactDate = new Date(client.lastContact);
      // Hanya tampilkan kontak dalam 30 hari terakhir atau yang akan datang
      const today = new Date();
      const diffDays = Math.floor((today.getTime() - contactDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays <= 30) {
        events.push({
          title: `👤 Kontak: ${client.name}`,
          start: contactDate,
          end: contactDate,
          allDay: true,
          color: 'azure',
          type: 'client',
          description: `Last contact dengan ${client.name} | Status: ${client.status}`,
        });
      }
    }
  });

  // Events dari Leads (follow up)
  mockLeads.forEach((lead: Lead) => {
    if (lead.updated_at && lead.status !== 'Ditolak' && lead.status !== 'Dikonversi') {
      const contactDate = new Date(lead.updated_at);
      // Tambahkan reminder follow up 3 hari setelah last contact
      const followUpDate = new Date(contactDate);
      followUpDate.setDate(followUpDate.getDate() + 3);
      
      events.push({
        title: `📞 Follow Up: ${lead.name}`,
        start: followUpDate,
        end: followUpDate,
        allDay: true,
        color: lead.status === 'Sedang Diskusi' ? 'red' : 'warning',
        type: 'lead',
        description: `Follow up lead - ${lead.contact_channel} | Status: ${lead.status}`,
      });
    }
  });

  // Events dari Transactions (transaksi besar)
  mockTransactions.forEach((transaction: Transaction) => {
    // Hanya tampilkan transaksi di atas 5 juta
    if (transaction.amount >= 5000000) {
      events.push({
        title: `💰 ${transaction.type}: ${transaction.description}`,
        start: new Date(transaction.date),
        end: new Date(transaction.date),
        allDay: true,
        color: transaction.type === 'Pemasukan' ? 'green' : 'warning',
        type: 'transaction',
        description: `${transaction.type} - Rp ${transaction.amount.toLocaleString('id-ID')}`,
      });
    }
  });

  return events;
};

const Events: EventType[] = generateEvents();

export default Events;
