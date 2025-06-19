import React from 'react';
import {
  Box, Typography, Grid, Card, CardContent, Divider,
  List, ListItem, ListItemText, Container
} from '@mui/material';

const AboutUs = () => {
  const green = '#2E7D32';
  const white = '#F9F9F9';

  return (
    <Box sx={{ backgroundColor: white, py: { xs: 4, md: 6 }, px: { xs: 2, md: 4 }, minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: green, fontWeight: 600, fontSize: { xs: '1.8rem', md: '2.4rem' } }}
        >
          About Us
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>Granitsa Limited</strong> is a trusted partner to food industries and institutions across Kenya.
          We specialize in <strong>cleaning, sanitation, food safety, and infection control</strong>, while offering
          high-quality water treatment products and expert consultancy in chemical application.
        </Typography>

        <Typography variant="body1" paragraph>
          Our commitment is to deliver <strong>reliable, sustainable, and customer-focused</strong> general supplies
          that elevate hygiene standards and operational efficiency.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography
          variant="h5"
          gutterBottom
          sx={{ color: green, fontSize: { xs: '1.5rem', md: '1.8rem' } }}
        >
          Our Products
        </Typography>
        <Grid container spacing={2}>
          {[
            'CIP & SIP Products',
            'Laundry Products',
            'Dish washing Products',
            'Personal Hygiene Products',
            'House Keeping Products',
            'Process Water Treatment Products',
            'Chemical Application Consultancy'
          ].map((item, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Card sx={{ borderLeft: `5px solid ${green}`, boxShadow: 1 }}>
                <CardContent>
                  <Typography>{item}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Typography
          variant="h5"
          gutterBottom
          sx={{ color: green, fontSize: { xs: '1.5rem', md: '1.8rem' } }}
        >
          Our Locations
        </Typography>

        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" sx={{ color: green }}>
                  Nairobi Branch
                </Typography>
                <List dense disablePadding>
                  <ListItem disableGutters>
                    <ListItemText primary="KTDA Farmers Building, Moi Avenue, 1st Floor" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemText primary="P.O. BOX 5563-00506, Nairobi" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemText primary="Tel: +254755634747" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemText primary="Email: granitsaltd@gmail.com" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" sx={{ color: green }}>
                  Kericho Branch
                </Typography>
                <List dense disablePadding>
                  <ListItem disableGutters>
                    <ListItemText primary="Opposite Toyota Kenya, Next to G4S" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemText primary="Kericho Office" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Optional: Add a banner image that scales with screen */}
        {/* <Box mt={5}>
          <img
            src="/assets/granitsa-banner.jpg"
            alt="Granitsa Team or Lab"
            style={{ width: '100%', borderRadius: 8, objectFit: 'cover' }}
          />
        </Box> */}
      </Container>
    </Box>
  );
};

export default AboutUs;
