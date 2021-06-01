import React from 'react';
import {
    KeyboardDatePicker,
} from '@material-ui/pickers';
export default function DatePicker({handleChange,settedValue,label,id}) {

  return (
    <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="dd/MM/yyyy"
        margin="normal"
        id={id}
        label={label}
        value={settedValue}
        onChange={handleChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
    />
  );
}