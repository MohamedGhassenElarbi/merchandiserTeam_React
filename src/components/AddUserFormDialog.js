import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from "components/CustomButtons/Button.js";
import TextField from '@material-ui/core/TextField';
import api from 'api';
import { Form, Formik } from 'formik';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import CustomTextField from 'components/CustomInput/CustomTextField';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function AddGMSFormDialog({setUsers}) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  let today = new Date().toISOString().slice(0, 10)
  return (
    <>

      <Button color="primary" round onClick={handleClickOpen}>Ajouter un utilisateur</Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Ajouter un nouveau utilisateur</DialogTitle>
        <DialogContent>
        <Formik
       initialValues={{ name: '', email: '',phone:'',role:'MERCHANDISER',dob:'',username:''}}
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
        api.post(`http://localhost:8080/api/v1/user`, values)
        .then(response => {
          console.log(response);
          setSubmitting(false);
          api.get(`http://localhost:8080/api/v1/user`)
            .then(res => {
              const usersData = res.data;
              setUsers(usersData);  
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
        <TextField
          fullWidth
          margin="normal"
          type="email"
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          placeholder="email"
        />
        <br />
        {errors.email && touched.email && errors.email}
        <CustomTextField handleChange={handleChange} handleBlur={handleBlur} settedValue={values.phone} placeHolderValue={"Numero de Telephone"} name={"phone"}></CustomTextField>
        <br />
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
          
          <MenuItem  key="1" value="MERCHANDISER">Merchandiseur</MenuItem >
          <MenuItem  key="2" value="ADMIN">Admin</MenuItem >
          <MenuItem  key="3" value="SUPERVISOR">Superviseur</MenuItem >
        </Select><br />
        {errors.role && touched.role && errors.role}
        <TextField
        id="date"
        name="dob"
        label="Date de Naissance"
        type="date"
        defaultValue={today}
        onChange={handleChange}
        onBlur={handleBlur}
        //value={values.dob}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        style={{marginTop: "20px"}}
      /><br/>
        {errors.dob && touched.dob && errors.dob}
        <CustomTextField handleChange={handleChange} handleBlur={handleBlur} settedValue={values.username} placeHolderValue={"Nom de l'utilisateur"} name={"username"}></CustomTextField>
        <br />
        {errors.username && touched.username && errors.username}
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