import React, { useEffect, useState } from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import AddArticleFormDialog from 'components/AddArticleFormDialog'
import api from 'api';
import CustomTable from 'components/Table/CustomTable';
import TableCell from '@material-ui/core/TableCell';
import UpdateArticleFormDialog from 'components/UpdateUserFormDialog'

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

export default function ArticleTableList() {
  const classes = useStyles();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    api.get(`http://localhost:8080/api/v1/articles`)
          .then(res => {
              const articleData = res.data;
              setArticles(articleData);
              //console.log(articleData);

          })
  }, [])

  const handleRemove=(id) =>{
    api.delete(`http://localhost:8080/api/v1/articles/${id}`)
    .then(res => {
      const newArticles = articles.filter(article => id !== article.id)
      setArticles(newArticles)
  })
    .catch(err => {
      console.log(err);
    });
  }
  
  const colomnNames=[{id:"designation",label:"Désignation",disablePadding: true},{id:"type",label:"Type", disablePadding: false},{id:"prix",label:"Prix", disablePadding: false},{id:"codeProduit",label:"Code produit", disablePadding: false},{id:"nom",label:"Catégorie", disablePadding: false},{id:"reference",label:"Référence", disablePadding: false},{id:"op",label:"Opérations", disablePadding: false}];
  const tableBody= (row)=>{
    return(<>
    <TableCell component="th" scope="row">{row.designation}</TableCell>
    <TableCell align="right">{row.type}</TableCell>
    <TableCell align="right">{row.prix}</TableCell>
    <TableCell align="right">{row.codeProduit}</TableCell>
    <TableCell align="right">{row.category?.nom}</TableCell>
    <TableCell align="right">{row.reference}</TableCell>
    </>);
  }

  const returnUpdateComponent=(id,setArticles)=>{
    return (<UpdateArticleFormDialog id={id} setArticles={setArticles}/>);
  }
  return (
    
      <GridItem xs={12} sm={12} md={12}>
        <AddArticleFormDialog setArticles={setArticles}/>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Liste des Articles</h4>
            <p className={classes.cardCategoryWhite}>
              Articles:
            </p>
          </CardHeader>
          <CardBody>
            <CustomTable entityList={articles} setEntityList={setArticles} handleRemove={handleRemove} colomnNames={colomnNames} tableBody={tableBody} returnUpdateComponent={returnUpdateComponent} message={"cette article"}/>
            
          </CardBody>
        </Card>
      </GridItem>
    
  );
}
