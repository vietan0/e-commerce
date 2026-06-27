import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectProps,
} from '@mui/material';
import Loading from '@/app/_components/Loading';
import QueryError from '@/app/_components/QueryError';
import useResource from '@/src/queries/useResource';

export default function StoresSelect(props: SelectProps) {
  const { data: stores, isPending, error } = useResource('stores');
  const labelId = 'stores-select';
  if (isPending) return <Loading />;
  if (error) return <QueryError error={error} />;
  return (
    <FormControl fullWidth size="small">
      <InputLabel id={labelId}>Cửa hàng</InputLabel>
      <Select
        {...props}
        label="Cửa hàng"
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
