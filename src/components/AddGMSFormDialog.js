import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "components/CustomButtons/Button.js";
import api from 'api';
import { Field, Form, Formik } from 'formik';
import CustomTextField from 'components/CustomInput/CustomTextField';

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
        api.post(`http://localhost:8080/api/v1/gms`, values)
        .then(response => {
          setSubmitting(false);
          api.get(`http://localhost:8080/api/v1/gms`)
            .then(res => {
              const gmsData = res.data;
              setGMS(gmsData);
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
           <CustomTextField handleChange={handleChange} handleBlur={handleBlur} settedValue={values.name} placeHolderValue={"designation"} name={"name"}></CustomTextField>
           <br />
           {errors.name && touched.name && errors.name}
           <Field type="file" name="image"
           onChange={handleChange}
           onBlur={handleBlur}
           value={values.image}/>
           {errors.image && touched.image && errors.image}
           <CustomTextField handleChange={handleChange} handleBlur={handleBlur} settedValue={values.estimatedTime} placeHolderValue={"Temps Estimée"} name={"estimatedTime"}></CustomTextField>
           <br />
           {errors.estimatedTime && touched.estimatedTime && errors.estimatedTime}
           <CustomTextField handleChange={handleChange} handleBlur={handleBlur} settedValue={values.longitude} placeHolderValue={"longitude"} name={"longitude"}></CustomTextField>
           <br />
           {errors.longitude && touched.longitude && errors.longitude}
           <CustomTextField handleChange={handleChange} handleBlur={handleBlur} settedValue={values.latitude} placeHolderValue={"latitude"} name={"latitude"}></CustomTextField>
           <br />
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