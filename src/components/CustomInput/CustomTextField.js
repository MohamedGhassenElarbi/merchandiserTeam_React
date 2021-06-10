import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function CustomTextField({handleChange,handleBlur,settedValue,placeHolderValue,name,type="text"}) {
  return (
    <TextField 
    variant="outlined"
    margin="normal"
    fullWidth
    margin="normal"
    label={placeHolderValue}
    type={type}
    name={name}
    onChange={handleChange}
    onBlur={handleBlur}
    value={settedValue}
    placeholder={placeHolderValue}
  />
  );
}