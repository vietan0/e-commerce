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
  Typography,
} from '@mui/material';
import useCategories from '@/src/queries/categories/useCategories';

export default function CategoriesSelect(props: SelectProps) {
  const { data, isPending, error } = useCategories();
  const labelId = 'categories-select';

  return (
    <FormControl fullWidth>
      <InputLabel id={labelId}>Categories</InputLabel>
      <Select
        {...props}
        label="Categories"
        labelId={labelId}
        multiple
        renderValue={(selected) => {
          if (isPending) return <CircularProgress size={16} />;

          if (error) {
            return (
              <Typography color="error.light">
                Error fetching categories:
                <Typography sx={{ fontFamily: 'monospace' }}>
                  {error.message}
                </Typography>
              </Typography>
            );
          }

          const categoryNames = (selected as string[]).map((category_id) => {
            const match = data.categories.find(
              (m) => String(m.id) === category_id,
            )!;
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
        {data?.categories.map((c) => (
          <MenuItem key={c.id} value={c.id as unknown as string}>
            {c.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
