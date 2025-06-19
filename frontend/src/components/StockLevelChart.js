import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { Typography, Box } from '@mui/material';

const StockLevelChart = ({ data }) => (
  <Box sx={{ width: '100%', height: 300 }}>
    {data.length === 0 ? (
      <Typography
        variant="body2"
        sx={{ mt: 2, textAlign: 'center', color: 'gray' }}
      >
        No inventory data available to display.
      </Typography>
    ) : (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="quantity" name="Stock Qty">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.quantity <= 5 ? '#D32F2F' : '#2E7D32'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    )}
  </Box>
);

export default StockLevelChart;
