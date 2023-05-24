import { Button, Input, InputLabel } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './userForm.css';

function UserForm() {
  const initialState = {
    name: null,
    email: null,
    mobile: null,
    dob: null,
  };

  const [formState, setFormState] = useState(initialState);
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  

  function isDate18orMoreYearsOld(day, month, year) {
    return new Date(year + 18, month - 1, day) <= new Date();
  }

  const detectChange = (e, dob) => {
    if (e?.target?.id === 'name') {
      setFormState({
        ...formState,
        name: e.target.value,
      });
    }
    if (e?.target?.id === 'email') {
      setFormState({
        ...formState,
        email: e.target.value,
      });
    }
    if (e?.target?.id === 'mobile') {
      setFormState({
        ...formState,
        mobile: e.target.value,
      });
    }
    if (dob) {
      const date = e.$D;
      const month = e.$M + 1;
      const year = e.$y;
      if (isDate18orMoreYearsOld(date, month, year)) {
        setFormState({
          ...formState,
          dob: `${date}-${month}-${year}`,
        });
      } else {
        setMessage('Age must be greater than 18 years.');
      }
    }
  };

  const formInfo = {
    name: {
      id: 'name',
      placeholder: 'Write Your name',
      type: 'text',
    },
    email: {
      id: 'email',
      placeholder: 'myemail@gmail.com',
      type: 'email',
    },
    mobile: {
      id: 'mobile',
      placeholder: 'Type Phone Number',
      type: 'number',
    },
  };
  
  const submit = async () => {
    if (formState.email.includes('@gmail.com')) {
      await fetch('https://tired-red-kilt.cyclic.app/form-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      })
        .then((res) => res.json())
        .then((data) =>
          data.message.includes('Successfully')
            ? window.location.replace('https://main--lustrous-sunflower-df6e95.netlify.app/mainForms')
//            navigate('https://tired-red-kilt.cyclic.app/form-user')
            : setMessage(data.message)
        )
        .catch((err) => console.log(err));

      setFormState(initialState);
    } else {
      setMessage('Email is invalid.');
    }
  };

  return (
    <div className='form-wrapper'>
      <div className='form-header'>
        <h1>Registration Form</h1>
        <p>Please fill in the required information below.</p>
      </div>
      <div className='form-body'>
        {Object.keys(formInfo).map((info) => {
          return (
            <div key={info} className='input-wrapper'>
              <InputLabel htmlFor={formInfo[info].id}>
                {info.toUpperCase()}
              </InputLabel>
              <Input
                id={formInfo[info].id}
                type={formInfo[info].type}
                placeholder={formInfo[info].placeholder}
                value={formState[info] ?? ''}
                onChange={(e) => detectChange(e)}
              />
            </div>
          );
        })}
        <div className='input-wrapper'>
          <InputLabel>DOB </InputLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              onChange={(e) => detectChange(e, true)}
              disableFuture
            />
          </LocalizationProvider>
        </div>
      </div>
      <div className='form-footer'>
        <Button variant='contained' onClick={submit}>
          Submit
        </Button>
        {message && (
          <div className='message'>
            {message}
            <Button onClick={() => setMessage(null)}>OK</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserForm;
