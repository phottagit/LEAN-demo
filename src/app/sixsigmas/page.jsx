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
    { name: '17', value: 10, type: 'Holiday' },
    { name: '18', value: 10, type: 'Upper' },
    { name: '19', value: 10, type: 'Upper' },
    { name: '20', value: 10, type: 'Holiday' },
    { name: '21', value: 10, type: 'Upper' },
    { name: '22', value: 10, type: 'Holiday' },
    { name: '23', value: 10, type: 'Upper' },
    { name: '24', value: 10, type: 'Upper' },
    { name: '25', value: 10, type: 'Upper' },
    { name: '26', value: 10, type: 'Upper' },
    { name: '27', value: 10, type: 'Holiday' },
    { name: '28', value: 10, type: 'Upper' },
    { name: '29', value: 10, type: 'Upper' },
    { name: '30', value: 10, type: 'Upper' },
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
    { name: '13', value: 10, type: 'Holiday' },
    { name: '14', value: 10, type: 'Holiday' },
    { name: '15', value: 10, type: 'Holiday' },
    { name: '16', value: 10, type: 'Holiday' }
  ]);

  const [chartData2, setChartData2] = useState([
    { name: '17', value: 10, type: 'Holiday' },
    { name: '18', value: 10, type: 'Lower' },
    { name: '19', value: 10, type: 'Upper' },
    { name: '20', value: 10, type: 'Holiday' },
    { name: '21', value: 10, type: 'Upper' },
    { name: '22', value: 10, type: 'Holiday' },
    { name: '23', value: 10, type: 'Lower' },
    { name: '24', value: 10, type: 'Upper' },
    { name: '25', value: 10, type: 'Upper' },
    { name: '26', value: 10, type: 'Upper' },
    { name: '27', value: 10, type: 'Holiday' },
    { name: '28', value: 10, type: 'Upper' },
    { name: '29', value: 10, type: 'Upper' },
    { name: '30', value: 10, type: 'Upper' },
    { name: '31', value: 10, type: '' },
    { name: '', value: 10, type: '' },
    { name: '', value: 10, type: '' },
    { name: '', value: 10, type: '' },
    { name: '', value: 10, type: '' },
    { name: '1', value: 10, type: 'Lower' },
    { name: '2', value: 10, type: 'Lower' },
    { name: '3', value: 10, type: 'Lower' },
    { name: '4', value: 10, type: 'Lower' },
    { name: '5', value: 10, type: 'Lower' },
    { name: '6', value: 10, type: 'Holiday' },
    { name: '7', value: 10, type: 'Lower' },
    { name: '8', value: 10, type: 'Lower' },
    { name: '9', value: 10, type: 'Lower' },
    { name: '10', value: 10, type: 'Upper' },
    { name: '11', value: 10, type: 'Lower' },
    { name: '12', value: 10, type: 'Lower' },
    { name: '13', value: 10, type: 'Holiday' },
    { name: '14', value: 10, type: 'Holiday' },
    { name: '15', value: 10, type: 'Holiday' },
    { name: '16', value: 10, type: 'Holiday' }
  ]);

  const [chartData3, setChartData3] = useState([
    { name: '17', value: 10, type: 'Holiday' },
    { name: '18', value: 10, type: 'Lower' },
    { name: '19', value: 10, type: 'Lower' },
    { name: '20', value: 10, type: 'Holiday' },
    { name: '21', value: 10, type: 'Upper' },
    { name: '22', value: 10, type: 'Holiday' },
    { name: '23', value: 10, type: 'Lower' },
    { name: '24', value: 10, type: 'Lower' },
    { name: '25', value: 10, type: 'Lower' },
    { name: '26', value: 10, type: 'Upper' },
    { name: '27', value: 10, type: 'Holiday' },
    { name: '28', value: 10, type: 'Upper' },
    { name: '29', value: 10, type: 'Upper' },
    { name: '30', value: 10, type: 'Upper' },
    { name: '31', value: 10, type: '' },
    { name: '', value: 10, type: '' },
    { name: '', value: 10, type: '' },
    { name: '', value: 10, type: '' },
    { name: '', value: 10, type: '' },
    { name: '1', value: 10, type: 'Upper' },
    { name: '2', value: 10, type: 'Lower' },
    { name: '3', value: 10, type: 'Lower' },
    { name: '4', value: 10, type: 'Lower' },
    { name: '5', value: 10, type: 'Upper' },
    { name: '6', value: 10, type: 'Holiday' },
    { name: '7', value: 10, type: 'Lower' },
    { name: '8', value: 10, type: 'Lower' },
    { name: '9', value: 10, type: 'Upper' },
    { name: '10', value: 10, type: 'Lower' },
    { name: '11', value: 10, type: 'Lower' },
    { name: '12', value: 10, type: 'Lower' },
    { name: '13', value: 10, type: 'Holiday' },
    { name: '14', value: 10, type: 'Holiday' },
    { name: '15', value: 10, type: 'Holiday' },
    { name: '16', value: 10, type: 'Holiday' }
  ]);

  const [chartData4, setChartData4] = useState([
    { name: '17', value: 10, type: 'Holiday' },
    { name: '18', value: 10, type: 'Lower' },
    { name: '19', value: 10, type: 'Lower' },
    { name: '20', value: 10, type: 'Holiday' },
    { name: '21', value: 10, type: 'Lower' },
    { name: '22', value: 10, type: 'Upper' },
    { name: '23', value: 10, type: 'Lower' },
    { name: '24', value: 10, type: 'Lower' },
    { name: '25', value: 10, type: 'Lower' },
    { name: '26', value: 10, type: 'Lower' },
    { name: '27', value: 10, type: 'Holiday' },
    { name: '28', value: 10, type: 'Lower' },
    { name: '29', value: 10, type: 'Lower' },
    { name: '30', value: 10, type: 'Lower' },
    { name: '31', value: 10, type: '' },
    { name: '', value: 10, type: '' },
    { name: '', value: 10, type: '' },
    { name: '', value: 10, type: '' },
    { name: '', value: 10, type: '' },
    { name: '1', value: 10, type: 'Lower' },
    { name: '2', value: 10, type: 'Lower' },
    { name: '3', value: 10, type: 'Lower' },
    { name: '4', value: 10, type: 'Lower' },
    { name: '5', value: 10, type: 'Lower' },
    { name: '6', value: 10, type: 'Holiday' },
    { name: '7', value: 10, type: 'Lower' },
    { name: '8', value: 10, type: 'Lower' },
    { name: '9', value: 10, type: 'Lower' },
    { name: '10', value: 10, type: 'Lower' },
    { name: '11', value: 10, type: 'Lower' },
    { name: '12', value: 10, type: 'Lower' },
    { name: '13', value: 10, type: 'Holiday' },
    { name: '14', value: 10, type: 'Holiday' },
    { name: '15', value: 10, type: 'Holiday' },
    { name: '16', value: 10, type: 'Holiday' }
  ]);

  const [chartData5, setChartData5] = useState([
    { name: '17', value: 10, type: 'Holiday' },
    { name: '18', value: 10, type: 'Lower' },
    { name: '19', value: 10, type: 'Lower' },
    { name: '20', value: 10, type: 'Holiday' },
    { name: '21', value: 10, type: 'Upper' },
    { name: '22', value: 10, type: 'Upper' },
    { name: '23', value: 10, type: 'Upper' },
    { name: '24', value: 10, type: 'Upper' },
    { name: '25', value: 10, type: 'Upper' },
    { name: '26', value: 10, type: 'Lower' },
    { name: '27', value: 10, type: 'Holiday' },
    { name: '28', value: 10, type: 'Lower' },
    { name: '29', value: 10, type: 'Lower' },
    { name: '30', value: 10, type: 'Lower' },
    { name: '31', value: 10, type: '' },
    { name: '', value: 10, type: '' },
    { name: '', value: 10, type: '' },
    { name: '', value: 10, type: '' },
    { name: '', value: 10, type: '' },
    { name: '1', value: 10, type: 'Upper' },
    { name: '2', value: 10, type: 'Upper' },
    { name: '3', value: 10, type: 'Upper' },
    { name: '4', value: 10, type: 'Upper' },
    { name: '5', value: 10, type: 'Lower' },
    { name: '6', value: 10, type: 'Holiday' },
    { name: '7', value: 10, type: 'Lower' },
    { name: '8', value: 10, type: 'Upper' },
    { name: '9', value: 10, type: 'Upper' },
    { name: '10', value: 10, type: 'Lower' },
    { name: '11', value: 10, type: 'Lower' },
    { name: '12', value: 10, type: 'Lower' },
    { name: '13', value: 10, type: 'Holiday' },
    { name: '14', value: 10, type: 'Holiday' },
    { name: '15', value: 10, type: 'Holiday' },
    { name: '16', value: 10, type: 'Holiday' }
  ]);

  return (
    <main>
      <Container>
      <Navbar session={session} />

      <div className='flex flex-col items-center bg-white p-2'>
        <h3 className="w-full text-center font-bold text-4xl">
          DAILY OBEYA DASHBOARD
        </h3>
        <h4 className="w-full text-center font-medium text-2xl">
          (April 2025)
        </h4>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center py-4 gap-1">
        {/* Safety Chart     aspect-square cursor-pointer picture-box rounded-lg w-full */}
        <div className="flex flex-col justify-center py-4 w-full max-w-4xl bg-white rounded-lg">
          <h3 className="text-center font-medium text-3xl md:text-4xl lg:text-4xl mb-4 max-w-full overflow-hidden text-ellipsis" 
              style={{ 
                fontFamily: 'Century, serif', 
                fontWeight: 'bold',
                fontSize: 'clamp(14pt, calc(14pt + 2vw), 22pt)'
              }}>
            Safety
          </h3>
          <div className="w-full aspect-square">
            <DonutChart data={chartData1} rotation={-90} centerText="S" />
          </div>
        </div>

        {/* Quality Chart */}
        <div className="flex flex-col justify-center py-4 w-full max-w-4xl bg-white rounded-lg">
          <h3 className="text-center font-medium text-3xl md:text-4xl lg:text-4xl mb-4 max-w-full overflow-hidden text-ellipsis" 
              style={{ 
                fontFamily: 'Century, serif', 
                fontWeight: 'bold',
                fontSize: 'clamp(14pt, calc(14pt + 2vw), 22pt)'
              }}>
            Quality
          </h3>
          <div className="w-full aspect-square">
            <DonutChart data={chartData2} rotation={-90} centerText="Q" />
          </div>
        </div>

        <div className="flex flex-col justify-center py-4 w-full max-w-4xl bg-white rounded-lg">
          <h3 className="text-center font-medium text-3xl md:text-4xl lg:text-4xl mb-4 max-w-full overflow-hidden text-ellipsis" 
              style={{ 
                fontFamily: 'Century, serif', 
                fontWeight: 'bold',
                fontSize: 'clamp(14pt, calc(14pt + 2vw), 22pt)'
              }}>
            Delivery
          </h3>
          <div className="w-full aspect-square">
            <DonutChart data={chartData3} rotation={-90} centerText="D" />
          </div>
        </div>

        <div className="flex flex-col justify-center py-4 w-full max-w-4xl bg-white rounded-lg">
          <h3 className="text-center font-medium text-3xl md:text-4xl lg:text-4xl mb-4 max-w-full overflow-hidden text-ellipsis" 
              style={{ 
                fontFamily: 'Century, serif', 
                fontWeight: 'bold',
                fontSize: 'clamp(14pt, calc(14pt + 2vw), 22pt)'
              }}>
            Environment
          </h3>
          <div className="w-full aspect-square">
            <DonutChart data={chartData4} rotation={-90} centerText="E" />
          </div>
        </div>

        <div className="flex flex-col justify-center py-4 w-full max-w-4xl bg-white rounded-lg">
          <h3 className="text-center font-medium text-3xl md:text-4xl lg:text-4xl mb-4 max-w-full overflow-hidden text-ellipsis" 
              style={{ 
                fontFamily: 'Century, serif', 
                fontWeight: 'bold',
                fontSize: 'clamp(14pt, calc(14pt + 2vw), 22pt)'
              }}>
            Morale
          </h3>
          <div className="w-full aspect-square">
            <DonutChart data={chartData5} rotation={-90} centerText="M" />
          </div>
        </div>

      </div>
      
      <Footer />
    </Container>
    </main>
  );
}

export default SixSigmaPage