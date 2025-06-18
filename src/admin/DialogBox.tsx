import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

type Props = {
  title: string;
  fieldform: React.ReactNode;
  openform: boolean;
  closeform: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DialogBox = ({ title, fieldform, openform, closeform }: Props) => {
  const handleClose = () => {
    closeform(false);
  };

  return (
    <React.Fragment>
      <Dialog open={openform} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{fieldform}</DialogContent>
        <DialogActions>
          <Button type="submit">Add</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
