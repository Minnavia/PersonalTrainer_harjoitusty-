import { Container } from '@mui/material'
import './App.css'
import {Tabs, Tab, Stack} from '@mui/material';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

function App() {

  const [value, setValue] = useState('customers');

  const handleChange = (event, value) => {
    setValue(value);
  };

  return (
    <Container maxWidth='xl' >
      <Stack alignItems='center'>
        <Tabs
        value={value}
        onChange={handleChange}
        textColor='secondary'
        indicatorColor='secondary'>
          <Tab label="customers" component={Link} to={"/"}></Tab>
          <Tab label="trainings" component={Link} to={"/trainings"}></Tab>
          <Tab label="calendar" component={Link} to={"/calendar"}></Tab>
          <Tab label="graph" component={Link} to={"/graph"}></Tab>
        </Tabs>
      </Stack>
      <Outlet/>
    </Container>
  )
}

export default App
