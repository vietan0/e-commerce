import { Icon } from '@iconify/react';
import { IconButton, Stack, Typography } from '@mui/material';

export default function QuantityStepper({
  value,
  inc,
  dec,
}: {
  value: number;
  inc: (delta?: number | undefined) => void;
  dec: (delta?: number | undefined) => void;
}) {
  return (
    <Stack
      direction="row"
      sx={{
        maxWidth: 100,
        border: 1,
        borderRadius: 2,
        borderColor: 'grey.400',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <IconButton
        aria-label="Decrease by 1"
        onClick={() => dec()}
        size="small"
        sx={{
          borderRadius: 0,
          flexGrow: 1,
        }}
      >
        <Icon fontSize={16} icon="material-symbols:remove-rounded" />
      </IconButton>
      <Typography sx={{ minWidth: 32, textAlign: 'center' }}>
        {value}
      </Typography>
      <IconButton
        aria-label="Increase by 1"
        onClick={() => inc()}
        size="small"
        sx={{
          borderRadius: 0,
          flexGrow: 1,
        }}
      >
        <Icon fontSize={16} icon="material-symbols:add-rounded" />
      </IconButton>
    </Stack>
  );
}
