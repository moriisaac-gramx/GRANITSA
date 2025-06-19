import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Button, Grid, Paper, TableContainer,
  Table, TableHead, TableRow, TableCell, TableBody, TextField,
  Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, Card, CardContent
} from '@mui/material';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';
import {
  Home, ListAlt, AddCircleOutline, Logout
} from '@mui/icons-material';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import CreateOrderModal from '../components/CreateOrderModal';

const green = '#2E7D32';
const light = '#F9F9F9';

const SalesDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [chartData, setChartData] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [productChartData, setProductChartData] = useState([]);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchMyOrders = async () => {
    try {
      const res = await axios.get('/orders/my-orders');
      const data = res.data;
      setOrders(data);

      const total = data.reduce((acc, order) => {
        if (order.amount) return acc + order.amount;
        const itemTotal = order.items?.reduce(
          (sum, item) => sum + (item.price * item.quantity), 0
        );
        return acc + (itemTotal || 0);
      }, 0);
      setTotalSales(total);

      const statusCount = data.reduce((acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
      }, {});

      setChartData([
        { status: 'Pending', count: statusCount.pending || 0 },
        { status: 'Completed', count: statusCount.completed || 0 },
        { status: 'Cancelled', count: statusCount.cancelled || 0 }
      ]);

      const productSales = {};
      data.forEach(order => {
        order.items?.forEach(item => {
          const name = item.product || item.name;
          productSales[name] = (productSales[name] || 0) + (item.price * item.quantity);
        });
      });
      const productChart = Object.entries(productSales).map(([name, total]) => ({
        name,
        total: parseFloat(total.toFixed(2))
      }));
      setProductChartData(productChart);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  const filteredOrders = orders.filter(order =>
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportOrdersToPDF = () => {
  const doc = new jsPDF();
  const today = new Date().toLocaleDateString();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header with logo and company name
  const logo = '/assets/gran_logo.jpg'; // Make sure this logo exists in public/assets
  doc.addImage(logo, 'JPEG', 15, 10, 30, 30);
  doc.setFontSize(20);
  doc.setTextColor(green);
  doc.text('GRANITSA LTD', pageWidth / 2, 20, { align: 'center' });

  doc.setFontSize(12);
  doc.setTextColor('#000');
  doc.text('Sales Orders Summary', pageWidth / 2, 28, { align: 'center' });
  doc.text(`Generated: ${today}`, pageWidth / 2, 34, { align: 'center' });

  // Order Table
  autoTable(doc, {
    startY: 45,
    theme: 'striped',
    head: [['Client', 'Status', 'Order Date']],
    body: orders.map(o => [
      o.customerName,
      o.status,
      new Date(o.orderDate).toLocaleDateString()
    ])
  });

  // Footer line and contact info
  const footerY = doc.lastAutoTable.finalY + 20;
  doc.setDrawColor(green);
  doc.setLineWidth(0.5);
  doc.line(15, footerY - 5, pageWidth - 15, footerY - 5);
  doc.setFontSize(10);
  doc.setTextColor('#555');
  doc.text('Granitsa Ltd · Nairobi, Kenya · +254 712 345 678 · info@granitsa.com', pageWidth / 2, footerY + 8, {
    align: 'center'
  });

  doc.save(`My_Orders_${today.replace(/\//g, '-')}.pdf`);
};


  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: light }}>
      {/* Sidebar Drawer */}
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
          <ListItem button onClick={() => handleNavigate('/')}>
            <ListItemIcon><Home /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem>
            <ListItemIcon><ListAlt /></ListItemIcon>
            <ListItemText primary="My Orders" />
          </ListItem>
          <ListItem button onClick={() => setOrderModalOpen(true)}>
            <ListItemIcon><AddCircleOutline /></ListItemIcon>
            <ListItemText primary="Create Order" />
          </ListItem>
          <ListItem button onClick={() => handleNavigate('/login')}>
            <ListItemIcon><Logout /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Dashboard */}
      <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ color: green }}>
          Sales Dashboard
        </Typography>

        <Grid container spacing={3} my={2}>
          <Grid item xs={12} md={4}>
            <Card sx={{ borderLeft: `5px solid ${green}`, backgroundColor: 'white' }}>
              <CardContent>
                <Typography variant="subtitle2">Total Orders</Typography>
                <Typography variant="h5" sx={{ color: green }}>{orders.length}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ borderLeft: `5px solid ${green}`, backgroundColor: 'white' }}>
              <CardContent>
                <Typography variant="subtitle2">Total Sales</Typography>
                <Typography variant="h5" sx={{ color: green }}>
                  KES {totalSales.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} alignItems="center" mb={4}>
          <Grid item xs={12} md={8}>
            <Typography variant="h6">Order Status Summary</Typography>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" name="Orders" fill={green} />
              </BarChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>

        <Typography variant="h6" sx={{ mt: 4 }}>Sales by Product</Typography>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={productChartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill={green} name="Revenue (KES)" />
          </BarChart>
        </ResponsiveContainer>

        <TextField
          fullWidth
          label="Search by Client Name"
          placeholder="Start typing..."
          variant="outlined"
          sx={{ mt: 4, mb: 3 }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Typography variant="h6" gutterBottom>My Recent Orders</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: '#e8f5e9' }}>
              <TableRow>
                <TableCell><strong>Client</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Order Date</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.slice(0, 10).map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>


        <Box mt={5}>
          <Typography variant="h6" gutterBottom>
            My Clients <em>(Coming soon)</em>
          </Typography>
          <Paper sx={{ p: 3, textAlign: 'center', color: 'gray' }}>
            Track frequent institutions and contacts here in a future update.
          </Paper>
        </Box>

        <Button
          variant="outlined"
          sx={{
            mt: 3,
            color: green,
            borderColor: green,
            '&:hover': { bgcolor: green, color: 'white' }
          }}
          onClick={exportOrdersToPDF}
        >
          📄 Download Orders PDF
        </Button>

        {/* 📦 Order Modal */}
        <CreateOrderModal
          open={orderModalOpen}
          handleClose={() => setOrderModalOpen(false)}
          refreshOrders={fetchMyOrders}
            onOrderCreated={(order) => {
            generateOrderPDF(order);
            }}
        />
      </Box>
    </Box>
  );
};

export default SalesDashboard;
