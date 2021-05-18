import React, {useState,useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from "components/CustomButtons/Button.js";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import { Form, Formik } from 'formik';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));

export default function AddTaskFormDialog({/*setArticles*/}) {
  const [open, setOpen] = React.useState(false);
  const [listGMS, setListGMS] = useState([]);
  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
    axios.get(`http://localhost:8080/api/v1/gms`)
        .then(res => {
            
            setListGMS(res.data);
            //console.log(res.data);

        });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>

      <Button color="primary" round onClick={handleClickOpen}>Ajouter une Tache</Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Ajouter une nouvelle Tache</DialogTitle>
        <DialogContent>
        <Formik
       initialValues={{ name: '', endDate: '',start:'',duration:'',gms:'' }}
       validate={values => {
         const errors = {};
         if (!values.name) {
           errors.name = 'Required';
         }
         if (!values.endDate) {
            errors.endDate = 'Required';
          }
          if (!values.start) {
            errors.start = 'Required';
          }
          if (!values.duration) {
            errors.duration = 'Required';
          }
          if (!values.gms) {
            errors.gms = 'Required';
          }
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
        // axios.post(`http://localhost:8080/api/v1/articles`, values)
        // .then(response => {
        //   console.log(response);
        //   setSubmitting(false);
        //   axios.get(`http://localhost:8080/api/v1/articles`)
        //     .then(res => {
        //       const articleData = res.data;
        //       setArticles(articleData);
        //       console.log(articleData);
  
        //     })
        // });
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
             placeholder="nom du tache"
           /><br />
           {errors.name && touched.name && errors.name}
           <TextField
            fullWidth
            margin="normal"
            id="datetime-local"
            label="Date début"
            type="datetime-local"
            defaultValue="2017-05-24T10:30"
            name="start"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.start}
             placeholder="Date début"
            className={classes.textField}
            InputLabelProps={{
            shrink: true,
            }}
            />
           {errors.start && touched.start && errors.start}
           <TextField
            fullWidth
            margin="normal"
            id="datetime-local"
            label="Date fin"
            type="datetime-local"
            defaultValue="2017-05-24T10:30"
            name="endDate"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.endDate}
             placeholder="Date fin"
            className={classes.textField}
            InputLabelProps={{
            shrink: true,
            }}
            /><br/>
           {errors.endDate && touched.endDate && errors.endDate}
           <TextField
             fullWidth
             margin="normal"
             id="standard-number"
             label="durée"
             name="duration"
             type="number"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.duration}
             placeholder="durée"
             InputLabelProps={{
             shrink: true,
             }}
            /><br />
           {errors.duration && touched.duration && errors.duration}
           <InputLabel  shrink id="gms" >GMS:</InputLabel>
           <Select
             labelId="gms"
             name="gms"
             fullWidth
             onChange={handleChange}
             onBlur={handleBlur}
            //  value={values.categorie}
           >
             <MenuItem  key={values.id} value={values.gms}>{values.gms}</MenuItem >
               {listGMS.map(val => {
                   return <MenuItem  key={val.id} value={val.name}>{val.name}</MenuItem >;
               })}
           </Select><br />
           {errors.gms && touched.gms && errors.gms}
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