import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteDialog from '../DeleteDialog';
import CustomTableHeadCopy from './CustomTableHeadCopy'


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
//this function is just about sorting order it returns a function
function getComparator(order, orderBy) {
  if(order === 'desc'){
    return (a, b) => descendingComparator(a, b, orderBy)
  }else{
    return (a, b) => -descendingComparator(a, b, orderBy);
  }
}
//real comparison happens here with sort() which converts to string then compare
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function CustomTable({entityList,setEntityList,handleRemove,colomnNames,tableBody,returnUpdateComponent,message}) {
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState();

    const handleRequestSort = (event, property) => {
      console.log(property);
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      console.log(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
          <CustomTableHeadCopy colomnNames={colomnNames}order={order}orderBy={orderBy}onRequestSort={handleRequestSort}></CustomTableHeadCopy>
            <TableBody> 
              {stableSort(entityList, getComparator(order, orderBy))
                .map((row,index) => {
                  return ( 
                    <TableRow
                    key={row.id}
                    >      
                      {tableBody(row)}
                      <TableCell align="right">
                      {returnUpdateComponent(row.id,setEntityList)}
                      <DeleteDialog id={row.id} handleRemove={handleRemove} removedElementName={message}/>
                      </TableCell>
                      
                    </TableRow>                  
                  );
                })}
            </TableBody>
      </Table>
            
    </TableContainer>
  );
}