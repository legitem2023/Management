import React from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend,LineElement, CategoryScale, LinearScale,PointElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend,LineElement, CategoryScale, LinearScale,PointElement);
type PropsChart = {
    data: {
        labels: string[],
        values: number[]
    }
}
const Chart:React.FC<PropsChart> = ({data}) => {

    const chartData = {
        labels: data.labels,
        datasets: [
          {
            label: 'Sales Summary',
            data: data.values,
            fill: true,
            backgroundColor: '#6415b5',
            borderColor: '#290133',
            borderWidth: 4,
          },
        ],
      };
    
      const options:any = {
        scales: {
          xAxes: [
            {
              stacked: true
            }
          ],
          yAxes: [
            {
              stacked: true
            }
          ]
        },
        pan: {
          enabled: true,
          mode: "x"
        },
        zoom: {
          enabled: true,
          mode: "x",
          sensitivity: 0.5
        }
      };
    
      return <Line data={chartData} options={options} />;
}

export default Chart