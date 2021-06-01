import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "components/CustomButtons/Button.js";
import axios from 'axios';
import CustomSelect from 'components/Select/CustomSelect';

export default function DeletePlanningFormDialog() {
  const [open, setOpen] = React.useState(false);
  const [listMerchandisers, setListMerchandisers] = useState([]);
  const [selectedMerchandiser, setSelectedMerchandiser] = useState({});
  
  const handleClickOpen = () => {
    setOpen(true);
        axios.get(`http://localhost:8080/api/v1/user/role/MERCHANDISER`)
        .then(res => {
          setListMerchandisers(res.data);
        });  
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChangeMerchandiser = (selectedOption) => {
    setSelectedMerchandiser(selectedOption );
  };
  const handleDeleteOperation =()=>{
    console.log(selectedMerchandiser.id)
    axios.delete(`http://localhost:8080/api/v1/taskPlanning/${selectedMerchandiser.id}`)
        .then(res => {
        });
    setOpen(false);
  }
  return (
    <>
      <Button color="primary" round onClick={handleClickOpen}>Supprimer un Planning</Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Supprimer un Planning</DialogTitle>
        <DialogContent>
        <CustomSelect handleChange={handleChangeMerchandiser} optionsList={listMerchandisers} placeHolderValue={"Merchandiser"}></CustomSelect>
      <DialogActions>
          <Button color="primary" type="submit" onClick={handleDeleteOperation}>
            Supprimer
          </Button>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
        </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}