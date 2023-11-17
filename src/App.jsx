import { Container } from '@mui/material'
import './App.css'
import {Tabs, Tab, Stack} from '@mui/material';
import CustomerList from '../src/components/CustomerList.jsx';
import TrainingList from '../src/components/TrainingList.jsx';
import CustomerCalendar from '../src/components/CustomerCalendar.jsx';
import TrainingGraph from './components/TrainingGraph.jsx';
import { useState } from 'react';

function App() {

  const [value, setValue] = useState('customers');

  const handleChange = (event, value) => {
    setValue(value);
  };

  return (
    <Container maxWidth='xl' >
      <Stack alignItems='center'>
          <Tabs value={value} onChange={handleChange}>
            <Tab value='customers' label="CUSTOMERS"/>
            <Tab value='trainings' label="TRAININGS"/>
            <Tab value='calendar' label="CALENDAR"/>
            <Tab value='graph' label="GRAPH"/>
          </Tabs>
      </Stack>
        {value === 'customers' && <div>
          <CustomerList/></div>}
        {value === 'trainings' && <div>
          <TrainingList/></div>}
        {value === 'calendar' && <div>
          <CustomerCalendar/></div>}
        {value === 'graph' && <div>
          <TrainingGraph/></div>}
    </Container>
  )
}

export default App
