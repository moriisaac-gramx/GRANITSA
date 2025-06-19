import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Grid
} from '@mui/material';
import axios from '../api/axios';

const EditInventoryModal = ({ open, handleClose, itemData, refreshData }) => {
  const [formData, setFormData] = useState({ name: '', quantity: '', unitPrice: '' });

  useEffect(() => {
    if (itemData) {
      setFormData({
        name: itemData.name || '',
        quantity: itemData.quantity || '',
        unitPrice: itemData.unitPrice || ''
      });
    }
  }, [itemData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/inventory/${itemData._id}`, formData);
      refreshData();
      handleClose();
    } catch (err) {
      console.error('Error updating item:', err);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Inventory Item</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12}>
            <TextField
              fullWidth name="name" label="Item Name" value={formData.name}
              onChange={handleChange} required />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth name="quantity" label="Quantity" type="number"
              value={formData.quantity} onChange={handleChange} required />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth name="unitPrice" label="Unit Price (KES)" type="number"
              value={formData.unitPrice} onChange={handleChange} required />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">Cancel</Button>
        <Button onClick={handleUpdate} variant="contained">Update</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditInventoryModal;
