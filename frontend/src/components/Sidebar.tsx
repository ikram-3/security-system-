"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  ShieldAlert, 
  Database, 
  Activity, 
  HeartPulse, 
  Settings, 
  User,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Threats', href: '/threats', icon: ShieldAlert },
  { name: 'Logs', href: '/logs', icon: Database },
  { name: 'AI Insights', href: '/ai-insights', icon: Activity },
  { name: 'System Health', href: '/health', icon: HeartPulse },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-[#0a0f1d] border-r border-slate-800 flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-blue-600/20 p-2 rounded-lg border border-blue-500/50">
          <ShieldCheck className="w-6 h-6 text-blue-500" />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">
          Cyber<span className="text-blue-500">Shield</span> AI
        </h1>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <div className={cn(
                "group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300",
                isActive 
                  ? "bg-blue-600/10 text-blue-500 border border-blue-500/20" 
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
              )}>
                <div className="flex items-center gap-3">
                  <item.icon className={cn("w-5 h-5", isActive ? "text-blue-500" : "text-slate-400 group-hover:text-white")} />
                  <span className="font-medium">{item.name}</span>
                </div>
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                  />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
              JD
            </div>
            <div>
              <p className="text-sm font-semibold text-white">John Doe</p>
              <p className="text-xs text-slate-500">Security Lead</p>
            </div>
          </div>
          <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg transition-colors">
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
