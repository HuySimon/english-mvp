import { Alert, Button, Stack, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { api } from '../api';
import { useState } from 'react';
import { track } from '../analytics';
export default function BookTrial() {
  const { state } = useLocation() as any;
  const { user } = useAuth();
  const nav = useNavigate();
  const [ok, setOk] = useState(false);
  if (!state?.teacher || !state?.slot) return <Typography>Thiếu dữ liệu booking.</Typography>;
  const submit = async () => {
    if (!user) { nav('/login'); return; }
    const { teacher, slot } = state;
    await api.post('/bookings', { teacherId: teacher.id, slot });
    setOk(true); track('create_booking', { teacherId: teacher.id });
  };
  return (
    <Stack spacing={2}>
      <Typography variant="h5" fontWeight={700}>Xác nhận học thử</Typography>
      <Typography>Giáo viên: {state.teacher.name} • Thời gian: {new Date(state.slot).toLocaleString()}</Typography>
      <Button variant="contained" onClick={submit}>Đặt lịch</Button>
      {ok && (
        <>
          <Alert severity="success" action={<Button onClick={() => nav('/profile')}>Xem lịch của tôi</Button>}>Đặt lịch thành công!</Alert>
          <Button onClick={()=>nav('/buy')}>Mua gói để học tiếp</Button>
        </>
      )}
    </Stack>
  );
}