import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import DeleteCategoryDialog from '../DeleteCategoryDialog';
import UpdateCategoryFormDialog from '../UpdateCategoryFormDialog';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function CategoryTable({categories,setCategories}) {
  const classes = useStyles();
  // const [categories, setCategories] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/category`)
            .then(res => {
                const categoryData = res.data;
                setCategories(categoryData);
                //console.log(categoryData);

            })
    }, [])


    const handleRemove=(id) =>{
      axios.delete(`http://localhost:8080/api/v1/category/${id}`)
      .then(res => {
        const newCategories = categories.filter(category => id !== category.id)
        setCategories(newCategories)
    })
      .catch(err => {
        console.log(err);
      });
    }

    const handleUpdate=(id,nomCat)=>{
     
    axios.put(`http://localhost:8080/api/v1/category/${id}`, {nom:nomCat})
      .then(response => {
        console.log(response);
        axios.get(`http://localhost:8080/api/v1/category`)
          .then(res => {
            const categoryData = res.data;
            setCategories(categoryData);
          })
      });
    }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">Nom</TableCell>
            <TableCell align="right">Opérations</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.nom}</TableCell>
              
              <TableCell align="right">
              <UpdateCategoryFormDialog id={row.id} handleUpdate={handleUpdate}/>
              <DeleteCategoryDialog id={row.id} handleRemove={handleRemove}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
            
    </TableContainer>
  );
}