import CustomInput from "components/CustomInput/CustomInput.js";
import React from "react";
import Button from "components/CustomButtons/Button.js";
import Search from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(styles);
export default function SearchInput({listEntity,setPossibleMatches,setSearchedCategory,searchedCategory,setCategories}){
    const classes = useStyles();
    const onChangehandler=(value)=>{
      let matches=[]
      if(value!=""){
          matches=listEntity.filter((el)=>{
              const regex=new RegExp(`${value}`,"gi");
              return el.nom.match(regex)
          })
      }
      setPossibleMatches(matches);
      console.log(matches);
      setSearchedCategory(value);
      //setCategories(matches)
  }
  const handleEndSearch =()=>{
    setCategories(listEntity);
    setSearchedCategory('');
  }
    return(
        <div className={classes.searchWrapper}>
        {/* <CustomInput
          formControlProps={{
            className: classes.margin + " " + classes.search
          }}
          onChange={(e)=>onChangehandler(e.target.value)}
          value={searchedCategory}
          inputProps={{
            placeholder: "Search",
            inputProps: {
              "aria-label": "Search"
            }
          }}
        /> */}
        <TextField onChange={(e)=>onChangehandler(e.target.value)} id="outlined-basic" label="Search" variant="outlined" value={searchedCategory} 
      InputProps={{
        endAdornment: (
          <InputAdornment>
            <IconButton>
              {searchedCategory&&<CloseIcon onClick={handleEndSearch}/>}
            </IconButton>
          </InputAdornment>
        )
      }}
      ></TextField>
        <Button color="white" aria-label="edit" justIcon round>
          <Search />
        </Button>
      </div>
    );
}