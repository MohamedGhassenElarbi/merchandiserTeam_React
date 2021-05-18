import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import SelectMerchandiserPlanning from '../components/SelectMerchandiserPlanning'
import axios from 'axios';
import AddTaskFormDialog from 'components/AddTaskFormDialog'

const styles = {
    root: {
        flexGrow: 1,
        margin:50,
    },

  };
  
  const useStyles = makeStyles(styles);

export default function Planning() {
  const classes = useStyles();
  const [merchandiserId, setMerchandiserId] = useState();
  const [merchandiser, setMerchandiser] = useState(
    {"id":1,"name":"merchandiser","email":"merch@spring.co","phone":"12123123","role":"MERCHANDISER","dob":"09-02-1999","tasks":[{"id":1,"name":"task1","date":"28-04-2021","duration":20,"gms":{"id":1,"name":"gms99","image":"image1","estimatedTime":20,"longitude":12.2,"latitude":12.2}},{"id":2,"name":"task2","date":"28-04-2021","duration":40,"gms":{"id":1,"name":"gms99","image":"image1","estimatedTime":20,"longitude":12.2,"latitude":12.2}}],"username":"merch@spring.co"}
  );
  const [merchandisers, setMerchandisers] = useState([]);


  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/user`)
        .then(res => {
            const merchandisersData = res.data;
            setMerchandisers(merchandisersData);
            //console.log(gmsData);

        })
}, [])

useEffect(() => {
  axios.get(`http://localhost:8080/api/v1/user/${merchandiserId}`)
  .then(res => {
      const userData = res.data;
      setMerchandiser(userData);
      //console.log(gmsData);

  })
}, [merchandiserId])


const eventsList=merchandiser.tasks.map(val => {
  return { title: val.name, start: val.start, end: val.endDate };
})
  return (
    <>
   <SelectMerchandiserPlanning setMerchandiserId={setMerchandiserId} merchandisers={merchandisers} merchandiserId={merchandiserId} merchandiser={merchandiser}/>
   <AddTaskFormDialog></AddTaskFormDialog>
    {/* <FullCalendar 
    expandRows={true}
    // locale={frLocale}
    allDaySlot={false}
defaultView="timeGridWeek"
nowIndicator={false}
slotDuration='00:60:00'
slotMinTime='08:00:00'
slotMaxTime='18:00:00'
slotEventOverlap={false}
weekends={false}
header={{
left: "prev,next today",
center: "title",
right: "dayGridMonth,timeGridWeek,timeGridDay"
}}
plugins={[timeGridPlugin ]}
eventLimit={true}
displayEventEnd={true}
events={[
  { title: 'event 1', start: '2021-05-6T10:30:00',end: '2021-05-6T11:30:00'},
  { title: 'event 2', start: '2021-05-5T16:30:00',end: '2021-05-5T18:00:00'},
  { title: 'event 3', start: '2021-05-7T10:30:00',end: '2021-05-7T15:30:00'},
]}

eventColor= '#378006'

/> */}
<FullCalendar
  allDaySlot={false}
  expandRows={true}
  slotDuration='00:60:00'
  slotMinTime='08:00:00'
  slotMaxTime='18:00:00'
  plugins={[ timeGridPlugin ]}
  initialView="timeGridWeek"
  weekends={false}
  events={eventsList
  }
/>
 </>


  );
}
