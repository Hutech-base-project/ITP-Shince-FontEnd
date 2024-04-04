import React from 'react'
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useEffect } from 'react';
import { useState } from 'react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const DashboardBarChart = (props) => {
    const [listBooking, setListBooking] = useState([]);
    const [listOrder, setListOrder] = useState([]);
    const [dataChart, setDataChart] = useState({
        labels : ['January', 'February', 'March', 'April', 'May', 'June', 'July','August' ,'September','October','November','December'],
        dataBooking : [],
        dataOrder: []
    });
    const options = {
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Revenue chart ' + props.year,
            },
        },
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August' ,'September','October','November','December'];
    const data = {
        labels,
        datasets: [
            {
                label: 'Booking',
                data: dataChart.dataBooking,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                stack: 'Stack 0',
            },
            {
                label: 'Ordres',
                data: dataChart.dataOrder,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                stack: 'Stack 1',
            },
        ],
    };

    useEffect(() => {
        if(props.listBooking !== undefined && props.listOrder !== undefined){
            setListBooking(props.listBooking);
            setListOrder(props.listOrder);
        }
    }, [props]);


    useEffect(() => {
        let dataBookings =[];
        let dataOrders =[];
        labels.forEach((element,index) => {
            let quantityBooking = listBooking.filter((bo) => new Date(bo?.createdAt).getFullYear() === props.year && new Date(bo?.createdAt).getMonth() + 1 === index + 1 )
            let quantityOrder = listOrder.filter((bo) => new Date(bo?.createdAt).getFullYear() === props.year && new Date(bo?.createdAt).getMonth() + 1 === index + 1 )
            dataBookings.push(quantityBooking.length);
            dataOrders.push(quantityOrder.length);
        });
        setDataChart((preState) => ({
            ...preState,
            dataBooking: dataBookings,
            dataOrder: dataOrders,
        }));
    }, [listBooking,listOrder,props.year]);


    return (
        <Bar options={options} data={data} />
    )
}

export default DashboardBarChart