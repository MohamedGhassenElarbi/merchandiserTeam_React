import React, {useState,useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from "components/CustomButtons/Button.js";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import ButtonMaterial from '@material-ui/core/Button';
import { Form, Formik } from 'formik';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import Upload from 'components/Upload'


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function AddGMSFormDialog({setGMS}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>

      <Button color="primary" round onClick={handleClickOpen}>Ajouter un GMS</Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Ajouter un nouveau GMS</DialogTitle>
        <DialogContent>
        <Formik
       initialValues={{ name: '', image: '',estimatedTime:'',longitude:'',latitude:''}}
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
        axios.post(`http://localhost:8080/api/v1/gms`, values)
        .then(response => {
          console.log(response);
          setSubmitting(false);
          axios.get(`http://localhost:8080/api/v1/gms`)
            .then(res => {
              const gmsData = res.data;
              setGMS(gmsData);
              console.log(gmsData);
  
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
           {/* <TextField
             fullWidth
             margin="normal"
             type="text"
             name="image"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.image}
             placeholder="image"
           /><br />
           {errors.image && touched.image && errors.image} */}
           <Upload></Upload>
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
            Ajouter
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