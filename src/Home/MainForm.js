import { useEffect, useState } from "react";
import './mainForm.css';


const MainForm = (props) => {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/form-user')
      .then(response => response.json())
      .then(data => setUsersData(data))
      .catch(err => console.log(err.message));
  }, []);

  return (
    <div className="all-users-wrapper">
      <h1 className="title">USERS LIST</h1>
      <div className="all-users">
        {usersData.map((data) => (
          <div className="user-data" key={data.id}>
            <div className="user-info">
              <span className="label">Name:</span> {data.name}
            </div>
            <div className="user-info">
              <span className="label">Email:</span> {data.email}
            </div>
            <div className="user-info">
              <span className="label">Mobile:</span> {data.mobile}
            </div>
            <div className="user-info">
              <span className="label">DOB:</span> {data.dob}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainForm;
