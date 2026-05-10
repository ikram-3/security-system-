"use client";

import React from 'react';
import { Brain, Cpu, Zap, Activity, ShieldAlert, Fingerprint } from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

const radarData = [
  { subject: 'Volume', A: 120, fullMark: 150 },
  { subject: 'Velocity', A: 98, fullMark: 150 },
  { subject: 'Diversity', A: 86, fullMark: 150 },
  { subject: 'Complexity', A: 99, fullMark: 150 },
  { subject: 'Reputation', A: 85, fullMark: 150 },
  { subject: 'Persistence', A: 65, fullMark: 150 },
];

const clusterData = [
  { x: 100, y: 200, z: 200, name: 'Normal' },
  { x: 120, y: 100, z: 260, name: 'Normal' },
  { x: 170, y: 300, z: 400, name: 'Suspicious' },
  { x: 140, y: 250, z: 280, name: 'Normal' },
  { x: 150, y: 400, z: 500, name: 'Threat' },
  { x: 110, y: 280, z: 200, name: 'Normal' },
];

export default function AIInsightsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <Brain className="w-8 h-8 text-blue-500" />
          AI Detection Insights
        </h2>
        <p className="text-slate-500">Machine learning analysis and pattern recognition</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 glass-card rounded-2xl border border-slate-800 p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Neural Engine Status</h3>
            <p className="text-sm text-slate-400 mb-6">Isolation Forest & Random Forest models are currently active.</p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <div className="flex items-center gap-3">
                  <Cpu className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium text-slate-300">Model Load</span>
                </div>
                <span className="text-xs font-bold text-blue-500">12%</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <div className="flex items-center gap-3">
                  <Fingerprint className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm font-medium text-slate-300">Unique Patterns</span>
                </div>
                <span className="text-xs font-bold text-emerald-500">1,240</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm font-medium text-slate-300">Inference Time</span>
                </div>
                <span className="text-xs font-bold text-yellow-500">14ms</span>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-4 rounded-2xl bg-blue-600/10 border border-blue-500/20">
            <h4 className="text-sm font-bold text-blue-400 mb-1">AI Health Check</h4>
            <p className="text-xs text-slate-400">Confidence score is high. Models recalibrated 2 hours ago based on 50k log entries.</p>
          </div>
        </div>

        <div className="lg:col-span-2 glass-card rounded-2xl border border-slate-800 p-6">
          <h3 className="text-lg font-bold text-white mb-6">Threat Multi-Dimensional Analysis</h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#1e293b" />
                <PolarAngleAxis dataKey="subject" stroke="#64748b" fontSize={12} />
                <PolarRadiusAxis stroke="#1e293b" fontSize={10} />
                <Radar
                  name="Current Threat"
                  dataKey="A"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl border border-slate-800 p-6">
          <h3 className="text-lg font-bold text-white mb-6">Anomaly Clustering</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis type="number" dataKey="x" name="Frequency" stroke="#64748b" fontSize={12} />
                <YAxis type="number" dataKey="y" name="Payload Size" stroke="#64748b" fontSize={12} />
                <ZAxis type="number" dataKey="z" range={[60, 400]} name="Score" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="Logs" data={clusterData} fill="#3b82f6" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-slate-500 mt-4 italic">Note: Outliers represent potential zero-day threats or complex injection attempts.</p>
        </div>

        <div className="glass-card rounded-2xl border border-slate-800 p-6">
          <h3 className="text-lg font-bold text-white mb-6">Top AI Detections</h3>
          <div className="space-y-4">
            {[
              { type: 'Complex SQLi', score: 94, reason: 'Unusual character encoding pattern' },
              { type: 'Hidden C&C', score: 88, reason: 'Low-frequency beaconing detected' },
              { type: 'Data Exfiltration', score: 82, reason: 'Anomalous outbound traffic volume' },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-900/30 border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-white">{item.type}</span>
                  <span className="text-xs font-mono text-blue-500">{item.score}% Confidence</span>
                </div>
                <p className="text-xs text-slate-400">{item.reason}</p>
                <div className="mt-3 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: `${item.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
