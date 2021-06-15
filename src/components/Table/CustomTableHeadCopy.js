import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';



export default function CustomTableHeadCopy ({colomnNames,order, orderBy, onRequestSort }){
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
      };
    return(
        <TableHead>
          <TableRow>
            {/* <TableCell>{colomnNames[0]}</TableCell> */}
            {colomnNames.map((title)=>(
               <TableCell
                key={title.id}
                align={title.disablePadding ? '' :'right' }
                padding={'default'}
                sortDirection={orderBy === title.id ? order : false}
               >
                <TableSortLabel
                  active={orderBy === title.id}
                  direction={orderBy === title.id ? order : 'asc'}
                  onClick={createSortHandler(title.id)}
                >
                  {title.label}
                </TableSortLabel>
                </TableCell>
            ))} 
          </TableRow>
        </TableHead>
    );
}