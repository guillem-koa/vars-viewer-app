import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, // x axis
  LinearScale, // y axis 
  PointElement
} from 'chart.js'; 

ChartJS.register(  
  LineElement,
  CategoryScale, 
  LinearScale, 
  PointElement)

export default function LineChart() {
  const [chartData, setChartData] = useState({labels: [],
    datasets: [
      {
        label: 'Data',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      },
    ]}); // Initialize chartdata with empty data

  useEffect(() => {
    // Replace 'API_URL' with the actual API endpoint
    async function fetchData() {
      const response = await fetch('http://37.187.176.243:8001/get_machine_variables?topic=estat&range=30&id_maquina=3');
      const resData = await response.json();
      const resChartData = {
        labels: resData.map((item,index) => index),
        datasets: [
          {
            label: 'Data',
            data: resData.map(item => item.TEMP_ACT),
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
          },
        ]}
      setChartData(resChartData);
    }
    fetchData();
  }, []);

  console.log("chartData", chartData)
  console.log(chartData.labels.length)

  const options = {
    maintainAspectRatio: true,
    layout: {
      padding: {
        left: 50,
        right: 50,
        top: 25,
        bottom: 50,
      },
    }
  };

  return (
    <div>
      <h2 class="centered-text">Temperature Chart</h2>
      <Line data={chartData} options={options} />
    </div>
  );
}

