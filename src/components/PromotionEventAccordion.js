import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GridList from 'components/Grid/GridList';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  cardsCss:{
     display:'Block',
    // display: 'flex',
    // justifyContent:'space-between',
    // marginLeft: 60,
    // marginRight: 60
  },
}));

export default function PromotionEventAccordion({listOfPictures,product,startDate,endDate,oldPrice,newPrice}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{`Promotion : ${product}`}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.cardsCss}>
        <Typography className={classes.pos} color="textSecondary">
        <strong>Date Début : </strong>{startDate}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        <strong>Date Fin : </strong>{endDate}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        <strong>Ancien Prix : </strong>{oldPrice}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        <strong>Nouveau Prix : </strong>{newPrice}
        </Typography>
        <br/>
          <div className={classes.cardsCss}>
            <GridList listOfPictures={listOfPictures}></GridList>
          </div>
        </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}