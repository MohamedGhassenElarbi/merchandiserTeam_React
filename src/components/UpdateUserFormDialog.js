import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from "components/CustomButtons/Button.js";
import TextField from '@material-ui/core/TextField';
import api from 'api';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import { Form, Formik } from 'formik';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CustomTextField from 'components/CustomInput/CustomTextField';
import {format,parse} from 'date-fns';
import CustomSelect from 'components/Select/CustomSelect';
import DatePicker from 'components/DatePicker/DatePicker'
import {
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function UpdateUserFormDialog({id,setUsers}) {
  const [open, setOpen] = React.useState(false);
  const [singleUser, setSingleUser] = useState({});
  const [role, setRole] = useState();
  const [dateOfBirth, setDateOfBirth] = useState();
  const listOfRoles = [
    { id: 'MERCHANDISER', name: 'MERCHANDISER' },
    { id: 'ADMIN', name: 'ADMIN' },
    { id: 'SUPERVISOR', name: 'SUPERVISOR' }
  ]
  const handleChangeRole=(e)=>{
    setRole(e)
    console.log(e);
  }
  const handleChangeDate =(e)=>{
    setDateOfBirth(e)
  }
  const handleClickOpen = () => {
    setOpen(true);
    api.get(`http://localhost:8080/api/v1/user/${id}`)
        .then(res => {
            const singleUserData = res.data;
            setSingleUser(singleUserData)
            setRole({id:singleUserData.role,name:singleUserData.role});
            setDateOfBirth(format(new Date(singleUserData.dob), 'dd-MM-yyyy'));

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
          // if (!values.dob) {
          //   errors.dob = 'Required';
          // }
          // if (!values.username) {
          //   errors.username = 'Required';
          // }
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
         console.log(role.id);
        api.put(`http://localhost:8080/api/v1/user/${id}`,{name:values.name,email:values.email,phone:values.phone,dob:format(new Date(dateOfBirth), 'dd-MM-yyyy'),role:role.id})
        .then(response => {
          console.log(response);
          setSubmitting(false);
          api.get(`http://localhost:8080/api/v1/user`)
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
           <CustomTextField handleChange={handleChange} handleBlur={handleBlur} settedValue={values.name} placeHolderValue={"Nom"} name={"name"}></CustomTextField>
        <br />
        {errors.name && touched.name && errors.name}
        <CustomTextField handleChange={handleChange} handleBlur={handleBlur} settedValue={values.email} placeHolderValue={"Email"} name={"email"} type={"email"}></CustomTextField>
        <br />
        {errors.email && touched.email && errors.email}
        <CustomTextField handleChange={handleChange} handleBlur={handleBlur} settedValue={values.phone} placeHolderValue={"Numero de Telephone"} name={"phone"}></CustomTextField>
        <br />
        {errors.phone && touched.phone && errors.phone}
        <CustomSelect handleChange={handleChangeRole}initialValue={role} optionsList={listOfRoles} placeHolderValue={"Role"}></CustomSelect>
        <br />
           {/* <TextField
             fullWidth
             margin="normal"
             type="text"
             name="dob"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.dob}
             placeholder="Date de Naissance"
           /> */}
           <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker handleChange={handleChangeDate} settedValue={dateOfBirth} label={"Date Naissance"} id={"dob"}></DatePicker>
          </MuiPickersUtilsProvider>
           <br />
           {errors.dob && touched.dob && errors.dob}
           {/* <CustomTextField handleChange={handleChange} handleBlur={handleBlur} settedValue={values.username} placeHolderValue={"Nom de l'utilisateur"} name={"username"}></CustomTextField>
           <br />
            {errors.username && touched.username && errors.username} */}
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