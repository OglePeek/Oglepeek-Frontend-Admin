import { MenuItem, TextField, type TextFieldProps } from "@mui/material";

type DropdownItem = {
  value: string;
  label: string;
};

type Props = TextFieldProps & {
  label: string;
  items: DropdownItem[];
};

export const DropdownInput: React.FC<Props> = ({ label, items, ...fields }) => {
  return (
    <TextField
      label={label}
      id="outlined-size-small"
      variant="outlined"
      size="small"
      defaultValue=""
      className="w-full"
      select
      {...fields}
    >
      {items.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};
