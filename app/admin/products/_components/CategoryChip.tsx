import { Chip } from '@mui/material';

export default function CategoryChip({
  category_name,
}: {
  category_name: string;
}) {
  return <Chip label={category_name} size="small" />;
}
