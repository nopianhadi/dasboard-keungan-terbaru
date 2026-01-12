import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItemText,
  ListItemButton,
  Chip,
  Stack,
  Divider,
} from '@mui/material';
import {
  IconMessageCircle,
  IconCopy,
  IconBrandWhatsapp,
  IconMail,
  IconPlus,
} from '@tabler/icons-react';
import { useSnackbar } from 'src/context/SnackbarContext';
import type { Lead } from 'src/data/mockData';

interface ChatTemplate {
  id: string;
  name: string;
  category: 'greeting' | 'followup' | 'proposal' | 'closing' | 'custom';
  message: string;
  variables: string[]; // e.g., ['name', 'projectType', 'budget']
}

const defaultTemplates: ChatTemplate[] = [
  {
    id: '1',
    name: 'Greeting Awal',
    category: 'greeting',
    message: 'Halo {name}, terima kasih telah menghubungi kami! Saya dari Vena Pictures. Saya tertarik untuk membantu Anda dengan kebutuhan {projectType}. Apakah ada waktu untuk diskusi lebih lanjut?',
    variables: ['name', 'projectType'],
  },
  {
    id: '2',
    name: 'Follow Up',
    category: 'followup',
    message: 'Halo {name}, saya ingin follow up terkait diskusi kita sebelumnya tentang {projectType}. Apakah Anda sudah ada keputusan atau ada yang bisa saya bantu?',
    variables: ['name', 'projectType'],
  },
  {
    id: '3',
    name: 'Proposal Penawaran',
    category: 'proposal',
    message: 'Halo {name}, berdasarkan diskusi kita, saya telah menyiapkan proposal untuk {projectType} dengan estimasi budget {budget}. Apakah saya bisa mengirimkan detailnya?',
    variables: ['name', 'projectType', 'budget'],
  },
  {
    id: '4',
    name: 'Closing Deal',
    category: 'closing',
    message: 'Halo {name}, senang bisa bekerja sama dengan Anda! Untuk langkah selanjutnya, saya akan mengirimkan kontrak dan invoice untuk {projectType}. Terima kasih atas kepercayaannya!',
    variables: ['name', 'projectType'],
  },
  {
    id: '5',
    name: 'Konfirmasi Budget',
    category: 'proposal',
    message: 'Halo {name}, untuk {projectType} yang Anda inginkan, budget yang tersedia adalah {budget}. Apakah ini sesuai dengan ekspektasi Anda?',
    variables: ['name', 'projectType', 'budget'],
  },
];

interface ChatTemplatesProps {
  lead: Lead;
}

