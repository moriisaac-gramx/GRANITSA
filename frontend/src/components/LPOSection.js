import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Button
} from '@mui/material';
import LpoTable from './LpoTable';
import LpoEditModal from './LpoEditModal';
import jsPDF from 'jspdf';
import { useSnackbar } from 'notistack';
import axios from '../api/axios';

const LPOSection = ({ lpos, refreshData }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [selectedLpo, setSelectedLpo] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    console.log('✅ LPOs received in frontend:', lpos);
  }, [lpos]);

  const handleEdit = (lpo) => {
    setSelectedLpo(lpo);
    setEditOpen(true);
  };

  const handleDelete = async (lpoId) => {
    try {
      await axios.delete(`/lpos/${lpoId}`);
      refreshData();
      enqueueSnackbar('LPO deleted successfully', { variant: 'success' });
    } catch (err) {
      console.error('LPO deletion failed:', err);
      enqueueSnackbar('Failed to delete LPO', { variant: 'error' });
    }
  };

  const handleDownload = (lpo) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Granitsa Limited', 20, 20);

    doc.setFontSize(12);
    doc.text(`LPO ID: ${lpo.lpoId || 'N/A'}`, 20, 40);
    doc.text(`Supplier: ${lpo.supplier || 'N/A'}`, 20, 50);
    doc.text(`Date Issued: ${new Date(lpo.date || Date.now()).toLocaleDateString()}`, 20, 60);
    doc.text('Items:', 20, 75);

    const itemLines = Array.isArray(lpo.items)
      ? lpo.items.map((item, i) => {
          const quantity = item.quantity ?? '?';
          const unit = item.unit || '';
          return `${i + 1}. ${item.name} — Qty: ${quantity} ${unit}`;
        })
      : ['No item data'];

    doc.setFontSize(11);
    doc.text(itemLines.join('\n'), 30, 85, { maxWidth: 160 });
    doc.save(`LPO_${lpo.lpoId || 'record'}.pdf`);
  };

  return (
    <Box sx={{ maxHeight: 500, overflowY: 'auto', pr: 1 }}>
      <Typography variant="h6" gutterBottom>
        Saved LPO Records
      </Typography>

      {!lpos ? (
        <CircularProgress />
      ) : lpos.length === 0 ? (
        <Typography color="textSecondary">No LPOs available yet.</Typography>
      ) : (
        <>
          <LpoTable
            lpos={lpos}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onDownload={handleDownload}
          />

          <LpoEditModal
            open={editOpen}
            handleClose={() => setEditOpen(false)}
            lpoData={selectedLpo}
            refreshData={refreshData}
          />

          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => lpos.forEach(handleDownload)}
          >
            Download All LPOs
          </Button>
        </>
      )}
    </Box>
  );
};

export default LPOSection;
