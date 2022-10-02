import { useState, useRef } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { DarkMode, EqualizerOutlined, WbSunny, WbSunnyOutlined } from '@mui/icons-material';


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
                    { isDarkTheme ? <WbSunny /> : <DarkMode /> }
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
                    <EqualizerOutlined />
                </IconButton>
                <p style={{paddingRight: "12px"}}>Statistics</p>
            </MenuItem>
            <MenuItem 
                onClick={() => {
                    setModalOpen(true);
                    handleMobileMenuClose();
                }}
            >
                <IconButton size="large" color="inherit">
                    <AccountCircle />
                </IconButton>
                <p style={{paddingRight: "12px"}}>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" >
                    <Toolbar>
                        <Typography
                            variant="h6"
                            noWrap
                            component="p"
                            // sx={{ display: { xs: 'none', sm: 'block' } }}
                            fontWeight={900}
                            letterSpacing={"4px"}
                        >
                            WORDLE
                        </Typography>

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
                                { isDarkTheme ? <WbSunny /> : <DarkMode /> }
                            </IconButton>
                            <IconButton
                                size="large"
                                color="inherit"
                                onClick={() => {
                                    setModalOpen(true);
                                }}
                            >
                                <EqualizerOutlined />
                            </IconButton>
                            <IconButton
                                size="large"
                                color="inherit"
                                onClick={(e) => {
                                    e.currentTarget.blur();
                                }}
                            >
                                <AccountCircle />
                            </IconButton>
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
