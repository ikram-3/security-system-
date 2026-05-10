"use client";

import React from 'react';
import { User, Shield, Clock, MapPin, Mail, Phone, Calendar } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold text-white tracking-tight">User Profile</h2>
        <p className="text-slate-500">Manage your account and view security credentials</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="glass-card rounded-2xl border border-slate-800 p-8 flex flex-col items-center text-center">
          <div className="w-32 h-32 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-bold mb-6 border-4 border-slate-900 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
            JD
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">John Doe</h3>
          <p className="text-blue-500 font-bold text-sm uppercase tracking-widest mb-6">Security Lead Analyst</p>
          
          <div className="w-full grid grid-cols-2 gap-4">
            <div className="bg-slate-900/50 border border-slate-800 p-3 rounded-xl">
              <p className="text-[10px] text-slate-500 font-bold uppercase">Clearance</p>
              <p className="text-sm font-bold text-emerald-500">Level 4</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 p-3 rounded-xl">
              <p className="text-[10px] text-slate-500 font-bold uppercase">Experience</p>
              <p className="text-sm font-bold text-white">8 Years</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 glass-card rounded-2xl border border-slate-800 p-8">
          <h3 className="text-xl font-bold text-white mb-8 border-b border-slate-800 pb-4">Account Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-slate-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase">Email Address</p>
                  <p className="text-sm font-medium text-white">john.doe@cybershield.ai</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-slate-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase">Phone Number</p>
                  <p className="text-sm font-medium text-white">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-slate-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase">Location</p>
                  <p className="text-sm font-medium text-white">Washington D.C., USA</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-slate-400">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase">Joined</p>
                  <p className="text-sm font-medium text-white">January 12, 2024</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h4 className="text-lg font-bold text-white mb-6">Recent Activity</h4>
            <div className="space-y-4">
              {[
                { action: 'Mitigated DDoS Attack THR-452', time: '2 hours ago', icon: Shield },
                { action: 'Updated Firewall Policy v2.4', time: '5 hours ago', icon: Clock },
                { action: 'Authorized System Access for Analyst B', time: 'Yesterday', icon: User },
              ].map((activity, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/30 border border-slate-800">
                  <activity.icon className="w-4 h-4 text-blue-500" />
                  <div className="flex-1">
                    <p className="text-sm text-white font-medium">{activity.action}</p>
                    <p className="text-xs text-slate-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
