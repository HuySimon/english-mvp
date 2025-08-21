import { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { api } from '../api';
import { Alert, Stack, Typography } from '@mui/material';
export default function Profile() {
  const { user } = useAuth();
  const [list, setList] = useState<any[]>([]);
  useEffect(() => { if (user) api.get('/bookings/me').then(r => setList(r.data)); }, [user]);
  if (!user) return <Alert severity="info">Vui lòng đăng nhập để xem lịch đã đặt.</Alert>;
  return (
    <Stack spacing={2}>
      <Typography variant="h5" fontWeight={700}>Lịch học của {user.name}</Typography>
      {list.map(b => (<Typography key={b.id}>• {new Date(b.slotTime || b.slot).toLocaleString()} với giáo viên #{b.teacherId} — {b.status}</Typography>))}
      {list.length === 0 && <Typography color="text.secondary">Chưa có lịch nào.</Typography>}
    </Stack>
  );
}