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
    { name: '17', value: 10, type: 'Upper' },
    { name: '18', value: 10, type: 'Upper' },
    { name: '19', value: 10, type: 'Upper' },
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
    { name: '2', value: 10, type: 'Holiday' },
    { name: '3', value: 10, type: 'Upper' },
    { name: '4', value: 10, type: 'Upper' },
    { name: '5', value: 10, type: 'Upper' },
    { name: '6', value: 10, type: 'Upper' },
    { name: '7', value: 10, type: 'Upper' },
    { name: '8', value: 10, type: 'Upper' },
    { name: '9', value: 10, type: 'Holiday' },
    { name: '10', value: 10, type: 'Upper' },
    { name: '11', value: 10, type: 'Upper' },
    { name: '12', value: 10, type: 'Upper' },
    { name: '13', value: 10, type: 'Upper' },
    { name: '14', value: 10, type: 'Upper' },
    { name: '15', value: 10, type: 'Upper' },
    { name: '16', value: 10, type: 'Holiday' }
  ]);

  const data1 = [
    { name: "01/11/2025", value: 0.533 },
    { name: "03/11/2025", value: 0.531 },
    { name: "04/11/2025", value: 0.529 },
    { name: "05/11/2025", value: 0.528 },
    { name: "06/11/2025", value: 0.526 },
    { name: "07/11/2025", value: 0.524 },
    { name: "08/11/2025", value: 0.522 },
    { name: "10/11/2025", value: 0.520 },
    { name: "11/11/2025", value: 0.518 },
    { name: "12/11/2025", value: 0.516 },
    { name: "13/11/2025", value: 0.515 },
    { name: "14/11/2025", value: 0.513 },
    { name: "15/11/2025", value: 0.512 },
    { name: "17/11/2025", value: 0.510 },
    { name: "18/11/2025", value: 0.508 },
    { name: "19/11/2025", value: 0.506 }
  ];

  const [IFRmonthlyValues, setIFRmonthlyValues] = useState([
    { month: 1, value: 0.00 },
    { month: 2, value: 0.00 },
    { month: 3, value: 0.382 },
    { month: 4, value: 0.288  },
    { month: 5, value: 0.222  },
    { month: 6, value: 0.183 },
    { month: 7, value: 0.465 },
    { month: 8, value: 0.404 },
    { month: 9, value: 0.356 },
    { month: 10, value: 0.535 },
    { month: 11, value: 0.506 },
    { month: 12, value: null },
  ]);

  //IFR Action table
  const IFRhighlightValue = [
    { highlight: "พนักงานใหม่ไม่มีความชำนาญและเครื่องไม่มีระบบป้องกัน", date: "03/10/2025" },
    { highlight: "", date: "" },
    { highlight: "", date: "" },
  ];

