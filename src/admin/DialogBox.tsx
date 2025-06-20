import * as React from "react";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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
        <DialogTitle sx={{ m: 0, p: 2 }}>
          {title}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>{fieldform}</DialogContent>
      </Dialog>
    </React.Fragment>
  );
};
