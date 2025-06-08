import './List.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const List = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the back-end
    axios.get(' http://localhost:4001/data')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <h1>Data from MongoDB</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <strong>{item.name}</strong> - {item.description} years old
          </li>
        ))}
      </ul>
    </div>
  );
}


export default List
