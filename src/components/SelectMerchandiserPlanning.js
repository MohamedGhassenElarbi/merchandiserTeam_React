import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
export default function SelectMerchandiserPlanning({setMerchandiserId,merchandisers,merchandiserId,merchandiser}) {



const classes = useStyles();


const handleChange = (event) => {
    setMerchandiserId(event.target.value);
};
    return(
        <div>
            <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-helper-label">Merchandiseur</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          //value={merchandiser}
          onChange={handleChange}
        >
            {/* <MenuItem value="" >{merchandiser}</MenuItem> */}
               {merchandisers.map(val => {
                   return <MenuItem  key={val.id} value={val.id}>{val.name}</MenuItem >;
               })}
        </Select>
        <FormHelperText>Choisir le merchandiseur conçerné</FormHelperText>
         </FormControl>
        </div>
    );
}