// Quality
  const [chartData2, setChartData2] = useState([
   { name: '17', value: 10, type: 'Lower' },
    { name: '18', value: 10, type: 'Lower' },
    { name: '19', value: 10, type: 'Upper' },
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
    { name: '2', value: 10, type: 'Holiday' },
    { name: '3', value: 10, type: 'Upper' },
    { name: '4', value: 10, type: 'Upper' },
    { name: '5', value: 10, type: 'Lower' },
    { name: '6', value: 10, type: 'Upper' },
    { name: '7', value: 10, type: 'Upper' },
    { name: '8', value: 10, type: 'Upper' },
    { name: '9', value: 10, type: 'Holiday' },
    { name: '10', value: 10, type: 'Upper' },
    { name: '11', value: 10, type: 'Upper' },
    { name: '12', value: 10, type: 'Upper' },
    { name: '13', value: 10, type: 'Upper' },
    { name: '14', value: 10, type: 'Upper' },
    { name: '15', value: 10, type: 'Upper' },
    { name: '16', value: 10, type: 'Holiday' }
  ]);

  const data2 = [
    { name: "01/11/2025", value: 2.2 },
    { name: "03/11/2025", value: 2.8 },
    { name: "04/11/2025", value: 2.7 },
    { name: "05/11/2025", value: 3.6 },
    { name: "06/11/2025", value: 2.2 },
    { name: "07/11/2025", value: 1.6 },
    { name: "08/11/2025", value: 2.2 },
    { name: "10/11/2025", value: 1.7 },
    { name: "11/11/2025", value: 2.6 },
    { name: "12/11/2025", value: 2.5 },
    { name: "13/11/2025", value: 1.7 },
    { name: "14/11/2025", value: 2.2 },
    { name: "15/11/2025", value: 2.4 },
    { name: "17/11/2025", value: 7.6 },
    { name: "18/11/2025", value: 3.1 },
    { name: "19/11/2025", value: 2.3 }
  ];

  const [QualitymonthlyValues, setQualitymonthlyValues] = useState([
    { month: 1, value: 2.9 },
    { month: 2, value: 4.0 },
    { month: 3, value: 4.2 },
    { month: 4, value: 2.9 },
    { month: 5, value: 1.6 },
    { month: 6, value: 1.3 },
    { month: 7, value: 1.5 },
    { month: 8, value: 1.6 },
    { month: 9, value: 2.4 },
    { month: 10, value: 2.1 },
    { month: 11, value: 2.7 },
    { month: 12, value: null },
  ]);

  const QualityhighlightValue = [
    { highlight: "", date: "" },
    { highlight: "", date: "" },
    { highlight: "", date: "" },
    { highlight: "", date: "" },
  ];

  
  //Efficiency
  const [chartData3, setChartData3] = useState([
   { name: '17', value: 10, type: 'Upper' },
    { name: '18', value: 10, type: 'Lower' },
    { name: '19', value: 10, type: 'Lower' },
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
    { name: '2', value: 10, type: 'Holiday' },
    { name: '3', value: 10, type: 'Upper' },
    { name: '4', value: 10, type: 'Upper' },
    { name: '5', value: 10, type: 'Upper' },
    { name: '6', value: 10, type: 'Upper' },
    { name: '7', value: 10, type: 'Lower' },
    { name: '8', value: 10, type: 'Upper' },
    { name: '9', value: 10, type: 'Holiday' },
    { name: '10', value: 10, type: 'Upper' },
    { name: '11', value: 10, type: 'Upper' },
    { name: '12', value: 10, type: 'Upper' },
    { name: '13', value: 10, type: 'Upper' },
    { name: '14', value: 10, type: 'Lower' },
    { name: '15', value: 10, type: 'Upper' },
    { name: '16', value: 10, type: 'Holiday' }
  ]);
  const data3 = [
    { name: "01/11/2025", value: 83.8 },
    { name: "03/11/2025", value: 82.1 },
    { name: "04/11/2025", value: 83.5 },
    { name: "05/11/2025", value: 83.8 },
    { name: "06/11/2025", value: 81.4 },
    { name: "07/11/2025", value: 79.1 },
    { name: "08/11/2025", value: 83.2 },
    { name: "10/11/2025", value: 81.6 },
    { name: "11/11/2025", value: 80.6 },
    { name: "12/11/2025", value: 80.5 },
    { name: "13/11/2025", value: 81.2 },
    { name: "14/11/2025", value: 78.7 },
    { name: "15/11/2025", value: 82.9 },
    { name: "17/11/2025", value: 80.5 },
    { name: "18/11/2025", value: 79.5 },
    { name: "19/11/2025", value: 78.8 }
  ];

  const [EfficiencytableValue, setEfficiencytableValue] = useState([
    { month: 1, value: 84.8 },
    { month: 2, value: 83.5 },
    { month: 3, value: 80.0 },
    { month: 4, value: 79.2 },
    { month: 5, value: 82.8 },
    { month: 6, value: 81.1 },
    { month: 7, value: 78.5 },
    { month: 8, value: 78.4 },
    { month: 9, value: 81.2 },
    { month: 10, value: 81.4 },
    { month: 11, value: 82.3 },
    { month: 12, value: null },
  ]);

  const EfficiencyhighlightValue = [
    { highlight: "Technical issue", date: "17/10/2025" },
    { highlight: "UNA issue @PRE", date: "17/10/2025" },
    { highlight: "", date: "" },
    { highlight: "", date: "" },
  ];

  //Delevery
  const [chartData4, setChartData4] = useState([
   { name: '17', value: 10, type: 'Upper' },
    { name: '18', value: 10, type: 'Upper' },
    { name: '19', value: 10, type: 'Lower' },
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
    { name: '2', value: 10, type: 'Holiday' },
    { name: '3', value: 10, type: 'Upper' },
    { name: '4', value: 10, type: 'Upper' },
    { name: '5', value: 10, type: 'Upper' },
    { name: '6', value: 10, type: 'Upper' },
    { name: '7', value: 10, type: 'Upper' },
    { name: '8', value: 10, type: 'Upper' },
    { name: '9', value: 10, type: 'Holiday' },
    { name: '10', value: 10, type: 'Upper' },
    { name: '11', value: 10, type: 'Upper' },
    { name: '12', value: 10, type: 'Lower' },
    { name: '13', value: 10, type: 'Upper' },
    { name: '14', value: 10, type: 'Upper' },
    { name: '15', value: 10, type: 'Upper' },
    { name: '16', value: 10, type: 'Holiday' }
  ]);

  const data4 = [
    { name: "01/11/2025", value: 15.7 },
    { name: "03/11/2025", value: 17.4 },
    { name: "04/11/2025", value: 18.1 },
    { name: "05/11/2025", value: 18.6 },
    { name: "06/11/2025", value: 18.3 },
    { name: "07/11/2025", value: 18.0 },
    { name: "08/11/2025", value: 18.4 },
    { name: "10/11/2025", value: 18.5 },
    { name: "11/11/2025", value: 18.6 },
    { name: "12/11/2025", value: 19.2 },
    { name: "13/11/2025", value: 16.7 },
    { name: "14/11/2025", value: 17.1 },
    { name: "15/11/2025", value: 17.2 },
    { name: "17/11/2025", value: 17.9 },
    { name: "18/11/2025", value: 24.8 },
    { name: "19/11/2025", value: 25.4 }
  ];

  const [DeliverymonthlyValues, setDeliverymonthlyValues] = useState([
    { month: 1, value: 20.6 },
    { month: 2, value: 17.6 },
    { month: 3, value: 18.5 },
    { month: 4, value: 23.2 },
    { month: 5, value: 20.0 },
    { month: 6, value: 16.5 },
    { month: 7, value: 16.6 },
    { month: 8, value: 16.8 },
    { month: 9, value: 16.4 },
    { month: 10, value: 17.6 },
    { month: 11, value: 17.8 },
    { month: 12, value: null },
  ]);

  const DeliveryhighlightValue = [
    { highlight: "Technical issue", date: "20/10/2025" },
    { highlight: "UNA issue @PRE", date: "20/10/2025" },
    { highlight: "", date: "" },
    { highlight: "", date: "" },
  ];

  //Environment
  const [chartData5, setChartData5] = useState([
   { name: '17', value: 10, type: 'Upper' },
    { name: '18', value: 10, type: 'Upper' },
    { name: '19', value: 10, type: 'Upper' },
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
    { name: '2', value: 10, type: 'Holiday' },
    { name: '3', value: 10, type: 'Upper' },
    { name: '4', value: 10, type: 'Upper' },
    { name: '5', value: 10, type: 'Upper' },
    { name: '6', value: 10, type: 'Upper' },
    { name: '7', value: 10, type: 'Upper' },
    { name: '8', value: 10, type: 'Upper' },
    { name: '9', value: 10, type: 'Holiday' },
    { name: '10', value: 10, type: 'Upper' },
    { name: '11', value: 10, type: 'Upper' },
    { name: '12', value: 10, type: 'Upper' },
    { name: '13', value: 10, type: 'Upper' },
    { name: '14', value: 10, type: 'Upper' },
    { name: '15', value: 10, type: 'Upper' },
    { name: '16', value: 10, type: 'Holiday' }
  ]);

  const data5 = [
    { name: "01/11/2025", value: 46.9 },
    { name: "03/11/2025", value: 52.7 },
    { name: "04/11/2025", value: 55.6 },
    { name: "05/11/2025", value: 54.0 },
    { name: "06/11/2025", value: 54.4 },
    { name: "07/11/2025", value: 56.3 },
    { name: "08/11/2025", value: 46.4 },
    { name: "10/11/2025", value: 55.8 },
    { name: "11/11/2025", value: 57.9 },
    { name: "12/11/2025", value: 57.4 },
    { name: "13/11/2025", value: 51.5 },
    { name: "14/11/2025", value: 46.3 },
    { name: "15/11/2025", value: 38.7 },
    { name: "17/11/2025", value: 52.0 },
    { name: "18/11/2025", value: 55.0 },
    { name: "19/11/2025", value: 50.6 }
  ];

  const [EnvironmentmonthlyValues, setEnvironmentmonthlyValues] = useState([
    { month: 1, value: 1.15 },
    { month: 2, value: 1.21 },
    { month: 3, value: 1.40 },
    { month: 4, value: 1.29 },
    { month: 5, value: 1.58 },
    { month: 6, value: 1.39 },
    { month: 7, value: 1.45 },
    { month: 8, value: 1.42 },
    { month: 9, value: 1.50 },
    { month: 10, value: 1.41 },
    { month: 11, value: 0.87 },
    { month: 12, value: null },
  ]);

  const EnvironmenthighlightValue = [
    { highlight: "", date: "" },
    { highlight: "", date: "" },
    { highlight: "", date: "" },

  ];

  //Morale
  const [chartData6, setChartData6] = useState([
   { name: '17', value: 10, type: 'Lower' },
    { name: '18', value: 10, type: 'Upper' },
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
    { name: '1', value: 10, type: 'Lower' },
    { name: '2', value: 10, type: 'Holiday' },
    { name: '3', value: 10, type: 'Lower' },
    { name: '4', value: 10, type: 'Upper' },
    { name: '5', value: 10, type: 'Upper' },
    { name: '6', value: 10, type: 'Upper' },
    { name: '7', value: 10, type: 'Upper' },
    { name: '8', value: 10, type: 'Lower' },
    { name: '9', value: 10, type: 'Holiday' },
    { name: '10', value: 10, type: 'Lower' },
    { name: '11', value: 10, type: 'Upper' },
    { name: '12', value: 10, type: 'Upper' },
    { name: '13', value: 10, type: 'Upper' },
    { name: '14', value: 10, type: 'Upper' },
    { name: '15', value: 10, type: 'Lower' },
    { name: '16', value: 10, type: 'Holiday' }
  ]);

  //Morale
  const data6 = [
    { name: "01/11/2025", value: 89.3 },
    { name: "03/11/2025", value: 90.7 },
    { name: "04/11/2025", value: 94.8 },
    { name: "05/11/2025", value: 94.5 },
    { name: "06/11/2025", value: 93.6 },
    { name: "07/11/2025", value: 94.6 },
    { name: "08/11/2025", value: 89.6 },
    { name: "10/11/2025", value: 89.7 },
    { name: "11/11/2025", value: 94.1 },
    { name: "12/11/2025", value: 94.4 },
    { name: "13/11/2025", value: 93.5 },
    { name: "14/11/2025", value: 94.8 },
    { name: "15/11/2025", value: 88.2 },
    { name: "17/11/2025", value: 88.7 },
    { name: "18/11/2025", value: 93.0 },
    { name: "19/11/2025", value: 95.8 }
  ];

  const [MoralemonthlyValues, setMoralemonthlyValues] = useState([
    { month: 1, value: 93.6 },
    { month: 2, value: 93.5 },
    { month: 3, value: 93.3 },
    { month: 4, value: 92.7 },
    { month: 5, value: 93.3 },
    { month: 6, value: 94.0 },
    { month: 7, value: 93.9 },
    { month: 8, value: 94.2 },
    { month: 9, value: 93.8 },
    { month: 10, value: 93.4 },
    { month: 11, value: 91.4 },
    { month: 12, value: null },
  ]);
 
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
              <h3 className="flex-80 bg-white p-1 text-ellipsis overflow-hidden whitespace-nowrap">Efficiency ≥{target3}%</h3>
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
            <h3 className="flex-20 bg-[#8C8985] text-white p-1 text-ellipsis overflow-hidden whitespace-nowrap">MLT (Calendar day)</h3>
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
              <h3 className="flex-80 bg-white p-1 text-ellipsis overflow-hidden whitespace-nowrap">Attendance ≥92%</h3>
          </div>

          <div className="flex flex-row justify-between text-[10px] text-center font-bold mt-1">
            <h3 className="flex-20 bg-[#8C8985] text-white p-1 text-ellipsis overflow-hidden whitespace-nowrap">Attendance (%)</h3>
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
