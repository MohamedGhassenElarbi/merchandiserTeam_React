import React, { useEffect, useState } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import SelectMerchandiserPlanning from '../components/SelectMerchandiserPlanning'
import axios from 'axios';
import AddPlanningFormDialog from 'components/AddPlanningFormDialog'
import UpdatePlanningFormDialog from 'components/UpdatePlanningFormDialog'
import DeletePlanningFormDialog from 'components/DeletePlanningFormDialog'
import {format,parse} from 'date-fns';

export default function Planning() {
  const [merchandiser, setMerchandiser] = useState();
  const [merchandisers, setMerchandisers] = useState([]);
  const [taskPlanning, setTaskPlanning] = useState(
  );

  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/user/role/MERCHANDISER`)
        .then(res => {
            const merchandisersData = res.data;
            setMerchandisers(merchandisersData);
        })
}, [])
const fetchTask =()=>{
  
}
useEffect(() => {
  if(!merchandiser)return;
  axios.get(`http://localhost:8080/api/v1/taskPlanning/merchandiser/${merchandiser.id}`)
  .then(res => {
      const userData = res.data;
      setTaskPlanning(userData);
  })
}, [merchandiser])
let eventsList;
if(taskPlanning){
 eventsList=taskPlanning.tasks.map(val => {
  return { title: val.gms.name, startRecur:format(new Date(parse(taskPlanning.startDate, 'dd-MM-yyyy', new Date())), 'yyyy-MM-dd'),endRecur:format(new Date(parse(taskPlanning.endDate, 'dd-MM-yyyy', new Date())), 'yyyy-MM-dd'),daysOfWeek: [ val.day ] };
})
}
  return (
    <>
   <SelectMerchandiserPlanning setMerchandiser={setMerchandiser} merchandisers={merchandisers} merchandiser={merchandiser}/>
   <AddPlanningFormDialog></AddPlanningFormDialog>
   <UpdatePlanningFormDialog></UpdatePlanningFormDialog>
   <DeletePlanningFormDialog></DeletePlanningFormDialog>
    <FullCalendar
      plugins={[ dayGridPlugin ]}
      initialView="dayGridMonth"
      events={eventsList}
    />
 </>
  );
}
