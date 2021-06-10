import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Select from 'react-select';

const useStyles = makeStyles((theme) => ({
    selectCss:{
        marginTop:20
      },
}));

export default function CustomSelect({handleChange,optionsList,placeHolderValue,isMulti,initialValue,optionLabel='name'}) {
  const classes = useStyles();

  return (
    <div className={classes.selectCss}>
        <Select
          defaultValue={[]}
          name="select"
          isMulti={isMulti}
          options={optionsList}
          className="basic-single-select"
          classNamePrefix="select"
          placeholder={placeHolderValue}
          maxMenuHeight
          getOptionLabel={option => option[optionLabel]}
          getOptionValue={option => option['id']}
          onChange={handleChange}
          value={initialValue}
        />
    </div>
  );
}