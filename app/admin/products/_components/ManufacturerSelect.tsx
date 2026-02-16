'use client';
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectProps,
  Typography,
} from '@mui/material';
import useManufacturers from '@/src/queries/useManufacturers';

export default function ManufacturerSelect(props: SelectProps) {
  const { data, isPending, error } = useManufacturers();
  const labelId = 'manufacturer-select';

  return (
    <FormControl fullWidth>
      <InputLabel id={labelId}>Manufacturer</InputLabel>
      <Select
        {...props}
        label="Manufacturer"
        labelId={labelId}
        renderValue={(value) => {
          if (isPending) return <CircularProgress size={16} />;

          if (error) {
            return (
              <Typography color="error.light">
                Error fetching manufacturers:
                <Typography sx={{ fontFamily: 'monospace' }}>
                  error.message;
                </Typography>
              </Typography>
            );
          }

          const match = data.manufacturers.find((m) => String(m.id) === value);
          return match!.name;
        }}
        size="small"
      >
        {data?.manufacturers.map((m) => (
          <MenuItem key={m.id} value={m.id as unknown as string}>
            {m.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
