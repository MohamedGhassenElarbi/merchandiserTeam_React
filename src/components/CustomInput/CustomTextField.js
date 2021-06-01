import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function CustomTextField({handleChange,handleBlur,settedValue,placeHolderValue,name}) {
  return (
    <TextField 
    fullWidth
    margin="normal"
    type="text"
    name={name}
    onChange={handleChange}
    onBlur={handleBlur}
    value={settedValue}
    placeholder={placeHolderValue}
  />
  );
}