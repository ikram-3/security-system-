"use client";

import React from 'react';
import { ShieldCheck, Lock, Mail, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#05070a] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full cyber-grid opacity-20 pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-red-600/10 rounded-full blur-[100px]" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md glass-card rounded-[2.5rem] border border-slate-800/50 p-12 relative z-10"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="bg-blue-600/20 p-4 rounded-2xl border border-blue-500/50 mb-6 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
            <ShieldCheck className="w-10 h-10 text-blue-500" />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white mb-2">
            Cyber<span className="text-blue-500">Shield</span> AI
          </h1>
          <p className="text-slate-500 text-center text-sm font-medium">Enterprise Threat Intelligence Platform</p>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Work Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
              <input 
                type="email" 
                placeholder="analyst@cybershield.ai"
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-sm text-slate-300 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between ml-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Password</label>
              <Link href="#" className="text-[10px] font-bold text-blue-500 hover:text-blue-400 uppercase tracking-tighter">Forgot Password?</Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
              <input 
                type="password" 
                placeholder="••••••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-sm text-slate-300 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all"
              />
            </div>
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 group transition-all shadow-[0_10px_25px_rgba(59,130,246,0.3)] hover:shadow-[0_15px_30px_rgba(59,130,246,0.4)]">
            Initialize Session
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-slate-800/50 flex flex-col items-center gap-4">
          <p className="text-xs text-slate-500 font-medium">Restricted Access only for Authorized Personnel</p>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-[10px] text-slate-400 font-bold">2FA</div>
            <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-[10px] text-slate-400 font-bold">SSL</div>
            <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-[10px] text-slate-400 font-bold">AES</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
