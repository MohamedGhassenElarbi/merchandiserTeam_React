import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import DetailIcon from '@material-ui/icons/Visibility';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function DeleteArticleDialog(props) {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton aria-label="delete" onClick={/*() => handleRemove(row.id)*/handleClickOpen}>
              <DetailIcon color="primary"/>
              </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="md"
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Are you sure you want to delete this category"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            this operation is irreversible,items are definetively deleted
          </DialogContentText>
        </DialogContent>



        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}