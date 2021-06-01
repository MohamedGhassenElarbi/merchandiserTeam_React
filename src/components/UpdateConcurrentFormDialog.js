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

export default function UpdateGMSFormDialog({id,setConcurrents}) {
  const [open, setOpen] = React.useState(false);
  const [concurrent, setConcurrent] = useState({});
  const [categories, setCategories] = useState([]);
  const [listGMS, setListGMS] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
    axios.get(`http://localhost:8080/api/v1/competitor/${id}`)
        .then(res => {
            const concurrentData = res.data;
            setConcurrent(concurrentData);
        })

        axios.get(`http://localhost:8080/api/v1/category`)
        .then(res => {
            
            setCategories(res.data);
            //console.log(res.data);

        });

        axios.get(`http://localhost:8080/api/v1/gms`)
        .then(res => {
            
            setListGMS(res.data);
            //console.log(res.data);

        });
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
        <DialogTitle id="form-dialog-title">Modifier un Concurrent</DialogTitle>
        <DialogContent>
        <Formik
        enableReinitialize
       initialValues={concurrent}
       validate={values => {
         const errors = {};
         if (!values.name) {
           errors.name = 'Required';
         }
         if (!values.category) {
            errors.category = 'Required';
          }
          if (!values.gms) {
            errors.gms = 'Required';
          }
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
        axios.put(`http://localhost:8080/api/v1/competitor/${id}`,{...values,categories:[{id:values.category}],gms:[{id:values.gms}]})
        .then(response => {
          console.log(response);
          setSubmitting(false);
          axios.get(`http://localhost:8080/api/v1/competitor`)
            .then(res => {
              const concurrentsData = res.data;
              setConcurrents(concurrentsData);
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
             name="name"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.name}
             placeholder="designation"
           /><br />
           {errors.name && touched.name && errors.name}
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
           <InputLabel  shrink id="gms" >GMS:</InputLabel>
           <Select
             labelId="gms"
             name="gms"
             fullWidth
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.gms}
           >
             
               {listGMS.map(val => {
                   return <MenuItem  key={val.id} value={val.id}>{val.name}</MenuItem >;
               })}
           </Select><br />
           {errors.gms && touched.gms && errors.gms}
           <DialogActions>
          <Button color="primary" type="submit" disabled={isSubmitting}>
            Modifier
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