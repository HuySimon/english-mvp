import { Container, CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthProvider } from './auth/AuthContext';
import Home from './pages/Home';
import Teachers from './pages/Teachers';
import TeacherDetail from './pages/TeacherDetail';
import BookTrial from './pages/BookTrial';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import BuyPackage from './pages/BuyPackage';
import { I18nProvider } from './i18n/I18nProvider';
export default function App() {
  return (
    <I18nProvider>
      <AuthProvider>
        <CssBaseline />
        <Navbar />
        <Container sx={{ py: 4 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/teachers/:id" element={<TeacherDetail />} />
            <Route path="/book" element={<BookTrial />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/buy" element={<BuyPackage />} />
          </Routes>
        </Container>
      </AuthProvider>
    </I18nProvider>
  );
}