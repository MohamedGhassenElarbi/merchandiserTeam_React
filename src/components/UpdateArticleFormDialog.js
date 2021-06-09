import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "components/CustomButtons/Button.js";
import api from 'api';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import { Form, Formik } from 'formik';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CustomTextField from 'components/CustomInput/CustomTextField';

export default function UpdateCategoryFormDialog({id,setArticles}) {
  const [open, setOpen] = React.useState(false);
  const [article, setArticle] = useState({});
  const [categories, setCategories] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
    api.get(`http://localhost:8080/api/v1/articles/${id}`)
        .then(res => {
            const articleData = res.data;
            setArticle(articleData);
        })
        api.get(`http://localhost:8080/api/v1/category`)
        .then(res => {
          const categoryData = res.data;
            setCategories(categoryData);
        })
  };

  const handleClose = () => {
    setOpen(false);
  };
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
          if (!values.category) {
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
         console.log(values);
         api.put(`http://localhost:8080/api/v1/articles/${id}`,{...values,category:{id:values.category}})
        .then(response => {
          setSubmitting(false);
          api.get(`http://localhost:8080/api/v1/articles`)
            .then(res => {
              const articleData = res.data;
              setArticles(articleData);
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
           <CustomTextField handleChange={handleChange} handleBlur={handleBlur} settedValue={values.designation} placeHolderValue={"designation"} name={"designation"}></CustomTextField>
           <br />
           {errors.designation && touched.designation && errors.designation}
           <CustomTextField handleChange={handleChange} handleBlur={handleBlur} settedValue={values.reference} placeHolderValue={"reference"} name={"reference"}></CustomTextField>
           <br />
           {errors.reference && touched.reference && errors.reference}
           <CustomTextField handleChange={handleChange} handleBlur={handleBlur} settedValue={values.type} placeHolderValue={"type"} name={"type"}></CustomTextField>
           <br />
           {errors.type && touched.type && errors.type}
           <InputLabel  shrink id="cat" >Catégorie:</InputLabel>
           <Select
             labelId="cat"
             name="category"
             fullWidth
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.category}
           >
               {categories.map(val => {
                   return <MenuItem  key={val.id} value={val.id}>{val.nom}</MenuItem >;
               })}
           </Select><br />
           {errors.category && touched.category && errors.category}
           <CustomTextField handleChange={handleChange} handleBlur={handleBlur} settedValue={values.codeProduit} placeHolderValue={"codeProduit"} name={"codeProduit"}></CustomTextField>
           <br />
           {errors.codeProduit && touched.codeProduit && errors.codeProduit}
           <CustomTextField handleChange={handleChange} handleBlur={handleBlur} settedValue={values.prix} placeHolderValue={"prix"} name={"prix"}></CustomTextField>
           <br />
           {errors.prix && touched.prix && errors.prix}
           <CustomTextField handleChange={handleChange} handleBlur={handleBlur} settedValue={values.poid} placeHolderValue={"poid"} name={"poid"}></CustomTextField>
           <br />
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