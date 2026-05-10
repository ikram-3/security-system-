"use client";

import React from 'react';
import { Settings as SettingsIcon, Bell, Lock, Key, Eye, ShieldCheck } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold text-white tracking-tight">System Settings</h2>
        <p className="text-slate-500">Manage platform preferences and security</p>
      </div>

      <div className="space-y-6">
        <div className="glass-card rounded-2xl border border-slate-800 p-8">
          <div className="flex items-center gap-3 mb-8">
            <Bell className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-bold text-white">Notification Preferences</h3>
          </div>
          
          <div className="space-y-6">
            {[
              { label: 'Critical Threat Alerts', desc: 'Instant push notifications for high-severity threats', checked: true },
              { label: 'System Health Warnings', desc: 'Alerts when infrastructure nodes are under high load', checked: true },
              { label: 'AI Weekly Report', desc: 'Summary of detected patterns and suggested mitigations', checked: false },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-white">{item.label}</p>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
                <div className={`w-10 h-5 rounded-full relative cursor-pointer ${item.checked ? 'bg-blue-600' : 'bg-slate-800'}`}>
                   <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${item.checked ? 'left-6' : 'left-1'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-2xl border border-slate-800 p-8">
          <div className="flex items-center gap-3 mb-8">
            <Key className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-bold text-white">API Integration</h3>
          </div>
          
          <div className="space-y-4">
             <div>
               <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">AI Engine Endpoint</label>
               <input 
                 type="text" 
                 defaultValue="http://localhost:8000"
                 className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-sm text-slate-300 outline-none focus:border-blue-500/50"
               />
             </div>
             <div>
               <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Websocket Server</label>
               <input 
                 type="text" 
                 defaultValue="ws://localhost:5000"
                 className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-sm text-slate-300 outline-none focus:border-blue-500/50"
               />
             </div>
             <button className="px-6 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-500 transition-colors">
               Update Endpoints
             </button>
          </div>
        </div>

        <div className="glass-card rounded-2xl border border-slate-800 p-8">
          <div className="flex items-center gap-3 mb-8">
            <Lock className="w-5 h-5 text-red-500" />
            <h3 className="text-lg font-bold text-white">Platform Security</h3>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
            <div className="flex items-center gap-4">
              <ShieldCheck className="w-8 h-8 text-red-500" />
              <div>
                <p className="text-sm font-bold text-white">Hardened Mode</p>
                <p className="text-xs text-slate-400">Force multi-factor authentication and IP whitelisting for all analysts.</p>
              </div>
            </div>
            <button className="px-6 py-2 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-500 transition-colors">
              Enable
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
