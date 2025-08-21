import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api';
import { Avatar, Button, Chip, Rating, Stack, Typography } from '@mui/material';
import SchedulePicker from '../components/SchedulePicker';
import { track } from '../analytics';
export default function TeacherDetail() {
  const { id } = useParams();
  const [t, setT] = useState<any | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const nav = useNavigate();
  useEffect(() => { (async () => { const { data } = await api.get(`/teachers/${id}`); setT(data); track('view_teacher', { id }); })(); }, [id]);
  if (!t) return null;
  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar src={t.avatarUrl} sx={{ width: 72, height: 72 }} />
        <Stack>
          <Typography variant="h5" fontWeight={700}>{t.name}</Typography>
          <Stack direction="row" spacing={1}><Rating value={t.rating} readOnly /><Chip label={`${t.accent} accent`} size="small" /></Stack>
        </Stack>
      </Stack>
      <Typography color="text.secondary">{t.headline}</Typography>
      <Typography>{t.bio}</Typography>
      <Typography variant="h6" fontWeight={700} sx={{ mt: 2 }}>Chọn lịch học thử</Typography>
      <SchedulePicker slots={t.availableSlots} value={slot} onChange={v => setSlot(v)} />
      <Button disabled={!slot} variant="contained" onClick={() => nav('/book', { state: { teacher: t, slot } })}>Tiếp tục</Button>
    </Stack>
  );
}