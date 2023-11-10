import { useState, useEffect } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { AgGridReact } from "ag-grid-react";
import { Stack, Button, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

export default function TrainingList() {
    
    useEffect(() => {
        fetchTrainings();
    }, []);

    const [trainings, setTrainings] = useState();

    const timeFormatter = (params) => {
        return (params.value.substring(8, 10) + '-' + params.value.substring(5, 7) + '-' + params.value.substring(0, 4)) + ' ' + params.value.substring(11, 16);
    };

    const[columnDefs] = useState([
        {headerName: 'First name', valueGetter: 'data.customer.firstname', sortable: true, filter: true, width: 150},
        {headerName: 'Last name', valueGetter: 'data.customer.lastname', sortable: true, filter: true, width: 150},
        {field: 'date', valueFormatter: timeFormatter, sortable: true, filter: true, width: 170},
        {field: 'duration', sortable: true, filter: true, width: 150},
        {field: 'activity', sortable: true, filter: true, width: 150},
        {
            cellRenderer: params =>
            <IconButton>
                <DeleteIcon size="small" onClick={() => deleteTraining(params.data.id)}>
                    Delete
                </DeleteIcon>
            </IconButton>,
            width: 100
        }
    ]);

    
    const fetchTrainings = () => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
        .then(response => {
            if (response.ok)
                return response.json();
            else
                throw new Error("Error in fetch: " + response.statusText);
        })
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    };

    const deleteTraining = (id) => {
        if (window.confirm("Are you sure?")) {
          fetch(`https://traineeapp.azurewebsites.net/api/trainings/${id}`, { method: 'DELETE' })
          .then(response => {
            if (response.ok)
              fetchTrainings();
            else
              throw new Error("Error in DELETE: " + response.statusText);
          })
          .catch(err => console.error(err))
          }
      }

    return (
        <Stack alignItems={"center"}>
            <div className="ag-theme-material" style={{width: 900, height: 600}}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationAutoPageSize={true}
                />
            </div>
        </Stack>
    )
}