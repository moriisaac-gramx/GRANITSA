import React from 'react';
import {
  TableContainer, Table, TableHead, TableBody, TableRow, TableCell,
  Paper, IconButton, Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const LpoTable = ({ lpos, onEdit, onDelete, onDownload }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>LPO ID</strong></TableCell>
            <TableCell><strong>Supplier</strong></TableCell>
            <TableCell><strong>Items</strong></TableCell>
            <TableCell><strong>Date Issued</strong></TableCell>
            <TableCell align="right"><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lpos.map((lpo) => (
            <TableRow key={lpo._id}>
              <TableCell>{lpo.lpoId || '–'}</TableCell>
              <TableCell>{lpo.supplier || '–'}</TableCell>
              <TableCell>
                {Array.isArray(lpo.items)
                  ? lpo.items.map(item => {
                      const quantity = item.quantity ?? '?';
                      const unit = item.unit ? ` ${item.unit}` : '';
                      return `${item.name} (${quantity}${unit})`;
                    }).join(', ')
                  : 'No items'}
              </TableCell>
              <TableCell>
                {lpo.date
                  ? new Date(lpo.date).toLocaleDateString('en-GB')
                  : '–'}
              </TableCell>
              <TableCell align="right">
                <Tooltip title="Edit">
                  <IconButton onClick={() => onEdit(lpo)}><EditIcon /></IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton onClick={() => onDelete(lpo._id)}><DeleteIcon /></IconButton>
                </Tooltip>
                <Tooltip title="Download">
                  <IconButton onClick={() => onDownload(lpo)}><FileDownloadIcon /></IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LpoTable;
