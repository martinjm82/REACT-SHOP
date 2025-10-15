// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate,useLocation } from 'react-router-dom';

export default function ProtectedRoute({ isAuthed, children }) {
  if (!isAuthed) return <Navigate to="/login" state={location.state} replace />;
  return children;
}