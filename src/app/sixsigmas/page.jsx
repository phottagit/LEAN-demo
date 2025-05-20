"use client";

import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function SixSigmaPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // 6. Authentication effect
        useEffect(() => {
          if (status === "unauthenticated") {
            router.replace("/login");
          }
        }, [status, router]);

  return (

      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">Lean Six Sigma Dashboard: Under contruction</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Stats Cards */}

          <StatsCard 
            title="Active Projects" 
            value="18" 
            change="" 
            isPositive={true} 
          />
          <StatsCard 
            title="In Process" 
            value="18" 
            change="" 
            isPositive={true} 
          />
          <StatsCard 
            title="Completed Projects" 
            value="0" 
            change="" 
            isPositive={true} 
          />
          <StatsCard 
            title="Cost Savings" 
            value="THB0" 
            change="" 
            isPositive={true} 
          />
        </div>
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Projects */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border-b pb-4">
                  <h3 className="font-medium">Process Optimization Project {i}</h3>
                  <p className="text-sm text-gray-500">Last updated: 2 days ago</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Team Performance */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Team Category</h2>
            <div className="space-y-4">
              {['Green Belt Team', 'Black Belt Team', 'Master Black Belt'].map((team) => (
                <div key={team} className="flex justify-between items-center">
                  <span>{team}</span>
                  <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${Math.floor(Math.random() * 50) + 50}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

  );
}

function StatsCard({ title, value, change, isPositive }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <div className="flex items-baseline mt-2">
        <p className="text-3xl font-semibold">{value}</p>
        <p className={`ml-2 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </p>
      </div>
    </div>
  );
}

export default SixSigmaPage
