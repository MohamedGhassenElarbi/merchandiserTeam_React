import React,{useEffect,useState} from 'react';
import { Doughnut } from 'react-chartjs-2';
import api from 'api';

export default function ReactChart() {
    const [myListOfGMS, setmyListOfGMS] = useState([])
    const [occOfGMS, setoccOfGMS] = useState([])
  const listOfGMS =new Set();
  const allElmentsGMS=[];
  useEffect(() => {
    api.get(`http://localhost:8080/api/v1/reclamation`)
          .then(res => {
              const claimData = res.data;
              claimData.map((data)=>{
                  listOfGMS.add(data?.gms?.name);
                  allElmentsGMS.push(data?.gms?.name)
              })
               setmyListOfGMS(Array.from(listOfGMS));
               let a =new Map();
            const aCount = new Map([...new Set(allElmentsGMS)].map(
                x => [x, allElmentsGMS.filter(y => y === x).length]
            ));
              const nbocc =[];
              aCount.forEach(function(value, key) {
                nbocc.push(value);
                })
                setoccOfGMS(nbocc)
              
              console.log(nbocc);

          })
  }, [])
 
  const data = {
    labels: []=myListOfGMS,
    datasets: [
      {
        data: []=occOfGMS,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',//red
          'rgba(54, 162, 235, 0.2)',//bleu
          'rgba(255, 159, 64, 0.2)',//orange
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderWidth: 1,
      },
    ],
  };

  data.datasets.data=[1,1,1];
    return(
        <div style={{width:'500px'}}>
            <h5 style={{textAlign:'center'}}>Réclamations par GMS</h5>
        <Doughnut data={data} />
        </div>
    );
}