const ChatTemplates: React.FC<ChatTemplatesProps> = ({ lead }) => {
  const { showSnackbar } = useSnackbar();
  const [templates, setTemplates] = useState<ChatTemplate[]>(defaultTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<ChatTemplate | null>(null);
  const [openPreview, setOpenPreview] = useState(false);
  const [openNewTemplate, setOpenNewTemplate] = useState(false);
  const [previewMessage, setPreviewMessage] = useState('');

  const replaceVariables = (message: string, lead: Lead): string => {
    let result = message;
    result = result.replace(/{name}/g, lead.name);
    result = result.replace(/{projectType}/g, lead.projectType || 'proyek Anda');
    result = result.replace(
      /{budget}/g,
      lead.estimatedBudget
        ? new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
          }).format(lead.estimatedBudget)
        : 'sesuai kesepakatan'
    );
    result = result.replace(/{company}/g, lead.company || '');
    result = result.replace(/{email}/g, lead.email);
    result = result.replace(/{phone}/g, lead.phone);
    return result;
  };

  const handleSelectTemplate = (template: ChatTemplate) => {
    setSelectedTemplate(template);
    const message = replaceVariables(template.message, lead);
    setPreviewMessage(message);
    setOpenPreview(true);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(previewMessage);
    showSnackbar('Pesan berhasil disalin!', 'success');
  };

  const handleSendWhatsApp = () => {
    const encodedMessage = encodeURIComponent(previewMessage);
    const phone = lead.whatsapp || lead.phone;
    const cleanPhone = phone.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encodedMessage}`, '_blank');
    showSnackbar('Membuka WhatsApp...', 'info');
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent(`Terkait ${lead.projectType || 'Proyek Anda'}`);
    const body = encodeURIComponent(previewMessage);
    window.location.href = `mailto:${lead.email}?subject=${subject}&body=${body}`;
    showSnackbar('Membuka email client...', 'info');
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'greeting':
        return 'primary';
      case 'followup':
        return 'warning';
      case 'proposal':
        return 'info';
      case 'closing':
        return 'success';
      default:
        return 'default';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'greeting':
        return 'Greeting';
      case 'followup':
        return 'Follow Up';
      case 'proposal':
        return 'Proposal';
      case 'closing':
        return 'Closing';
      default:
        return 'Custom';
    }
  };

  return (
    <Box>
      <Card variant="outlined">
        <CardContent sx={{ p: 2 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Box display="flex" alignItems="center" gap={1}>
              <IconMessageCircle size={20} />
              <Typography variant="subtitle2" fontWeight={600}>
                Chat Templates
              </Typography>
            </Box>
            <Button
              size="small"
              startIcon={<IconPlus size={16} />}
              onClick={() => setOpenNewTemplate(true)}
            >
              Buat
            </Button>
          </Box>

          <List sx={{ p: 0 }}>
            {templates.map((template, index) => (
              <React.Fragment key={template.id}>
                {index > 0 && <Divider />}
                <ListItemButton
                  onClick={() => handleSelectTemplate(template)}
                  sx={{ borderRadius: 1, px: 1.5, py: 1 }}
                >
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body2" fontWeight={600}>
                          {template.name}
                        </Typography>
                        <Chip
                          size="small"
                          label={getCategoryLabel(template.category)}
                          color={getCategoryColor(template.category) as any}
                          sx={{ height: 18, fontSize: '0.65rem' }}
                        />
                      </Box>
                    }
                    secondary={
                      <Typography variant="caption" color="textSecondary" noWrap>
                        {template.message.substring(0, 60)}...
                      </Typography>
                    }
                  />
                </ListItemButton>
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Preview Dialog */}
      <Dialog open={openPreview} onClose={() => setOpenPreview(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h6">{selectedTemplate?.name}</Typography>
            <Chip
              size="small"
              label={getCategoryLabel(selectedTemplate?.category || 'custom')}
              color={getCategoryColor(selectedTemplate?.category || 'custom') as any}
            />
          </Box>
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={6}
            value={previewMessage}
            onChange={(e) => setPreviewMessage(e.target.value)}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Typography variant="caption" color="textSecondary">
            Anda dapat mengedit pesan sebelum mengirim
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPreview(false)}>Batal</Button>
          <Button
            variant="outlined"
            startIcon={<IconCopy size={16} />}
            onClick={handleCopyMessage}
          >
            Copy
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<IconMail size={16} />}
            onClick={handleSendEmail}
          >
            Email
          </Button>
          <Button
            variant="contained"
            color="success"
            startIcon={<IconBrandWhatsapp size={16} />}
            onClick={handleSendWhatsApp}
          >
            WhatsApp
          </Button>
        </DialogActions>
      </Dialog>

      {/* New Template Dialog */}
      <NewTemplateDialog
        open={openNewTemplate}
        onClose={() => setOpenNewTemplate(false)}
        onSave={(template) => {
          setTemplates([...templates, { ...template, id: String(templates.length + 1) }]);
          setOpenNewTemplate(false);
          showSnackbar('Template berhasil ditambahkan!', 'success');
        }}
      />
    </Box>
  );
};

// New Template Dialog Component
interface NewTemplateDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (template: Omit<ChatTemplate, 'id'>) => void;
}

const NewTemplateDialog: React.FC<NewTemplateDialogProps> = ({ open, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'custom' as ChatTemplate['category'],
    message: '',
  });

  const handleSave = () => {
    const variables: string[] = [];
    const matches = formData.message.match(/{(\w+)}/g);
    if (matches) {
      matches.forEach((match) => {
        const variable = match.replace(/{|}/g, '');
        if (!variables.includes(variable)) {
          variables.push(variable);
        }
      });
    }

    onSave({
      name: formData.name,
      category: formData.category,
      message: formData.message,
      variables,
    });

    setFormData({ name: '', category: 'custom', message: '' });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Buat Template Baru</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            fullWidth
            label="Nama Template"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            fullWidth
            select
            label="Kategori"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value as ChatTemplate['category'] })
            }
            SelectProps={{ native: true }}
          >
            <option value="greeting">Greeting</option>
            <option value="followup">Follow Up</option>
            <option value="proposal">Proposal</option>
            <option value="closing">Closing</option>
            <option value="custom">Custom</option>
          </TextField>
          <TextField
            fullWidth
            multiline
            rows={6}
            label="Pesan Template"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            helperText="Gunakan {name}, {projectType}, {budget}, {company}, {email}, {phone} untuk variabel"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Batal</Button>
        <Button variant="contained" onClick={handleSave} disabled={!formData.name || !formData.message}>
          Simpan
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChatTemplates;
