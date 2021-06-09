import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "components/CustomButtons/Button.js";
import api from 'api';
import { Form, Formik } from 'formik';
import CustomTextField from 'components/CustomInput/CustomTextField';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

export default function UpdateClaimTypeFormDialog({setClaimTypes,id}) {
  const [open, setOpen] = React.useState(false);
  const [claimType, setClaimType] = useState({});
  const handleClickOpen = () => {
    setOpen(true);
    api.get(`http://localhost:8080/api/v1/claimtype/${id}`)
        .then(res => {
            const ClaimTypeData = res.data;
            setClaimType(ClaimTypeData);
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
        <DialogTitle id="form-dialog-title">Modifier Type de réclamation</DialogTitle>
        <DialogContent>
        <Formik
        enableReinitialize
       initialValues={claimType}
       validate={values => {
         const errors = {};
         if (!values.name) {
           errors.name = 'Required';
         }
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
        api.put(`http://localhost:8080/api/v1/claimtype/${id}`,values )
        .then(response => {
          setSubmitting(false);
          api.get(`http://localhost:8080/api/v1/claimtype`)
            .then(res => {
              const claimTypesData = res.data;
              setClaimTypes(claimTypesData); 
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
           <CustomTextField handleChange={handleChange} handleBlur={handleBlur} settedValue={values.name} placeHolderValue={"Type de reclamation"} name={"name"}></CustomTextField>
           <br />
           {errors.name && touched.name && errors.name}
           <DialogActions>
          <Button color="primary" type="submit" disabled={isSubmitting}>
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