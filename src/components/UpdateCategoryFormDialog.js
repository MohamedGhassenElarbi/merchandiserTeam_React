import React, {useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from "components/CustomButtons/Button.js";
import TextField from '@material-ui/core/TextField';
import api from 'api';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function UpdateCategoryFormDialog({ id,handleUpdate }) {
  const [open, setOpen] = React.useState(false);

 const [nomCat, setNomCat] = useState();
  const [messageError, setMessageError] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
    api.get(`http://localhost:8080/api/v1/category/${id}`)
        .then(res => {
            const categoryData = res.data;
            setNomCat(categoryData.nom);
        })
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateConfirmation= ()=>{
    if (nomCat == "") {
      setMessageError(true);
      return
    }
    handleUpdate(id,nomCat);
    setNomCat('');
    setOpen(false);
    setMessageError(false);
  }
  const handleChange = (event) => {
    setNomCat(event.target.value);
  };

  return (
    <>
        <IconButton aria-label="delete" onClick={handleClickOpen}>
            <EditIcon color="default" />
        </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Modifier une Catégorie</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nom du Catégorie"
            type="text"
            onChange={handleChange}
            value={nomCat}
            fullWidth
          />
          {(messageError) &&
            <Typography variant="caption" color='error' display="block" gutterBottom>
              veiller remplir tous les champs
          </Typography>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateConfirmation} color="primary">
            Modifier
          </Button>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}