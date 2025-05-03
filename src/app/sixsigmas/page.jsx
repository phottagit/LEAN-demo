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
  const [chartData, setChartData] = useState([
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
    { name: '31', value: 10, type: 'Upper' },
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

  return (
    <main>
      <Container>
        <Navbar session={session} />
        <div className="flex flex-col items-center justify-center py-10">
          {/* Legend 
          <h2 className="text-center font-medium text-3xl mb-8">Six Sigma Methodology</h2> */}
          
          <div className="flex flex-col justify-center py-10 w-full max-w-4xl bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-center font-medium text-3xl md:text-4xl lg:text-5xl mb-4 max-w-full overflow-hidden text-ellipsis" style={{ fontFamily: 'Century, serif' }}>Quality</h3>
            <div className="w-full h-auto">
              <DonutChart data={chartData} rotation={-90} />
            </div>
          </div>
        </div>
        <Footer />
      </Container>
    </main>
  );
}

export default SixSigmaPage
