import React, { useState, useEffect } from 'react';
import { CardContent, Grid, Typography, Box, Avatar, Button, Stack, Alert, CircularProgress } from '@mui/material';

// components
import BlankCard from '../../shared/BlankCard';
import CustomTextField from '../../forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';

// types
import { UserFormData, ProfileFormData, SecurityFormData } from 'src/types/apps/database';

// hooks
import { useUserData } from 'src/hooks/useUserData';

// images
import user1 from 'src/assets/images/profile/user-1.jpg';

const AccountTab = () => {
  const { user, profile, loading, error, updateUser, updateProfile, changePassword, uploadProfilePicture } = useUserData();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // User form data
  const [userForm, setUserForm] = useState<UserFormData>({
    full_name: '',
    email: '',
    phone: '',
    role: 'Member',
    is_active: true,
  });

  // Profile form data
  const [profileForm, setProfileForm] = useState<ProfileFormData>({
    full_name: '',
    email: '',
    phone: '',
    company_name: '',
    website: '',
    instagram: '',
    address: '',
    bank_account: '',
    authorized_signer: '',
    id_number: '',
    bio: '',
    brand_color: '#3b82f6',
  });

  // Security form data
  const [securityForm, setSecurityForm] = useState<SecurityFormData>({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });

  // Load data when user/profile changes
  useEffect(() => {
    if (user) {
      setUserForm({
        full_name: user.full_name,
        email: user.email,
        phone: profile?.phone || '',
        role: user.role,
        is_active: user.is_active,
      });
    }
  }, [user]);

  useEffect(() => {
    if (profile) {
      setProfileForm({
        full_name: profile.full_name,
        email: profile.email,
        phone: profile.phone,
        company_name: profile.company_name,
        website: profile.website || '',
        instagram: profile.instagram || '',
        address: profile.address || '',
        bank_account: profile.bank_account || '',
        authorized_signer: profile.authorized_signer || '',
        id_number: profile.id_number || '',
        bio: profile.bio || '',
        brand_color: profile.brand_color,
      });
    }
  }, [profile]);

  const handleProfileFormChange = (field: keyof ProfileFormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProfileForm(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSecurityFormChange = (field: keyof SecurityFormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSecurityForm(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage(null);

      // Update user and profile data
      await Promise.all([
        updateUser(userForm),
        updateProfile(profileForm),
      ]);

      setMessage({ type: 'success', text: 'Data berhasil disimpan!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Gagal menyimpan data. Silakan coba lagi.' });
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async () => {
    if (securityForm.new_password !== securityForm.confirm_password) {
      setMessage({ type: 'error', text: 'Password baru dan konfirmasi password tidak cocok.' });
      return;
    }

    try {
      setSaving(true);
      setMessage(null);

      await changePassword({
        current_password: securityForm.current_password,
        new_password: securityForm.new_password,
      });

      setMessage({ type: 'success', text: 'Password berhasil diubah!' });
      setSecurityForm({
        current_password: '',
        new_password: '',
        confirm_password: '',
      });
    } catch (error) {
      setMessage({ type: 'error', text: 'Gagal mengubah password. Periksa password lama Anda.' });
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        setSaving(true);
        setMessage(null);
        
        await uploadProfilePicture(file);
        setMessage({ type: 'success', text: 'Foto profil berhasil diupload!' });
      } catch (error) {
        setMessage({ type: 'error', text: 'Gagal mengupload foto profil.' });
      } finally {
        setSaving(false);
      }
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
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
      {/* Message Alert */}
      {message && (
        <Grid size={12}>
          <Alert severity={message.type} onClose={() => setMessage(null)}>
            {message.text}
          </Alert>
        </Grid>
      )}
      {/* Change Profile Picture */}
      <Grid size={{ xs: 12, lg: 6 }}>
        <BlankCard>
          <CardContent>
            <Typography variant="h5" mb={1}>
              Foto Profil
            </Typography>
            <Typography color="textSecondary" mb={3}>
              Ubah foto profil Anda di sini
            </Typography>
            <Box textAlign="center" display="flex" justifyContent="center">
              <Box>
                <Avatar
                  src={user1}
                  alt="Profile"
                  sx={{ width: 120, height: 120, margin: '0 auto' }}
                />
                <Stack direction="row" justifyContent="center" spacing={2} my={3}>
                  <Button variant="contained" color="primary" component="label" disabled={saving}>
                    Upload
                    <input hidden accept="image/*" type="file" onChange={handleFileUpload} />
                  </Button>
                  <Button variant="outlined" color="error" disabled={saving}>
                    Reset
                  </Button>
                </Stack>
                <Typography variant="subtitle1" color="textSecondary" mb={4}>
                  Format yang diizinkan: JPG, PNG, GIF. Maksimal 2MB
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </BlankCard>
      </Grid>

      {/* Change Password */}
      <Grid size={{ xs: 12, lg: 6 }}>
        <BlankCard>
          <CardContent>
            <Typography variant="h5" mb={1}>
              Ubah Password
            </Typography>
            <Typography color="textSecondary" mb={3}>
              Untuk mengubah password, konfirmasi di sini
            </Typography>
            <form>
              <CustomFormLabel sx={{ mt: 0 }} htmlFor="current-password">
                Password Saat Ini
              </CustomFormLabel>
              <CustomTextField
                id="current-password"
                value={securityForm.current_password}
                onChange={handleSecurityFormChange('current_password')}
                variant="outlined"
                fullWidth
                type="password"
                placeholder="Masukkan password saat ini"
              />

              <CustomFormLabel htmlFor="new-password">Password Baru</CustomFormLabel>
              <CustomTextField
                id="new-password"
                value={securityForm.new_password}
                onChange={handleSecurityFormChange('new_password')}
                variant="outlined"
                fullWidth
                type="password"
                placeholder="Masukkan password baru"
              />

              <CustomFormLabel htmlFor="confirm-password">Konfirmasi Password</CustomFormLabel>
              <CustomTextField
                id="confirm-password"
                value={securityForm.confirm_password}
                onChange={handleSecurityFormChange('confirm_password')}
                variant="outlined"
                fullWidth
                type="password"
                placeholder="Konfirmasi password baru"
              />
              
              <Stack direction="row" spacing={2} sx={{ justifyContent: 'end' }} mt={2}>
                <Button 
                  size="medium" 
                  variant="contained" 
                  color="primary" 
                  onClick={handlePasswordChange}
                  disabled={saving || !securityForm.current_password || !securityForm.new_password || !securityForm.confirm_password}
                >
                  {saving ? <CircularProgress size={20} /> : 'Ubah Password'}
                </Button>
              </Stack>
            </form>
          </CardContent>
        </BlankCard>
      </Grid>

      {/* Personal Details */}
      <Grid size={12}>
        <BlankCard>
          <CardContent>
            <Typography variant="h5" mb={1}>
              Detail Personal
            </Typography>
            <Typography color="textSecondary" mb={3}>
              Ubah detail personal Anda dan simpan perubahan
            </Typography>
            <form>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <CustomFormLabel sx={{ mt: 0 }} htmlFor="full-name">
                    Nama Lengkap
                  </CustomFormLabel>
                  <CustomTextField
                    id="full-name"
                    value={profileForm.full_name}
                    onChange={handleProfileFormChange('full_name')}
                    variant="outlined"
                    fullWidth
                    placeholder="Masukkan nama lengkap"
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <CustomFormLabel sx={{ mt: 0 }} htmlFor="company-name">
                    Nama Perusahaan
                  </CustomFormLabel>
                  <CustomTextField
                    id="company-name"
                    value={profileForm.company_name}
                    onChange={handleProfileFormChange('company_name')}
                    variant="outlined"
                    fullWidth
                    placeholder="Masukkan nama perusahaan"
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <CustomFormLabel sx={{ mt: 0 }} htmlFor="email">
                    Email
                  </CustomFormLabel>
                  <CustomTextField
                    id="email"
                    value={profileForm.email}
                    onChange={handleProfileFormChange('email')}
                    variant="outlined"
                    fullWidth
                    type="email"
                    placeholder="Masukkan email"
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <CustomFormLabel sx={{ mt: 0 }} htmlFor="phone">
                    Nomor Telepon
                  </CustomFormLabel>
                  <CustomTextField
                    id="phone"
                    value={profileForm.phone}
                    onChange={handleProfileFormChange('phone')}
                    variant="outlined"
                    fullWidth
                    placeholder="Masukkan nomor telepon"
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <CustomFormLabel sx={{ mt: 0 }} htmlFor="website">
                    Website
                  </CustomFormLabel>
                  <CustomTextField
                    id="website"
                    value={profileForm.website}
                    onChange={handleProfileFormChange('website')}
                    variant="outlined"
                    fullWidth
                    placeholder="Masukkan website"
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <CustomFormLabel sx={{ mt: 0 }} htmlFor="instagram">
                    Instagram
                  </CustomFormLabel>
                  <CustomTextField
                    id="instagram"
                    value={profileForm.instagram}
                    onChange={handleProfileFormChange('instagram')}
                    variant="outlined"
                    fullWidth
                    placeholder="Masukkan username Instagram"
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <CustomFormLabel sx={{ mt: 0 }} htmlFor="id-number">
                    Nomor KTP
                  </CustomFormLabel>
                  <CustomTextField
                    id="id-number"
                    value={profileForm.id_number}
                    onChange={handleProfileFormChange('id_number')}
                    variant="outlined"
                    fullWidth
                    placeholder="Masukkan nomor KTP"
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <CustomFormLabel sx={{ mt: 0 }} htmlFor="authorized-signer">
                    Penandatangan Sah
                  </CustomFormLabel>
                  <CustomTextField
                    id="authorized-signer"
                    value={profileForm.authorized_signer}
                    onChange={handleProfileFormChange('authorized_signer')}
                    variant="outlined"
                    fullWidth
                    placeholder="Masukkan nama penandatangan sah"
                  />
                </Grid>

                <Grid size={12}>
                  <CustomFormLabel sx={{ mt: 0 }} htmlFor="address">
                    Alamat
                  </CustomFormLabel>
                  <CustomTextField
                    id="address"
                    value={profileForm.address}
                    onChange={handleProfileFormChange('address')}
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={3}
                    placeholder="Masukkan alamat lengkap"
                  />
                </Grid>

                <Grid size={12}>
                  <CustomFormLabel sx={{ mt: 0 }} htmlFor="bank-account">
                    Rekening Bank
                  </CustomFormLabel>
                  <CustomTextField
                    id="bank-account"
                    value={profileForm.bank_account}
                    onChange={handleProfileFormChange('bank_account')}
                    variant="outlined"
                    fullWidth
                    placeholder="Contoh: BCA 1234567890 a.n. Nama Pemilik"
                  />
                </Grid>

                <Grid size={12}>
                  <CustomFormLabel sx={{ mt: 0 }} htmlFor="bio">
                    Bio
                  </CustomFormLabel>
                  <CustomTextField
                    id="bio"
                    value={profileForm.bio}
                    onChange={handleProfileFormChange('bio')}
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    placeholder="Ceritakan tentang diri Anda atau perusahaan"
                  />
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </BlankCard>

        <Stack direction="row" spacing={2} sx={{ justifyContent: 'end' }} mt={3}>
          <Button 
            size="large" 
            variant="contained" 
            color="primary" 
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? <CircularProgress size={20} /> : 'Simpan'}
          </Button>
          <Button size="large" variant="text" color="error" disabled={saving}>
            Batal
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default AccountTab;
