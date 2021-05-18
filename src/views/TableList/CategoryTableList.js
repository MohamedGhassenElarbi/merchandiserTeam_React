import React, { useEffect, useState } from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CategoryTable from 'components/Table/CategoryTable';
import AddCategoryFormDialog from 'components/AddCategoryFormDialog';

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

export default function CategoryTableList() {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);
  
  return (
    
      <GridItem xs={12} sm={12} md={12}>
        <AddCategoryFormDialog categories={categories} setCategories={setCategories}/>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Liste des Catégories</h4>
            <p className={classes.cardCategoryWhite}>
            Catégories:
            </p>
          </CardHeader>
          <CardBody>
            
            <CategoryTable categories={categories} setCategories={setCategories} />
            
            
          </CardBody>
        </Card>
      </GridItem>
    
  );
}
