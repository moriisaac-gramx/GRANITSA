import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Grid, Divider,
  Drawer, List, ListItem, ListItemText, ListItemIcon, Paper
} from '@mui/material';
import {
  Home, Inventory2, AddCircleOutline, Logout
} from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import InventoryTable from '../components/InventoryTable';
import LPOSection from '../components/LPOSection';
import StockLevelChart from '../components/StockLevelChart';
import AddInventoryModal from '../components/AddInventoryModal';
import CreateLPO from '../components/CreateLPO';
import axios from '../api/axios';

const green = '#2E7D32';
const white = '#F9F9F9';

const WarehouseDashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [addItemOpen, setAddItemOpen] = useState(false);
  const [createLPOOpen, setCreateLPOOpen] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', quantity: '' });
  const [lpos, setLpos] = useState([]);
  const navigate = useNavigate();

  const fetchInventory = async () => {
    try {
      const res = await axios.get('/inventory');
      setInventory(res.data);
    } catch (err) {
      console.error('❌ Error fetching inventory:', err.response?.data || err.message || err);
    }
  };

  const fetchLPOs = async () => {
    try {
      const res = await axios.get('/lpos');
      setLpos(res.data);
    } catch (err) {
      console.error('❌ Error fetching LPOs:', err.response?.data || err.message || err);
    }
  };

  const handleAddItemSubmit = async () => {
    try {
      const response = await axios.post('/inventory', newItem);
      setNewItem({ name: '', quantity: '' });
      setAddItemOpen(false);
      fetchInventory();
    } catch (err) {
      console.error('❌ Error adding item:', err.response?.data || err.message || err);
    }
  };

  const handleLpoSubmit = async (lpoData) => {
    try {
      await axios.post('/lpos', lpoData);
      setCreateLPOOpen(false);
      fetchLPOs();
    } catch (err) {
      console.error('❌ Error creating LPO:', err.response?.data || err.message || err);
    }
  };

  useEffect(() => {
    fetchInventory();
    fetchLPOs();
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: white }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 220,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 220,
            boxSizing: 'border-box',
            bgcolor: '#ffffff'
          }
        }}
      >
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <img src="/assets/gran_logo.jpg" alt="Company Logo" style={{ width: 120 }} />
        </Box>
        <Divider />
        <List>
          <ListItem button onClick={() => handleNavigation('/')}>
            <ListItemIcon><Home /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem>
            <ListItemIcon><Inventory2 /></ListItemIcon>
            <ListItemText primary="Inventory" />
          </ListItem>
          <ListItem button onClick={() => setCreateLPOOpen(true)}>
            <ListItemIcon><AddCircleOutline /></ListItemIcon>
            <ListItemText primary="Create LPO" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/login')}>
            <ListItemIcon><Logout /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Dashboard */}
      <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ color: green }}>
          Warehouse Dashboard
        </Typography>

        {/* Action Buttons */}
        <Grid container spacing={2} mb={3}>
          <Grid item>
            <Button
              variant="contained"
              sx={{ backgroundColor: green, color: 'white', '&:hover': { backgroundColor: '#27642C' } }}
              startIcon={<AddIcon />}
              onClick={() => setAddItemOpen(true)}
            >
              Add Item
            </Button>
          </Grid>
        </Grid>

        {/* Inventory Section */}
        <Divider sx={{ my: 3, borderColor: green, opacity: 0.4 }} />
        <Typography variant="h6" gutterBottom>
          Inventory Section
        </Typography>
        <InventoryTable data={inventory} refreshData={fetchInventory} />

        <Box mt={4}>
          <StockLevelChart data={inventory} />
        </Box>

        {/* LPO Section */}
        <Divider sx={{ my: 4, borderColor: green, opacity: 0.4 }} />
        <Typography variant="h6" gutterBottom>
          LPO Section
        </Typography>
        <Box sx={{ maxHeight: 400, overflowY: 'auto', pr: 1 }}>
          <LPOSection lpos={lpos} refreshData={fetchLPOs} />
        </Box>

        {/* Download All LPOs Button */}
        {lpos.length > 0 && (
          <Button
            variant="outlined"
            sx={{
              mt: 2,
              color: green,
              borderColor: green,
              '&:hover': { backgroundColor: green, color: 'white', borderColor: green }
            }}
            onClick={() => lpos.forEach(lpo => console.log('📥 Downloading LPO:', lpo))}
          >
            Download LPO
          </Button>
        )}

        {/* Modals */}
        <AddInventoryModal
          open={addItemOpen}
          handleClose={() => setAddItemOpen(false)}
          onSubmit={handleAddItemSubmit}
          newItem={newItem}
          setNewItem={setNewItem}
          refreshData={fetchInventory}
        />
        <CreateLPO
          open={createLPOOpen}
          handleClose={() => setCreateLPOOpen(false)}
          onSubmit={handleLpoSubmit}
        />
      </Box>
    </Box>
  );
};

export default WarehouseDashboard;
