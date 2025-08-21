import { Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
export default function SchedulePicker({ slots, value, onChange }: { slots: string[]; value: string | null; onChange: (v: string) => void; }) {
  return (
    <Stack>
      <ToggleButtonGroup exclusive value={value} onChange={(_, v) => v && onChange(v)} sx={{ flexWrap: 'wrap', gap: 1 }}>
        {slots.map(s => (
          <ToggleButton key={s} value={s} size="small">
            {new Date(s).toLocaleString()}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Stack>
  );
}