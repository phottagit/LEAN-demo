"use client";

import React, { useState, useEffect } from 'react';
import DonutChart from '../components/DonutChart';
import Navbar from '../components/Navbar';
import { useSession } from 'next-auth/react';
import Container from '../components/Container';
import Footer from '../components/Footer';
import OgtagonBox from '../components/OgtagonShape';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, LabelList } from 'recharts';
import OgtagonShape from '../components/OgtagonShape';

function SixSigmaPage() {
  const { data: session } = useSession();
  
  // Sample data for the donut chart
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
    { name: '1', value: 10, type: 'Holiday' },
    { name: '2', value: 10, type: 'Upper' },
    { name: '3', value: 10, type: 'Upper' },
    { name: '4', value: 10, type: 'Holiday' },
    { name: '5', value: 10, type: 'Upper' },
    { name: '6', value: 10, type: 'Upper' },
    { name: '7', value: 10, type: 'Upper' },
    { name: '8', value: 10, type: 'Upper' },
    { name: '9', value: 10, type: '' },
    { name: '10', value: 10, type: '' },
    { name: '11', value: 10, type: '' },
    { name: '12', value: 10, type: '' },
    { name: '13', value: 10, type: '' },
    { name: '14', value: 10, type: '' },
    { name: '15', value: 10, type: '' },
    { name: '16', value: 10, type: '' }
  ]);

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
    { name: '1', value: 10, type: 'Holiday' },
    { name: '2', value: 10, type: 'Upper' },
    { name: '3', value: 10, type: 'Upper' },
    { name: '4', value: 10, type: 'Holiday' },
    { name: '5', value: 10, type: 'Upper' },
    { name: '6', value: 10, type: 'Upper' },
    { name: '7', value: 10, type: 'Lower' },
    { name: '8', value: 10, type: 'Upper' },
    { name: '9', value: 10, type: '' },
    { name: '10', value: 10, type: '' },
    { name: '11', value: 10, type: '' },
    { name: '12', value: 10, type: '' },
    { name: '13', value: 10, type: '' },
    { name: '14', value: 10, type: '' },
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
    { name: '1', value: 10, type: 'Holiday' },
    { name: '2', value: 10, type: 'Upper' },
    { name: '3', value: 10, type: 'Upper' },
    { name: '4', value: 10, type: 'Holiday' },
    { name: '5', value: 10, type: 'Upper' },
    { name: '6', value: 10, type: 'Upper' },
    { name: '7', value: 10, type: 'Upper' },
    { name: '8', value: 10, type: 'Upper' },
    { name: '9', value: 10, type: '' },
    { name: '10', value: 10, type: '' },
    { name: '11', value: 10, type: '' },
    { name: '12', value: 10, type: '' },
    { name: '13', value: 10, type: '' },
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
    { name: '1', value: 10, type: 'Holiday' },
    { name: '2', value: 10, type: 'Lower' },
    { name: '3', value: 10, type: 'Lower' },
    { name: '4', value: 10, type: 'Holiday' },
    { name: '5', value: 10, type: 'Lower' },
    { name: '6', value: 10, type: 'Lower' },
    { name: '7', value: 10, type: 'Lower' },
    { name: '8', value: 10, type: 'Lower' },
    { name: '9', value: 10, type: '' },
    { name: '10', value: 10, type: '' },
    { name: '11', value: 10, type: '' },
    { name: '12', value: 10, type: '' },
    { name: '13', value: 10, type: '' },
    { name: '14', value: 10, type: '' },
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
    { name: '1', value: 10, type: 'Holiday' },
    { name: '2', value: 10, type: 'Upper' },
    { name: '3', value: 10, type: 'Upper' },
    { name: '4', value: 10, type: 'Holiday' },
    { name: '5', value: 10, type: 'Upper' },
    { name: '6', value: 10, type: 'Upper' },
    { name: '7', value: 10, type: 'Upper' },
    { name: '8', value: 10, type: 'Upper' },
    { name: '9', value: 10, type: '' },
    { name: '10', value: 10, type: '' },
    { name: '11', value: 10, type: '' },
    { name: '12', value: 10, type: '' },
    { name: '13', value: 10, type: '' },
    { name: '14', value: 10, type: '' },
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
    { name: '1', value: 10, type: 'Holiday' },
    { name: '2', value: 10, type: 'Lower' },
    { name: '3', value: 10, type: 'Lower' },
    { name: '4', value: 10, type: 'Holiday' },
    { name: '5', value: 10, type: 'Lower' },
    { name: '6', value: 10, type: 'Upper' },
    { name: '7', value: 10, type: 'Upper' },
    { name: '8', value: 10, type: 'Upper' },
    { name: '9', value: 10, type: '' },
    { name: '10', value: 10, type: '' },
    { name: '11', value: 10, type: '' },
    { name: '12', value: 10, type: '' },
    { name: '13', value: 10, type: '' },
    { name: '14', value: 10, type: '' },
    { name: '15', value: 10, type: '' },
    { name: '16', value: 10, type: '' }
  ]);

  //Safety
  const data1 = [
    { name: "30/04/2025", value: 0 },
    { name: "02/05/2025", value: 0 },
    { name: "03/05/2025", value: 0 },
    { name: "05/05/2025", value: 0 },
    { name: "06/05/2025", value: 0 },
    { name: "07/05/2025", value: 0 },
    { name: "08/05/2025", value: 0 },
  ];

  //Quality
  const data2 = [
    { name: "30/04/2025", value: 0.7 },
    { name: "02/05/2025", value: 1.3 },
    { name: "03/05/2025", value: 1.6 },
    { name: "05/05/2025", value: 1.0 },
    { name: "06/05/2025", value: 1.7 },
    { name: "07/05/2025", value: 6.4 },
    { name: "08/05/2025", value: 1.6 },
  ];

  //Efficiency
  const data3 = [
    { name: "30/04/2025", value: 82.7 },
    { name: "02/05/2025", value: 83.2 },
    { name: "03/05/2025", value: 86.8 },
    { name: "05/05/2025", value: 86.9 },
    { name: "06/05/2025", value: 85.9 },
    { name: "07/05/2025", value: 84.8 },
    { name: "08/05/2025", value: 84.6 },
  ];

  //Delivery
  const data4 = [
    { name: "30/04/2025", value: 20.0 },
    { name: "02/05/2025", value: 21.0 },
    { name: "03/05/2025", value: 21.5 },
    { name: "05/05/2025", value: 24.4 },
    { name: "06/05/2025", value: 22.9 },
    { name: "07/05/2025", value: 23.0 },
    { name: "08/05/2025", value: 21.7 },
  ];

  //Environment
  const data5 = [
    { name: "30/04/2025", value: 60.2 },
    { name: "02/05/2025", value: 60.2 },
    { name: "03/05/2025", value: 53.1 },
    { name: "05/05/2025", value: 62.0 },
    { name: "06/05/2025", value: 62.0 },
    { name: "07/05/2025", value: 65.6 },
    { name: "08/05/2025", value: 65.2 },
  ];

  //Morale
  const data6 = [
    { name: "30/04/2025", value: 94.2 },
    { name: "02/05/2025", value: 86.7 },
    { name: "03/05/2025", value: 88.6 },
    { name: "05/05/2025", value: 93.9 },
    { name: "06/05/2025", value: 95.2 },
    { name: "07/05/2025", value: 95.6 },
    { name: "08/05/2025", value: 95.4 },
  ];

  //Safety maoth table
  const IFRmonthlyValues = [
    { month: 1, value: 0.00 },
    { month: 2, value: 0.00 },
    { month: 3, value: 0.00 },
    { month: 4, value: 0.00 },
    { month: 5, value: 0.00 },
    { month: 6, value: null },
    { month: 7, value: null },
    { month: 8, value: null },
    { month: 9, value: null },
    { month: 10, value: null },
    { month: 11, value: null },
    { month: 12, value: null },
  ];

  //Quality maoth table
  const QualitymonthlyValues = [
    { month: 1, value: 2.9 },
    { month: 2, value: 4.0 },
    { month: 3, value: 4.2 },
    { month: 4, value: 2.9 },
    { month: 5, value: 2.2 },
    { month: 6, value: null },
    { month: 7, value: null },
    { month: 8, value: null },
    { month: 9, value: null },
    { month: 10, value: null },
    { month: 11, value: null },
    { month: 12, value: null },
  ];

  //Efficiency maoth table
  const EfficiencytableValue = [
    { month: 1, value: 84.8 },
    { month: 2, value: 83.5 },
    { month: 3, value: 80.0 },
    { month: 4, value: 79.2 },
    { month: 5, value: 85.4 },
    { month: 6, value: null },
    { month: 7, value: null },
    { month: 8, value: null },
    { month: 9, value: null },
    { month: 10, value: null },
    { month: 11, value: null },
    { month: 12, value: null },
  ];

  //Delivery maoth table
  const DeliverymonthlyValues = [
    { month: 1, value: 20.6 },
    { month: 2, value: 17.6 },
    { month: 3, value: 18.5 },
    { month: 4, value: 23.2 },
    { month: 5, value: 23.5 },
    { month: 6, value: null },
    { month: 7, value: null },
    { month: 8, value: null },
    { month: 9, value: null },
    { month: 10, value: null },
    { month: 11, value: null },
    { month: 12, value: null },
  ];

  //Environment maoth table
  const EnvironmentmonthlyValues = [
    { month: 1, value: 1.15 },
    { month: 2, value: 1.21 },
    { month: 3, value: 1.40 },
    { month: 4, value: 1.29 },
    { month: 5, value: 0.39 },
    { month: 6, value: null },
    { month: 7, value: null },
    { month: 8, value: null },
    { month: 9, value: null },
    { month: 10, value: null },
    { month: 11, value: null },
    { month: 12, value: null },
  ];

  const MoralemonthlyValues = [
    { month: 1, value: 93.6 },
    { month: 2, value: 93.5 },
    { month: 3, value: 93.3 },
    { month: 4, value: 92.7 },
    { month: 5, value: 92.6 },
    { month: 6, value: null },
    { month: 7, value: null },
    { month: 8, value: null },
    { month: 9, value: null },
    { month: 10, value: null },
    { month: 11, value: null },
    { month: 12, value: null },
  ];
  
  //IFR Action table
  const IFRhighlightValue = [
    { highlight: "", date: "" },
    { highlight: "", date: "" },
    { highlight: "", date: "" },
  ];

  //Quality Action table
  const QualityhighlightValue = [
    { highlight: "Technique issue", date: "7/05/2025" },
    { highlight: "High rework", date: "7/05/2025" },
    { highlight: "Bella Plating issue", date: "7/05/2025" },
  ];

  //Efficiency Action table
  const EfficiencyhighlightValue = [
    { highlight: "", date: "" },
    { highlight: "", date: "" },
    { highlight: "", date: "" },
  ];

  //Delivery Action table
  const DeliveryhighlightValue = [
    { highlight: "High Wip POST efficiency from PLAT", date: "7/05/2025" },
    { highlight: "High WIP: PACK", date: "7/05/2025" },
    { highlight: "High lead time", date: "7/05/2025" },
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

  const IFRtargetTable = 0.0;
  const QualitytargetTable = 3.0;
  const EfficiencytargetTable = 80.5;
  const DeliverytargetTable = 19.0;
  const EnvironmenttargetTable = 70.0;
  const MoraletargetTable = 92.0;
  
  return (
    <main className="w-full">
      <Container>
      <Navbar session={session} />

      <div className='flex flex-col items-center bg-white p-1'>
        <h3 className="w-full text-center font-bold text-2xl">
          DAILY OBEYA DASHBOARD
        </h3>
        <h4 className="w-full text-center font-medium text-1xl">
          (May 2025)
        </h4>
      </div>

      <div className="flex flex-col md:flex-row items-top justify-center bg-white-100 p-1">
      <div className="flex-1 min-w-0 py-1">
        <OgtagonBox>
        <div className="flex-1 min-w-0 py-1">
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
                <DonutChart data={chartData1} rotation={-90} centerText="S" />
              </div>
              <div>
                <h3 className="text-left font-bold text-[6px] p-1">Month (%)</h3>
              </div>

              {/* IFR table data by Month */}
              <div className="w-full overflow-x-auto">
                <div className="min-w-[60px]">
                  <table className="w-full table-fixed border-collapse text-[8px] text-white">
                    <thead className="sticky top-0 bg-gray-100">
                      <tr>
                        {Array.from({ length: 12 }, (_, i) => (
                          <th
                            key={i + 1}
                            className="border-2 border-[#595959] px-[0.1rem] py-[0.1rem] font-bold text-gray-700"
                            style={{ width: '8.33%' }}
                          >
                            {i + 1}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {Array.from({ length: 12 }, (_, i) => {
                          const monthData = IFRmonthlyValues.find(m => m.month === i + 1);
                          const value = monthData ? monthData.value : null;

                          let bgColorClass = '';
                          if (value !== null && value !== undefined) {
                            bgColorClass = value <= IFRtargetTable ? 'bg-[#00B050]' : 'bg-[#FF0000]';
                          }

                          return (
                            <td
                              key={i + 1}
                              className={`border-2 border-[#595959] text-center align-middle ${bgColorClass}`}
                              style={{
                                width: '8.33%',
                                height: 'auto',
                                padding: '0.1rem',
                              }}
                            >
                              {value !== null && value !== undefined ? value.toFixed(1) : '-'}
                            </td>
                          );
                        })}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <hr className='my-1 border-1 border-[#595959]'/>
              <div className="flex flex-row justify-between text-[10px] text-center font-bold mt-1">
              <h3 className="flex-20 bg-[#8C8985] text-white p-1 ">TARGET</h3>
                <h3 className="flex-80 bg-white p-1 text-ellipsis overflow-hidden whitespace-nowrap">IFR ≤0.59%</h3>
            </div>

            <div className="flex flex-row justify-between text-[10px] text-center font-bold mt-1">
              <h3 className="flex-20 bg-[#8C8985] text-white p-1 text-ellipsis overflow-hidden whitespace-nowrap">Injury Frequency Rate (IFR)</h3>
            </div>

            <div className="max-w-4xl">
              <div className="bg-white p-0">
                <div className="h-30 ">
                  <ResponsiveContainer width="100%" height="115%">
                  <LineChart data={data1} margin={{ top: 10, right: 10, left: 1, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="name"
                        type="category"
                        scale="point"
                        tickFormatter={(tick) => tick.split('/')[0].padStart(2, '0')}
                        tick={{ fontSize: 8 }} 
                      />
                      <YAxis width={20} domain={[0, 1.2]} tick={{ fontSize: 8 }} />
                      <Tooltip
                        contentStyle={{ fontSize: '8px' }} 
                        labelStyle={{ fontSize: '8px' }}
                        itemStyle={{ fontSize: '8px' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#151515" 
                        activeDot={{ r: 4 }}
                        dot={(props) => {
                          const { cx, cy, value } = props;
                          return (
                            <circle
                              cx={cx}
                              cy={cy}
                              r={3}
                              fill={value <= 0.59 ? 'green' : 'red'}
                            />
                          );
                        }}
                      >
                      <LabelList
                        dataKey="value"
                        position="top"
                        content={(props) => {
                          const { x, y, value } = props;
                          return (
                            <text
                              x={x}
                              y={y - 4}  // shift upward a little
                              fontSize={8}
                              textAnchor="middle"
                              fill="#000"
                            >
                              {value.toFixed(2)}
                            </text>
                          );
                        }}
                      />
                      </Line>
                      <ReferenceLine
                      y={target1}
                      stroke="black"
                      strokeDasharray="3 3"
                      label={({ viewBox }) => {
                        const { x, width, y } = viewBox;
                        return (
                          <text 
                            x={x + width} 
                            y={y - 5} 
                            fontSize={8} 
                            textAnchor="end" 
                            fill="red"
                          >
                            {target1.toFixed(2)}
                          </text>
                        );
                      }}
                    />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Safety table data by Action */}
            <div className="flex flex-row justify-between py-1 mb-2">
              <div className="min-w-[60px]">
                <table className="w-full table-fixed border-2 border-collapse text-[8px] bg-white">
                  <thead className="sticky top-0 font-bold bg-gray-100">
                    <tr>
                      <th
                        className="border border-[#595959] px-[0.1rem] py-[0.1rem]"
                        style={{ width: '80%' }}
                      >
                        Highlight
                      </th>
                      <th
                        className="border-2 border-[#595959] px-[0.1rem] py-[0.1rem]"
                        style={{ width: '20%' }}
                      >
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                  {IFRhighlightValue.map((item, index) => (
                    <tr key={index} style={{ height: '20px' }}>
                      <td
                        className="border-2 border-[#595959] align-middle"
                        style={{
                          width: '80%',
                          padding: '0.2rem', // slightly more padding for balance
                          height: 'auto',
                        }}
                      >
                        {item.highlight}
                      </td>
                      <td
                        className="border-2 border-[#595959] text-center align-middle"
                        style={{
                          width: '20%',
                          padding: '0.2rem',
                          height: 'auto',
                        }}
                      >
                        {item.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
                </table>
              </div>
            </div>
            </div>
          </OgtagonBox>
        </div>
      
      {/* Quality Chart */}
      <div className="relative z-20 flex-1 min-w-0 py-1 -ml-1">
        <OgtagonBox>
      <div className="flex-1 min-w-0 py-1">
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
                <h3 className="text-left font-bold text-[6px] p-1">Month (%)</h3>
              </div>

              {/* Quality table data by Month */}
              <div className="w-full overflow-x-auto">
                <div className="min-w-[60px]">
                  <table className="w-full table-fixed border-collapse text-[8px] text-white">
                    <thead className="sticky top-0 bg-gray-100">
                      <tr>
                        {Array.from({ length: 12 }, (_, i) => (
                          <th
                            key={i + 1}
                            className="border-2 border-[#595959] px-[0.1rem] py-[0.1rem] font-bold text-gray-700"
                            style={{ width: '8.33%' }}
                          >
                            {i + 1}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {Array.from({ length: 12 }, (_, i) => {
                          const monthData = QualitymonthlyValues.find(m => m.month === i + 1);
                          const value = monthData ? monthData.value : null;

                          let bgColorClass = '';
                          if (value !== null && value !== undefined) {
                            bgColorClass = value <= QualitytargetTable ? 'bg-[#00B050]' : 'bg-[#FF0000]';
                          }

                          return (
                            <td
                              key={i + 1}
                              className={`border-2 border-[#595959] text-center align-middle ${bgColorClass}`}
                              style={{
                                width: '8.33%',
                                height: 'auto',
                                padding: '0.1rem',
                              }}
                            >
                              {value !== null && value !== undefined ? value.toFixed(1) : '-'}
                            </td>
                          );
                        })}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <hr className='my-1 border-1 border-[#595959]'/>
              <div className="flex flex-row justify-between text-[10px] text-center font-bold mt-1">
              <h3 className="flex-20 bg-[#8C8985] text-white p-1 ">TARGET</h3>
                <h3 className="flex-80 bg-white p-1 text-ellipsis overflow-hidden whitespace-nowrap">Scrap ≤3.0%%</h3>
            </div>

            <div className="flex flex-row justify-between text-[10px] text-center font-bold mt-1">
              <h3 className="flex-20 bg-[#8C8985] text-white p-1 text-ellipsis overflow-hidden whitespace-nowrap">Scrap Rate (%)</h3>
            </div>

            <div className="max-w-4xl">
              <div className="bg-white p-0">
                <div className="h-30 ">
                  <ResponsiveContainer width="100%" height="115%">
                  <LineChart data={data2} margin={{ top: 10, right: 10, left: 1, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="name"
                        type="category"
                        scale="point"
                        tickFormatter={(tick) => tick.split('/')[0].padStart(2, '0')}
                        tick={{ fontSize: 8 }} 
                      />
                      <YAxis width={20} domain={[0, 6.0]} tick={{ fontSize: 8 }} />
                      <Tooltip
                        contentStyle={{ fontSize: '8px' }} 
                        labelStyle={{ fontSize: '8px' }}
                        itemStyle={{ fontSize: '8px' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#151515" 
                        activeDot={{ r: 4 }}
                        dot={(props) => {
                          const { cx, cy, value } = props;
                          return (
                            <circle
                              cx={cx}
                              cy={cy}
                              r={3}
                              fill={value <= 3.0 ? 'green' : 'red'}
                            />
                          );
                        }}
                      >
                      <LabelList
                        dataKey="value"
                        position="top"
                        content={(props) => {
                          const { x, y, value } = props;
                          return (
                            <text
                              x={x}
                              y={y - 4}  // shift upward a little
                              fontSize={8}
                              textAnchor="middle"
                              fill="#000"
                            >
                              {value.toFixed(1)}
                            </text>
                          );
                        }}
                      />
                      </Line>
                      <ReferenceLine
                      y={target2}
                      stroke="black"
                      strokeDasharray="3 3"
                      label={({ viewBox }) => {
                        const { x, width, y } = viewBox;
                        return (
                          <text 
                            x={x + width} 
                            y={y - 5} 
                            fontSize={8} 
                            textAnchor="end" 
                            fill="red"
                          >
                            {target2.toFixed(2)}
                          </text>
                        );
                      }}
                    />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>


            {/* Quality table data by Action */}
            <div className="flex flex-row justify-between py-1 mb-2">
              <div className="min-w-[60px] ">
                <table className="w-full table-fixed border-collapse bg-white" style={{ fontSize: '8px' }}>
                  <thead className="sticky top-0 font-bold border-2 border-[#595959] bg-gray-100">
                    <tr>
                      <th
                        className="px-[0.1rem] py-[0.1rem]"
                        style={{ width: '80%' }}
                      >
                        Highlight
                      </th>
                      <th
                        className="border-2 border-[#595959] px-[0.1rem] py-[0.1rem]"
                        style={{ width: '20%' }}
                      >
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                  {QualityhighlightValue.map((item, index) => (
                    <tr key={index} style={{ height: '20px' }}>
                      <td
                        className="border-2 border-[#595959] align-middle"
                        style={{
                          width: '80%',
                          padding: '0.2rem', // slightly more padding for balance
                          height: 'auto',
                        }}
                      >
                        {item.highlight}
                      </td>
                      <td
                        className="border-2 border-[#595959] text-center align-middle"
                        style={{
                          width: '20%',
                          padding: '0.2rem',
                          height: 'auto',
                        }}
                      >
                        {item.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
                </table>
              </div>
            </div>
            </div>
          </OgtagonBox>
        </div>

        {/* Efficiency Chart */}
        <div className="relative z-20 flex-1 min-w-0 py-1 -ml-1">
        <OgtagonBox>
        <div className="flex-1 min-w-0 py-1">
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
              <h3 className="text-left font-bold text-[6px] p-1">Month (%)</h3>
            </div>
            
            {/* Efficiency table data by Month */}
            <div className="w-full overflow-x-auto">
              <div className="min-w-[60px]">
                <table className="w-full table-fixed border-collapse text-[8px] text-white">
                  <thead className="sticky top-0 bg-gray-100">
                    <tr>
                      {Array.from({ length: 12 }, (_, i) => (
                        <th
                          key={i + 1}
                          className="border-2 border-[#595959] px-[0.1rem] py-[0.1rem] font-bold text-gray-700"
                          style={{ width: '8.33%' }}
                        >
                          {i + 1}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {Array.from({ length: 12 }, (_, i) => {
                        const monthData = EfficiencytableValue.find(m => m.month === i + 1);
                        const value = monthData ? monthData.value : null;

                        let bgColorClass = '';
                        if (value !== null && value !== undefined) {
                          bgColorClass = value >= EfficiencytargetTable ? 'bg-[#00B050]' : 'bg-[#FF0000]';
                        }

                        return (
                          <td
                            key={i + 1}
                            className={`border-2 border-[#595959] text-center align-middle ${bgColorClass}`}
                            style={{
                              width: '8.33%',
                              height: 'auto',
                              padding: '0.1rem',
                            }}
                          >
                            {value !== null && value !== undefined ? value.toFixed(1) : '-'}
                          </td>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
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

          <div className="max-w-4xl">
            <div className="bg-white p-0">
              <div className="h-30 ">
                <ResponsiveContainer width="100%" height="115%">
                <LineChart data={data3} margin={{ top: 10, right: 10, left: 1, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      type="category"
                      scale="point"
                      tickFormatter={(tick) => tick.split('/')[0].padStart(2, '0')}
                      tick={{ fontSize: 8 }} 
                    />
                    <YAxis width={20} domain={[60, 100]} tick={{ fontSize: 8 }} />
                    <Tooltip
                      contentStyle={{ fontSize: '8px' }} 
                      labelStyle={{ fontSize: '8px' }}
                      itemStyle={{ fontSize: '8px' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#151515" 
                      activeDot={{ r: 4 }}
                      dot={(props) => {
                        const { cx, cy, value } = props;
                        return (
                          <circle
                            cx={cx}
                            cy={cy}
                            r={3}
                            fill={value <= 80.5 ? 'red' : 'green'}
                          />
                        );
                      }}
                    >
                    <LabelList
                      dataKey="value"
                      position="top"
                      content={(props) => {
                        const { x, y, value } = props;
                        return (
                          <text
                            x={x}
                            y={y - 4}  // shift upward a little
                            fontSize={8}
                            textAnchor="middle"
                            fill="#000"
                          >
                            {value.toFixed(1)}
                          </text>
                        );
                      }}
                    />
                    </Line>
                    <ReferenceLine
                    y={target3}
                    stroke="black"
                    strokeDasharray="3 3"
                    label={({ viewBox }) => {
                      const { x, width, y } = viewBox;
                      return (
                        <text 
                          x={x + width} 
                          y={y - 5} 
                          fontSize={8} 
                          textAnchor="end" 
                          fill="red"
                        >
                          {target3.toFixed(1)}
                        </text>
                      );
                    }}
                  />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Efficiency table data by Action */}
          <div className="flex flex-row justify-between py-1 mb-2">
            <div className="min-w-[60px]">
              <table className="w-full table-fixed border-collapse text-[8px] bg-white ">
                <thead className="sticky top-0 font-bold bg-gray-100 border-2 border-[#595959]">
                  <tr>
                    <th
                      className="px-[0.1rem] py-[0.1rem]"
                      style={{ width: '80%' }}
                    >
                      Highlight
                    </th>
                    <th
                      className="border-2 border-[#595959] px-[0.1rem] py-[0.1rem]"
                      style={{ width: '20%' }}
                    >
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                {EfficiencyhighlightValue.map((item, index) => (
                  <tr key={index} style={{ height: '20px' }}>
                    <td
                      className="border-2 border-[#595959] align-middle"
                      style={{
                        width: '80%',
                        padding: '0.2rem', // slightly more padding for balance
                        height: 'auto',
                      }}
                    >
                      {item.highlight}
                    </td>
                    <td
                      className="border-2 border-[#595959] text-center align-middle"
                      style={{
                        width: '20%',
                        padding: '0.2rem',
                        height: 'auto',
                      }}
                    >
                      {item.date}
                    </td>
                  </tr>
                ))}
              </tbody>
              </table>
            </div>
          </div>
        </div>
          </OgtagonBox>
        </div>

        <div className="relative z-20 flex-1 min-w-0 py-1 -ml-1">
        <OgtagonBox>
        <div className="flex-1 min-w-0 py-1">
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
              <h3 className="text-left font-bold text-[6px] p-1">Month (day)</h3>
            </div>
            
            {/* Delivery table data by Month */}
            <table className="w-full table-fixed border-collapse text-[8px] text-white">
              <thead className="sticky top-0 bg-gray-100">
                <tr>
                  {Array.from({ length: 12 }, (_, i) => (
                    <th
                      key={i + 1}
                      className="border-2 border-[#595959] px-[0.1rem] py-[0.1rem] font-bold text-gray-700"
                      style={{ width: '8.33%' }} // 100 / 12 ≈ 8.33%
                    >
                      {i + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {Array.from({ length: 12 }, (_, i) => {
                    const monthData = DeliverymonthlyValues.find(m => m.month === i + 1);
                    const value = monthData ? monthData.value : null;

                    let bgColorClass = '';
                    if (value !== null && value !== undefined) {
                      bgColorClass = value <= DeliverytargetTable ? 'bg-[#00B050]' : 'bg-[#FF0000]';
                    }

                    return (
                      <td
                        key={i + 1}
                        className={`border-2 border-[#595959] text-center align-middle ${bgColorClass}`}
                        style={{
                          width: '8.33%',    // ให้แต่ละ column เท่า ๆ
                          height: 'auto',    // ความสูง fix (ไม่ลดได้)
                          padding: '0.1rem',
                        }}
                      >
                        {value !== null && value !== undefined ? value.toFixed(1) : '-'}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
            <hr className='my-1 border-1 border-[#595959]'/>
            <div className="flex flex-row justify-between text-[10px] text-center font-bold mt-1">
            <h3 className="flex-20 bg-[#8C8985] text-white p-1 ">TARGET</h3>
              <h3 className="flex-80 bg-white p-1 text-ellipsis overflow-hidden whitespace-nowrap">MLT ≤19 days</h3>
          </div>

          <div className="flex flex-row justify-between text-[10px] text-center font-bold mt-1">
            <h3 className="flex-20 bg-[#8C8985] text-white p-1 text-ellipsis overflow-hidden whitespace-nowrap">MLT (Carlendar day)</h3>
          </div>

          <div className="max-w-4xl">
            <div className="bg-white p-0">
              <div className="h-30 ">
                <ResponsiveContainer width="100%" height="115%">
                <LineChart data={data4} margin={{ top: 10, right: 10, left: 1, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      type="category"
                      scale="point"
                      tickFormatter={(tick) => tick.split('/')[0].padStart(2, '0')}
                      tick={{ fontSize: 8 }} 
                    />
                    <YAxis width={20} domain={[6, 30]} tick={{ fontSize: 8 }} />
                    <Tooltip
                      contentStyle={{ fontSize: '8px' }} 
                      labelStyle={{ fontSize: '8px' }}
                      itemStyle={{ fontSize: '8px' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#151515" 
                      activeDot={{ r: 4 }}
                      dot={(props) => {
                        const { cx, cy, value } = props;
                        return (
                          <circle
                            cx={cx}
                            cy={cy}
                            r={3}
                            fill={value <= 19.0 ? 'green' : 'red'}
                          />
                        );
                      }}
                    >
                    <LabelList
                      dataKey="value"
                      position="top"
                      content={(props) => {
                        const { x, y, value } = props;
                        return (
                          <text
                            x={x}
                            y={y - 4}  // shift upward a little
                            fontSize={8}
                            textAnchor="middle"
                            fill="#000"
                          >
                            {value.toFixed(1)}
                          </text>
                        );
                      }}
                    />
                    </Line>
                    <ReferenceLine
                    y={target4}
                    stroke="black"
                    strokeDasharray="3 3"
                    label={({ viewBox }) => {
                      const { x, width, y } = viewBox;
                      return (
                        <text 
                          x={x + width} 
                          y={y - 5} 
                          fontSize={8} 
                          textAnchor="end" 
                          fill="red"
                        >
                          {target4.toFixed(1)}
                        </text>
                      );
                    }}
                  />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Delivery table data by Action */}
          <div className="flex flex-row justify-between py-1 mb-2">
            <div className="min-w-[60px]">
              <table className="w-full table-fixed border-collapse text-[8px] bg-white">
                <thead className="sticky top-0 font-bold bg-gray-100 border-2 border-[#595959]">
                  <tr>
                    <th
                      className="px-[0.1rem] py-[0.1rem]"
                      style={{ width: '80%' }}
                    >
                      Highlight
                    </th>
                    <th
                      className="border-2 border-[#595959] px-[0.1rem] py-[0.1rem]"
                      style={{ width: '20%' }}
                    >
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                {DeliveryhighlightValue.map((item, index) => (
                  <tr key={index} style={{ height: '20px' }}>
                    <td
                      className="border-2 border-[#595959] align-middle"
                      style={{
                        width: '80%',
                        padding: '0.2rem', // slightly more padding for balance
                        height: 'auto',
                      }}
                    >
                      {item.highlight}
                    </td>
                    <td
                      className="border-2 border-[#595959] text-center align-middle"
                      style={{
                        width: '20%',
                        padding: '0.2rem',
                        height: 'auto',
                      }}
                    >
                      {item.date}
                    </td>
                  </tr>
                ))}
              </tbody>
              </table>
            </div>
          </div>
          </div>
          </OgtagonBox>
        </div>

        <div className="relative z-20 flex-1 min-w-0 py-1 -ml-1">
        <OgtagonBox>
        <div className="flex-1 min-w-0 py-1">
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
              <h3 className="text-left font-bold text-[6px] p-1">Month (mkWh)</h3>
            </div>
            
            {/* Environment table data by Month */}
            <table className="w-full table-fixed border-collapse text-[8px] text-white">
              <thead className="sticky top-0 bg-gray-100">
                <tr>
                  {Array.from({ length: 12 }, (_, i) => (
                    <th
                      key={i + 1}
                      className="border-2 border-[#595959] px-[0.1rem] py-[0.1rem] font-bold text-gray-700"
                      style={{ width: '8.33%' }} // 100 / 12 ≈ 8.33%
                    >
                      {i + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {Array.from({ length: 12 }, (_, i) => {
                    const monthData = EnvironmentmonthlyValues.find(m => m.month === i + 1);
                    const value = monthData ? monthData.value : null;

                    let bgColorClass = '';
                    if (value !== null && value !== undefined) {
                      bgColorClass = value <= EnvironmenttargetTable ? 'bg-[#00B050]' : 'bg-[#FF0000]';
                    }

                    return (
                      <td
                        key={i + 1}
                        className={`border-2 border-[#595959] text-center align-middle ${bgColorClass}`}
                        style={{
                          width: '8.33%',    // ให้แต่ละ column เท่า ๆ
                          height: 'auto',    // ความสูง fix (ไม่ลดได้)
                          padding: '0.1rem',
                        }}
                      >
                        {value !== null && value !== undefined ? value.toFixed(1) : '-'}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
            <hr className='my-1 border-1 border-[#595959]'/>
            <div className="flex flex-row justify-between text-[10px] text-center font-bold mt-1">
            <h3 className="flex-20 bg-[#8C8985] text-white p-1 ">TARGET</h3>
              <h3 className="flex-80 bg-white p-1 text-ellipsis overflow-hidden whitespace-nowrap">Electricity ≤70,000 kWh</h3>
          </div>

          <div className="flex flex-row justify-between text-[10px] text-center font-bold mt-1">
            <h3 className="flex-20 bg-[#8C8985] text-white p-1 text-ellipsis overflow-hidden whitespace-nowrap">Electricity (kWh.)</h3>
          </div>

          <div className="max-w-4xl">
            <div className="bg-white p-0">
              <div className="h-30 ">
                <ResponsiveContainer width="100%" height="115%">
                <LineChart data={data5} margin={{ top: 10, right: 10, left: 1, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      type="category"
                      scale="point"
                      tickFormatter={(tick) => tick.split('/')[0].padStart(2, '0')}
                      tick={{ fontSize: 8 }} 
                    />
                    <YAxis width={20} domain={[10, 120]} tick={{ fontSize: 8 }} />
                    <Tooltip
                      contentStyle={{ fontSize: '8px' }} 
                      labelStyle={{ fontSize: '8px' }}
                      itemStyle={{ fontSize: '8px' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#151515" 
                      activeDot={{ r: 4 }}
                      dot={(props) => {
                        const { cx, cy, value } = props;
                        return (
                          <circle
                            cx={cx}
                            cy={cy}
                            r={3}
                            fill={value <= 70.0 ? 'green' : 'red'}
                          />
                        );
                      }}
                    >
                    <LabelList
                      dataKey="value"
                      position="top"
                      content={(props) => {
                        const { x, y, value } = props;
                        return (
                          <text
                            x={x}
                            y={y - 4}  // shift upward a little
                            fontSize={8}
                            textAnchor="middle"
                            fill="#000"
                          >
                            {value.toFixed(1)}
                          </text>
                        );
                      }}
                    />
                    </Line>
                    <ReferenceLine
                    y={target5}
                    stroke="black"
                    strokeDasharray="3 3"
                    label={({ viewBox }) => {
                      const { x, width, y } = viewBox;
                      return (
                        <text 
                          x={x + width} 
                          y={y - 5} 
                          fontSize={8} 
                          textAnchor="end" 
                          fill="red"
                        >
                          {target5.toFixed(1)}
                        </text>
                      );
                    }}
                  />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Environment table data by Action */}
          <div className="flex flex-row justify-between py-1 mb-2">
            <div className="min-w-[60px]">
              <table className="w-full table-fixed border-collapse text-[8px] bg-white border-2 border-[#595959]">
                <thead className="sticky top-0 font-bold bg-gray-100">
                  <tr>
                    <th
                      className="px-[0.1rem] py-[0.1rem]"
                      style={{ width: '80%' }}
                    >
                      Highlight
                    </th>
                    <th
                      className="border-2 border-[#595959] px-[0.1rem] py-[0.1rem]"
                      style={{ width: '20%' }}
                    >
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                {EnvironmenthighlightValue.map((item, index) => (
                  <tr key={index} style={{ height: '20px' }}>
                    <td
                      className="border-2 border-[#595959] align-middle"
                      style={{
                        width: '80%',
                        padding: '0.2rem', // slightly more padding for balance
                        height: 'auto',
                      }}
                    >
                      {item.highlight}
                    </td>
                    <td
                      className="border-2 border-[#595959] text-center align-middle"
                      style={{
                        width: '20%',
                        padding: '0.2rem',
                        height: 'auto',
                      }}
                    >
                      {item.date}
                    </td>
                  </tr>
                ))}
              </tbody>
              </table>
            </div>
          </div>

          </div>
          </OgtagonBox>
        </div>

        <div className="relative z-20 flex-1 min-w-0 py-1 -ml-1">
        <OgtagonBox>
        <div className="flex-1 min-w-0 py-1">
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
              <h3 className="text-left font-bold text-[6px] p-1">Month (%)</h3>
            </div>
            
            {/* Attenance table data by Month */}
            <table className="w-full table-fixed border-collapse text-[8px] text-white">
              <thead className="sticky top-0 bg-gray-100">
                <tr>
                  {Array.from({ length: 12 }, (_, i) => (
                    <th
                      key={i + 1}
                      className="border-2 border-[#595959] px-[0.1rem] py-[0.1rem] font-bold text-gray-700"
                      style={{ width: '8.33%' }} // 100 / 12 ≈ 8.33%
                    >
                      {i + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {Array.from({ length: 12 }, (_, i) => {
                    const monthData = MoralemonthlyValues.find(m => m.month === i + 1);
                    const value = monthData ? monthData.value : null;

                    let bgColorClass = '';
                    if (value !== null && value !== undefined) {
                      bgColorClass = value >= MoraletargetTable ? 'bg-[#00B050]' : 'bg-[#FF0000]';
                    }

                    return (
                      <td
                        key={i + 1}
                        className={`border-2 border-[#595959] text-center align-middle ${bgColorClass}`}
                        style={{
                          width: '8.33%',    // ให้แต่ละ column เท่า ๆ
                          height: 'auto',    // ความสูง fix (ไม่ลดได้)
                          padding: '0.1rem',
                        }}
                      >
                        {value !== null && value !== undefined ? value.toFixed(1) : '-'}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
            <hr className='my-1 border-1 border-[#595959]'/>
            <div className="flex flex-row justify-between text-[10px] text-center font-bold mt-1">
            <h3 className="flex-20 bg-[#8C8985] text-white p-1 ">TARGET</h3>
              <h3 className="flex-80 bg-white p-1 text-ellipsis overflow-hidden whitespace-nowrap">Attendence ≥92%</h3>
          </div>

          <div className="flex flex-row justify-between text-[10px] text-center font-bold mt-1">
            <h3 className="flex-20 bg-[#8C8985] text-white p-1 text-ellipsis overflow-hidden whitespace-nowrap">Attendence (%)</h3>
          </div>

          <div className="max-w-4xl">
            <div className="bg-white p-0">
              <div className="h-30 ">
                <ResponsiveContainer width="100%" height="115%">
                <LineChart data={data6} margin={{ top: 10, right: 10, left: 1, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      type="category"
                      scale="point"
                      tickFormatter={(tick) => tick.split('/')[0].padStart(2, '0')}
                      tick={{ fontSize: 8 }} 
                    />
                    <YAxis width={20} domain={[60, 120]} tick={{ fontSize: 8 }} />
                    <Tooltip
                      contentStyle={{ fontSize: '8px' }} 
                      labelStyle={{ fontSize: '8px' }}
                      itemStyle={{ fontSize: '8px' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#151515" 
                      activeDot={{ r: 4 }}
                      dot={(props) => {
                        const { cx, cy, value } = props;
                        return (
                          <circle
                            cx={cx}
                            cy={cy}
                            r={3}
                            fill={value <= 92.0 ? 'red' : 'green'}
                          />
                        );
                      }}
                    >
                    <LabelList
                      dataKey="value"
                      position="top"
                      content={(props) => {
                        const { x, y, value } = props;
                        return (
                          <text
                            x={x}
                            y={y - 4}  // shift upward a little
                            fontSize={8}
                            textAnchor="middle"
                            fill="#000"
                          >
                            {value.toFixed(1)}
                          </text>
                        );
                      }}
                    />
                    </Line>
                    <ReferenceLine
                    y={target6}
                    stroke="black"
                    strokeDasharray="3 3"
                    label={({ viewBox }) => {
                      const { x, width, y } = viewBox;
                      return (
                        <text 
                          x={x + width} 
                          y={y - 5} 
                          fontSize={8} 
                          textAnchor="end" 
                          fill="red"
                        >
                          {target6.toFixed(1)}
                        </text>
                      );
                    }}
                  />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Morale table data by Action */}
          <div className="flex flex-row justify-between py-1 mb-2">
            <div className="min-w-[60px]">
              <table className="w-full table-fixed border-collapse text-[8px] bg-white border-2 border-[#595959]">
                <thead className="sticky top-0 font-bold bg-gray-100">
                  <tr>
                    <th
                      className="px-[0.1rem] py-[0.1rem]"
                      style={{ width: '80%' }}
                    >
                      Highlight
                    </th>
                    <th
                      className="border-2 border-[#595959] px-[0.1rem] py-[0.1rem]"
                      style={{ width: '20%' }}
                    >
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                {MoralehighlightValue.map((item, index) => (
                  <tr key={index} style={{ height: '20px' }}>
                    <td
                      className="border-2 border-[#595959] align-middle"
                      style={{
                        width: '80%',
                        padding: '0.2rem', // slightly more padding for balance
                        height: 'auto',
                      }}
                    >
                      {item.highlight}
                    </td>
                    <td
                      className="border-2 border-[#595959] text-center align-middle"
                      style={{
                        width: '20%',
                        padding: '0.2rem',
                        height: 'auto',
                      }}
                    >
                      {item.date}
                    </td>
                  </tr>
                ))}
              </tbody>
              </table>
            </div>
          </div>
          </div>
          </OgtagonBox>
        </div>
      </div>

      <div className="flex flex-row items-center space-x-4 mt-2 pl-[10px]">
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 rounded-full bg-[#00B050]"></div>
          <span className="text-[10px] font-medium">Achieved</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 rounded-full bg-[#FF0000]"></div>
          <span className="text-[10px] font-medium">Not Achieved</span>
        </div>
        <div className="flex items-le space-x-1">
          <div className="w-4 h-4 rounded-full bg-[#151515]"></div>
          <span className="text-[10px] font-medium">Holiday</span>
        </div>
      </div>
      
      <Footer />
    </Container>
    </main>
  );
}

export default SixSigmaPage
