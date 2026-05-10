"use client";

import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Search, 
  Filter, 
  Download, 
  MoreVertical, 
  ExternalLink,
  Eye,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const threats = [
  { id: 'THR-001', type: 'DDoS Attack', severity: 'Critical', source: '45.12.33.10', target: '10.0.4.15', status: 'Active', time: '2024-05-10 22:30:12', score: 98 },
  { id: 'THR-002', type: 'Brute Force', severity: 'High', source: '210.5.67.12', target: '10.0.1.20', status: 'Investigating', time: '2024-05-10 22:15:45', score: 85 },
  { id: 'THR-003', type: 'SQL Injection', severity: 'High', source: '103.44.12.5', target: '10.0.2.11', status: 'Mitigated', time: '2024-05-10 21:50:30', score: 92 },
  { id: 'THR-004', type: 'Malware Pattern', severity: 'Medium', source: '192.168.1.105', target: '10.0.4.5', status: 'Resolved', time: '2024-05-10 21:10:00', score: 65 },
  { id: 'THR-005', type: 'Port Scan', severity: 'Low', source: '8.8.8.8', target: '10.0.1.1', status: 'False Positive', time: '2024-05-10 20:45:15', score: 42 },
];

const severityColors = {
  Critical: 'bg-red-500/10 text-red-500 border-red-500/20',
  High: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  Medium: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  Low: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
};

const statusColors = {
  Active: 'text-red-500',
  Investigating: 'text-orange-500',
  Mitigated: 'text-emerald-500',
  Resolved: 'text-blue-500',
  'False Positive': 'text-slate-500',
};

export default function ThreatsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Threat Monitoring</h2>
          <p className="text-slate-500">Live feed of security events and anomalies</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800 transition-colors">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20">
            <ShieldCheck className="w-4 h-4" />
            Acknowledge All
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 p-4 glass-card rounded-2xl border border-slate-800">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Filter by IP, Type, or ID..." 
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-sm text-slate-300 outline-none focus:border-blue-500/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <select className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-400 outline-none">
            <option>All Severities</option>
            <option>Critical</option>
            <option>High</option>
          </select>
          <select className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-400 outline-none">
            <option>All Status</option>
            <option>Active</option>
            <option>Mitigated</option>
          </select>
          <button className="p-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-500 hover:text-white">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900/50 border-b border-slate-800">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Threat ID</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Event Type</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Severity</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Source IP</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">AI Score</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Status</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Action</th>
            </tr>
          </thead>
          <tbody>
            {threats.map((threat) => (
              <tr key={threat.id} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors group">
                <td className="px-6 py-4">
                  <span className="text-sm font-mono text-blue-400 font-medium">{threat.id}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <AlertCircle className={cn("w-4 h-4", threat.severity === 'Critical' ? 'text-red-500' : 'text-slate-400')} />
                    <span className="text-sm font-bold text-white">{threat.type}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "px-2 py-1 rounded-md text-[10px] font-bold uppercase border",
                    severityColors[threat.severity as keyof typeof severityColors]
                  )}>
                    {threat.severity}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-400">{threat.source}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 w-12 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={cn("h-full rounded-full", threat.score > 80 ? "bg-red-500" : "bg-blue-500")} 
                        style={{ width: `${threat.score}%` }} 
                      />
                    </div>
                    <span className="text-xs font-bold text-white">{threat.score}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={cn("text-xs font-bold", statusColors[threat.status as keyof typeof statusColors])}>
                    {threat.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
