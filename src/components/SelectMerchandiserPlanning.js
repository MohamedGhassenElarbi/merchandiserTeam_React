import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import CustomSelect from 'components/Select/CustomSelect';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    }
  }));
export default function SelectMerchandiserPlanning({setMerchandiser,merchandisers,merchandiser}) {
const classes = useStyles();
const handleChange = (event) => {
  setMerchandiser(event);
};
    return(
        <div>
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-helper-label">Merchandiseur</InputLabel>
        <div style={{width:'300px'}}><CustomSelect handleChange={handleChange} optionsList={merchandisers} placeHolderValue={"Merchandiser"}initialValue={merchandiser}></CustomSelect></div>
        <FormHelperText>Choisir le merchandiseur conçerné</FormHelperText>
        </FormControl>
        </div>
    );
}