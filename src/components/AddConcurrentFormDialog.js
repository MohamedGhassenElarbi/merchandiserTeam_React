import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "components/CustomButtons/Button.js";
import api from 'api';
import { Form, Formik } from 'formik';
import CustomTextField from 'components/CustomInput/CustomTextField';

export default function AddConcurrentFormDialog({setConcurrents}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button color="primary" round onClick={handleClickOpen}>Ajouter un Concurrent</Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Ajouter un nouveau Concurrent</DialogTitle>
        <DialogContent>
        <Formik
       initialValues={{ name: '' }}
       validate={values => {
         const errors = {};
         if (!values.name) {
           errors.name = 'Required';
         }
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
        api.post(`http://localhost:8080/api/v1/competitor`,values )
        .then(response => {
          setSubmitting(false);
          api.get(`http://localhost:8080/api/v1/competitor`)
            .then(res => {
              const concurrentData = res.data;
              setConcurrents(concurrentData); 
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
           <CustomTextField handleChange={handleChange} handleBlur={handleBlur} settedValue={values.name} placeHolderValue={"Nom du concurrent"} name={"name"}></CustomTextField>
           <br />
           {errors.name && touched.name && errors.name}
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