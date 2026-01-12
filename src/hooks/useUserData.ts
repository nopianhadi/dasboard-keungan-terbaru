import { useState, useEffect } from 'react';
import { User, Profile } from '../types/apps/database';
import { userService } from '../services/userService';

export const useUserData = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [userData, profileData, statsData] = await Promise.all([
        userService.getCurrentUser(),
        userService.getUserProfile('current'),
        userService.getUserStats('current'),
      ]);

      setUser(userData);
      setProfile(profileData);
      setStats(statsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userData: any) => {
    try {
      setLoading(true);
      const updatedUser = await userService.updateUser(user?.id || '', userData);
      setUser(updatedUser);
      return updatedUser;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update user');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData: any) => {
    try {
      setLoading(true);
      const updatedProfile = await userService.updateProfile(user?.id || '', profileData);
      setProfile(updatedProfile);
      return updatedProfile;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateBusinessSettings = async (businessData: any) => {
    try {
      setLoading(true);
      const updatedProfile = await userService.updateBusinessSettings(user?.id || '', businessData);
      setProfile(updatedProfile);
      return updatedProfile;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update business settings');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (passwordData: { current_password: string; new_password: string }) => {
    try {
      setLoading(true);
      const success = await userService.changePassword(user?.id || '', passwordData);
      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to change password');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const uploadProfilePicture = async (file: File) => {
    try {
      setLoading(true);
      const imageUrl = await userService.uploadProfilePicture(user?.id || '', file);
      return imageUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload profile picture');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    profile,
    stats,
    loading,
    error,
    updateUser,
    updateProfile,
    updateBusinessSettings,
    changePassword,
    uploadProfilePicture,
    refreshData: loadUserData,
  };
};

export default useUserData;