import { Alert, Button, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
export default function Register() {
  const { register } = useAuth();
  const [name, setName] = useState('Demo User');
  const [email, setEmail] = useState('demo@user.com');
  const [password, setPassword] = useState('demopass');
  const [err, setErr] = useState('');
  const nav = useNavigate();
  const submit = async () => { try { setErr(''); await register(name, email, password); nav('/'); } catch (e: any) { setErr(e?.response?.data?.message || 'Register failed'); } };
  return (
    <Stack spacing={2} maxWidth={420} mx="auto">
      <Typography variant="h5" fontWeight={700}>Tạo tài khoản</Typography>
      {err && <Alert severity="error">{err}</Alert>}
      <TextField label="Họ tên" value={name} onChange={e=>setName(e.target.value)} />
      <TextField label="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <TextField label="Mật khẩu" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <Button variant="contained" onClick={submit}>Đăng ký</Button>
    </Stack>
  );
}