import { Chip } from '@mui/material';

export default function DiscountChip({
  discount_name,
}: {
  discount_name: string;
}) {
  return <Chip label={discount_name} size="small" />;
}
