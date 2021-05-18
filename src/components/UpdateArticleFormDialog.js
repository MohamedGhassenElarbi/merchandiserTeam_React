import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from "components/CustomButtons/Button.js";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import { Form, Formik } from 'formik';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function UpdateCategoryFormDialog({id,setArticles}) {
  const [open, setOpen] = React.useState(false);
  const [article, setArticle] = useState({});
  const [categories, setCategories] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
    axios.get(`http://localhost:8080/api/v1/articles/${id}`)
        .then(res => {
            const articleData = res.data;
            setArticle(articleData);
            

        })
        axios.get(`http://localhost:8080/api/v1/category`)
        .then(res => {
          const categoryData = res.data;
            setCategories(categoryData);
            console.log(res.data);

        })
  };

  const handleClose = () => {
    setOpen(false);
  };

//   const handleUpdate = () => {

//     if (nomCat == "") {
//       setMessageError(true);
//       return
//     }
//     axios.put(`http://localhost:8080/categories/${id}`, {nom:nomCat})
//       .then(response => {
//         console.log(response);
//         axios.get(`http://localhost:8080/categories`)
//           .then(res => {
//             const categoryData = res.data;
//             setCategories(categoryData);
//             console.log(categoryData);

//           })
//       });
//       setNomCat('');
//     setOpen(false);
//     setMessageError(false);
  //};
//   const handleChange = (event) => {
//     setNomCat(event.target.value);
//   };

  return (
    <>
        <IconButton aria-label="delete" onClick={handleClickOpen}>
            <EditIcon color="default" />
        </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Modifier un Article</DialogTitle>
        <DialogContent>
        <Formik
        enableReinitialize
       initialValues={article}
       validate={values => {
         const errors = {};
         if (!values.designation) {
           errors.designation = 'Required';
         }
         if (!values.reference) {
            errors.reference = 'Required';
          }
          if (!values.type) {
            errors.type = 'Required';
          }
          if (!values.categorie) {
            errors.categorie = 'Required';
          }
          if (!values.codeProduit) {
            errors.codeProduit = 'Required';
          }
          if (!values.prix) {
            errors.prix = 'Required';
          }
          if (!values.poid) {
            errors.poid = 'Required';
          }
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
        axios.put(`http://localhost:8080/api/v1/articles/${id}`,values)
        .then(response => {
          console.log(response);
          setSubmitting(false);
          axios.get(`http://localhost:8080/api/v1/articles`)
            .then(res => {
              const articleData = res.data;
              setArticles(articleData);
              //console.log(articleData);
  
            })
        });
      setOpen(false);
       }}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
       }) => (
         <Form >
           <TextField 
             fullWidth
             margin="normal"
             type="text"
             name="designation"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.designation}
             placeholder="designation"
           /><br />
           {errors.designation && touched.designation && errors.designation}
           <TextField
             fullWidth
             margin="normal"
             type="text"
             name="reference"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.reference}
             placeholder="reference"
           /><br />
           {errors.reference && touched.reference && errors.reference}
           <TextField
             fullWidth
             margin="normal"
             type="text"
             name="type"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.type}
             placeholder="type"
             style={{ marginBottom: 30 }}
           /><br />
           {errors.type && touched.type && errors.type}
           <InputLabel  shrink id="cat" >Catégorie:</InputLabel>
           <Select
             labelId="cat"
             name="categorie"
             fullWidth
             onChange={handleChange}
             onBlur={handleBlur}
            //  value={values.categorie}
           >
             <MenuItem  key={values.id} value={values.categorie}>{values.categorie}</MenuItem >
               {categories.map(val => {
                   return <MenuItem  key={val.id} value={val.nom}>{val.nom}</MenuItem >;
               })}
           </Select><br />
           {errors.categorie && touched.categorie && errors.categorie}
           <TextField
             fullWidth
             margin="normal"
             type="text"
             name="codeProduit"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.codeProduit}
             placeholder="codeProduit"
           /><br />
           {errors.codeProduit && touched.codeProduit && errors.codeProduit}
           <TextField
             fullWidth
             margin="normal"
             type="text"
             name="prix"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.prix}
             placeholder="prix"
           /><br />
           {errors.prix && touched.prix && errors.prix}
           <TextField
             fullWidth
             margin="normal"
             type="text"
             name="poid"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.poid}
             placeholder="poid"
           /><br />
           {errors.poid && touched.poid && errors.poid}
           <DialogActions>
          <Button onClick={handleClose} color="primary" type="submit" disabled={isSubmitting}>
            Mettre a jour
          </Button>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
        </DialogActions>
         </Form>
       )}
     </Formik>

        </DialogContent>
        
      </Dialog>
    </>
  );
}