import React, { useState } from 'react';
import {
  Box, Typography, TextField, Grid, Button, Divider, IconButton, Link, Container
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const ContactUs = () => {
  const green = '#2E7D32';
  const white = '#F9F9F9';

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    organization: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    alert('Thank you for your message!');
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      organization: '',
      message: ''
    });
  };

  return (
    <Box sx={{ backgroundColor: white, minHeight: '100vh', py: { xs: 4, md: 6 }, px: { xs: 2, md: 4 } }}>
      <Container maxWidth="md">
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: green, fontWeight: 600, fontSize: { xs: '1.8rem', md: '2.4rem' } }}
        >
          Contact Us
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          We'd love to hear from you. Fill out the form below to reach out to our team.
        </Typography>

        {/* Contact Form */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ maxWidth: { xs: '100%', sm: 600 }, mt: 3 }}
        >
          <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
            Please fill in your details below:
          </Typography>

          {[
            { label: 'First Name', name: 'firstName', placeholder: 'e.g. Emelda' },
            { label: 'Last Name', name: 'lastName', placeholder: 'e.g. Wambua' },
            { label: 'Phone Number', name: 'phone', placeholder: '+254...' },
            { label: 'Email', name: 'email', placeholder: 'example@email.com' },
            { label: 'Organization', name: 'organization', placeholder: 'Company or Institution', required: false }
          ].map(({ label, name, placeholder, required = true }) => (
            <Box key={name} sx={{ mb: 2 }}>
              <Typography variant="subtitle2">{label}</Typography>
              <TextField
                fullWidth
                required={required}
                variant="standard"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
              />
            </Box>
          ))}

          <Typography variant="subtitle2">Message</Typography>
          <TextField
            fullWidth
            required
            multiline
            rows={5}
            variant="outlined"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Type your message here"
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ backgroundColor: green, '&:hover': { backgroundColor: '#27642C' } }}
          >
            Submit
          </Button>
        </Box>

        <Divider sx={{ my: 5 }} />

        {/* Contact Details */}
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ color: green }}>
              Reach Us
            </Typography>
            <Box mt={1}>
              <Box display="flex" alignItems="center" mb={1}>
                <CallIcon sx={{ mr: 1, color: green }} />
                <Link href="tel:+254755634747" underline="hover" color="inherit">
                  +254 755 634 747
                </Link>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <EmailIcon sx={{ mr: 1, color: green }} />
                <Link href="mailto:granitsaltd@gmail.com" underline="hover" color="inherit">
                  granitsaltd@gmail.com
                </Link>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ color: green }}>
              Follow Us
            </Typography>
            <Box mt={1}>
              <IconButton href="https://facebook.com" target="_blank" sx={{ color: green }}>
                <FacebookIcon />
              </IconButton>
              <IconButton href="https://instagram.com" target="_blank" sx={{ color: green }}>
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactUs;
