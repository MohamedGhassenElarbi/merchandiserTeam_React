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
     display:'flex',
    // display: 'flex',
    // justifyContent:'space-between',
    // marginLeft: 60,
    // marginRight: 60
  },
  prod:{
    display:'block', 
  }
}));

export default function RuptureEventAccordion({image,products}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{`Rupture`}</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <AccordionDetails>
          <div className={classes.cardsCss}>
          <BeforeAfterImageCard image={image}/>

          <div style={{display:'block'}}>
          {products.map(token =>
              <Typography key={token.id} className={classes.pos} color="textSecondary">
          {token.designation} </Typography>
          )}
          </div>
          
          </div>
        </AccordionDetails>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}