"use client";

import React from 'react';
import StatCard from '@/components/StatCard';
import { 
  ShieldAlert, 
  Activity, 
  Lock, 
  Users, 
  TrendingUp, 
  AlertTriangle,
  Server
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { motion } from 'framer-motion';

const data = [
  { name: '00:00', threats: 12, logs: 400 },
  { name: '04:00', threats: 18, logs: 300 },
  { name: '08:00', threats: 45, logs: 600 },
  { name: '12:00', threats: 30, logs: 800 },
  { name: '16:00', threats: 70, logs: 900 },
  { name: '20:00', threats: 40, logs: 500 },
  { name: '23:59', threats: 25, logs: 400 },
];

const severityData = [
  { name: 'Critical', value: 15, color: '#ef4444' },
  { name: 'High', value: 25, color: '#f97316' },
  { name: 'Medium', value: 40, color: '#eab308' },
  { name: 'Low', value: 20, color: '#3b82f6' },
];

const typeData = [
  { name: 'DDoS', value: 400 },
  { name: 'Brute Force', value: 300 },
  { name: 'Malware', value: 200 },
  { name: 'SQLi', value: 100 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold text-white tracking-tight">SOC Overview</h2>
        <p className="text-slate-500">Real-time security monitoring and threat intelligence</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Active Threats" 
          value="128" 
          icon={ShieldAlert} 
          trend={12} 
          trendType="up" 
          color="red" 
        />
        <StatCard 
          title="AI Confidence" 
          value="98.2%" 
          icon={Activity} 
          trend={2} 
          trendType="up" 
          color="blue" 
        />
        <StatCard 
          title="Protected Assets" 
          value="1,420" 
          icon={Server} 
          color="green" 
        />
        <StatCard 
          title="Blocked Requests" 
          value="45.2k" 
          icon={Lock} 
          trend={8} 
          trendType="up" 
          color="yellow" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card rounded-2xl border border-slate-800 p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-white">Threat Activity</h3>
              <p className="text-sm text-slate-500">Detection frequency over the last 24 hours</p>
            </div>
            <select className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1 text-xs text-slate-400 outline-none">
              <option>Last 24 Hours</option>
              <option>Last 7 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Area type="monotone" dataKey="threats" stroke="#3b82f6" fillOpacity={1} fill="url(#colorThreats)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card rounded-2xl border border-slate-800 p-6">
          <h3 className="text-lg font-bold text-white mb-6">Threat Severity</h3>
          <div className="h-[250px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={severityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="block text-2xl font-bold text-white">128</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Total</span>
            </div>
          </div>
          <div className="space-y-3 mt-4">
            {severityData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-400">{item.name}</span>
                </div>
                <span className="text-white font-semibold">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl border border-slate-800 p-6">
          <h3 className="text-lg font-bold text-white mb-6">Recent Alerts</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/30 transition-colors">
                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-white">Potential Brute Force</span>
                    <span className="text-[10px] text-slate-500 uppercase font-bold">2 mins ago</span>
                  </div>
                  <p className="text-xs text-slate-400">Multiple failed login attempts from IP: 45.122.11.90</p>
                </div>
                <div className="px-2 py-1 rounded-md bg-red-500/10 text-red-500 text-[10px] font-bold uppercase">
                  Critical
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-sm text-blue-500 font-medium hover:text-blue-400 transition-colors">
            View All Alerts
          </button>
        </div>

        <div className="glass-card rounded-2xl border border-slate-800 p-6">
          <h3 className="text-lg font-bold text-white mb-6">AI Threat Analysis</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={typeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
