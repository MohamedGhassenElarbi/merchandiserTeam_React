import React,{useEffect,useState} from 'react';
import { Doughnut } from 'react-chartjs-2';
import api from 'api';

export default function ReactChart() {
  const [acceptedLeaves, setacceptedLeaves] = useState()
  const [refusedLeaves, setrefusedLeaves] = useState()
  const [waitingLeaves, setwaitingLeaves] = useState()
  useEffect(() => {
    api.get(`http://localhost:8080/api/v1/leave`)
          .then(res => {
              const leaveData = res.data;
              const acceptedLeaves=leaveData.filter((token)=>{
                return token.state=="ACCEPTED";
              })
              setacceptedLeaves(acceptedLeaves)
              const refusedLeaves=leaveData.filter((token)=>{
                return token.state=="REFUSED";
              })
              setrefusedLeaves(refusedLeaves)
              const waitingLeaves=leaveData.filter((token)=>{
                return token.state=="WAITING";
              })
              setwaitingLeaves(waitingLeaves)
              console.log(waitingLeaves.length);

          })
  }, [])

  const data = {
    labels: [ 'Refusés','Acceptés', 'En Attente'],
    datasets: [
      {
        data: [refusedLeaves?.length, acceptedLeaves?.length, waitingLeaves?.length],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',//red
          'rgba(54, 162, 235, 0.2)',//bleu
          'rgba(255, 159, 64, 0.2)',//orange
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  data.datasets.data=[refusedLeaves,acceptedLeaves,waitingLeaves];
    return(
        <div style={{width:'500px'}}>
            <h5 style={{textAlign:'center'}}>Demandes de congés</h5>
        <Doughnut data={data} />
        </div>
    );
}