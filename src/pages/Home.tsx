import { Button, Grid, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { track } from '../analytics';
import { useEffect } from 'react';
import { useI18n } from '../i18n/I18nProvider';
export default function Home() {
  const { t } = useI18n();
  useEffect(()=>{ track('view_home'); },[]);
  return (
    <Grid container spacing={4} alignItems="center">
      <Grid item xs={12} md={6}>
        <Stack spacing={2}>
          <Typography variant="h3" fontWeight={800}>{t('home_title')}</Typography>
          <Typography color="text.secondary">{t('home_disc')}</Typography>
          <Stack direction="row" spacing={2}>
            <Button size="large" variant="contained" component={Link} to="/teachers">{t('find_teacher')}</Button>
            <Button size="large" component={Link} to="/register">{t('register')}</Button>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography variant="body2">⭐️ 4.8/5 {t('feed_back1')} •</Typography>
            <Typography variant="body2">{t('feed_back2')}</Typography>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12} md={6}>
        <img src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b" alt="hero" style={{ width: '100%', borderRadius: 16 }} />
      </Grid>
    </Grid>
  );
}