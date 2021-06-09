import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BeforeAfterImageCard from 'components/Card/BeforeAfterImageCard';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  cardsCss:{
    marginLeft:'30%'
  },
}));

export default function PriceChangeEventAccordion({oldPrice,newPrice,product}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{`Changement du prix :  ${product}`}</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Typography className={classes.heading}>{`ancien prix :  ${oldPrice}`}</Typography>
        <br />
        <Typography className={classes.heading}>{`Nouveau prix :  ${newPrice}`}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}