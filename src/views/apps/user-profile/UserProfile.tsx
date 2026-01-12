import React from 'react';
import { Grid, Box, CircularProgress, Alert } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import ProfileBanner from 'src/components/apps/userprofile/profile/ProfileBanner';
import IntroCard from 'src/components/apps/userprofile/profile/IntroCard';
import BusinessStatsCard from 'src/components/apps/userprofile/profile/BusinessStatsCard';
import BusinessInfoCard from 'src/components/apps/userprofile/profile/BusinessInfoCard';
import PhotosCard from 'src/components/apps/userprofile/profile/PhotosCard';
import Post from 'src/components/apps/userprofile/profile/Post';
import { UserDataProvider } from "src/context/UserDataContext/index";
import { useUserData } from 'src/hooks/useUserData';

const UserProfileContent = () => {
  const { user, profile, stats, loading, error } = useUserData();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Grid container spacing={3}>
      <Grid size={{ sm: 12 }}>
        <ProfileBanner user={user} profile={profile} stats={stats} />
      </Grid>

      {/* Business Statistics */}
      <Grid size={{ sm: 12 }}>
        <BusinessStatsCard stats={stats} />
      </Grid>

      {/* Business Information */}
      <Grid size={{ sm: 12 }}>
        <BusinessInfoCard profile={profile} />
      </Grid>

      {/* intro and Photos Card */}
      <Grid size={{ sm: 12, lg: 4, xs: 12 }}>
        <Grid container spacing={3}>
          <Grid size={{ sm: 12 }}>
            <IntroCard user={user} profile={profile} />
          </Grid>
          <Grid size={{ sm: 12 }}>
            <PhotosCard />
          </Grid>
        </Grid>
      </Grid>
      
      {/* Posts Card */}
      <Grid size={{ sm: 12, lg: 8, xs: 12 }}>
        <Post />
      </Grid>
    </Grid>
  );
};

const UserProfile = () => {
  const BCrumb = [
    {
      to: '/',
      title: 'Beranda',
    },
    {
      title: 'Profil Pengguna',
    },
  ]
  return (
    <UserDataProvider>
      <PageContainer title="Profil Pengguna" description="Halaman profil pengguna">
        <Breadcrumb title="Aplikasi Pengguna" items={BCrumb} />
        <UserProfileContent />
      </PageContainer>
    </UserDataProvider>
  );
};

export default UserProfile;