import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useAppSelector } from "hooks/hooks";
import { ChangeEvent, useState , useEffect} from 'react';
import {
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "firebaseApp";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ProfileSettings() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const { id } =  useAppSelector(state => state.user);
  const imageRef = ref(storage, `profileImages/${id}`);

  async function uploadFile(){
      if (imageUpload == null) return;
      await uploadBytes(imageRef, imageUpload).then((snapshot) => {
          console.log("Uploaded")
        });
      window.location.reload();
  }

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        Profile setting
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Profile Setting
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
            <input
                type="file"
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    if (event.target.files) {
                        setImageUpload(event.target.files[0]);
                    }
                }}
            />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={uploadFile}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}