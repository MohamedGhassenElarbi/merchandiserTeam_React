import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from "components/CustomButtons/Button.js";
import axios from 'axios';
import {format} from 'date-fns';
import {
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import CustomSelect from 'components/Select/CustomSelect';
import DatePicker from 'components/DatePicker/DatePicker'


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function AddPlanningFormDialog({/*setArticles*/}) {
  const [open, setOpen] = React.useState(false);
  const [listGMS, setListGMS] = useState([]);
  const [listMerchandisers, setListMerchandisers] = useState([]);
  const [selectedMerchandiser, setSelectedMerchandiser] = useState({});
  const [selectedStartDate, setSelectedStartDate] = useState();
  const [selectedEndDate, setSelectedEndDate] = useState();
  const [listTaskMonday, setListTaskMonday] = useState([]);
  const [listTaskTuesday, setListTaskTuesday] = useState([]);
  const [listTaskWednesday, setListTaskWednesday] = useState([]);
  const [listTaskThursday, setListTaskThursday] = useState([]);
  const [listTaskFriday, setListTaskFriday] = useState([]);
  const [listTaskSaturday, setListTaskSaturday] = useState([]);
  const [listTaskSunday, setListTaskSunday] = useState([]);
  const handleClickOpen = () => {
    setOpen(true);
    axios.get(`http://localhost:8080/api/v1/gms`)
        .then(res => {
            setListGMS(res.data);
        });

        axios.get(`http://localhost:8080/api/v1/user/role/MERCHANDISER`)
        .then(res => {
          setListMerchandisers(res.data);
        });
         
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChangeMerchandiser = (selectedOption) => {
    setSelectedMerchandiser(selectedOption );
  };
  const handleChangeStartDate = (selectedStartDateEvent)=>{
    setSelectedStartDate(selectedStartDateEvent);
  }
  const handleChangeEndDate = (selectedEndDateEvent)=>{
    setSelectedEndDate( selectedEndDateEvent);
  };
  const handleChangeListTaskMonday = (selectedTasksMondayEvent) =>{
    setListTaskMonday(selectedTasksMondayEvent)
  }
  const handleChangeListTaskTuesday = (selectedTasksTuesdayEvent) =>{
    setListTaskTuesday(selectedTasksTuesdayEvent)
  }
  const handleChangeListTaskWednesday= (selectedTasksWednesdayEvent) =>{
    setListTaskWednesday(selectedTasksWednesdayEvent)
  }
  const handleChangeListTaskThursday = (selectedTasksThursdayEvent) =>{
    setListTaskThursday(selectedTasksThursdayEvent)
  }
  const handleChangeListTaskFriday = (selectedTasksFridayEvent) =>{
    setListTaskFriday(selectedTasksFridayEvent)
  }
  const handleChangeListTaskSaturday = (selectedTasksSaturdayEvent) =>{
    setListTaskSaturday(selectedTasksSaturdayEvent)
  }
  const handleChangeListTaskSunday = (selectedTasksSundayEvent) =>{
    setListTaskSunday(selectedTasksSundayEvent)
  }
  const handleAddOperation =()=>{
    let tasksArr = [];
    let arr = listTaskMonday.map(val=>{
     return {
       gms : val,
       day:1,
       state:'TODO'
     }
    })
    tasksArr = [...tasksArr,...arr] 
    arr = listTaskTuesday.map(val=>{
      return {
        gms : val,
        day:2,
        state:'TODO'
      }
     })
     tasksArr = [...tasksArr,...arr] 
     arr = listTaskWednesday.map(val=>{
      return {
        gms : val,
        day:3,
        state:'TODO'
      }
     })
     tasksArr = [...tasksArr,...arr] 
      arr = listTaskThursday.map(val=>{
      return {
        gms : val,
        day:4,
        state:'TODO'
      }
     })
     tasksArr = [...tasksArr,...arr] 
      arr = listTaskFriday.map(val=>{
      return {
        gms : val,
        day:5,
        state:'TODO'
      }
     })
     tasksArr = [...tasksArr,...arr] 
      arr = listTaskSaturday.map(val=>{
      return {
        gms : val,
        day:6,
        state:'TODO'
      }
     })
     tasksArr = [...tasksArr,...arr] 
      arr = listTaskSunday.map(val=>{
      return {
        gms : val,
        day:0,
        state:'TODO'
      }
     })
     tasksArr = [...tasksArr,...arr] 
     axios.post(`http://localhost:8080/api/v1/taskPlanning`, {startDate:format(new Date(selectedStartDate), 'dd-MM-yyyy'),endDate:format(new Date(selectedEndDate), 'dd-MM-yyyy'),tasks:tasksArr,merchandiser:selectedMerchandiser})
        .then(res => {
        });
        setOpen(false);
  }
  return (
    <>

      <Button color="primary" round onClick={handleClickOpen}>Ajouter une Tache</Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Ajouter une nouvelle Tache</DialogTitle>
        <DialogContent>
        <CustomSelect handleChange={handleChangeMerchandiser} optionsList={listMerchandisers} placeHolderValue={"Merchandiser"}></CustomSelect>
        <CustomSelect handleChange={handleChangeListTaskMonday} optionsList={listGMS} placeHolderValue={"Lundi"} isMulti></CustomSelect>
        <CustomSelect handleChange={handleChangeListTaskTuesday} optionsList={listGMS} placeHolderValue={"Mardi"} isMulti></CustomSelect>
        <CustomSelect handleChange={handleChangeListTaskWednesday} optionsList={listGMS} placeHolderValue={"Mercredi"} isMulti></CustomSelect>
        <CustomSelect handleChange={handleChangeListTaskThursday} optionsList={listGMS} placeHolderValue={"Jeudi"} isMulti></CustomSelect>
        <CustomSelect handleChange={handleChangeListTaskFriday} optionsList={listGMS} placeHolderValue={"Vendredi"} isMulti></CustomSelect>
        <CustomSelect handleChange={handleChangeListTaskSaturday} optionsList={listGMS} placeHolderValue={"Samedi"} isMulti></CustomSelect>
        <CustomSelect handleChange={handleChangeListTaskSunday} optionsList={listGMS} placeHolderValue={"Dimanche"} isMulti></CustomSelect>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker handleChange={handleChangeStartDate} settedValue={selectedStartDate} label={"Date Début"} id={"startDate"}></DatePicker>
        <DatePicker handleChange={handleChangeEndDate} settedValue={selectedEndDate} label={"Date Fin"} id={"endDate"}></DatePicker>
      </MuiPickersUtilsProvider>
      <DialogActions>
          <Button color="primary" type="submit" onClick={handleAddOperation}>
            Ajouter
          </Button>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
        </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}