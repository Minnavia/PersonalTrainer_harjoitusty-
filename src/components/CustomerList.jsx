import { useState, useEffect } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { AgGridReact } from "ag-grid-react";
import { Button, Icon, IconButton, Stack } from "@mui/material";
import AddCustomer from "./AddCustomer.jsx";
import EditCustomer from "./EditCustomer.jsx";
import AddTraining from "./AddTraining.jsx";
import DeleteIcon from '@mui/icons-material/Delete';

export default function CustomerList() {

    useEffect(() => {
        fetchCustomers();
    }, []);

    const [customers, setCustomers] = useState();

    const[columnDefs] = useState([
        {field: 'firstname', sortable: true, filter: true, width: 125},
        {field: 'lastname', sortable: true, filter: true, width: 150},
        {field: 'streetaddress', sortable: true, filter: true, width: 170},
        {field: 'postcode', sortable: true, filter: true, width: 125},
        {field: 'city', sortable: true, filter: true, width: 150},
        {field: 'email', sortable: true, filter: true, width: 180},
        {field: 'phone', sortable: true, filter: true, width: 150},
        {
            cellRenderer: params => <AddTraining data={params.data}/>,
            width: 75
        },
        {
            cellRenderer: params => <EditCustomer fetchCustomers={fetchCustomers} data={params.data}/>,
            width: 75
        },
        {
            cellRenderer: params =>
            <IconButton>
                <DeleteIcon size="small" onClick={() => deleteCustomer(params.data.links[1].href)}>
                    Delete
                </DeleteIcon>
            </IconButton>,
            width: 75
        }
        ]);

    
    const fetchCustomers = () => {
        fetch('https://traineeapp.azurewebsites.net/api/customers')
        .then(response => {
            if (response.ok)
                return response.json();
            else
                throw new Error("Error in fetch: " + response.statusText);
        })
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    };

    const deleteCustomer = (url) => {
        if (window.confirm("Are you sure?")) {
          fetch(url, { method: 'DELETE' })
          .then(response => {
            if (response.ok)
              fetchCustomers();
            else
              throw new Error("Error in DELETE: " + response.statusText);
          })
          .catch(err => console.error(err))
          }
      }

    return (
        <Stack alignItems={"center"}>
            <AddCustomer fetchCustomers={fetchCustomers}/>
            <div className="ag-theme-material" style={{width: 1300, height: 600}}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationAutoPageSize={true}
                />
            </div>
        </Stack>
    )
}