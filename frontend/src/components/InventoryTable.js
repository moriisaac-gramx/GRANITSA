import React, { useState } from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import EditInventoryModal from './EditInventoryModal';
import ConfirmDialog from './ConfirmDialog';
import { useSnackbar } from 'notistack';
import axios from '../api/axios';

const InventoryTable = ({ data, refreshData }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const { enqueueSnackbar } = useSnackbar();


  const handleEdit = (item) => {
    setSelectedItem(item);
    setEditOpen(true);
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`/inventory/${itemId}`);
      refreshData();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleDownload = (item) => {
    // Placeholder for export to PDF or CSV logic
    console.log('Download requested for:', item.name);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Item</strong></TableCell>
              <TableCell><strong>Quantity</strong></TableCell>
              <TableCell><strong>Unit Price</strong></TableCell>
              <TableCell align="right"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.unitPrice}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit">
                    <IconButton onClick={() => handleEdit(item)}><EditIcon /></IconButton>
                    </Tooltip>
                 <Tooltip title="Delete">
                     <IconButton onClick={() => { setDeleteId(item._id); setConfirmOpen(true); }}> 
                    <DeleteIcon /> 
                 </IconButton>
                  </Tooltip>
                  <Tooltip title="Download">
                    <IconButton onClick={() => handleDownload(item)}><FileDownloadIcon /></IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Modal */}
      <EditInventoryModal
        open={editOpen}
        handleClose={() => setEditOpen(false)}
        itemData={selectedItem}
        refreshData={refreshData}
      />

<ConfirmDialog
  open={confirmOpen}
  title="Delete Inventory Item"
  message="Are you sure you want to delete this item? This action cannot be undone."
  onCancel={() => setConfirmOpen(false)}
  onConfirm={async () => {
    try {
      await axios.delete(`/inventory/${deleteId}`);
      refreshData();
    } catch (err) {
      console.error('Deletion failed:', err);
    } finally {
      setConfirmOpen(false);
    }
  }}
/>

    </>
  );
};

export default InventoryTable;
