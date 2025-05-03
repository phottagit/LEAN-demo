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
    { name: '17', value: 10 },
    { name: '18', value: 10 },
    { name: '19', value: 10 },
    { name: '20', value: 10 },
    { name: '21', value: 10 },
    { name: '22', value: 10 },
    { name: '23', value: 10 },
    { name: '24', value: 10 },
    { name: '25', value: 10 },
    { name: '26', value: 10 },
    { name: '27', value: 10 },
    { name: '28', value: 10 },
    { name: '29', value: 10 },
    { name: '30', value: 10 },
    { name: '31', value: 10 },
    { name: '', value: 10 },
    { name: '', value: 10 },
    { name: '', value: 10 },
    { name: '', value: 10 },
    { name: '1', value: 10 },
    { name: '2', value: 10 },
    { name: '3', value: 10 },
    { name: '4', value: 10 },
    { name: '5', value: 10 },
    { name: '6', value: 10 },
    { name: '7', value: 10 },
    { name: '8', value: 10 },
    { name: '9', value: 10 },
    { name: '10', value: 10 },
    { name: '11', value: 10 },
    { name: '12', value: 10 },
    { name: '13', value: 10 },
    { name: '14', value: 10 },
    { name: '15', value: 10 },
    { name: '16', value: 10 }
  ]);

  return (
    <main>
      <Container>
        <Navbar session={session} />
        <div className="flex flex-col items-center justify-center py-10">
          <h2 className="text-center font-medium text-3xl mb-8">Six Sigma Methodology</h2>
          
          <div className="w-full max-w-4xl bg-#D9D9D9 rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-medium mb-4">Monthly Distribution</h3>
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
