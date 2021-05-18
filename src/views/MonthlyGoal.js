import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import MonthlyGoalCard from "components/Card/MonthlyGoalCard";
import Grid from '@material-ui/core/Grid';



const styles = {
    root: {
        flexGrow: 1,
        margin:50,
    },

  };
  
  const useStyles = makeStyles(styles);

export default function MonthlyGoal() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
            <Grid container xs={12} spacing={8} >
                <MonthlyGoalCard></MonthlyGoalCard>
                <MonthlyGoalCard></MonthlyGoalCard>
                <MonthlyGoalCard></MonthlyGoalCard>
            </Grid>
        </div>
  );
}