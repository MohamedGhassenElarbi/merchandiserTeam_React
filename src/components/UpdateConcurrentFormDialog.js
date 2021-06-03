import React,{useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "components/CustomButtons/Button.js";
import axios from 'axios';
import { Form, Formik } from 'formik';
import CustomTextField from 'components/CustomInput/CustomTextField';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

export default function UpdateConcurrentFormDialog({id,setConcurrents}) {
  const [open, setOpen] = React.useState(false);
  const [concurrent, setConcurrent] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
    axios.get(`http://localhost:8080/api/v1/competitor/${id}`)
        .then(res => {
            const concurrentData = res.data;
            setConcurrent(concurrentData);
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
        <DialogTitle id="form-dialog-title">Ajouter un nouveau Concurrent</DialogTitle>
        <DialogContent>
        <Formik
        enableReinitialize
       initialValues={concurrent}
       validate={values => {
         const errors = {};
         if (!values.name) {
           errors.name = 'Required';
         }
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
        axios.put(`http://localhost:8080/api/v1/competitor/${id}`,values )
        .then(response => {
          setSubmitting(false);
          axios.get(`http://localhost:8080/api/v1/competitor`)
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