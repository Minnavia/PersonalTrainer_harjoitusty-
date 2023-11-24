import { groupBy, mapValues, sumBy } from 'lodash';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Rectangle, ResponsiveContainer } from 'recharts';

export default function TrainingGraph(){
    
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        fetchTrainings();
    }, []);

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

    const reducedData = trainings.reduce((res, item) => {
        res.push({id: item.id, activity: item.activity, duration: item.duration});
        return res;
    }, []);

    const data2 = groupBy(reducedData, 'activity');

    const graphData = mapValues(data2, function(value, key){
        return sumBy(value, 'duration')
    });
    
    const grpahArray = Object.keys(graphData).map(activity => ({ activity, duration: graphData[activity] }));

    return (
        <ResponsiveContainer minWidth={600} width="100%" height={400}>
            <BarChart
            data={grpahArray}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
            }}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey='activity'/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Bar dataKey='duration' fill='#42a5f5' activeBar={<Rectangle fill='gold' stroke='purple'/>}/>
            </BarChart>
        </ResponsiveContainer>
    )
}