"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DonutChart from '../components/DonutChart';
import Navbar from '../components/Navbar';
import { useSession } from 'next-auth/react';
import Container from '../components/Container';
import Footer from '../components/Footer';
import OgtagonBox from '../components/OgtagonShape';
import MonthlyDataTable from '../components/MonthlyDataTable';
import CustomLineChart from '../components/CustomLineChart';
import ActionTable from '../components/ActionTable';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, LabelList } from 'recharts';


function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const currentYear = new Date().getFullYear();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const currentMonthIndex = new Date().getMonth();
  const currentMonth = monthNames[currentMonthIndex];

  // Safety
  const [chartData1, setChartData1] = useState([
    { name: '17', value: 10, type: '' },
    { name: '18', value: 10, type: '' },
    { name: '19', value: 10, type: '' },
    { name: '20', value: 10, type: '' },
    { name: '21', value: 10, type: '' },
    { name: '22', value: 10, type: '' },
    { name: '23', value: 10, type: '' },
    { name: '24', value: 10, type: '' },
    { name: '25', value: 10, type: '' },
    { name: '26', value: 10, type: '' },
    { name: '27', value: 10, type: '' },
    { name: '28', value: 10, type: '' },
    { name: '29', value: 10, type: '' },
    { name: '30', value: 10, type: '' },
    { name: '31', value: 10, type: '' },
    { name: '', value: 10, type: '' },
    { name: '', value: 10, type: '' },
    { name: '', value: 10, type: '' },
    { name: '', value: 10, type: '' },
    { name: '1', value: 10, type: 'Upper' },
    { name: '2', value: 10, type: 'Upper' },
    { name: '3', value: 10, type: 'Upper' },
    { name: '4', value: 10, type: 'Upper' },
    { name: '5', value: 10, type: 'Upper' },
    { name: '6', value: 10, type: 'Holiday' },
    { name: '7', value: 10, type: 'Upper' },
    { name: '8', value: 10, type: 'Upper' },
    { name: '9', value: 10, type: 'Upper' },
    { name: '10', value: 10, type: 'Holiday' },
    { name: '11', value: 10, type: 'Upper' },
    { name: '12', value: 10, type: 'Upper' },
    { name: '13', value: 10, type: 'Holiday' },
    { name: '14', value: 10, type: 'Upper' },
    { name: '15', value: 10, type: '' },
    { name: '16', value: 10, type: '' }
  ]);
