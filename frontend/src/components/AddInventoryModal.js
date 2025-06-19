import React, { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button
} from '@mui/material';

const AddInventoryModal = ({ open, onClose, onSubmit, newItem, setNewItem }) => {
  // Reset form when modal opens
  useEffect(() => {
    if (open) {
      setNewItem({ name: '', quantity: '' });
    }
  }, [open, setNewItem]);

  if (!newItem) {
    console.warn("⚠️ newItem is undefined—AddInventoryModal won't render.");
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: name === 'quantity' ? Number(value) : value });
  };

  const isValid =
    newItem.name?.trim() &&
    Number.isInteger(Number(newItem.quantity)) &&
    Number(newItem.quantity) > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) {
      alert('Please enter a valid item name and a quantity greater than 0');
      return;
    }
    onSubmit();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add Inventory Item</DialogTitle>
        <DialogContent>
          <TextField
            label="Item Name"
            name="name"
            value={newItem.name || ''}
            onChange={handleChange}
            fullWidth
            margin="dense"
            required
          />
          <TextField
            label="Quantity"
            name="quantity"
            type="number"
            value={newItem.quantity || ''}
            onChange={handleChange}
            fullWidth
            margin="dense"
            required
            inputprops={{ min: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary" disabled={!isValid}>
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddInventoryModal;
