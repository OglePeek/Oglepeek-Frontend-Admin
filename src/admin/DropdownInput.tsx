import { MenuItem, TextField, type TextFieldProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type DropdownItem = {
  value: string;
  label: string;
};

type Props = TextFieldProps & {
  label: string;
  items: DropdownItem[];
  name: string;
};

export const DropdownInput: React.FC<Props> = ({
  label,
  items,
  name,
  ...rest
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          label={label}
          variant="outlined"
          size="small"
          defaultValue=""
          className="w-full"
          select
          {...field}
          {...rest}
        >
          {items.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};
