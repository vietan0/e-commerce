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
import useEndpoint from '@/src/queries/useEndpoint';
import type { EndpointMap } from '@/src/types';

type CustomProps = {
  endpoint: keyof EndpointMap;
  label?: string;
  displayField?: string;
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
  displayField = 'name',
  ...selectProps
}: SelectProps & CustomProps) {
  const { data, isPending, error } = useEndpoint(endpoint);

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
          if (!match) return 'No match';
          if (displayField in match) {
            return String((match as Record<string, unknown>)[displayField]);
          } else {
            return String(match.id);
          }
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
              {displayField in m
                ? String((m as Record<string, unknown>)[displayField])
                : String(m.id)}
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  );
}
