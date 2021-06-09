import React, {useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "components/CustomButtons/Button.js";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import api from 'api';

export default function AddCategoryFormDialog({ setCategories }) {
  const [open, setOpen] = React.useState(false);
  const [nomCat, setNomCat] = useState();
  const [messageError, setMessageError] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {

    if (nomCat == undefined) {
      setMessageError(true);
      return
    }
    const categorie = { nom: nomCat };
    console.log(nomCat);
    api.post(`http://localhost:8080/api/v1/category`, categorie)
      .then(response => {
        api.get(`http://localhost:8080/api/v1/category`)
          .then(res => {
            const categoryData = res.data;
            setCategories(categoryData);
          })
      });
    setOpen(false);
    setNomCat(undefined);
    setMessageError(false);
  };
  const handleChange = (event) => {
    setNomCat(event.target.value);
  }

  return (
    <>

      <Button color="primary" round onClick={handleClickOpen}>Ajouter une Catégorie</Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Ajouter une Nouvelle Catégorie</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nom du Catégorie"
            type="text"
            onChange={handleChange}
            fullWidth
          />
          {(messageError) &&
            <Typography variant="caption" color='error' display="block" gutterBottom>
              veiller remplir tous les champs
          </Typography>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAdd} color="primary">
            Ajouter
          </Button>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}