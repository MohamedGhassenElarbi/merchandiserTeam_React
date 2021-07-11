import React, { useEffect, useState } from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import api from 'api';
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import AddCategoryFormDialog from 'components/AddCategoryFormDialog';
import SearchInput from 'components/CustomInput/SearchInput'
import CustomTable from 'components/Table/CustomTable';
import TableCell from '@material-ui/core/TableCell';
import UpdateCategoryFormDialog from 'components/UpdateCategoryFormDialog';

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
  const [searchedCategory, setSearchedCategory] = useState()
  const [possibleMatches, setPossibleMatches] = useState([])

  useEffect(() => {
    api.get(`http://localhost:8080/api/v1/category`)
          .then(res => {
              const categoryData = res.data;
              setCategories(categoryData);
              //console.log(categoryData);

          })
  }, [])


  const handleRemove=(id) =>{
    api.delete(`http://localhost:8080/api/v1/category/${id}`)
    .then(res => {
      const newCategories = categories.filter(category => id !== category.id)
      setCategories(newCategories)
  })
    .catch(err => {
      console.log(err);
    });
  }
  const colomnNames=[{id:"id",label:"Id",disablePadding: true},{id:"nom",label:"Nom", disablePadding: false},{id:"op",label:"Opérations", disablePadding: false}];

  const tableBody= (row)=>{
    return(<>
    <TableCell component="th" scope="row" >{row.id}</TableCell>
    <TableCell align="right">{row.nom}</TableCell>
    </>);
  }

  const returnUpdateComponent=(id,setCategories)=>{
    return (<UpdateCategoryFormDialog id={id} setCategories={setCategories}/>);
  }
  return (
    
      <GridItem xs={12} sm={12} md={12}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <AddCategoryFormDialog setCategories={setCategories}/>
        {/* <SearchInput listEntity={categories} setPossibleMatches={setPossibleMatches}setSearchedCategory={setSearchedCategory}searchedCategory={searchedCategory}setCategories={setCategories}></SearchInput> */}
        </div>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Liste des Catégories</h4>
            <p className={classes.cardCategoryWhite}>
            Catégories:
            </p>
          </CardHeader>
          <CardBody>
            
            <CustomTable entityList={categories} setEntityList={setCategories} handleRemove={handleRemove} colomnNames={colomnNames} tableBody={tableBody} returnUpdateComponent={returnUpdateComponent} message={"cette catégorie"}/>
            
          </CardBody>
        </Card>
      </GridItem>
    
  );
}
