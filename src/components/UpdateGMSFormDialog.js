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

export default function UpdateGMSFormDialog({id,setGMS}) {
  const [open, setOpen] = React.useState(false);
  const [singleGMS, setSingleGMS] = useState({});
  const [categories, setCategories] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
    axios.get(`http://localhost:8080/api/v1/gms/${id}`)
        .then(res => {
            const gmsData = res.data;
            setSingleGMS(gmsData);
            

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
        <DialogTitle id="form-dialog-title">Modifier un GMS</DialogTitle>
        <DialogContent>
        <Formik
        enableReinitialize
       initialValues={singleGMS}
       validate={values => {
         const errors = {};
         if (!values.name) {
           errors.name = 'Required';
         }
         if (!values.image) {
            errors.image = 'Required';
          }
          if (!values.estimatedTime) {
            errors.estimatedTime = 'Required';
          }
          if (!values.longitude) {
            errors.longitude = 'Required';
          }
          if (!values.latitude) {
            errors.latitude = 'Required';
          }
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
        axios.put(`http://localhost:8080/api/v1/gms/${id}`,values)
        .then(response => {
          console.log(response);
          setSubmitting(false);
          axios.get(`http://localhost:8080/api/v1/gms`)
            .then(res => {
              const gmsData = res.data;
              setGMS(gmsData);
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
           <TextField
             fullWidth
             margin="normal"
             type="text"
             name="image"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.image}
             placeholder="image"
           /><br />
           {errors.image && touched.image && errors.image}
           <TextField
             fullWidth
             margin="normal"
             type="text"
             name="estimatedTime"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.estimatedTime}
             placeholder="Temps Estimée"
           /><br />
           {errors.estimatedTime && touched.estimatedTime && errors.estimatedTime}
           <TextField
             fullWidth
             margin="normal"
             type="text"
             name="longitude"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.longitude}
             placeholder="longitude"
           /><br />
           {errors.longitude && touched.longitude && errors.longitude}
           <TextField
             fullWidth
             margin="normal"
             type="text"
             name="latitude"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.latitude}
             placeholder="latitude"
           /><br />
           {errors.latitude && touched.latitude && errors.latitude}
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