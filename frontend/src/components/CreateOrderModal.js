import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Grid, IconButton, Typography, Select, MenuItem
} from '@mui/material';
import { Delete, Add } from '@mui/icons-material';
import axios from '../api/axios';

const CreateOrderModal = ({ open, handleClose, refreshOrders }) => {
  const [customerName, setCustomerName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [address, setAddress] = useState('');
  const [items, setItems] = useState([{ name: '', quantity: '', unit: '', price: '' }]);
  const [status, setStatus] = useState('pending');
  const [error, setError] = useState('');

  const addItem = () => {
    setItems([...items, { name: '', quantity: '', unit: '', price: '' }]);
  };

  const removeItem = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  const handleItemChange = (i, field, value) => {
    const updated = [...items];
    updated[i][field] = field === 'quantity' || field === 'price' ? Number(value) : value;
    setItems(updated);
  };

  const totalAmount = items.reduce((sum, item) => {
    return sum + (Number(item.price) * Number(item.quantity) || 0);
  }, 0);

  const handleSubmit = async () => {
    const validItems = items.filter(item => item.name && item.quantity > 0 && item.unit && item.price);
    if (!customerName.trim() || !contactInfo.trim() || validItems.length === 0) {
      setError('Please fill in all required fields and include at least one valid item');
      return;
    }

    const payload = {
      customerName: customerName.trim(),
      contactInfo: contactInfo.trim(),
      address: address.trim(),
      items: validItems,
      status,
      amount: totalAmount,
      orderDate: new Date().toISOString()
    };

    try {
      await axios.post('/orders', payload); // ✅ corrected path
      refreshOrders?.();
      resetForm();
      handleClose();
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Unknown error';
      setError(`Failed to create order: ${message}`);
      console.error('Order creation error:', err.response?.data || err);
    }
  };

  const resetForm = () => {
    setCustomerName('');
    setContactInfo('');
    setAddress('');
    setItems([{ name: '', quantity: '', unit: '', price: '' }]);
    setStatus('pending');
    setError('');
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Create New Order</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth required label="Client Name" value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth required label="Phone or Email" value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth multiline rows={2} label="Delivery Address (optional)"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Grid>

          {items.map((item, idx) => (
            <Grid container spacing={1} key={idx} alignItems="center" sx={{ mt: 1 }}>
              <Grid item xs={3}>
                <TextField
                  fullWidth required label="Product Name"
                  value={item.name}
                  onChange={(e) => handleItemChange(idx, 'name', e.target.value)}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  fullWidth required label="Quantity" type="number"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(idx, 'quantity', e.target.value)}
                />
              </Grid>
              <Grid item xs={2}>
                <Select
                  fullWidth required displayEmpty
                  value={item.unit}
                  onChange={(e) => handleItemChange(idx, 'unit', e.target.value)}
                >
                  <MenuItem value="" disabled>Unit</MenuItem>
                  <MenuItem value="kg">kg</MenuItem>
                  <MenuItem value="g">g</MenuItem>
                  <MenuItem value="litres">litres</MenuItem>
                  <MenuItem value="packs">packs</MenuItem>
                  <MenuItem value="units">units</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  fullWidth required label="Price (KES)" type="number"
                  value={item.price}
                  onChange={(e) => handleItemChange(idx, 'price', e.target.value)}
                />
              </Grid>
              <Grid item xs={1}>
                <IconButton onClick={() => removeItem(idx)} disabled={items.length === 1}>
                  <Delete />
                </IconButton>
              </Grid>
            </Grid>
          ))}

          <Grid item xs={12}>
            <Button onClick={addItem} startIcon={<Add />}>
              Add Item
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Select
              required value={status}
              onChange={(e) => setStatus(e.target.value)}
              fullWidth
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="confirmed">Confirmed</MenuItem>
              <MenuItem value="fulfilled">Fulfilled</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Total:</strong> KES {totalAmount.toLocaleString()}
            </Typography>
          </Grid>

          {error && (
            <Grid item xs={12}>
              <Typography color="error">{error}</Typography>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>Create Order</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateOrderModal;
