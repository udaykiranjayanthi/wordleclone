import { useState } from "react";
import Navbar from "./Navbar";
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
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Play Wordle game anytime for free." />
        <meta name="application-name" content="Wordle game clone" />

        <meta property="og:title" content="Play Wordle Game" />
        <meta property="og:type" content="application" />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />

        <meta property="og:description" content="Play Wordle game anytime for free." />
        <meta property="og:site_name" content="Wordle game cone" />
        <meta name="twitter:image:alt" content="WORDLE" />
      </Head>
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