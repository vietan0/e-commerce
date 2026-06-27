'use client';
import {
  Chip,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectProps,
  Stack,
} from '@mui/material';
import QueryError from '@/app/_components/QueryError';
import useResource from '@/src/queries/useResource';

export default function CategoriesSelect(props: SelectProps) {
  const { data: categories, isPending, error } = useResource('categories');
  const labelId = 'categories-select';

  return (
    <FormControl fullWidth size="small">
      <InputLabel id={labelId}>Categories</InputLabel>
      <Select
        {...props}
        label="Categories"
        labelId={labelId}
        multiple
        renderValue={(selected) => {
          if (isPending) return <CircularProgress size={16} />;
          if (error) return <QueryError error={error} />;

          const categoryNames = (selected as number[]).map((category_id) => {
            const match = categories.find((m) => m.id === category_id)!;
            return <Chip key={match.id} label={match.name} />;
          });

          return (
            <Stack
              direction="row"
              spacing={1}
              sx={{ flexWrap: 'wrap' }}
              useFlexGap
            >
              {categoryNames}
            </Stack>
          );
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
          categories.map((c) => (
            <MenuItem key={c.id} value={c.id as unknown as string}>
              {c.name}
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  );
}