// Quality
  const [chartData2, setChartData2] = useState([
    { name: '17', value: 10, type: '' },
    { name: '18', value: 10, type: '' },
    { name: '19', value: 10, type: '' },
    { name: '20', value: 10, type: '' },
    { name: '21', value: 10, type: '' },
    { name: '22', value: 10, type: '' },
    { name: '23', value: 10, type: '' },
    { name: '24', value: 10, type: '' },
    { name: '25', value: 10, type: '' },
    { name: '26', value: 10, type: '' },
    { name: '27', value: 10, type: '' },
    { name: '28', value: 10, type: '' },
    { name: '29', value: 10, type: '' },
    { name: '30', value: 10, type: '' },
    { name: '31', value: 10, type: '' },
    { name: '', value: 10, type: '' },
    { name: '', value: 10, type: '' },
    { name: '', value: 10, type: '' },
    { name: '', value: 10, type: '' },
    { name: '1', value: 10, type: 'Upper' },
    { name: '2', value: 10, type: 'Upper' },
    { name: '3', value: 10, type: 'Upper' },
    { name: '4', value: 10, type: 'Upper' },
    { name: '5', value: 10, type: 'Upper' },
    { name: '6', value: 10, type: 'Holiday' },
    { name: '7', value: 10, type: 'Upper' },
    { name: '8', value: 10, type: 'Upper' },
    { name: '9', value: 10, type: 'Upper' },
    { name: '10', value: 10, type: 'Holiday' },
    { name: '11', value: 10, type: 'Upper' },
    { name: '12', value: 10, type: 'Upper' },
    { name: '13', value: 10, type: 'Holiday' },
    { name: '14', value: 10, type: 'Upper' },
    { name: '15', value: 10, type: '' },
    { name: '16', value: 10, type: '' }
  ]);

  //Efficiency
  const [chartData3, setChartData3] = useState([
    { name: '17', value: 10, type: '' },
    { name: '18', value: 10, type: '' },
    { name: '19', value: 10, type: '' },
    { name: '20', value: 10, type: '' },
    { name: '21', value: 10, type: '' },
    { name: '22', value: 10, type: '' },
    { name: '23', value: 10, type: '' },
    { name: '24', value: 10, type: '' },
    { name: '25', value: 10, type: '' },
    { name: '26', value: 10, type: '' },
    { name: '27', value: 10, type: '' },
    { name: '28', value: 10, type: '' },
    { name: '29', value: 10, type: '' },
    { name: '30', value: 10, type: '' },
    { name: '31', value: 10, type: '' },
    { name: '', value: 10, type: '' },
    { name: '', value: 10, type: '' },
    { name: '', value: 10, type: '' },
    { name: '', value: 10, type: '' },
    { name: '1', value: 10, type: 'Upper' },
    { name: '2', value: 10, type: 'Upper' },
    { name: '3', value: 10, type: 'Lower' },
    { name: '4', value: 10, type: 'Lower' },
    { name: '5', value: 10, type: 'Lower' },
    { name: '6', value: 10, type: 'Holiday' },
    { name: '7', value: 10, type: 'Lower' },
    { name: '8', value: 10, type: 'Lower' },
    { name: '9', value: 10, type: 'Lower' },
    { name: '10', value: 10, type: 'Holiday' },
    { name: '11', value: 10, type: 'Lower' },
    { name: '12', value: 10, type: 'Lower' },
    { name: '13', value: 10, type: 'Holiday' },
    { name: '14', value: 10, type: '' },
    { name: '15', value: 10, type: '' },
    { name: '16', value: 10, type: '' }
  ]);

  //Delevery
  const [chartData4, setChartData4] = useState([
    { name: '17', value: 10, type: '' },
    { name: '18', value: 10, type: '' },
    { name: '19', value: 10, type: '' },
    { name: '20', value: 10, type: '' },
    { name: '21', value: 10, type: '' },
    { name: '22', value: 10, type: '' },
    { name: '23', value: 10, type: '' },
    { name: '24', value: 10, type: '' },
    { name: '25', value: 10, type: '' },
    { name: '26', value: 10, type: '' },
    { name: '27', value: 10, type: '' },
    { name: '28', value: 10, type: '' },
    { name: '29', value: 10, type: '' },
    { name: '30', value: 10, type: '' },
    { name: '31', value: 10, type: '' },
    { name: '', value: 10, type: '' },
    { name: '', value: 10, type: '' },
    { name: '', value: 10, type: '' },
    { name: '', value: 10, type: '' },
    { name: '1', value: 10, type: 'Upper' },
    { name: '2', value: 10, type: 'Lower' },
    { name: '3', value: 10, type: 'Upper' },
    { name: '4', value: 10, type: 'Upper' },
    { name: '5', value: 10, type: 'Upper' },
    { name: '6', value: 10, type: 'Holiday' },
    { name: '7', value: 10, type: 'Lower' },
    { name: '8', value: 10, type: 'Upper' },
    { name: '9', value: 10, type: 'Upper' },
    { name: '10', value: 10, type: 'Holiday' },
    { name: '11', value: 10, type: 'Upper' },
    { name: '12', value: 10, type: 'Upper' },
    { name: '13', value: 10, type: 'Holiday' },
    { name: '14', value: 10, type: 'Upper' },
    { name: '15', value: 10, type: '' },
    { name: '16', value: 10, type: '' }
  ]);

  //Environment
  const [chartData5, setChartData5] = useState([
    { name: '17', value: 10, type: '' },
    { name: '18', value: 10, type: '' },
    { name: '19', value: 10, type: '' },
    { name: '20', value: 10, type: '' },
    { name: '21', value: 10, type: '' },
    { name: '22', value: 10, type: '' },
    { name: '23', value: 10, type: '' },
    { name: '24', value: 10, type: '' },
    { name: '25', value: 10, type: '' },
    { name: '26', value: 10, type: '' },
    { name: '27', value: 10, type: '' },
    { name: '28', value: 10, type: '' },
    { name: '29', value: 10, type: '' },
    { name: '30', value: 10, type: '' },
    { name: '31', value: 10, type: '' },
    { name: '', value: 10, type: '' },
    { name: '', value: 10, type: '' },
    { name: '', value: 10, type: '' },
    { name: '', value: 10, type: '' },
    { name: '1', value: 10, type: 'Upper' },
    { name: '2', value: 10, type: 'Upper' },
    { name: '3', value: 10, type: 'Upper' },
    { name: '4', value: 10, type: 'Upper' },
    { name: '5', value: 10, type: 'Upper' },
    { name: '6', value: 10, type: 'Holiday' },
    { name: '7', value: 10, type: 'Upper' },
    { name: '8', value: 10, type: 'Upper' },
    { name: '9', value: 10, type: 'Upper' },
    { name: '10', value: 10, type: 'Upper' },
    { name: '11', value: 10, type: 'Upper' },
    { name: '12', value: 10, type: 'Upper' },
    { name: '13', value: 10, type: 'Upper' },
    { name: '14', value: 10, type: 'Upper' },
    { name: '15', value: 10, type: '' },
    { name: '16', value: 10, type: '' }
  ]);

  //Morale
  const [chartData6, setChartData6] = useState([
    { name: '17', value: 10, type: '' },
    { name: '18', value: 10, type: '' },
    { name: '19', value: 10, type: '' },
    { name: '20', value: 10, type: '' },
    { name: '21', value: 10, type: '' },
    { name: '22', value: 10, type: '' },
    { name: '23', value: 10, type: '' },
    { name: '24', value: 10, type: '' },
    { name: '25', value: 10, type: '' },
    { name: '26', value: 10, type: '' },
    { name: '27', value: 10, type: '' },
    { name: '28', value: 10, type: '' },
    { name: '29', value: 10, type: '' },
    { name: '30', value: 10, type: '' },
    { name: '31', value: 10, type: '' },
    { name: '', value: 10, type: '' },
    { name: '', value: 10, type: '' },
    { name: '', value: 10, type: '' },
    { name: '', value: 10, type: '' },
    { name: '1', value: 10, type: 'Upper' },
    { name: '2', value: 10, type: 'Upper' },
    { name: '3', value: 10, type: 'Upper' },
    { name: '4', value: 10, type: 'Upper' },
    { name: '5', value: 10, type: 'Upper' },
    { name: '6', value: 10, type: 'Holiday' },
    { name: '7', value: 10, type: 'Upper' },
    { name: '8', value: 10, type: 'Upper' },
    { name: '9', value: 10, type: 'Upper' },
    { name: '10', value: 10, type: 'Holiday' },
    { name: '11', value: 10, type: 'Lower' },
    { name: '12', value: 10, type: 'Lower' },
    { name: '13', value: 10, type: 'Holiday' },
    { name: '14', value: 10, type: '' },
    { name: '15', value: 10, type: '' },
    { name: '16', value: 10, type: '' }
  ]);

  //Safety
  const data1 = [
    { name: "02/06/2025", value: 0 },
    { name: "04/06/2025", value: 0 },
    { name: "05/06/2025", value: 0 },
    { name: "06/06/2025", value: 0 },
    { name: "07/06/2025", value: 0 },
    { name: "09/06/2025", value: 0 },
    { name: "10/06/2025", value: 0 },
    { name: "11/06/2025", value: 0 },
    { name: "12/06/2025", value: 0 },
    { name: "13/06/2025", value: 0 },
    { name: "14/06/2025", value: 0 },
    { name: "16/06/2025", value: 0 },
    { name: "17/06/2025", value: 0 },
    { name: "18/06/2025", value: 0 },
    { name: "19/06/2025", value: 0 },
    { name: "20/06/2025", value: 0 },
    { name: "21/06/2025", value: 0 },
    { name: "23/06/2025", value: 0 },
    { name: "24/06/2025", value: 0 },
    { name: "25/06/2025", value: 0 },
    { name: "26/06/2025", value: 0 },
    { name: "27/06/2025", value: 0 },
    { name: "28/06/2025", value: 0 },
    { name: "30/06/2025", value: 0 },
    { name: "01/07/2025", value: 0 },
    { name: "02/07/2025", value: 0 },
    { name: "03/07/2025", value: 0 },
    { name: "04/07/2025", value: 0 },
    { name: "05/07/2025", value: 0 },
    { name: "07/07/2025", value: 0 },
    { name: "08/07/2025", value: 0 },
    { name: "09/07/2025", value: 0 },
    { name: "11/07/2025", value: 0 },
    { name: "12/07/2025", value: 0 },
    { name: "14/07/2025", value: 0 },

  ];

  //Quality
  const data2 = [
    { name: "02/06/2025", value: 1.2 },
    { name: "04/06/2025", value: 1.3 },
    { name: "05/06/2025", value: 1.0 },
    { name: "06/06/2025", value: 1.3 },
    { name: "07/06/2025", value: 2.3 },
    { name: "09/06/2025", value: 1.4 },
    { name: "10/06/2025", value: 1.0 },
    { name: "11/06/2025", value: 1.2 },
    { name: "12/06/2025", value: 1.1 },
    { name: "13/06/2025", value: 0.9 },
    { name: "14/06/2025", value: 1.2 },
    { name: "16/06/2025", value: 1.2 },
    { name: "17/06/2025", value: 1.4 },
    { name: "18/06/2025", value: 1.4 },
    { name: "19/06/2025", value: 1.1 },
    { name: "20/06/2025", value: 0.9 },
    { name: "21/06/2025", value: 1.5 },
    { name: "23/06/2025", value: 1.5 },
    { name: "24/06/2025", value: 1.0 },
    { name: "25/06/2025", value: 2.2 },
    { name: "26/06/2025", value: 1.6 },
    { name: "27/06/2025", value: 1.5 },
    { name: "28/06/2025", value: 1.6 },
    { name: "30/06/2025", value: 1.9 },
    { name: "01/07/2025", value: 1.6 },
    { name: "02/07/2025", value: 2.3 },
    { name: "03/07/2025", value: 2.0 },
    { name: "04/07/2025", value: 1.8 },
    { name: "05/07/2025", value: 1.5 },
    { name: "07/07/2025", value: 1.4 },
    { name: "08/07/2025", value: 1.6 },
    { name: "09/07/2025", value: 1.8 },
    { name: "11/07/2025", value: 1.3 },
    { name: "12/07/2025", value: 1.3 },
    { name: "14/07/2025", value: 1.5 },
  ];

  //Efficiency
  const data3 = [
    { name: "02/06/2025", value: 84.5 },
    { name: "04/06/2025", value: 78.3 },
    { name: "05/06/2025", value: 82.0 },
    { name: "06/06/2025", value: 83.0 },
    { name: "07/06/2025", value: 85.2 },
    { name: "09/06/2025", value: 81.4 },
    { name: "10/06/2025", value: 82.3 },
    { name: "11/06/2025", value: 81.9 },
    { name: "12/06/2025", value: 80.3 },
    { name: "13/06/2025", value: 78.0 },
    { name: "14/06/2025", value: 82.7 },
    { name: "16/06/2025", value: 79.7 },
    { name: "17/06/2025", value: 76.7 },
    { name: "18/06/2025", value: 79.5 },
    { name: "19/06/2025", value: 76.9 },
    { name: "20/06/2025", value: 79.6 },
    { name: "21/06/2025", value: 80.0 },
    { name: "23/06/2025", value: 66.6 },
    { name: "24/06/2025", value: 89.5 },
    { name: "25/06/2025", value: 84.4 },
    { name: "26/06/2025", value: 83.2 },
    { name: "27/06/2025", value: 82.4 },
    { name: "28/06/2025", value: 85.2 },
    { name: "30/06/2025", value: 83.0 },
    { name: "01/07/2025", value: 80.5 },
    { name: "02/07/2025", value: 81.3 },
    { name: "03/07/2025", value: 79.1 },
    { name: "04/07/2025", value: 79.5 },
    { name: "05/07/2025", value: 78.0 },
    { name: "07/07/2025", value: 79.5 },
    { name: "08/07/2025", value: 78.5 },
    { name: "09/07/2025", value: 76.9 },
    { name: "11/07/2025", value: 77.1 },
    { name: "12/07/2025", value: 77.9 },

  ];

  //Delivery
  const data4 = [
    { name: "02/06/2025", value: 18.3 },
    { name: "04/06/2025", value: 18.6 },
    { name: "05/06/2025", value: 18.6 },
    { name: "06/06/2025", value: 17.5 },
    { name: "07/06/2025", value: 18.0 },
    { name: "09/06/2025", value: 16.6 },
    { name: "10/06/2025", value: 17.1 },
    { name: "11/06/2025", value: 16.7 },
    { name: "12/06/2025", value: 17.7 },
    { name: "13/06/2025", value: 16.1 },
    { name: "14/06/2025", value: 16.9 },
    { name: "16/06/2025", value: 15.4 },
    { name: "17/06/2025", value: 16.0 },
    { name: "18/06/2025", value: 15.2 },
    { name: "19/06/2025", value: 13.6 },
    { name: "20/06/2025", value: 14.3 },
    { name: "21/06/2025", value: 15.1 },
    { name: "23/06/2025", value: 16.2 },
    { name: "24/06/2025", value: 15.3 },
    { name: "25/06/2025", value: 15.7 },
    { name: "26/06/2025", value: 15.4 },
    { name: "27/06/2025", value: 16.2 },
    { name: "28/06/2025", value: 15.3 },
    { name: "30/06/2025", value: 17.9 },
    { name: "01/07/2025", value: 15.8 },
    { name: "02/07/2025", value: 15.3 },
    { name: "03/07/2025", value: 15.1 },
    { name: "04/07/2025", value: 14.3 },
    { name: "05/07/2025", value: 15.0 },
    { name: "07/07/2025", value: 15.8 },
    { name: "08/07/2025", value: 15.2 },
    { name: "09/07/2025", value: 15.8 },
    { name: "11/07/2025", value: 16.2 },
    { name: "12/07/2025", value: 12.3 },
    { name: "14/07/2025", value: 13.1 },
  ];

  //Environment
  const data5 = [
    { name: "02/06/2025", value: 56.2 },
    { name: "04/06/2025", value: 60.1 },
    { name: "05/06/2025", value: 62.2 },
    { name: "06/06/2025", value: 59.6 },
    { name: "07/06/2025", value: 53.9 },
    { name: "09/06/2025", value: 60.2 },
    { name: "10/06/2025", value: 56.1 },
    { name: "11/06/2025", value: 55.7 },
    { name: "12/06/2025", value: 54.3 },
    { name: "13/06/2025", value: 55.0 },
    { name: "14/06/2025", value: 49.9 },
    { name: "15/06/2025", value: 11.2 },
    { name: "16/06/2025", value: 54.4 },
    { name: "17/06/2025", value: 57.1 },
    { name: "18/06/2025", value: 56.2 },
    { name: "19/06/2025", value: 59.3 },
    { name: "20/06/2025", value: 55.6 },
    { name: "21/06/2025", value: 51.5 },
    { name: "23/06/2025", value: 54.3 },
    { name: "24/06/2025", value: 53.7 },
    { name: "25/06/2025", value: 56.5 },
    { name: "26/06/2025", value: 54.9 },
    { name: "27/06/2025", value: 56.6 },
    { name: "28/06/2025", value: 37.2 },
    { name: "30/06/2025", value: 59.0 },
    { name: "01/07/2025", value: 59.9 },
    { name: "02/07/2025", value: 60.1 },
    { name: "03/07/2025", value: 56.3 },
    { name: "04/07/2025", value: 56.3 },
    { name: "05/07/2025", value: 54.7 },
    { name: "06/07/2025", value: 48.8 },
    { name: "07/07/2025", value: 57.8 },
    { name: "08/07/2025", value: 63.4 },
    { name: "09/07/2025", value: 57.6 },
    { name: "11/07/2025", value: 56.7 },
    { name: "12/07/2025", value: 50.3 },
    { name: "14/07/2025", value: 54.6 },
  ];

  //Morale
  const data6 = [
    { name: "02/06/2025", value: 83.2 },
    { name: "04/06/2025", value: 93.5 },
    { name: "05/06/2025", value: 95.1 },
    { name: "06/06/2025", value: 96.2 },
    { name: "07/06/2025", value: 92.9 },
    { name: "09/06/2025", value: 93.8 },
    { name: "10/06/2025", value: 94.4 },
    { name: "11/06/2025", value: 95.3 },
    { name: "12/06/2025", value: 94.8 },
    { name: "13/06/2025", value: 95.4 },
    { name: "14/06/2025", value: 93.3 },
    { name: "16/06/2025", value: 91.7 },
    { name: "17/06/2025", value: 95.8 },
    { name: "18/06/2025", value: 96.1 },
    { name: "19/06/2025", value: 96.2 },
    { name: "20/06/2025", value: 95.7 },
    { name: "21/06/2025", value: 93.9 },
    { name: "23/06/2025", value: 94.4 },
    { name: "24/06/2025", value: 96.2 },
    { name: "25/06/2025", value: 95.0 },
    { name: "26/06/2025", value: 94.8 },
    { name: "27/06/2025", value: 94.7 },
    { name: "28/06/2025", value: 91.7 },
    { name: "30/06/2025", value: 90.8 },
    { name: "01/07/2025", value: 94.5 },
    { name: "02/07/2025", value: 95.4 },
    { name: "03/07/2025", value: 95.6 },
    { name: "04/07/2025", value: 95.2 },
    { name: "05/07/2025", value: 92.8 },
    { name: "07/07/2025", value: 93.9 },
    { name: "08/07/2025", value: 95.8 },
    { name: "09/07/2025", value: 94.7 },
    { name: "11/07/2025", value: 89.6 },
    { name: "12/07/2025", value: 88.9 },
  ];

  //Safety maoth table
  const [IFRmonthlyValues, setIFRmonthlyValues] = useState([
    { month: 1, value: 0.00 },
    { month: 2, value: 0.00 },
    { month: 3, value: 0.29 },
    { month: 4, value: 0.29 },
    { month: 5, value: 0.29 },
    { month: 6, value: 0.29 },
    { month: 7, value: null },
    { month: 8, value: null },
    { month: 9, value: null },
    { month: 10, value: null },
    { month: 11, value: null },
    { month: 12, value: null },
  ]);

  //Quality maoth table
  const [QualitymonthlyValues, setQualitymonthlyValues] = useState([
    { month: 1, value: 2.9 },
    { month: 2, value: 4.0 },
    { month: 3, value: 4.2 },
    { month: 4, value: 2.9 },
    { month: 5, value: 1.6 },
    { month: 6, value: 1.3 },
    { month: 7, value: 1.6 },
    { month: 8, value: null },
    { month: 9, value: null },
    { month: 10, value: null },
    { month: 11, value: null },
    { month: 12, value: null },
  ]);

  //Efficiency maoth table
  const [EfficiencytableValue, setEfficiencytableValue] = useState([
    { month: 1, value: 84.8 },
    { month: 2, value: 83.5 },
    { month: 3, value: 80.0 },
    { month: 4, value: 79.2 },
    { month: 5, value: 82.8 },
    { month: 6, value: 81.1 },
    { month: 7, value: 78.9 },
    { month: 8, value: null },
    { month: 9, value: null },
    { month: 10, value: null },
    { month: 11, value: null },
    { month: 12, value: null },
  ]);

  //Delivery maoth table
  const [DeliverymonthlyValues, setDeliverymonthlyValues] = useState([
    { month: 1, value: 20.6 },
    { month: 2, value: 17.6 },
    { month: 3, value: 18.5 },
    { month: 4, value: 23.2 },
    { month: 5, value: 20.0 },
    { month: 6, value: 16.5 },
    { month: 7, value: 15.6 },
    { month: 8, value: null },
    { month: 9, value: null },
    { month: 10, value: null },
    { month: 11, value: null },
    { month: 12, value: null },
  ]);

  //Environment maoth table
  const [EnvironmentmonthlyValues, setEnvironmentmonthlyValues] = useState([
    { month: 1, value: 1.15 },
    { month: 2, value: 1.21 },
    { month: 3, value: 1.40 },
    { month: 4, value: 1.29 },
    { month: 5, value: 1.58 },
    { month: 6, value: 1.39 },
    { month: 7, value: 0.66 },
    { month: 8, value: null },
    { month: 9, value: null },
    { month: 10, value: null },
    { month: 11, value: null },
    { month: 12, value: null },
  ]);

  const [MoralemonthlyValues, setMoralemonthlyValues] = useState([
    { month: 1, value: 93.6 },
    { month: 2, value: 93.5 },
    { month: 3, value: 93.3 },
    { month: 4, value: 92.7 },
    { month: 5, value: 93.3 },
    { month: 6, value: 94.0 },
    { month: 7, value: 94.0 },
    { month: 8, value: null },
    { month: 9, value: null },
    { month: 10, value: null },
    { month: 11, value: null },
    { month: 12, value: null },
  ]);
  
  //IFR Action table
  const IFRhighlightValue = [
    { highlight: "", date: "" },
    { highlight: "", date: "" },
    { highlight: "", date: "" },
  ];

  //Quality Action table
  const QualityhighlightValue = [
    { highlight: "", date: "" },
    { highlight: "", date: "" },
    { highlight: "", date: "" },
  ];

  //Efficiency Action table
  const EfficiencyhighlightValue = [
    { highlight: "", date: "" },
    { highlight: "", date: "" },
    { highlight: "", date: "" },
  ];

  //Delivery Action table
  const DeliveryhighlightValue = [
    { highlight: "", date: "" },
    { highlight: "", date: "" },
    { highlight: "", date: "" },
  ];

  //Environment Action table
  const EnvironmenthighlightValue = [
    { highlight: "", date: "" },
    { highlight: "", date: "" },
    { highlight: "", date: "" },

  ];

  //Morale Action table
  const MoralehighlightValue = [
    { highlight: "", date: "" },
    { highlight: "", date: "" },
    { highlight: "", date: "" },
  ];

  const target1 = 0.59;
  const target2 = 3.0;
  const target3 = 80.5;
  const target4 = 19.0;
  const target5 = 70.0;
  const target6 = 92.0;

  const [IFRtargetTable, setIFRtargetTable] = useState(0.59);
  const [QualitytargetTable, setQualitytargetTable] = useState(3.0);
  const [EfficiencytargetTable, setEfficiencytargetTable] = useState(80.5);
  const [DeliverytargetTable, setDeliverytargetTable] = useState(19.0);
  const [EnvironmenttargetTable, setEnvironmenttargetTable] = useState(70.0);
  const [MoraletargetTable, setMoraletargetTable] = useState(92.0);
  
  // 6. Authentication effect
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  // Auto-refresh every 10 minutes
  useEffect(() => {
    const timeout = setTimeout(() => {
      window.location.reload();
    }, 600000); // 600,000 ms = 10 minutes

    return () => clearTimeout(timeout);
  }, []);
  
  return (
    <main className="w-full">
      <Container>
      {/* <Navbar session={session} /> */}

      <div className='flex flex-col items-center bg-white p-1'>
        <h3 className="w-full text-center font-bold text-2xl">
          DAILY OBEYA DASHBOARD
        </h3>
        <h4 className="w-full text-center font-medium text-1xl">
          ({currentMonth} {currentYear})
        </h4>
      </div>

      <div className="flex flex-col md:flex-row items-top justify-center bg-white-100 p-1">
        <div className="flex-1 min-w-0 py-1">
          <OgtagonBox>
            <div className="flex-1 min-w-0">
              {/* IFR Chart */}
                  <h3 className="text-center font-medium text-ellipsis overflow-hidden whitespace-nowrap" 
                      style={{ 
                        fontFamily: 'Century, serif', 
                        fontWeight: 'bold',
                        fontSize: 'min(max(16pt, 5vw), 16pt)'
                      }}>
                    Safety
                  </h3>
                  <div className="w-full aspect-square p-1 m-0">
                    <DonutChart data={chartData1} rotation={-90} title="Safety" centerText="S" />
                  </div>
                  <div>
                    <h3 className="text-left font-bold text-[8px]">Month (accumulate)</h3>
                  </div>

                  {/* Safety table data by Month */}
                  <div className="w-full overflow-x-auto">
                    <div className="min-w-[60px]">
                      <MonthlyDataTable
                        monthlyValues={IFRmonthlyValues}
                        targetValue={IFRtargetTable}
                        higherIsBetter={false} // For IFR, lower is better
                        decimalPlaces={2}
                      />
                    </div>
                  </div>
                  <hr className='my-1 border-1 border-[#595959]'/>
                  <div className="flex flex-row justify-between text-[10px] text-center font-bold mt-1">
                  <h3 className="flex-20 bg-[#8C8985] text-white p-1 ">TARGET</h3>
                    <h3 className="flex-80 bg-white p-1 text-ellipsis overflow-hidden whitespace-nowrap">IFR ≤0.59</h3>
                </div>

                <div className="flex flex-row justify-between text-[10px] text-center font-bold mt-1">
                  <h3 className="flex-20 bg-[#8C8985] text-white p-1 text-ellipsis overflow-hidden whitespace-nowrap">Injury Frequency Rate (IFR)</h3>
                </div>

                {/* Safety (IFR) chart */}
                <CustomLineChart 
                  data={data1} 
                  targetValue={target1} 
                  yDomain={[0, 1.2]} 
                  decimalPlaces={2} 
                  higherIsBetter={false} 
                  tooltipSuffix="%"
                  daysToShow={7} // Show only the last 7 days
                />

            {/* Safety table data by Action */}
            <div className="flex flex-row justify-between py-1 mb-2">
              <ActionTable highlightValues={IFRhighlightValue} rows={3} />
            </div>
            </div>
          </OgtagonBox>
        </div>
      
      {/* Quality Chart */}
      <div className="relative z-20 flex-1 min-w-0 py-1 -ml-1">
        <OgtagonBox>
      <div className="flex-1 min-w-0">
              <h3 className="text-center font-medium text-ellipsis overflow-hidden whitespace-nowrap" 
                  style={{ 
                    fontFamily: 'Century, serif', 
                    fontWeight: 'bold',
                    fontSize: 'min(max(16pt, 5vw), 16pt)'
                  }}>
                Quality
              </h3>
              <div className="w-full aspect-square p-1 m-0">
                <DonutChart data={chartData2} rotation={-90} centerText="Q" />
              </div>
              <div>
                <h3 className="text-left font-bold text-[8px]">Month (%)</h3>
              </div>

              {/* Quality Monthly Table - Using the imported component */}
            <div className="w-full overflow-x-auto">
              <div className="min-w-[60px]">
                <MonthlyDataTable
                  monthlyValues={QualitymonthlyValues}
                  targetValue={QualitytargetTable}
                  higherIsBetter={false} // For Quality (scrap), lower is better
                  decimalPlaces={1}
                />
              </div>
              </div>
                <hr className='my-1 border-1 border-[#595959]'/>
                <div className="flex flex-row justify-between text-[10px] text-center font-bold mt-1">
                <h3 className="flex-20 bg-[#8C8985] text-white p-1 ">TARGET</h3>
                <h3 className="flex-80 bg-white p-1 text-ellipsis overflow-hidden whitespace-nowrap">Scrap ≤3.0%</h3>
              </div>
            <div className="flex flex-row justify-between text-[10px] text-center font-bold mt-1">
              <h3 className="flex-20 bg-[#8C8985] text-white p-1 text-ellipsis overflow-hidden whitespace-nowrap">Scrap Rate (%)</h3>
            </div>

            <CustomLineChart 
              data={data2} 
              targetValue={target2} 
              yDomain={[0, 6.0]} 
              decimalPlaces={1} 
              higherIsBetter={false} 
              tooltipSuffix="%" 
              daysToShow={7} // Show only the last 7 days
            />

              {/* Quality table data by Action */}
              <div className="flex flex-row justify-between py-1 mb-2">
                <ActionTable highlightValues={QualityhighlightValue} rows={3} />
              </div>
            </div>
        </OgtagonBox>
        </div>

        {/* Efficiency Chart */}
        <div className="relative z-20 flex-1 min-w-0 py-1 -ml-1">
        <OgtagonBox>
        <div className="flex-1 min-w-0">
            <h3 className="text-center font-medium text-ellipsis overflow-hidden whitespace-nowrap" 
                style={{ 
                  fontFamily: 'Century, serif', 
                  fontWeight: 'bold',
                  fontSize: 'min(max(16pt, 5vw), 16pt)'
                }}>
              Efficiency
            </h3>
            <div className="w-full aspect-square p-1 m-0">
              <DonutChart data={chartData3} rotation={-90} centerText="E" />
            </div>
            <div>
              <h3 className="text-left font-bold text-[8px]">Month (%)</h3>
            </div>
            
            {/* Efficiency Monthly Table - Using the imported component */}
            <div className="w-full overflow-x-auto">
              <div className="min-w-[60px]">
                <MonthlyDataTable
                  monthlyValues={EfficiencytableValue}
                  targetValue={EfficiencytargetTable}
                  higherIsBetter={true} // For Efficiency, higher is better
                  decimalPlaces={1}
                />
              </div>
            </div>

            <hr className='my-1 border-1 border-[#595959]'/>
            <div className="flex flex-row justify-between text-[10px] text-center font-bold mt-1">
              <h3 className="flex-20 bg-[#8C8985] text-white p-1 ">TARGET</h3>
              <h3 className="flex-80 bg-white p-1 text-ellipsis overflow-hidden whitespace-nowrap">Efficiency ≥80.5%</h3>
          </div>

          <div className="flex flex-row justify-between text-[10px] text-center font-bold mt-1">
            <h3 className="flex-20 bg-[#8C8985] text-white p-1 text-ellipsis overflow-hidden whitespace-nowrap">Efficiency (%)</h3>
          </div>

          {/* For Efficiency chart */}
          <CustomLineChart 
            data={data3} 
            targetValue={target3} 
            yDomain={[60, 100]} 
            decimalPlaces={1} 
            higherIsBetter={true} 
            tooltipSuffix="%"
            daysToShow={7}
            highlightAboveTarget={true}
          />

          {/* Efficiency table data by Action */}
            <div className="flex flex-row justify-between py-1 mb-2">
              <ActionTable highlightValues={EfficiencyhighlightValue} rows={3} />
            </div>
        </div>
          </OgtagonBox>
        </div>

        <div className="relative z-20 flex-1 min-w-0 py-1 -ml-1">
        <OgtagonBox>
        <div className="flex-1 min-w-0">
            <h3 className="text-center font-medium text-ellipsis overflow-hidden whitespace-nowrap" 
                style={{ 
                  fontFamily: 'Century, serif', 
                  fontWeight: 'bold',
                  fontSize: 'min(max(16pt, 5vw), 16pt)'
                }}>
              Delivery
            </h3>
            <div className="w-full aspect-square p-1 m-0">
              <DonutChart data={chartData4} rotation={-90} centerText="D" />
            </div>
            <div>
              <h3 className="text-left font-bold text-[8px]">Month (day)</h3>
            </div>
            
            {/* Delivery table data by Month */}
            <div className="w-full overflow-x-auto">
              <div className="min-w-[60px]">
                <MonthlyDataTable
                  monthlyValues={DeliverymonthlyValues}
                  targetValue={DeliverytargetTable}
                  higherIsBetter={false} // For Delivery (lead time), lower is better
                  decimalPlaces={1}
                />
              </div>
            </div>
            <hr className='my-1 border-1 border-[#595959]'/>
            <div className="flex flex-row justify-between text-[10px] text-center font-bold mt-1">
            <h3 className="flex-20 bg-[#8C8985] text-white p-1 ">TARGET</h3>
              <h3 className="flex-80 bg-white p-1 text-ellipsis overflow-hidden whitespace-nowrap">MLT ≤19 days</h3>
          </div>

          <div className="flex flex-row justify-between text-[10px] text-center font-bold mt-1">
            <h3 className="flex-20 bg-[#8C8985] text-white p-1 text-ellipsis overflow-hidden whitespace-nowrap">MLT (Carlendar day)</h3>
          </div>

          {/* For Delivery chart */}
          <CustomLineChart 
            data={data4} 
            targetValue={target4} 
            yDomain={[6, 30]} 
            decimalPlaces={1} 
            higherIsBetter={false} 
            tooltipSuffix=" days"
            daysToShow={7} // Show only the last 7 days 
          />

          {/* Delivery table data by Action */}
          <div className="flex flex-row justify-between py-1 mb-2">
            <ActionTable highlightValues={DeliveryhighlightValue} rows={3} />
          </div>

          </div>
          </OgtagonBox>
        </div>

        <div className="relative z-20 flex-1 min-w-0 py-1 -ml-1">
        <OgtagonBox>
        <div className="flex-1 min-w-0">
            <h3 className="text-center font-medium text-ellipsis overflow-hidden whitespace-nowrap" 
                style={{ 
                  fontFamily: 'Century, serif', 
                  fontWeight: 'bold',
                  fontSize: 'min(max(16pt, 5vw), 16pt)'
                }}>
              Environment
            </h3>
            <div className="w-full aspect-square p-1 m-0">
              <DonutChart data={chartData5} rotation={-90} centerText="E" />
            </div>
            <div>
              <h3 className="text-left font-bold text-[8px]">Month (mkWh)</h3>
            </div>
            
            {/* Environment table data by Month */}
            <div className="w-full overflow-x-auto">
              <div className="min-w-[60px]">
                <MonthlyDataTable
                  monthlyValues={EnvironmentmonthlyValues}
                  targetValue={EnvironmenttargetTable}
                  higherIsBetter={false} // For Environment (electricity), lower is better
                  decimalPlaces={2}
                />
              </div>
            </div>

            <hr className='my-1 border-1 border-[#595959]'/>
            <div className="flex flex-row justify-between text-[10px] text-center font-bold mt-1">
            <h3 className="flex-20 bg-[#8C8985] text-white p-1 ">TARGET</h3>
              <h3 className="flex-80 bg-white p-1 text-ellipsis overflow-hidden whitespace-nowrap">Electricity ≤70,000 kWh</h3>
          </div>

          <div className="flex flex-row justify-between text-[10px] text-center font-bold mt-1">
            <h3 className="flex-20 bg-[#8C8985] text-white p-1 text-ellipsis overflow-hidden whitespace-nowrap">Electricity (kWh.)</h3>
          </div>

          {/* For Environment chart */}  
          <CustomLineChart 
            data={data5} 
            targetValue={target5} 
            yDomain={[10, 120]} 
            decimalPlaces={1} 
            higherIsBetter={false} 
            tooltipSuffix=" kWh"
            daysToShow={7} // Show only the last 7 days
          />

          {/* Environment table data by Action */}
          <div className="flex flex-row justify-between py-1 mb-2">
            <ActionTable highlightValues={EnvironmenthighlightValue} rows={3} />
          </div>

          </div>
          </OgtagonBox>
        </div>

        <div className="relative z-20 flex-1 min-w-0 py-1 -ml-1">
        <OgtagonBox>
        <div className="flex-1 min-w-0">
            <h3 className="text-center font-medium text-ellipsis overflow-hidden whitespace-nowrap"  
                style={{ 
                  fontFamily: 'Century, serif', 
                  fontWeight: 'bold',
                  fontSize: 'min(max(16pt, 5vw), 16pt)'
                }}>
              Morale
            </h3>
            <div className="w-full aspect-square p-1 m-0">
              <DonutChart data={chartData6} rotation={-90} centerText="M" />
            </div>
            <div>
              <h3 className="text-left font-bold text-[8px]">Month (%)</h3>
            </div>
            
            {/* Attenance table data by Month */}
            
            <div className="w-full overflow-x-auto">
              <div className="min-w-[60px]">
                <MonthlyDataTable
                  monthlyValues={MoralemonthlyValues}
                  targetValue={MoraletargetTable}
                  higherIsBetter={true} // For Morale (attendance), higher is better
                  decimalPlaces={1}
                />
              </div>
            </div>
           
            <hr className='my-1 border-1 border-[#595959]'/>
            <div className="flex flex-row justify-between text-[10px] text-center font-bold mt-1">
            <h3 className="flex-20 bg-[#8C8985] text-white p-1 ">TARGET</h3>
              <h3 className="flex-80 bg-white p-1 text-ellipsis overflow-hidden whitespace-nowrap">Attendence ≥92%</h3>
          </div>

          <div className="flex flex-row justify-between text-[10px] text-center font-bold mt-1">
            <h3 className="flex-20 bg-[#8C8985] text-white p-1 text-ellipsis overflow-hidden whitespace-nowrap">Attendence (%)</h3>
          </div>

          {/* For Morale chart */} 
          <CustomLineChart 
            data={data6} 
            targetValue={target6} 
            yDomain={[60, 120]} 
            decimalPlaces={1} 
            higherIsBetter={true} 
            tooltipSuffix="%"
            daysToShow={7} // Show only the last 7 days
            highlightAboveTarget={true}
          />

          {/* Morale table data by Action */}
          <div className="flex flex-row justify-between py-1 mb-2">
            <ActionTable highlightValues={MoralehighlightValue} rows={3} />
          </div>
          </div>
          </OgtagonBox>
        </div>
      </div>
      <div className="min-w-full bg-white mt-2">
        <div className="flex flex-row items-center space-x-4 mt-2 mb-4 pl-[10px]">
          <div className="flex items-center space-x-1">
            <div className="w-4 h-4 rounded-full bg-[#00B050]"></div>
            <span className="text-[10px] font-medium">Achieved</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-4 h-4 rounded-full bg-[#FF0000]"></div>
            <span className="text-[10px] font-medium">Not Achieved</span>
          </div>
          <div className="flex items-le space-x-1">
            <div className="w-4 h-4 rounded-full bg-[#575756]"></div>
            <span className="text-[10px] font-medium">Holiday</span>
          </div>
        </div>
      </div>
      <Footer />
    </Container>
    </main>
  );
}

export default DashboardPage