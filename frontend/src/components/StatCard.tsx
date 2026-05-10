"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;
  trendType?: 'up' | 'down';
  color?: 'blue' | 'red' | 'green' | 'yellow';
}

const colorMap = {
  blue: "from-blue-500/20 to-blue-600/5 border-blue-500/20 text-blue-500",
  red: "from-red-500/20 to-red-600/5 border-red-500/20 text-red-500",
  green: "from-emerald-500/20 to-emerald-600/5 border-emerald-500/20 text-emerald-500",
  yellow: "from-amber-500/20 to-amber-600/5 border-amber-500/20 text-amber-500",
};

export default function StatCard({ title, value, icon: Icon, trend, trendType, color = 'blue' }: StatCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-gradient-to-br p-6 glass-card",
        colorMap[color]
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={cn("p-3 rounded-xl bg-slate-900/80 border border-slate-800", colorMap[color].split(' ').pop())}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <div className={cn(
            "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
            trendType === 'up' ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
          )}>
            {trendType === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {trend}%
          </div>
        )}
      </div>
      
      <div>
        <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
      </div>

      <div className="absolute -right-4 -bottom-4 opacity-5">
        <Icon className="w-24 h-24" />
      </div>
    </motion.div>
  );
}
