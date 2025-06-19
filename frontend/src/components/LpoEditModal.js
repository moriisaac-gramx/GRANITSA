import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Grid, Button
} from '@mui/material';
import axios from '../api/axios';

const LpoEditModal = ({ open, handleClose, lpoData, refreshData }) => {
  const [formData, setFormData] = useState({
    lpoId: '', client: '', issuedDate: '', items: ''
  });

  useEffect(() => {
    if (lpoData) {
      setFormData({
        lpoId: lpoData.lpoId || '',
        client: lpoData.client || '',
        issuedDate: lpoData.issuedDate?.split('T')[0] || '',
        items: lpoData.items || ''
      });
    }
  }, [lpoData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/lpos/${lpoData._id}`, formData);
      refreshData();
      handleClose();
    } catch (err) {
      console.error('Error updating LPO:', err);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Edit LPO</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12}>
            <TextField
              fullWidth label="LPO ID" name="lpoId"
              value={formData.lpoId} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth label="Client" name="client"
              value={formData.client} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth label="Items / Description" multiline rows={3}
              name="items" value={formData.items} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth label="Date Issued" name="issuedDate" type="date"
              value={formData.issuedDate} onChange={handleChange} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleUpdate} variant="contained">Update</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LpoEditModal;
