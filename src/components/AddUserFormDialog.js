import React ,{useState}from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from "components/CustomButtons/Button.js";
import TextField from '@material-ui/core/TextField';
import api from 'api';
import { Form, Formik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
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
  const [dateOfBirth, setDateOfBirth] = useState();
  const [role, setRole] = useState({ id: 'MERCHANDISER', name: 'MERCHANDISER' });
  const listOfRoles = [
    { id: 'MERCHANDISER', name: 'MERCHANDISER' },
    // { id: 'ADMIN', name: 'ADMIN' },
    { id: 'SUPERVISOR', name: 'SUPERVISOR' }
  ]
  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleChangeDate =(e)=>{
    setDateOfBirth(e)
  }
  const handleChangeRole=(e)=>{
    setRole(e)
  }
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
       initialValues={{ name: '', email: '',phone:'',password:''}}
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
           if (!values.password) {
            errors.password = 'Required';
          }
          //  if (!values.username) {
          //    errors.username = 'Required';
          //  }
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
        api.post(`http://localhost:8080/api/v1/user`, {...values,dob:format(new Date(dateOfBirth), 'dd-MM-yyyy'),role:role.id})
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
        <CustomTextField handleChange={handleChange} handleBlur={handleBlur} settedValue={values.email} placeHolderValue={"Email"} name={"email"} type={"email"}></CustomTextField>
        <br />
        {errors.email && touched.email && errors.email}
        <CustomTextField handleChange={handleChange} handleBlur={handleBlur} settedValue={values.phone} placeHolderValue={"Numero de Telephone"} name={"phone"}></CustomTextField>
        <br />
        {errors.phone && touched.phone && errors.phone}
        <CustomSelect handleChange={handleChangeRole}initialValue={role} optionsList={listOfRoles} placeHolderValue={"Role"}></CustomSelect>
        <br />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker handleChange={handleChangeDate} settedValue={dateOfBirth} label={"Date Naissance"} id={"dob"}></DatePicker>
      </MuiPickersUtilsProvider>
      <br/>
        {/* {errors.dob && touched.dob && errors.dob} */}
        {/* <CustomTextField handleChange={handleChange} handleBlur={handleBlur} settedValue={values.username} placeHolderValue={"Nom de l'utilisateur"} name={"username"}></CustomTextField>
        <br />
        {errors.username && touched.username && errors.username} */}
        <CustomTextField handleChange={handleChange} handleBlur={handleBlur} settedValue={values.password} placeHolderValue={"Mot de passe"} name={"password"} type={"password"}></CustomTextField>
        {errors.password && touched.password && errors.password}
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