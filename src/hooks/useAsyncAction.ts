import { useState } from 'react';
import { useSnackbar } from 'src/context/SnackbarContext';
import { APP_CONFIG } from 'src/config/app';

interface UseAsyncActionOptions {
  successMessage?: string;
  errorMessage?: string;
  delay?: number;
}

export const useAsyncAction = () => {
  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useSnackbar();

  const executeAsync = async <T,>(
    action: () => T | Promise<T>,
    options: UseAsyncActionOptions = {}
  ): Promise<T | null> => {
    const { 
      successMessage, 
      errorMessage, 
      delay = APP_CONFIG.ENABLE_MOCK_DELAYS ? APP_CONFIG.DEFAULT_MOCK_DELAY : 0 
    } = options;

    setLoading(true);
    try {
      // Only add delay if explicitly requested or mock delays are enabled
      if (delay > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
      
      const result = await Promise.resolve(action());
      
      if (successMessage) {
        showSnackbar(successMessage, 'success');
      }
      
      return result;
    } catch (error) {
      showSnackbar(errorMessage || 'Terjadi kesalahan!', 'error');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, executeAsync };
};
