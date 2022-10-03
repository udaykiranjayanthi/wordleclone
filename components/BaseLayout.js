import { useState } from "react";
import Navbar from "./Navbar";
import PopupModal from "./PopupModal";
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Head from "next/head";

function BaseLayout({children, setModalOpen}) {

  const [isDarkTheme, setIsDarkTheme] = useState(true);


  const theme = createTheme({
    palette: {
      mode: isDarkTheme ? 'dark' : 'light',
      primary: {
        main: '#b59f3b',
        contrastText: '#f0f0f0'
      },
      secondary: {
        main: '#538d4e',
        contrastText: '#f0f0f0'
      }
    },
    typography: {
      fontFamily: 'Poppins, Roboto',
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          colorPrimary: {
            backgroundColor: isDarkTheme ? '#181818' : '#f0f0f0',
            color: isDarkTheme ? '#f0f0f0' : '#303030',
          }
        }
      }
    }
  });

  return ( 
    <div>
       <ThemeProvider theme={theme}>
        <div className={`theme-wrapper ${isDarkTheme ? "": "light-theme"}`} id="main-content">
          <Navbar setModalOpen={setModalOpen} isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme} />

          {children}

        </div>
      </ThemeProvider>
    </div>
   );
}

export default BaseLayout;