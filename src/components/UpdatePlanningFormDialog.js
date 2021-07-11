import React, {useState,useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "components/CustomButtons/Button.js";
import api from 'api';
import {format,parse} from 'date-fns';
import {
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import DatePicker from 'components/DatePicker/DatePicker'
import CustomSelect from 'components/Select/CustomSelect';
import EditIcon from '@material-ui/icons/Edit';

export default function UpdatePlanningFormDialog({refreshTask}) {
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
  const [currentPlanning, setCurrentPlanning] = useState();
  const handleClickOpen = () => {
    setOpen(true);
    api.get(`http://localhost:8080/api/v1/gms`)
        .then(res => {   
          setListGMS(res.data);
        });
        
        api.get(`http://localhost:8080/api/v1/user/role/MERCHANDISER`)
        .then(res => { 
          setListMerchandisers(res.data);
        });     
  };

  useEffect(() => {
    if(!currentPlanning) return;
    console.log("rerendering");
    const sun =new Set();
    const mon =new Set();
    const tue =new Set();
    const wed =new Set();
    const thu =new Set();
    const fri =new Set();
    const sat =new Set();
    currentPlanning.tasks.forEach(element => {
      
      switch (element.day) {
        case 0:
          if(!sun.has(element.gms.name)){
            setListTaskSunday(s=>[...s,element.gms])
          sun.add(element.gms.name);
          console.log(sun);
          }
          
          break;
        case 1:
          
          if(!mon.has(element.gms.name)){
            setListTaskMonday(s=>[...s,element.gms])
          mon.add(element.gms.name);
          console.log(mon);
          }
          
          break;
        case 2:
          if(!tue.has(element.gms.name)){
            setListTaskTuesday(s=>[...s,element.gms])
          tue.add(element.gms.name);
          console.log(tue);
          }
          
          break;
        case 3:
          if(!wed.has(element.gms.name)){
            setListTaskWednesday(s=>[...s,element.gms])
          wed.add(element.gms.name);
          console.log(wed);
          }
          
          break;
        case 4:
          if(!thu.has(element.gms.name)){
            setListTaskThursday(s=>[...s,element.gms])
          thu.add(element.gms.name);
          console.log(thu);
          }
          
          break;
        case 5:
          if(!fri.has(element.gms.name)){
            setListTaskFriday(s=>[...s,element.gms])
          fri.add(element.gms.name);
          console.log(fri);
          }
          
          break;
        case 6:
          if(!sat.has(element.gms.name)){
            setListTaskSaturday(s=>[...s,element.gms])
          sat.add(element.gms.name);
          console.log(sat);
          }
          
          break;

        default:
          break;
      }
    });
    setSelectedStartDate(parse(currentPlanning.startDate, 'dd-MM-yyyy', new Date()));
    setSelectedEndDate(parse(currentPlanning.endDate, 'dd-MM-yyyy', new Date()));
}, [currentPlanning])

  const handleClose = () => {
    setOpen(false);
  };
  const handleChangeMerchandiser = (selectedOption) => {
    setSelectedMerchandiser(selectedOption );
    api.get(`http://localhost:8080/api/v1/taskPlanning/merchandiser/${selectedOption.id}`)
        .then(res => {
          setCurrentPlanning(res.data);
        },);     
  };
  const handleChangeStartDate = (selectedStartDateEvent)=>{
    setSelectedStartDate(format(new Date(selectedStartDateEvent), 'dd-MM-yyyy'));
  }
  const handleChangeEndDate = (selectedEndDateEvent)=>{
    setSelectedEndDate(format(new Date(selectedEndDateEvent), 'dd-MM-yyyy') );
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
  const handleUpdateOperation =()=>{  
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
     console.log(selectedMerchandiser.id);
     api.put(`http://localhost:8080/api/v1/taskPlanning/${currentPlanning.id}`, {startDate:format(new Date(selectedStartDate), 'dd-MM-yyyy'),endDate:format(new Date(selectedEndDate), 'dd-MM-yyyy'),tasks:tasksArr,merchandiser:selectedMerchandiser})
        .then(res => {
          refreshTask(selectedMerchandiser.id)
        });
        setOpen(false);
  }
  return (
    <>

      <Button color="primary" round onClick={handleClickOpen}><EditIcon color="default" />Mise a jour d'un planning</Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Mise a jour d'un planning</DialogTitle>
        <DialogContent>
        <CustomSelect handleChange={handleChangeMerchandiser} optionsList={listMerchandisers} placeHolderValue={"Merchandiser"}></CustomSelect>
        <CustomSelect handleChange={handleChangeListTaskMonday} optionsList={listGMS} placeHolderValue={"Lundi"} isMulti initialValue={listTaskMonday}></CustomSelect>
        <CustomSelect handleChange={handleChangeListTaskTuesday} optionsList={listGMS} placeHolderValue={"Mardi"} isMulti initialValue={listTaskTuesday}></CustomSelect>
        <CustomSelect handleChange={handleChangeListTaskWednesday} optionsList={listGMS} placeHolderValue={"Mercredi"} isMulti initialValue={listTaskWednesday}></CustomSelect>
        <CustomSelect handleChange={handleChangeListTaskThursday} optionsList={listGMS} placeHolderValue={"Jeudi"} isMulti initialValue={listTaskThursday}></CustomSelect>
        <CustomSelect handleChange={handleChangeListTaskFriday} optionsList={listGMS} placeHolderValue={"Vendredi"} isMulti initialValue={listTaskFriday}></CustomSelect>
        <CustomSelect handleChange={handleChangeListTaskSaturday} optionsList={listGMS} placeHolderValue={"Samedi"} isMulti initialValue={listTaskSaturday}></CustomSelect>
        <CustomSelect handleChange={handleChangeListTaskSunday} optionsList={listGMS} placeHolderValue={"Dimanche"} isMulti initialValue={listTaskSunday}></CustomSelect>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker handleChange={handleChangeStartDate} settedValue={selectedStartDate} label={"Date Début"} id={"startDate"}></DatePicker>
        <DatePicker handleChange={handleChangeEndDate} settedValue={selectedEndDate} label={"Date Fin"} id={"endDate"}></DatePicker>
      </MuiPickersUtilsProvider>
      <DialogActions>
          <Button color="primary" type="submit" onClick={handleUpdateOperation}>
            Modifier
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