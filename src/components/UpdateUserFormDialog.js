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

export default function UpdateUserFormDialog({id,setUsers}) {
  const [open, setOpen] = React.useState(false);
  const [singleUser, setSingleUser] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
    axios.get(`http://localhost:8080/api/v1/user/${id}`)
        .then(res => {
            const singleUserData = res.data;
            setSingleUser(singleUserData);
            

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
        <DialogTitle id="form-dialog-title">Modifier un utilisateur</DialogTitle>
        <DialogContent>
        <Formik
        enableReinitialize
       initialValues={singleUser}
       validate={values => {
         const errors = {};
         if (!values.name) {
           errors.name = 'Required';
         }
         if (!values.email) {
            errors.email = 'Required';
          }
          if (!values.phone) {
            errors.phone = 'Required';
          }
          if (!values.role) {
            errors.role = 'Required';
          }
          if (!values.dob) {
            errors.dob = 'Required';
          }
          if (!values.username) {
            errors.username = 'Required';
          }
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
        axios.put(`http://localhost:8080/api/v1/user/${id}`,values)
        .then(response => {
          console.log(response);
          setSubmitting(false);
          axios.get(`http://localhost:8080/api/v1/user`)
            .then(res => {
              const usersData = res.data;
              setUsers(usersData);
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
             placeholder="Nom"
           /><br />
           {errors.name && touched.name && errors.name}
           <TextField
             fullWidth
             margin="normal"
             type="email"
             name="email"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.email}
             placeholder="email"
           /><br />
           {errors.email && touched.email && errors.email}
           <TextField
             fullWidth
             margin="normal"
             type="text"
             name="phone"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.phone}
             placeholder="Numero de Telephone"
           /><br />
           {errors.phone && touched.phone && errors.phone}
           <InputLabel  shrink id="cat" >Role:</InputLabel>
           <Select
             labelId="cat"
             name="role"
             fullWidth
             onChange={handleChange}
             onBlur={handleBlur}
            //  value={values.categorie}
           >
             <MenuItem  key={values.id} value={values.role}>{values.role}</MenuItem >
             <MenuItem  key={values.id} value="MERCHANDISER">Merchandiseur</MenuItem >
             <MenuItem  key={values.id} value="ADMIN">Admin</MenuItem >
             <MenuItem  key={values.id} value="SUPERVISOR">Superviseur</MenuItem >
           </Select><br />
           {errors.role && touched.role && errors.role}
           <TextField
             fullWidth
             margin="normal"
             type="text"
             name="dob"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.dob}
             placeholder="Date de Naissance"
           /><br />
           {errors.dob && touched.dob && errors.dob}
           <TextField
             fullWidth
             margin="normal"
             type="text"
             name="username"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.username}
             placeholder="Nom de l'utilisateur"
           /><br />
           {errors.username && touched.username && errors.username}
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