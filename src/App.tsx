import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SplashScreen } from './pages/SplashScreen';
import { LoginScreen } from './pages/LoginScreen';
import { RegisterScreen } from './pages/RegisterScreen';
import { BanquetManagerDashboard } from './pages/BanquetManagerDashboard';
import { ExecutiveChefDashboard } from './pages/ExecutiveChefDashboard';
import { KitchenStaffDashboard } from './pages/KitchenStaffDashboard';
import { ManagerDashboard } from './pages/ManagerDashboard';
import { ChartsPage } from './pages/ChartsPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';
import { OrdersPage } from './pages/OrdersPage';
import { ProfilePage } from './pages/ProfilePage';
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/splash" replace />} />
        <Route path="/splash" element={<SplashScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/banquet-manager" element={<BanquetManagerDashboard />} />
        <Route path="/executive-chef" element={<ExecutiveChefDashboard />} />
        <Route path="/kitchen-staff" element={<KitchenStaffDashboard />} />
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/manager/charts" element={<ChartsPage />} />
        <Route path="/manager/reports" element={<ReportsPage />} />
        <Route path="/manager/settings" element={<SettingsPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>);

}