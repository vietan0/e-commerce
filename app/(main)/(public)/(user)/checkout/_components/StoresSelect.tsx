import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectProps,
} from '@mui/material';
import QueryError from '@/app/_components/QueryError';
import useStores from '@/src/queries/stores/useStores';

export default function StoresSelect(props: SelectProps) {
  const { data: stores, isPending, error } = useStores();
  const labelId = 'stores-select';
  if (isPending) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) return <QueryError error={error} />;
  return (
    <FormControl fullWidth size="small">
      <InputLabel id={labelId}>Store</InputLabel>
      <Select
        {...props}
        label="Store"
        labelId={labelId}
        renderValue={(selected) => {
          if (isPending) return <CircularProgress size={16} />;
          if (error) return <QueryError error={error} />;

          const match = stores.find((m) => String(m.id) === selected)!;
          return `${match.street_address} - ${match.district} - ${match.city}`;
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
          stores.map((store) => (
            <MenuItem key={store.id} value={store.id as unknown as string}>
              {store.street_address} - {store.district} - {store.city}
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  );
}
