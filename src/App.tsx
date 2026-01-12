import { CssBaseline, ThemeProvider } from '@mui/material';
import { ThemeSettings } from './theme/Theme';
import RTL from './layouts/full/shared/customizer/RTL';
import { RouterProvider } from 'react-router';
import router from './routes/Router';
import { CustomizerContext } from 'src/context/CustomizerContext';
import { SnackbarProvider } from 'src/context/SnackbarContext';
import { useContext } from 'react';

function App() {
  const theme = ThemeSettings();
  const { activeDir } = useContext(CustomizerContext);

  return (
    <ThemeProvider theme={theme}>
      <RTL direction={activeDir}>
        <CssBaseline />
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </RTL>
    </ThemeProvider>
  );
}

export default App;
