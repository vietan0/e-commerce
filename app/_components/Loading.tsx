import {
  CircularProgress,
  type CircularProgressProps,
  Stack,
  type SxProps,
  type Theme,
} from '@mui/material';

export default function Loading({
  stackSx,
  circularProps,
}: {
  stackSx?: SxProps<Theme>;
  circularProps?: CircularProgressProps;
}) {
  return (
    <Stack
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        height: 1,
        ...stackSx,
      }}
    >
      <CircularProgress {...circularProps} />
    </Stack>
  );
}
