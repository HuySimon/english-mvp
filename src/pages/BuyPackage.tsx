import { Button, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { api } from '../api';
import { track } from '../analytics';
export default function BuyPackage() {
  const { user } = useAuth();
  const [pkg, setPkg] = useState<'5'|'10'|'20'>('5');
  const [res, setRes] = useState<any>(null);
  const buy = async () => {
    if (!user) return alert('Vui lòng đăng nhập');
    const { data } = await api.post('/payments/checkout', { userId: user.id, teacherId: 0, package: pkg });
    setRes(data); track('buy_package_click', { pkg });
  };
  return (
    <Stack spacing={2} maxWidth={480}>
      <Typography variant="h5" fontWeight={700}>Mua gói học</Typography>
      <TextField select label="Chọn gói" value={pkg} onChange={(e)=>setPkg(e.target.value as any)}>
        <MenuItem value="5">5 buổi — $69</MenuItem>
        <MenuItem value="10">10 buổi — $119</MenuItem>
        <MenuItem value="20">20 buổi — $199</MenuItem>
      </TextField>
      <Button variant="contained" onClick={buy}>Thanh toán (demo)</Button>
      {res && <Typography>Trạng thái: {res.status} • Số tiền: ${res.amount} {res.currency}</Typography>}
    </Stack>
  );
}