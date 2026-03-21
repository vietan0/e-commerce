'use client';
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectProps,
} from '@mui/material';
import QueryError from '@/app/_components/QueryError';
import useManufacturers from '@/src/queries/manufacturers/useManufacturers';

export default function ManufacturerSelect(props: SelectProps) {
  const { data: manufacturers, isPending, error } = useManufacturers();
  const labelId = 'manufacturer-select';

  return (
    <FormControl fullWidth>
      <InputLabel id={labelId}>Manufacturer</InputLabel>
      <Select
        {...props}
        label="Manufacturer"
        labelId={labelId}
        renderValue={(selected) => {
          if (isPending) return <CircularProgress size={16} />;
          if (error) return <QueryError error={error} />;

          const match = manufacturers.find((m) => String(m.id) === selected);
          return match!.name;
        }}
        size="small"
      >
        {isPending ? (
          <MenuItem>
            <CircularProgress size={16} />
          </MenuItem>
        ) : error ? (
          <MenuItem>
            <QueryError error={error} />
          </MenuItem>
        ) : (
          manufacturers.map((m) => (
            <MenuItem key={m.id} value={m.id as unknown as string}>
              {m.name}
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  );
}
