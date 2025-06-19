import React from 'react';
import { Button } from '@mui/material';
import jsPDF from 'jspdf';

const CreateLPO = ({ lpoData }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Local Purchase Order (LPO)', 10, 10);
    lpoData.forEach((item, idx) => {
      doc.text(`${idx + 1}. ${item.name} - Qty: ${item.quantity}`, 10, 20 + idx * 10);
    });
    doc.save('LPO.pdf');
  };

  return (
    <Button variant="outlined" onClick={generatePDF}>
      Download LPO PDF
    </Button>
  );
};

export default CreateLPO;
