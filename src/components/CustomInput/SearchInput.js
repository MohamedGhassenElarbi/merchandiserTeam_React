import CustomInput from "components/CustomInput/CustomInput.js";
import React from "react";
import Button from "components/CustomButtons/Button.js";
import Search from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);
export default function SearchInput(){
    const classes = useStyles();
    return(
        <div className={classes.searchWrapper}>
        <CustomInput
          formControlProps={{
            className: classes.margin + " " + classes.search
          }}
          inputProps={{
            placeholder: "Search",
            inputProps: {
              "aria-label": "Search"
            }
          }}
        />
        <Button color="white" aria-label="edit" justIcon round>
          <Search />
        </Button>
      </div>
    );
}