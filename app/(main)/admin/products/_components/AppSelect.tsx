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
import useResource from '@/src/queries/useResource';
import type { ResourceMap } from '@/src/types';

type CustomProps = {
  endpoint: keyof ResourceMap;
  label?: string;
  renderLabel?: string | ((match: Record<string, unknown>) => React.ReactNode);
};

/*
  receive:
  from RHF: {
    fullWidth: true
    name: "brand_id"
    onBlur: function
    onChange: function
    ref: function ref(elm)
    value: ""
  } -> to Select
  SelectProps (so I can customize Select's look with MUI api) -> to Select
  Specific-api-props: {
    endpoint: string,
    label: string,
    labelId: string
  } 
*/

export default function AppSelect({
  endpoint,
  label,
  renderLabel = 'name',
  ...selectProps
}: SelectProps & CustomProps) {
  const { data, isPending, error } = useResource(endpoint);

  function getRenderValue(match: Record<string, unknown>) {
    if (typeof renderLabel === 'string') {
      if (renderLabel in match) return String(match[renderLabel]);
      return String(match.id);
    }
    return renderLabel(match);
  }

  return (
    <FormControl fullWidth size="small">
      <InputLabel id={endpoint}>{label}</InputLabel>
      <Select
        {...selectProps}
        label={label}
        labelId={endpoint}
        renderValue={(selected) => {
          if (isPending) return <CircularProgress size={16} />;
          if (error) return <QueryError error={error} />;

          const match = data.find((m) => m.id === selected);
          return match ? getRenderValue(match) : 'No match';
        }}
        size="small"
        value={selectProps.value || ''} // fallback to '' to avoid out-of-range warning when value is undefined: https://github.com/mui/material-ui/issues/18494
      >
        {isPending ? (
          <MenuItem>
            <CircularProgress size={16} />
          </MenuItem>
        ) : error ? (
          <MenuItem>
            <QueryError error={error} />
          </MenuItem>
        ) : data.length === 0 ? (
          <MenuItem>Không có item nào</MenuItem>
        ) : (
          data.map((m) => (
            <MenuItem key={m.id} value={m.id as unknown as string}>
              {getRenderValue(m)}
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  );
}
