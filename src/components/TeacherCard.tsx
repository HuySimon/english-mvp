import { Card, CardContent, CardMedia, Chip, Rating, Stack, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
export default function TeacherCard({ t }: { t: any }) {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardMedia component="img" height={180} image={t.avatarUrl} alt={t.name} />
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{t.name}</Typography>
          <Rating value={t.rating} precision={0.1} readOnly />
        </Stack>
        <Typography variant="body2" color="text.secondary">{t.headline}</Typography>
        <Stack direction="row" spacing={1} sx={{ my: 1, flexWrap: 'wrap' }}>
          {t.tags.map((tag: string) => <Chip key={tag} size="small" label={tag} />)}
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography fontWeight={700}>${t.pricePerHour}/h</Typography>
          <Button size="small" variant="contained" component={Link} to={`/teachers/${t.id}`}>Đặt học thử</Button>
        </Stack>
      </CardContent>
    </Card>
  );
}