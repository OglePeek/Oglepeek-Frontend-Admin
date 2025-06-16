import { TextField, type TextFieldProps } from "@mui/material";

type Props = TextFieldProps & {
  label: string;
};

export const TextInput: React.FC<Props> = ({ label, ...fields }) => {
  return (
    <div>
      <TextField
        label={label}
        id="outlined-size-small"
        variant="outlined"
        size="small"
        {...fields}
      />
    </div>
  );
};
