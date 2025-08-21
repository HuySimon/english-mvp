import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { useI18n } from '../i18n/I18nProvider';
export default function Navbar() {
  const { user, logout } = useAuth();
  const { t, lang, setLang } = useI18n();
  const nav = useNavigate();
  return (
    <AppBar position="sticky" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #eee', zIndex: '1000', backgroundColor: 'white' }}>
      <Toolbar sx={{ display: 'flex', gap: 2 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }} component={Link} to="/" style={{ textDecoration: 'none' }}>
          LingoOne
        </Typography>
        <Button component={Link} to="/teachers">{t('search_teacher')}</Button>
        <Button component={Link} to="/buy">{t('buy_package')}</Button>
        <Button onClick={() => setLang(lang==='vi'?'en':'vi')}>{lang.toUpperCase()}</Button>
        {user ? (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button component={Link} to="/profile">{t('hello')}, {user.name}</Button>
            <Button onClick={() => { logout(); nav('/'); }}>{t('btn_logout')}</Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button component={Link} to="/login">{t('btn_login')}</Button>
            <Button variant="contained" component={Link} to="/register">{t('btn_logup')}</Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}