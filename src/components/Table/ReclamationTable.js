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

export default function ReclamationTable({reclamations,setReclamations}) {
  const classes = useStyles();
  // const [categories, setCategories] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/reclamation`)
            .then(res => {
                const reclamationData = res.data;
                setReclamations(reclamationData);
                //console.log(categoryData);

            })
    }, [])


  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">Nom</TableCell>
            <TableCell align="right">GMS</TableCell>
            <TableCell align="right">Merchandiser</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {reclamations.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.gms}</TableCell>
              <TableCell align="right">{row.merchandiser}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
            
    </TableContainer>
  );
}