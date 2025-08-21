import { useEffect, useState } from 'react';
import { api } from '../api';
import { Grid, Stack, TextField, Slider, Chip, Typography } from '@mui/material';
import TeacherCard from '../components/TeacherCard';
import { track } from '../analytics';
export default function Teachers() {
  const [list, setList] = useState<any[]>([]);
  const [q, setQ] = useState('');
  const [maxPrice, setMaxPrice] = useState<number>(25);
  const [tag, setTag] = useState('');
  const fetchList = async () => { const { data } = await api.get('/teachers', { params: { q, maxPrice, tag } }); setList(data); };
  useEffect(() => { fetchList(); }, []);
  const apply = async () => { await fetchList(); track('search_teacher', { q, maxPrice, tag }); };
  return (
    <Stack spacing={3}>
      <Typography variant="h4" fontWeight={700}>Chọn giáo viên</Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={4}><TextField fullWidth label="Tìm kiếm" value={q} onChange={e => setQ(e.target.value)} onKeyDown={(e)=> e.key==='Enter' && apply()} /></Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="body2">Giá tối đa: ${maxPrice}</Typography>
          <Slider value={maxPrice} min={5} max={50} step={1} onChange={(_, v) => setMaxPrice(v as number)} onChangeCommitted={apply} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack direction="row" spacing={1}>
            {['IELTS','Pronunciation','Business','Interview','Conversation','CELTA'].map(t => (
              <Chip key={t} label={t} variant={t===tag? 'filled':'outlined'} onClick={() => { setTag(t===tag?'':t); setTimeout(apply,0); }} />
            ))}
          </Stack>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {list.map(t => (<Grid item xs={12} md={4} key={t.id}><TeacherCard t={t} /></Grid>))}
      </Grid>
    </Stack>
  );
}