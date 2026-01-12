import React from 'react';
import {
  Grid,
  Box,
  Typography,
  Button,
  Avatar,
  Stack,
  CardMedia,
  styled,
  Fab,
  Chip,
} from '@mui/material';
import profilecover from 'src/assets/images/backgrounds/profilebg.jpg';
import userimg from 'src/assets/images/profile/user-1.jpg';
import {
  IconBrandInstagram,
  IconBrandFacebook,
  IconBrandTwitter,
  IconWorld,
  IconFileDescription,
  IconUserCheck,
  IconUserCircle,
  IconPhone,
  IconMail,
  IconMapPin,
  IconBuilding,
} from '@tabler/icons-react';
import ProfileTab from './ProfileTab';
import BlankCard from '../../../shared/BlankCard';
import { User, Profile } from 'src/types/apps/database';

interface ProfileBannerProps {
  user?: User | null;
  profile?: Profile | null;
  stats?: {
    projects_count: number;
    clients_count: number;
    team_count: number;
    revenue_this_month: number;
  } | null;
}

const ProfileBanner: React.FC<ProfileBannerProps> = ({ user, profile, stats }) => {
  // Use props data or fallback to mock data
  const profileData = {
    full_name: profile?.full_name || user?.full_name || 'Mathew Anderson',
    company_name: profile?.company_name || 'Maxima Studio',
    email: profile?.email || user?.email || 'info@maximastudio.com',
    phone: profile?.phone || '+62 812 3456 7890',
    website: profile?.website || 'www.maximastudio.com',
    instagram: profile?.instagram || '@maximastudio',
    address: profile?.address || 'Jl. Sudirman No. 123, Jakarta Pusat',
    bio: profile?.bio || 'Professional photography and videography studio specializing in weddings and corporate events.',
    role: user?.role || 'Admin',
    project_types: profile?.project_types || ['Wedding', 'Prewedding', 'Corporate'],
    is_active: user?.is_active ?? true,
    brand_color: profile?.brand_color || '#3b82f6',
  };

  const statsData = {
    projects_count: stats?.projects_count || 45,
    clients_count: stats?.clients_count || 128,
    team_count: stats?.team_count || 5,
  };

  const ProfileImage = styled(Box)(() => ({
    backgroundImage: 'linear-gradient(#50b2fc,#f44c66)',
    borderRadius: '50%',
    width: '110px',
    height: '110px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto'
  }));

  return (
    <>
      <BlankCard>
        <CardMedia component="img" image={profilecover} alt="Profile Cover" width="100%" />
        <Grid container spacing={0} justifyContent="center" alignItems="center">
          {/* Stats Section */}
          <Grid
            sx={{
              order: { xs: '2', sm: '2', lg: '1' },
            }}
            size={{ lg: 4, sm: 12, md: 5, xs: 12 }}
          >
            <Stack direction="row" textAlign="center" justifyContent="center" gap={6} m={3}>
              <Box>
                <Typography color="text.secondary">
                  <IconFileDescription width="20" />
                </Typography>
                <Typography variant="h4" fontWeight="600">
                  {statsData.projects_count}
                </Typography>
                <Typography color="textSecondary" variant="h6" fontWeight={400}>
                  Proyek
                </Typography>
              </Box>
              <Box>
                <Typography color="text.secondary">
                  <IconUserCircle width="20" />
                </Typography>
                <Typography variant="h4" fontWeight="600">
                  {statsData.clients_count}
                </Typography>
                <Typography color="textSecondary" variant="h6" fontWeight={400}>
                  Klien
                </Typography>
              </Box>
              <Box>
                <Typography color="text.secondary">
                  <IconUserCheck width="20" />
                </Typography>
                <Typography variant="h4" fontWeight="600">
                  {statsData.team_count}
                </Typography>
                <Typography color="textSecondary" variant="h6" fontWeight={400}>
                  Tim
                </Typography>
              </Box>
            </Stack>
          </Grid>

          {/* Profile Info */}
          <Grid
            sx={{
              order: { xs: '1', sm: '1', lg: '2' },
            }}
            size={{ lg: 4, sm: 12, xs: 12 }}
          >
            <Box
              display="flex"
              alignItems="center"
              textAlign="center"
              justifyContent="center"
              sx={{ mt: '-85px' }}
            >
              <Box>
                <ProfileImage>
                  <Avatar
                    src={userimg}
                    alt="Profile"
                    sx={{
                      borderRadius: '50%',
                      width: '100px',
                      height: '100px',
                      border: '4px solid #fff',
                    }}
                  />
                </ProfileImage>
                <Box mt={1}>
                  <Typography fontWeight={600} variant="h5">
                    {profileData.full_name}
                  </Typography>
                  <Typography color="textSecondary" variant="h6" fontWeight={400}>
                    {profileData.company_name}
                  </Typography>
                  <Chip 
                    label={profileData.role} 
                    color="primary" 
                    size="small" 
                    sx={{ mt: 1 }}
                  />
                  {profileData.is_active && (
                    <Chip 
                      label="Aktif" 
                      color="success" 
                      size="small" 
                      sx={{ mt: 1, ml: 1 }}
                    />
                  )}
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Contact & Social Links */}
          <Grid
            sx={{
              order: { xs: '3', sm: '3', lg: '3' },
            }}
            size={{ lg: 4, sm: 12, xs: 12 }}
          >
            <Stack direction="column" gap={1} alignItems="center" justifyContent="center" my={2}>
              {/* Contact Info */}
              <Stack direction="row" gap={1} alignItems="center">
                <IconMail size="16" />
                <Typography variant="body2">{profileData.email}</Typography>
              </Stack>
              <Stack direction="row" gap={1} alignItems="center">
                <IconPhone size="16" />
                <Typography variant="body2">{profileData.phone}</Typography>
              </Stack>
              
              {/* Social Links */}
              <Stack direction="row" gap={2} alignItems="center" mt={2}>
                {profileData.website && (
                  <Fab size="small" color="primary" sx={{ backgroundColor: '#1877F2' }}>
                    <IconWorld size="16" />
                  </Fab>
                )}
                {profileData.instagram && (
                  <Fab size="small" color="primary" sx={{ backgroundColor: '#E4405F' }}>
                    <IconBrandInstagram size="16" />
                  </Fab>
                )}
                <Fab size="small" color="primary" sx={{ backgroundColor: '#1877F2' }}>
                  <IconBrandFacebook size="16" />
                </Fab>
                <Fab size="small" color="primary" sx={{ backgroundColor: '#1DA1F2' }}>
                  <IconBrandTwitter size="18" />
                </Fab>
              </Stack>
              
              <Button color="primary" variant="contained" sx={{ mt: 2 }}>
                Edit Profil
              </Button>
            </Stack>
          </Grid>
        </Grid>

        {/* Profile Details Section */}
        <Box sx={{ p: 3, borderTop: '1px solid #e0e0e0' }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Tentang
              </Typography>
              <Typography color="textSecondary" variant="body1" mb={3}>
                {profileData.bio}
              </Typography>
              
              <Typography variant="h6" fontWeight={600} mb={2}>
                Jenis Proyek
              </Typography>
              <Stack direction="row" gap={1} flexWrap="wrap" mb={3}>
                {profileData.project_types.map((type, index) => (
                  <Chip key={index} label={type} variant="outlined" size="small" />
                ))}
              </Stack>
            </Grid>
            
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Informasi Kontak
              </Typography>
              
              <Stack direction="row" gap={2} alignItems="center" mb={2}>
                <IconBuilding size="20" />
                <Typography variant="body2">{profileData.company_name}</Typography>
              </Stack>
              
              <Stack direction="row" gap={2} alignItems="center" mb={2}>
                <IconMapPin size="20" />
                <Typography variant="body2">{profileData.address}</Typography>
              </Stack>
              
              {profileData.website && (
                <Stack direction="row" gap={2} alignItems="center" mb={2}>
                  <IconWorld size="20" />
                  <Typography variant="body2">{profileData.website}</Typography>
                </Stack>
              )}
              
              {profileData.instagram && (
                <Stack direction="row" gap={2} alignItems="center" mb={2}>
                  <IconBrandInstagram size="20" />
                  <Typography variant="body2">{profileData.instagram}</Typography>
                </Stack>
              )}
            </Grid>
          </Grid>
        </Box>

        {/* Tabbing Part */}
        <ProfileTab />
      </BlankCard>
    </>
  );
};

export default ProfileBanner;
