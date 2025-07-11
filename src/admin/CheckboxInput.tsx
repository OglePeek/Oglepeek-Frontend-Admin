import { Checkbox, FormControlLabel } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  name: string;
  label: string;
};

export const CheckboxInput: React.FC<Props> = ({ name, label }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={false}
      render={({ field }) => (
        <FormControlLabel
          control={
            <Checkbox
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          }
          label={label}
        />
      )}
    />
  );
};
