import { useState, useEffect } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { AgGridReact } from "ag-grid-react";
import { Stack } from "@mui/material";

export default function CustomerList() {

    useEffect(() => {
        fetchCustomers();
    }, []);

    const [customers, setCustomers] = useState();

    const[columnDefs] = useState([
        {field: 'firstname', sortable: true, filter: true, width: 150},
        {field: 'lastname', sortable: true, filter: true, width: 150},
        {field: 'streetaddress', sortable: true, filter: true, width: 170},
        {field: 'postcode', sortable: true, filter: true, width: 100},
        {field: 'city', sortable: true, filter: true, width: 150},
        {field: 'email', sortable: true, filter: true, width: 170},
        {field: 'phone', sortable: true, filter: true, width: 150},
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

    return (
        <Stack alignItems={"center"}>
            <div className="ag-theme-material" style={{width: 1100, height: 600}}>
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