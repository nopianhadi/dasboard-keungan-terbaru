import React from 'react';
import { Stack, Typography, Chip, Box, Divider } from '@mui/material';

import ChildCard from 'src/components/shared/ChildCard';
import { 
  IconBriefcase, 
  IconMail, 
  IconMapPin, 
  IconPhone,
  IconWorld,
  IconBrandInstagram,
  IconCalendar,
  IconUser,
  IconBuilding
} from '@tabler/icons-react';
import { User, Profile } from 'src/types/apps/database';

interface IntroCardProps {
  user?: User | null;
  profile?: Profile | null;
}

const IntroCard: React.FC<IntroCardProps> = ({ user, profile }) => {
  // Use props data or fallback to mock data
  const profileData = {
    full_name: profile?.full_name || user?.full_name || 'Mathew Anderson',
    company_name: profile?.company_name || 'Maxima Studio',
    email: profile?.email || user?.email || 'info@maximastudio.com',
    phone: profile?.phone || '+62 812 3456 7890',
    website: profile?.website || 'www.maximastudio.com',
    instagram: profile?.instagram || '@maximastudio',
    address: profile?.address || 'Jl. Sudirman No. 123, Jakarta Pusat',
    bio: profile?.bio || 'Professional photography and videography studio specializing in weddings and corporate events. Kami telah berpengalaman lebih dari 5 tahun dalam industri fotografi dan videografi.',
    role: user?.role || 'Admin',
    authorized_signer: profile?.authorized_signer || 'Mathew Anderson',
    id_number: profile?.id_number || '3171234567890123',
    bank_account: profile?.bank_account || 'BCA 1234567890 a.n. Maxima Studio',
    project_types: profile?.project_types || ['Wedding', 'Prewedding', 'Corporate', 'Birthday'],
    created_at: user?.created_at ? user.created_at.toISOString() : '2020-01-15',
  };

  return (
    <ChildCard>
      <Typography fontWeight={600} variant="h4" mb={2}>
        Informasi Profil
      </Typography>
      
      <Typography color="textSecondary" variant="body2" mb={3}>
        {profileData.bio}
      </Typography>

      <Divider sx={{ my: 2 }} />

      {/* Personal Information */}
      <Typography fontWeight={600} variant="h6" mb={2}>
        Informasi Personal
      </Typography>
      
      <Stack direction="row" gap={2} alignItems="center" mb={2}>
        <IconUser size="20" />
        <Box>
          <Typography variant="body2" fontWeight={500}>
            {profileData.full_name}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Nama Lengkap
          </Typography>
        </Box>
      </Stack>

      <Stack direction="row" gap={2} alignItems="center" mb={2}>
        <IconBriefcase size="20" />
        <Box>
          <Typography variant="body2" fontWeight={500}>
            {profileData.role}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Peran
          </Typography>
        </Box>
      </Stack>

      <Stack direction="row" gap={2} alignItems="center" mb={2}>
        <IconCalendar size="20" />
        <Box>
          <Typography variant="body2" fontWeight={500}>
            {new Date(profileData.created_at).toLocaleDateString('id-ID', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Bergabung Sejak
          </Typography>
        </Box>
      </Stack>

      <Divider sx={{ my: 2 }} />

      {/* Company Information */}
      <Typography fontWeight={600} variant="h6" mb={2}>
        Informasi Perusahaan
      </Typography>

      <Stack direction="row" gap={2} alignItems="center" mb={2}>
        <IconBuilding size="20" />
        <Box>
          <Typography variant="body2" fontWeight={500}>
            {profileData.company_name}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Nama Perusahaan
          </Typography>
        </Box>
      </Stack>

      <Stack direction="row" gap={2} alignItems="center" mb={2}>
        <IconMail size="20" />
        <Box>
          <Typography variant="body2" fontWeight={500}>
            {profileData.email}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Email
          </Typography>
        </Box>
      </Stack>

      <Stack direction="row" gap={2} alignItems="center" mb={2}>
        <IconPhone size="20" />
        <Box>
          <Typography variant="body2" fontWeight={500}>
            {profileData.phone}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Telepon
          </Typography>
        </Box>
      </Stack>

      <Stack direction="row" gap={2} alignItems="center" mb={2}>
        <IconMapPin size="20" />
        <Box>
          <Typography variant="body2" fontWeight={500}>
            {profileData.address}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Alamat
          </Typography>
        </Box>
      </Stack>

      {profileData.website && (
        <Stack direction="row" gap={2} alignItems="center" mb={2}>
          <IconWorld size="20" />
          <Box>
            <Typography variant="body2" fontWeight={500}>
              {profileData.website}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Website
            </Typography>
          </Box>
        </Stack>
      )}

      {profileData.instagram && (
        <Stack direction="row" gap={2} alignItems="center" mb={2}>
          <IconBrandInstagram size="20" />
          <Box>
            <Typography variant="body2" fontWeight={500}>
              {profileData.instagram}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Instagram
            </Typography>
          </Box>
        </Stack>
      )}

      <Divider sx={{ my: 2 }} />

      {/* Project Types */}
      <Typography fontWeight={600} variant="h6" mb={2}>
        Jenis Proyek
      </Typography>
      
      <Stack direction="row" gap={1} flexWrap="wrap" mb={2}>
        {profileData.project_types.map((type, index) => (
          <Chip 
            key={index} 
            label={type} 
            variant="outlined" 
            size="small" 
            color="primary"
          />
        ))}
      </Stack>

      <Divider sx={{ my: 2 }} />

      {/* Additional Information */}
      <Typography fontWeight={600} variant="h6" mb={2}>
        Informasi Tambahan
      </Typography>

      <Box mb={2}>
        <Typography variant="body2" fontWeight={500} mb={1}>
          Penandatangan Sah
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {profileData.authorized_signer}
        </Typography>
      </Box>

      <Box mb={2}>
        <Typography variant="body2" fontWeight={500} mb={1}>
          Rekening Bank
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {profileData.bank_account}
        </Typography>
      </Box>
    </ChildCard>
  );
};

export default IntroCard;
