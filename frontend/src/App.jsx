import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import VerifyOtpPage from "./pages/VerifyOtpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import DashboardPage from "./pages/DashboardPage";
import GalleryPage from "./pages/GalleryPage";
import SharedGalleryPage from "./pages/SharedGalleryPage";
import ContactPage from "./pages/ContactPage";
import MyMessagesPage from "./pages/MyMessagesPage";
import AdminMessagesPage from "./pages/AdminMessagesPage";
import UnauthorizedPage from "./pages/PageNotFound";
import AdminUsersPage from "./pages/AdminUsersPage";
import UploadPage from "./pages/UploadPage";
import MediaDetailPage from "./pages/MediaDetailPage";
import ProfilePage from "./pages/ProfilePage";
import LandingPage from "./pages/LandingPage";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-otp" element={<VerifyOtpPage />} />
          <Route path="/forgot" element={<ForgotPasswordPage />} />
          <Route path="/reset" element={<ResetPasswordPage />} />
          <Route path="/notfound" element={ <UnauthorizedPage />}/>
          <Route path="/admin/users" element={<AdminRoute><AdminUsersPage /></AdminRoute>} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/gallery"
            element={
              <ProtectedRoute>
                <GalleryPage />
              </ProtectedRoute>
            }
          />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/media/:id" element={<MediaDetailPage />} />
          <Route
            path="/shared"
            element={
      
                <SharedGalleryPage />
             
            }
          />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/my-messages"
            element={
              <ProtectedRoute>
                <MyMessagesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/messages"
            element={
              <AdminRoute>
                <AdminMessagesPage />
              </AdminRoute>
            }
          />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        </Routes>
      </div>
    </div>
  );
}
