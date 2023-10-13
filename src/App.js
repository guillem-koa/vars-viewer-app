import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './App.css'; // Import your CSS file


function App() {
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    axios.get("http://37.187.176.243:8001/get_machine_variables?topic=estat")
      .then((response) => {
        // Assuming the first object in the array has the column names
        const firstRow = response.data[0];
        const dynamicColumns = Object.keys(firstRow);

        setTableData(response.data);
        setColumns(dynamicColumns);
      })
      .catch((error) => {
        console.error('API Error:', error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Estat</h1>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <td key={column}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;


{/* import React, { useState, useEffect } from 'react';
import axios from 'axios';


const App = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = "http://37.187.176.243:8001/get_machine_variables?topic=estat";
    axios
      .get(apiUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
      });

  }, []);

  return (
    <div>
      {error ? (
        <p>Error fetching data: {error.message}</p>
      ) : data.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>GPIO_12_LED_ROIG</th>
              <th>GPIO_13_LED_VERD</th>
              <th>GPIO_19_LED_BLAU</th>
              <th>GPIO_20_LEDS_BLANCS</th>
              <th>GPIO_21_CALOR</th>
              <th>GPIO_23_PORTA</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.GPIO_12_LED_ROIG}</td>
                <td>{item.GPIO_13_LED_VERD}</td>
                <td>{item.GPIO_19_LED_BLAU}</td>
                <td>{item.GPIO_20_LEDS_BLANCS}</td>
                <td>{item.GPIO_21_CALOR}</td>
                <td>{item.GPIO_23_PORTA}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default App; */}

