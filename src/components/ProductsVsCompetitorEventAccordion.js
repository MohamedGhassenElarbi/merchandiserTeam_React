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
    width:'100%',
    display: 'flex',
    justifyContent:'space-between',
    marginLeft: 60,
    marginRight: 60
  },
}));

export default function ProductsVsCompetitorEventAccordion({imageProduct,imageCompetitor,product,competitor}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{`Produit vs Concurrent :  ${product}  concurrent: ${competitor}`}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.cardsCss}>
          <BeforeAfterImageCard message={product}image={imageProduct}/>
          <BeforeAfterImageCard message={competitor}image={imageCompetitor}/>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}