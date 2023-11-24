import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import CustomerList from './components/CustomerList.jsx'
import TrainingList from './components/TrainingList.jsx'
import CustomerCalendar from './components/CustomerCalendar.jsx'
import TrainingGraph from './components/TrainingGraph.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        element:<CustomerList/>,
        index: true
      },
      {
        path: "trainings",
        element: <TrainingList/>
      },
      {
        path: "calendar",
        element: <CustomerCalendar/>
      },
      {
        path: "graph",
        element: <TrainingGraph/>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
