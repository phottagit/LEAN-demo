"use client";

import React, { useState } from 'react';
import DonutChart from '../components/DonutChart';
import Navbar from '../components/Navbar';
import { useSession } from 'next-auth/react';
import Container from '../components/Container';
import Footer from '../components/Footer';

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
    { name: '5', value: 10, type: '' },
    { name: '6', value: 10, type: '' },
    { name: '7', value: 10, type: '' },
    { name: '8', value: 10, type: '' },
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
    { name: '5', value: 10, type: '' },
    { name: '6', value: 10, type: '' },
    { name: '7', value: 10, type: '' },
    { name: '8', value: 10, type: '' },
    { name: '9', value: 10, type: '' },
    { name: '10', value: 10, type: '' },
    { name: '11', value: 10, type: '' },
    { name: '12', value: 10, type: '' },
    { name: '13', value: 10, type: '' },
    { name: '14', value: 10, type: '' },
    { name: '15', value: 10, type: '' },
    { name: '16', value: 10, type: '' }
  ]);

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
    { name: '5', value: 10, type: '' },
    { name: '6', value: 10, type: '' },
    { name: '7', value: 10, type: '' },
    { name: '8', value: 10, type: '' },
    { name: '9', value: 10, type: '' },
    { name: '10', value: 10, type: '' },
    { name: '11', value: 10, type: '' },
    { name: '12', value: 10, type: '' },
    { name: '13', value: 10, type: '' },
    { name: '14', value: 10, type: '' },
    { name: '15', value: 10, type: '' },
    { name: '16', value: 10, type: '' }
  ]);

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
    { name: '5', value: 10, type: '' },
    { name: '6', value: 10, type: '' },
    { name: '7', value: 10, type: '' },
    { name: '8', value: 10, type: '' },
    { name: '9', value: 10, type: '' },
    { name: '10', value: 10, type: '' },
    { name: '11', value: 10, type: '' },
    { name: '12', value: 10, type: '' },
    { name: '13', value: 10, type: '' },
    { name: '14', value: 10, type: '' },
    { name: '15', value: 10, type: '' },
    { name: '16', value: 10, type: '' }
  ]);

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
    { name: '5', value: 10, type: '' },
    { name: '6', value: 10, type: '' },
    { name: '7', value: 10, type: '' },
    { name: '8', value: 10, type: '' },
    { name: '9', value: 10, type: '' },
    { name: '10', value: 10, type: '' },
    { name: '11', value: 10, type: '' },
    { name: '12', value: 10, type: '' },
    { name: '13', value: 10, type: '' },
    { name: '14', value: 10, type: '' },
    { name: '15', value: 10, type: '' },
    { name: '16', value: 10, type: '' }
  ]);

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
    { name: '5', value: 10, type: '' },
    { name: '6', value: 10, type: '' },
    { name: '7', value: 10, type: '' },
    { name: '8', value: 10, type: '' },
    { name: '9', value: 10, type: '' },
    { name: '10', value: 10, type: '' },
    { name: '11', value: 10, type: '' },
    { name: '12', value: 10, type: '' },
    { name: '13', value: 10, type: '' },
    { name: '14', value: 10, type: '' },
    { name: '15', value: 10, type: '' },
    { name: '16', value: 10, type: '' }
  ]);

  return (
    <main className="w-full">
      <Container>
      <Navbar session={session} />

      <div className='flex flex-col items-center bg-white p-2'>
        <h3 className="w-full text-center font-bold text-3xl">
          DAILY OBEYA DASHBOARD
        </h3>
        <h4 className="w-full text-center font-medium text-1xl">
          (May 2025)
        </h4>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center bg-white-100 p-2">
        {/* Safety Chart */}
        <div className="flex-1 min-w-0 py-2">
          <div className="h-full border-2 border-gray-300 rounded-lg p-1">
            <h3 className="text-center font-medium text-ellipsis overflow-hidden whitespace-nowrap" 
                style={{ 
                  fontFamily: 'Century, serif', 
                  fontWeight: 'bold',
                  fontSize: 'min(max(16pt, 5vw), 16pt)'
                }}>
              Safety
            </h3>
            <div className="w-full aspect-square">
              <DonutChart data={chartData1} rotation={-90} centerText="S" />
            </div>
            <div>
              <h3 className="text-left font-bold text-[6px] p-1">Month (time/mWH)</h3>
            </div>
            <div className='bg-gray-200 mx-1'>
              <div className="max-h-[60px] overflow-y-auto">
                <table className="w-full border-collapse text-[6px]">
                  {/* Simplified table */}
                  <thead className="sticky top-0 bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">1</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">2</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">3</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">4</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">5</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">6</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">7</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">8</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">9</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">10</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">11</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">12</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">2.9</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">4.0</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">4.2</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">3.1</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">0.0</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">0.0</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">0.0</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">0.0</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">0.0</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">0.0</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">0.0</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">0.0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quality Chart */}
        <div className="flex-1 min-w-0 py-2">
          <div className="h-full border-2 border-gray-300 rounded-lg p-1">
            <h3 className="text-center font-medium text-ellipsis overflow-hidden whitespace-nowrap" 
                style={{ 
                  fontFamily: 'Century, serif', 
                  fontWeight: 'bold',
                  fontSize: 'min(max(16pt, 5vw), 16pt)'
                }}>
              Quality
            </h3>
            <div className="w-full aspect-square">
              <DonutChart data={chartData2} rotation={-90} centerText="Q" />
            </div>
            <div>
              <h3 className="text-left font-bold text-[6px] p-1">Month (%)</h3>
            </div>
            <div className='bg-gray-200 mx-1'>
              <div className="max-h-[60px] overflow-y-auto">
                <table className="w-full border-collapse text-[6px]">
                  {/* Simplified table */}
                  <thead className="sticky top-0 bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">1</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">2</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">3</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">4</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">5</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">6</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">7</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">8</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">9</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">10</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">11</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">12</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">0.0</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">0.0</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">0.0</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">0.0</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">0.0</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">0.0</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">0.0</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">0.0</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">0.0</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">0.0</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">0.0</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">0.0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Efficiency Chart */}
        <div className="flex-1 min-w-0 py-2">
          <div className="h-full border-2 border-gray-300 rounded-lg p-1">
            <h3 className="text-center font-medium text-ellipsis overflow-hidden whitespace-nowrap" 
                style={{ 
                  fontFamily: 'Century, serif', 
                  fontWeight: 'bold',
                  fontSize: 'min(max(16pt, 5vw), 16pt)'
                }}>
              Efficiency
            </h3>
            <div className="w-full aspect-square">
              <DonutChart data={chartData3} rotation={-90} centerText="E" />
            </div>
            <div>
              <h3 className="text-left font-bold text-[6px] p-1">Month (%)</h3>
            </div>
            <div className='bg-gray-200 mx-1'>
              <div className="max-h-[60px] overflow-y-auto">
                <table className="w-full border-collapse text-[6px]">
                  {/* Simplified table */}
                  <thead className="sticky top-0 bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">1</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">2</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">3</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">4</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">5</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">6</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">7</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">8</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">9</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">10</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">11</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">12</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">84.8</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">83.5</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">80.0</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">79.2</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">85.0</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">0.0</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">0.0</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">0.0</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">0.0</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">0.0</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">0.0</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">0.0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-0 py-2">
          <div className="h-full border-2 border-gray-300 rounded-lg p-1">
            <h3 className="text-center font-medium text-ellipsis overflow-hidden whitespace-nowrap" 
                style={{ 
                  fontFamily: 'Century, serif', 
                  fontWeight: 'bold',
                  fontSize: 'min(max(16pt, 5vw), 16pt)'
                }}>
              Delivery
            </h3>
            <div className="w-full aspect-square">
              <DonutChart data={chartData4} rotation={-90} centerText="D" />
            </div>
            <div>
              <h3 className="text-left font-bold text-[6px] p-1">Month (day)</h3>
            </div>
            <div className='bg-gray-200 mx-1'>
              <div className="max-h-[60px] overflow-y-auto">
                <table className="w-full border-collapse text-[6px]">
                  {/* Simplified table */}
                  <thead className="sticky top-0 bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">1</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">2</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">3</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">4</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">5</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">6</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">7</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">8</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">9</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">10</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">11</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">12</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">20.6</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">17.6</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">18.5</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">23.2</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">24.5</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">0.0</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">0.0</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">0.0</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">0.0</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">0.0</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">0.0</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">0.0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-0 py-2">
          <div className="h-full border-2 border-gray-300 rounded-lg p-1">
            <h3 className="text-center font-medium text-ellipsis overflow-hidden whitespace-nowrap" 
                style={{ 
                  fontFamily: 'Century, serif', 
                  fontWeight: 'bold',
                  fontSize: 'min(max(16pt, 5vw), 16pt)'
                }}>
              Environment
            </h3>
            <div className="w-full aspect-square">
              <DonutChart data={chartData5} rotation={-90} centerText="E" />
            </div>
            <div>
              <h3 className="text-left font-bold text-[6px] p-1">Month (mkWh)</h3>
            </div>
            <div className='bg-gray-200 mx-1'>
              <div className="max-h-[60px] overflow-y-auto">
                <table className="w-full border-collapse text-[6px]">
                  {/* Simplified table */}
                  <thead className="sticky top-0 bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">1</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">2</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">3</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">4</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">5</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">6</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">7</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">8</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">9</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">10</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">11</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">12</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">1.15</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">1.21</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">1.40</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">1.29</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">00.13</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">0.0</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">0.0</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">0.0</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">0.0</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">0.0</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">0.0</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">0.0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-0 py-2">
          <div className="h-full border-2 border-gray-300 rounded-lg p-1">
            <h3 className="text-center font-medium text-ellipsis overflow-hidden whitespace-nowrap" 
                style={{ 
                  fontFamily: 'Century, serif', 
                  fontWeight: 'bold',
                  fontSize: 'min(max(16pt, 5vw), 16pt)'
                }}>
              Morale
            </h3>
            <div className="w-full aspect-square">
              <DonutChart data={chartData6} rotation={-90} centerText="M" />
            </div>
            <div>
              <h3 className="text-left font-bold text-[6px] p-1">Month (%)</h3>
            </div>
            <div className='bg-gray-200 mx-1'>
              <div className="max-h-[60px] overflow-y-auto">
                <table className="w-full border-collapse text-[6px]">
                  {/* Simplified table */}
                  <thead className="sticky top-0 bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">1</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">2</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">3</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">4</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">5</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">6</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">7</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">8</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">9</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">10</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">11</th>
                      <th className="border border-gray-300 px-[0.1rem] py-[0.1rem] font-medium text-gray-700">12</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">93.6</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">93.5</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">93.3</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">92.7</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">12.4</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">0.0</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">0.0</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">0.0</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">0.0</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">0.0</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">0.0</td>
                      <td className="border border-gray-300 bg-white px-[0.1rem] py-[0.1rem] text-center">0.0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </div>
      
      <Footer />
    </Container>
    </main>
  );
}

export default SixSigmaPage
