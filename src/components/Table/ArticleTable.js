import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import DetailIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';
import DeleteArticleDialog from '../DeleteArticleDialog'
import UpdateArticleFormDialog from '../UpdateArticleFormDialog'


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ArticleTable({articles,setArticles}) {
  const classes = useStyles();
    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/articles`)
            .then(res => {
                const articleData = res.data;
                setArticles(articleData);
                //console.log(articleData);

            })
    }, [])


    const handleRemove=(id) =>{
      axios.delete(`http://localhost:8080/api/v1/articles/${id}`)
      .then(res => {
        const newArticles = articles.filter(article => id !== article.id)
        setArticles(newArticles)
    })
      .catch(err => {
        console.log(err);
      });
    }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Désignation</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Prix</TableCell>
            <TableCell align="right">Code produit</TableCell>
            <TableCell align="right">Catégorie</TableCell>
            <TableCell align="right">Références</TableCell>
            <TableCell align="right">Opérations</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {articles.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.designation}
              </TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{row.prix}</TableCell>
              <TableCell align="right">{row.codeProduit}</TableCell>
              <TableCell align="right">{row.categorie}</TableCell>
              <TableCell align="right">{row.reference}</TableCell>
              
              
              
              
              <TableCell align="right">
              {/* <IconButton aria-label="delete">
              <DetailIcon color="primary"/>
              </IconButton> */}
              <IconButton aria-label="delete">
              <UpdateArticleFormDialog id={row.id} setArticles={setArticles}/>
              </IconButton>
              <DeleteArticleDialog id={row.id} handleRemove={handleRemove}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
            
    </TableContainer>
  );
}