import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const storedSubjects = JSON.parse(localStorage.getItem('subjects'));
    if (storedSubjects) {
      setSubjects(storedSubjects);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('subjects', JSON.stringify(subjects));
  }, [subjects]);

  const addSubject = (subjectName, hours) => {
    const newSubject = {
      name: subjectName,
      hours: parseInt(hours)
    };
    setSubjects([...subjects, newSubject]);
  };

  const handlePlusClick = (index) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index].hours += 1;
    setSubjects(updatedSubjects);
  };

  const handleMinusClick = (index) => {
    const updatedSubjects = [...subjects];
    if (updatedSubjects[index].hours > 0) {
      updatedSubjects[index].hours -= 1;
      setSubjects(updatedSubjects);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Geekster Education Planner</h1>
        <div className="main-container">
          <input type="text" name="subjectName" placeholder='subject'/>
          <input type="text" name="hours" placeholder='hours'/>
          <button className='btn' onClick={() => {
            const subjectName = document.getElementsByName('subjectName')[0].value;
            const hours = document.getElementsByName('hours')[0].value;
            addSubject(subjectName, hours);
          }}>ADD</button>
        </div>
        <div className="subjects-container">
          {subjects.map((subject, index) => (
            <div key={index} className="subject-item">
              <span>{subject.name}</span>
              <div className='btn-container'>
                <button onClick={() => handlePlusClick(index)} className='plus'>+</button>
                <span>{subject.hours}</span>
                <button onClick={() => handleMinusClick(index)} className='minus'>-</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
