import React, { useEffect, useState } from 'react';
import {
  Box, Grid, Typography, Paper, Card, CardContent,
  Drawer, List, ListItem, ListItemText, ListItemIcon, Divider
} from '@mui/material';
import {
  People, Inventory2, AssignmentTurnedIn, AssignmentLate,
  Home, Dashboard, Warehouse, Logout
} from '@mui/icons-material';
import axios from '../api/axios';
import { styled } from '@mui/material/styles';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';


const green = '#2E7D32';
const light = '#F9F9F9';

const StyledCard = styled(Card)({
  backgroundColor: light,
  color: green,
  border: `1px solid ${green}`,
  borderRadius: 10,
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
});

const StatCard = ({ icon, label, value }) => (
  <Grid item xs={12} md={3}>
    <StyledCard>
      <CardContent>
        <Box display="flex" alignItems="center" gap={2}>
          {icon}
          <Box>
            <Typography variant="h6">{value}</Typography>
            <Typography variant="body2">{label}</Typography>
          </Box>
        </Box>
      </CardContent>
    </StyledCard>
  </Grid>
);

const GMDashboard = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    inventoryCount: 0,
    ordersCompleted: 0,
    ordersPending: 0
  });
  const [inventoryChartData, setInventoryChartData] = useState([]);
  const [orderChartData, setOrderChartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const userRes = await axios.get('/users/active');
        setUsers(userRes.data);

        const inventoryRes = await axios.get('/inventory');
        const ordersRes = await axios.get('/orders');

        const completed = ordersRes.data.filter(o => o.status === 'completed').length;
        const pending = ordersRes.data.filter(o => o.status !== 'completed').length;

        setStats({
          inventoryCount: inventoryRes.data.length,
          ordersCompleted: completed,
          ordersPending: pending
        });

        const stockChart = inventoryRes.data.map(item => ({
          name: item.name,
          quantity: item.quantity
        }));
        setInventoryChartData(stockChart);

        const monthlyTotals = {};
        ordersRes.data.forEach(order => {
          const date = new Date(order.createdAt);
          const month = date.toLocaleString('default', { month: 'short' });
          const status = order.status === 'completed' ? 'completed' : 'pending';
          if (!monthlyTotals[month]) {
            monthlyTotals[month] = { name: month, completed: 0, pending: 0 };
          }
          monthlyTotals[month][status]++;
        });

        const monthOrder = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        const sorted = Object.values(monthlyTotals).sort(
          (a, b) => monthOrder.indexOf(a.name) - monthOrder.indexOf(b.name)
        );
        setOrderChartData(sorted);

      } catch (err) {
        console.error('Dashboard data fetch failed:', err);
      }
    };

    fetchDashboardData();
  }, []);

  const downloadGMReport = () => {
  const doc = new jsPDF();
  const today = new Date().toLocaleDateString();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Company Letterhead Header
  const logo = '/assets/gran_logo.jpg'; // Ensure this path points to your public logo
  doc.addImage(logo, 'JPEG', 15, 10, 30, 30); // logo on left
  doc.setFontSize(20);
  doc.setTextColor(green);
  doc.text('GRANITSA LTD', pageWidth / 2, 20, { align: 'center' });

  doc.setFontSize(12);
  doc.setTextColor('#000');
  doc.text(`GM Dashboard Summary`, pageWidth / 2, 28, { align: 'center' });
  doc.text(`Generated: ${today}`, pageWidth / 2, 34, { align: 'center' });

  // Body Table
  autoTable(doc, {
    startY: 45,
    theme: 'striped',
    head: [['Metric', 'Value']],
    body: [
      ['Inventory Count', stats.inventoryCount],
      ['Orders Completed', stats.ordersCompleted],
      ['Orders Pending', stats.ordersPending],
      ['Active Users', users.length]
    ]
  });

  // Footer Contact Info
  const footerY = doc.lastAutoTable.finalY + 20;
  doc.setDrawColor(green);
  doc.setLineWidth(0.5);
  doc.line(15, footerY - 5, pageWidth - 15, footerY - 5);

  doc.setFontSize(10);
  doc.setTextColor('#555');
  doc.text('Granitsa Ltd · Nairobi, Kenya · +254 712 345 678 · info@granitsa.com', pageWidth / 2, footerY + 8, {
    align: 'center'
  });

  doc.save(`GM_Summary_${today.replace(/\//g, '-')}.pdf`);
};


  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: light }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 240,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            bgcolor: '#ffffff'
          }
        }}
      >
        <Box sx={{ textAlign: 'center', py: 2 }}>
          <img src="/assets/gran_logo.jpg" alt="Company Logo" style={{ width: 120 }} />
        </Box>
        <Divider />
        <List>
          <ListItem button onClick={() => handleNavigation('/')}>
            <ListItemIcon><Home /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/dashboard/sales')}>
            <ListItemIcon><Dashboard /></ListItemIcon>
            <ListItemText primary="Sales Dashboard" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/dashboard/warehouse')}>
            <ListItemIcon><Warehouse /></ListItemIcon>
            <ListItemText primary="Warehouse Dashboard" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/login')}>
            <ListItemIcon><Logout /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 4 } }}>
        <Container maxWidth="xl">
          <Typography
            variant="h4"
            gutterBottom
            color="primary"
            sx={{ fontSize: { xs: '1.8rem', md: '2.4rem' } }}
          >
          General Manager Dashboard
        </Typography>

        {/* Stats */}
        <Grid container spacing={3} my={2}>
          <StatCard icon={<Inventory2 fontSize="large" />} label="Total Inventory Items" value={stats.inventoryCount} />
          <StatCard icon={<AssignmentTurnedIn fontSize="large" />} label="Orders Completed" value={stats.ordersCompleted} />
          <StatCard icon={<AssignmentLate fontSize="large" />} label="Orders Pending" value={stats.ordersPending} />
          <StatCard icon={<People fontSize="large" />} label="Active Users" value={users.length} />
        </Grid>

        {/* Charts */}
        <Grid container spacing={3} mt={1}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: 300 }}>
              <Typography variant="subtitle1" gutterBottom>
                Inventory Trends
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={inventoryChartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="quantity" fill={green} name="Stock Qty" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: 300 }}>
              <Typography variant="subtitle1" gutterBottom>
                Order Status Breakdown
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={orderChartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="completed" fill={green} name="Completed" />
                  <Bar dataKey="pending" fill="#FF7043" name="Pending" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>

        {/* Active Users */}
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Active Users
          </Typography>
          <Paper sx={{ p: 2 }}>
            {users.length === 0 ? (
              <Typography color="textSecondary">No active users found.</Typography>
            ) : (
              users.map((user, i) => (
                <Typography key={i}>
                  {user.name} — {user.role}
                </Typography>
              ))
            )}
          </Paper>
        </Box>

               {/* Download Button */}
        <Box mt={4}>
          <Paper sx={{ p: 2, textAlign: 'right' }}>
            <button
              onClick={downloadGMReport}
              style={{
                backgroundColor: green,
                color: 'white',
                border: 'none',
                padding: '10px 16px',
                borderRadius: 5,
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              📥 Download GM Summary
            </button>
          </Paper>
        </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default GMDashboard;
