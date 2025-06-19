import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Grid, IconButton, Typography, Select, MenuItem
} from '@mui/material';
import { Delete, Add } from '@mui/icons-material';

const CreateLPO = ({ open, handleClose, onSubmit }) => {
  const [supplier, setSupplier] = useState('');
  const [items, setItems] = useState([{ name: '', quantity: '', unit: '' }]);
  const [error, setError] = useState('');

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = field === 'quantity' ? Number(value) : value;
    setItems(updatedItems);
  };

  const addItemField = () => {
    setItems([...items, { name: '', quantity: '', unit: '' }]);
  };

  const removeItem = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  const handleSubmit = () => {
    const cleanedItems = items.filter(
      item => item.name.trim() && item.quantity > 0 && item.unit
    );

    if (!supplier.trim() || cleanedItems.length === 0) {
      setError('Supplier and at least one item with quantity and unit are required');
      return;
    }

    const payload = {
      supplier: supplier.trim(),
      items: cleanedItems,
      date: new Date().toISOString()
    };

    if (typeof onSubmit === 'function') {
      onSubmit(payload);
    }

    // Reset
    setSupplier('');
    setItems([{ name: '', quantity: '', unit: '' }]);
    setError('');
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New LPO</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Supplier Name"
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
            />
          </Grid>

          {items.map((item, idx) => (
            <Grid container spacing={1} key={idx} alignItems="center">
              <Grid item xs={4}>
                <TextField
                  required
                  fullWidth
                  label="Item Name"
                  value={item.name}
                  onChange={(e) => handleItemChange(idx, 'name', e.target.value)}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  fullWidth
                  label="Quantity"
                  type="number"
                  inputProps={{ min: 1 }}
                  value={item.quantity}
                  onChange={(e) => handleItemChange(idx, 'quantity', e.target.value)}
                />
              </Grid>
              <Grid item xs={3}>
                <Select
                  required
                  fullWidth
                  displayEmpty
                  value={item.unit}
                  onChange={(e) => handleItemChange(idx, 'unit', e.target.value)}
                >
                  <MenuItem value="" disabled>Select Unit</MenuItem>
                  <MenuItem value="kg">kg</MenuItem>
                  <MenuItem value="g">g</MenuItem>
                  <MenuItem value="litres">litres</MenuItem>
                  <MenuItem value="packs">packs</MenuItem>
                  <MenuItem value="units">units</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={2}>
                <IconButton
                  onClick={() => removeItem(idx)}
                  disabled={items.length === 1}
                >
                  <Delete />
                </IconButton>
              </Grid>
            </Grid>
          ))}

          <Grid item xs={12} mt={2}>
            <Button onClick={addItemField} startIcon={<Add />}>
              Add Another Item
            </Button>
          </Grid>

          {error && (
            <Grid item xs={12}>
              <Typography variant="body2" color="error" mt={1}>
                {error}
              </Typography>
            </Grid>
          )}
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateLPO;
