import React, { useState } from 'react';
import {
  Box, Container, Typography, Button, AppBar, Toolbar,
  IconButton, Drawer, List, ListItem, ListItemText
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact Us', path: '/contact' },
    { label: 'Sign Up', path: '/signup' },
    { label: 'Login', path: '/login' }
  ];

  const handleNav = (path) => {
    setDrawerOpen(false);
    navigate(path);
  };

  return (
    <>
      {/* Top App Bar */}
      <AppBar position="static" sx={{ bgcolor: '#2e7d32' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Granitsa Limited
          </Typography>
          <IconButton color="inherit" edge="end" onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer Navigation */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250 }}>
          <List>
            {navItems.map(({ label, path }) => (
              <ListItem button key={label} onClick={() => handleNav(path)}>
                <ListItemText primary={label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: '#e8f5e9',
          py: { xs: 8, md: 12 },
          textAlign: 'center',
          backgroundImage: 'url(/assets/clean-industrial-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#2e7d32'
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h3"
            gutterBottom
            sx={{ fontSize: { xs: '1.8rem', md: '2.8rem' } }}
          >
            Empowering Food Industries with Hygiene, Safety, and Trust
          </Typography>
          <Typography
            variant="h6"
            sx={{ mb: 4, fontSize: { xs: '1rem', md: '1.25rem' } }}
          >
            We deliver cleaning, sanitation, process water treatment, and consultancy services across institutions and food sectors.
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              justifyContent: 'center'
            }}
          >
            <Button fullWidth variant="contained" sx={{ bgcolor: '#2e7d32' }} onClick={() => handleNav('/signup')}>
              Get Started
            </Button>
            <Button fullWidth variant="outlined" onClick={() => handleNav('/about')}>
              Learn More
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Services Preview */}
      <Box sx={{ py: 8, px: 2, textAlign: 'center' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom>Our Services</Typography>
          <Typography variant="body1" maxWidth="md" mx="auto">
            We provide cleaning and sanitation chemicals, food safety tools, infection control solutions, and on-site consultancy.
          </Typography>
        </Container>
      </Box>

      {/* Photo Gallery Section */}
      <Box sx={{ py: 6, px: 2, bgcolor: '#f1f8e9' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Our Work in Action
        </Typography>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 3,
              mt: 4
            }}
          >
            {[
              { img: 'cleaning supplies.jpg', caption: 'cleaning supplies' },
              { img: 'food safety.jpg', caption: 'food safety' },
              { img: 'water treatment.jpg', caption: 'water treatment' }
            ].map(({ img, caption }, index) => (
              <Box
                key={index}
                sx={{
                  position: 'relative',
                  width: { xs: '100%', sm: '30%' },
                  overflow: 'hidden',
                  borderRadius: 2,
                  boxShadow: 3,
                  '&:hover .caption': {
                    opacity: 1,
                    transform: 'translateY(0)'
                  }
                }}
              >
                <Box
                  component="img"
                  src={`/assets/${img}`}
                  alt={caption}
                  sx={{
                    width: '100%',
                    height: 200,
                    objectFit: 'cover'
                  }}
                />
                <Box
                  className="caption"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    bgcolor: 'rgba(0, 0, 0, 0.6)',
                    color: 'white',
                    textAlign: 'center',
                    py: 1,
                    px: 2,
                    fontSize: 14,
                    opacity: 0,
                    transform: 'translateY(100%)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {caption}
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: '#2e7d32', color: 'white', py: 3, textAlign: 'center' }}>
        <Typography variant="body2">
          © {new Date().getFullYear()} Granitsa Limited. All rights reserved.
        </Typography>
      </Box>
    </>
  );
};

export default Home;
