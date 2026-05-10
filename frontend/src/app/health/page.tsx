"use client";

import React from 'react';
import { Server, Database, Cpu, Globe, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';

const services = [
  { name: 'Core API Server', status: 'Healthy', uptime: '99.98%', latency: '24ms', icon: Server, color: 'text-emerald-500' },
  { name: 'AI Inference Engine', status: 'Healthy', uptime: '99.95%', latency: '142ms', icon: Cpu, color: 'text-emerald-500' },
  { name: 'Primary Database', status: 'Healthy', uptime: '100%', latency: '8ms', icon: Database, color: 'text-emerald-500' },
  { name: 'Log Ingestion Buffer', status: 'Warning', uptime: '98.2%', latency: '450ms', icon: Clock, color: 'text-yellow-500' },
  { name: 'Global Threat Feed', status: 'Healthy', uptime: '99.99%', latency: '12ms', icon: Globe, color: 'text-emerald-500' },
];

export default function HealthPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold text-white tracking-tight">System Health</h2>
        <p className="text-slate-500">Node status and infrastructure monitoring</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.name} className="glass-card rounded-2xl border border-slate-800 p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <service.icon className="w-6 h-6 text-blue-500" />
              </div>
              <div className="flex items-center gap-2">
                {service.status === 'Healthy' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                )}
                <span className={`text-xs font-bold uppercase ${service.color}`}>{service.status}</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-white">{service.name}</h3>
              <div className="flex items-center gap-4 mt-4">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Uptime</p>
                  <p className="text-sm font-semibold text-white">{service.uptime}</p>
                </div>
                <div className="w-px h-8 bg-slate-800" />
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Latency</p>
                  <p className="text-sm font-semibold text-white">{service.latency}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-2 h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${service.status === 'Healthy' ? 'bg-emerald-500' : 'bg-yellow-500'}`} 
                style={{ width: service.status === 'Healthy' ? '100%' : '85%' }} 
              />
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-2xl border border-slate-800 p-8">
        <h3 className="text-xl font-bold text-white mb-8">Infrastructure Topology</h3>
        <div className="relative h-[400px] border border-slate-800/50 rounded-2xl bg-slate-950/50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-12">
            <div className="p-4 bg-blue-600/20 border border-blue-500 rounded-2xl flex flex-col items-center gap-2">
              <Globe className="w-8 h-8 text-blue-400" />
              <span className="text-xs font-bold text-white">Load Balancer</span>
            </div>
            
            <div className="flex gap-20">
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col items-center gap-2">
                <Server className="w-6 h-6 text-slate-400" />
                <span className="text-xs font-medium text-slate-400">Node 01</span>
              </div>
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col items-center gap-2">
                <Server className="w-6 h-6 text-slate-400" />
                <span className="text-xs font-medium text-slate-400">Node 02</span>
              </div>
            </div>
            
            <div className="p-4 bg-emerald-600/10 border border-emerald-500/50 rounded-2xl flex flex-col items-center gap-2">
              <Database className="w-6 h-6 text-emerald-400" />
              <span className="text-xs font-bold text-white">Cluster Main</span>
            </div>
          </div>
          
          <div className="absolute top-8 right-8 flex flex-col gap-4">
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 rounded-full bg-emerald-500" />
               <span className="text-xs text-slate-400">Stable Connection</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 rounded-full bg-blue-500" />
               <span className="text-xs text-slate-400">External Traffic</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
