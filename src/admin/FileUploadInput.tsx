import React from "react";
import { Button, TextField, Box } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";

const FileUploadInput = () => {
  const { setValue, control } = useFormContext();
  const selectedImages = useWatch({ control, name: "images" });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setValue("images", files, { shouldValidate: true });
    }
  };

  return (
    <Box>
      {/* Hidden file input */}
      <input
        accept="image/*"
        multiple
        type="file"
        id="upload-button"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* Button to trigger file input */}
      <label htmlFor="upload-button">
        <Button variant="contained" component="span">
          Upload Images
        </Button>
      </label>

      {/* TextField to show file names */}
      <Box mt={2}>
        <TextField
          label="Selected Image Names"
          value={selectedImages?.map((f) => f.name).join(", ") || ""}
          fullWidth
          multiline
          rows={3}
          InputProps={{ readOnly: true }}
        />
      </Box>
    </Box>
  );
};

export default FileUploadInput;
