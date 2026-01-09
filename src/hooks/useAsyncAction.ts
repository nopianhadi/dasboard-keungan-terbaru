import { useState } from 'react';
import { useSnackbar } from 'src/context/SnackbarContext';

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
    const { successMessage, errorMessage, delay = 500 } = options;

    setLoading(true);
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, delay));
      
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
