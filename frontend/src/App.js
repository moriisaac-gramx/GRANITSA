import React from 'react';
import { SnackbarProvider } from 'notistack';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import GMDashboard from './pages/GMDashboard';
import SalesDashboard from './pages/SalesDashboard';
import WarehouseDashboard from './pages/WarehouseDashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />

        <Route
          path="/dashboard/gm"
          element={
            <PrivateRoute allowedRoles={['generalManager']}>
              <GMDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/sales"
          element={
            <PrivateRoute allowedRoles={['generalManager','salesRep']}>
              <SalesDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/warehouse"
          element={
            <PrivateRoute allowedRoles={['generalManager','warehouseStaff']}>
              <WarehouseDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </SnackbarProvider>
  );
}

export default App;
