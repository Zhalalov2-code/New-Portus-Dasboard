import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import LkwList from "./pages/lkwList";
import Navbar from "./components/navbar";
import ChassiListe from "./pages/chassiListe";
import FahrerListe from "./pages/fahrerListe";
import Login from "./pages/login";
import Profile from "./pages/profile";
import ProtectedRoute from "./components/ProtectedRoute";

const AppContent = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login';

  return (
    <div className="App">
      {!hideNavbar && <Navbar />}
      <div 
        className="main-content" 
        style={{ 
          marginLeft: hideNavbar ? '0' : '16.666667%', 
          height: '100vh', 
          overflow: 'auto' 
        }}
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <LkwList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/chassi" 
            element={
              <ProtectedRoute>
                <ChassiListe />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/fahrer" 
            element={
              <ProtectedRoute>
                <FahrerListe />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
