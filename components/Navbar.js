import { useState, useRef } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import MoreIcon from '@mui/icons-material/MoreVert';
import { DarkModeOutlined, HelpOutline, LeaderboardOutlined, LightModeOutlined } from '@mui/icons-material';
import Link from 'next/link';


export default function Navbar({ setModalOpen, isDarkTheme, setIsDarkTheme }) {
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const menuRef = useRef();

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };


    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
            disableRestoreFocus //to prevent submitting word not to open menu (focus on prev button)
        >
            <MenuItem
                onClick={() => {
                    setIsDarkTheme(prev => !prev);
                    handleMobileMenuClose();
                }}
            >
                <IconButton size="large" color="inherit">
                    { isDarkTheme ? <LightModeOutlined /> : <DarkModeOutlined /> }
                </IconButton>
                <p style={{paddingRight: "12px"}}>{ isDarkTheme ? "Light theme" : "Dark theme" }</p>
            </MenuItem>
            <MenuItem
                onClick={() => {
                    setModalOpen(true);
                    handleMobileMenuClose();
                }}
            >
                <IconButton size="large" color="inherit">
                    <LeaderboardOutlined />
                </IconButton>
                <p style={{paddingRight: "12px"}}>Statistics</p>
            </MenuItem>

            <Link href="/about">
                <MenuItem
                >
                    <IconButton size="large" color="inherit">
                        <HelpOutline />
                    </IconButton>
                    <p style={{paddingRight: "12px"}}>About</p>
                </MenuItem>
            </Link>
            
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" >
                    <Toolbar>
                        <Link href="/">
                            <a className='main-title'>
                                <span className="w-letter">W</span>ORDLE
                            </a>
                        </Link>
                        

                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <IconButton 
                                size="large" 
                                color="inherit"
                                onClick={(e) => {
                                    setIsDarkTheme(prev => !prev);
                                    e.currentTarget.blur();
                                }}
                            >
                                { isDarkTheme ? <LightModeOutlined /> : <DarkModeOutlined /> }
                            </IconButton>
                            <IconButton
                                size="large"
                                color="inherit"
                                onClick={() => {
                                    setModalOpen(true);
                                }}
                            >
                                <LeaderboardOutlined />
                            </IconButton>

                            <Link href="/about">
                                <IconButton
                                    size="large"
                                    color="inherit"
                                    onClick={(e) => {
                                        e.currentTarget.blur();
                                    }}
                                >
                                    <HelpOutline />
                                </IconButton>
                            </Link>
                                
                        </Box>
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
                {renderMobileMenu}

        </Box>
    );
}
