// theme.js
import { ThemeContext } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { palette } from '@mui/system';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1DB954', // Primary color
      light: '#26ff73', // Lighter shade
      dark: '#189443', // Darker shade
      contrastText: '#fff', // Text color for primary elements
    },
    secondary: {
      main: '#FFFFFF', // Secondary color
      light: '#ff8a50', // Lighter shade
      dark: '#e0dede', // Darker shade
      contrastText: 'black', // Text color for secondary elements
    },
    error: {
      main: '#f44336', // Error color
      light: '#e57373', // Lighter shade
      dark: '#d32f2f', // Darker shade
      contrastText: '#fff', // Text color for error elements
    },
    warning: {
      main: '#FFC107', // Warning color
      light: '#ffecb3', // Lighter shade
      dark: '#ff8f00', // Darker shade
      contrastText: 'rgba(0, 0, 0, 0.87)', // Text color for warning elements
    },
    info: {
      main: '#2196F3', // Info color
      light: '#64b5f6', // Lighter shade
      dark: '#1976D2', // Darker shade
      contrastText: '#fff', // Text color for info elements
    },
    success: {
      main: '#4CAF50', // Success color
      light: '#81c784', // Lighter shade
      dark: '#388e3c', // Darker shade
      contrastText: 'rgba(0, 0, 0, 0.87)', // Text color for success elements
    },
    text: {
      primary: 'rgba(255, 255, 255, 0.87)', // Primary text color
      secondary: 'rgba(0, 0, 0, 0.54)', // Secondary text color
      disabled: 'rgba(0, 0, 0, 0.38)', // Disabled text color
    },
    background: {
      default: '#212121', // Default background color
      paper: '#fff', // Background color for paper components
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
  components: {
      MuiButton: {
          styleOverrides: {
              root: {
                  borderRadius: 20, // Set rounded corners
                  textTransform: 'none',
              },
          },
      },
      MuiAutocomplete: {
          styleOverrides: {
              option: {
                  '&.MuiListItem-root': {
                      color: 'rgba(0, 0, 0, 0.87)', // Set the color of the options text (black)
                  },
              },
              inputRoot: {
                backgroundColor: '#363535', // Your desired background color for Autocomplete input
                // Add any other styles you want to override for Autocomplete input
              },
          // Add more style overrides for Autocomplete here if needed
          },
      },
      MuiInputLabel: {
          styleOverrides: {
              root: {
                color: 'white'
              }
          }
      },
      MuiInputBase: {
          styleOverrides: {
            input: {
              backgroundColor: '#363535', // Set the background color
              borderRadius: '4px', // Optional: Set rounded corners
              padding: '8px', // Optional: Add padding for spacing
            },
          },
      },
      MuiPaper:{
        styleOverrides:{
          root: {
            backgroundColor: "1DB954"
          }
        }
      }
  },
});

export default theme;
