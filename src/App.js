import React from 'react';
import './style.css';

import React, { useState, useEffect } from 'react';

export default function App() {
  const [data, setData] = useState({ name: '', email: '', picture: '' });
  const [userDataList, setUserDataList] = useState([]);

  useEffect(() => {
    const userDataFromLocalStorage = JSON.parse(
      localStorage.getItem('userDataList')
    );
    if (userDataFromLocalStorage && userDataFromLocalStorage.length > 0) {
      setUserDataList(userDataFromLocalStorage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('userDataList', JSON.stringify(userDataList));
  }, [userDataList]);

  const fetchNewUser = () => {
    fetch('https://randomuser.me/api/')
      .then((response) => response.json())
      .then((data) => {
        const { name, email, picture } = data.results[0];
        const newUser = {
          name: `${name.first} ${name.last}`,
          email,
          picture: picture.large,
        };

        setData(newUser);
        setUserDataList((prevState) => [...prevState, newUser]);
      });
  };

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.email}</p>
      <img src={data.picture} alt="Profile" />
      <button onClick={fetchNewUser}>Random</button>
      {userDataList.map((user, index) => (
        <div key={index}>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
          <img src={user.picture} alt="Profile" />
        </div>
      ))}
    </div>
  );
}
