
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  Settings, 
  Bell, 
  Search, 
  TrendingUp, 
  Activity,
  ArrowUpRight,
  ChevronRight,
  Cpu
} from 'lucide-react';

export const DashboardPreview: React.FC = () => {
  return (
    <div className="relative group max-w-5xl mx-auto">
      {/* Blueprint Shadow */}
      <div className="absolute -inset-2 bg-blue-600/5 rounded-sm blur-xl"></div>
      
      <div className="relative bg-[#0a0a0a] rounded-sm border border-white/10 overflow-hidden shadow-2xl flex flex-col">
        {/* Mock Browser Header */}
        <div className="bg-[#151515] border-b border-white/10 px-4 py-3 flex items-center justify-between">
          <div className="flex gap-2 w-20">
            <div className="w-2.5 h-2.5 bg-white/10 rounded-none border border-white/20"></div>
            <div className="w-2.5 h-2.5 bg-white/10 rounded-none border border-white/20"></div>
            <div className="w-2.5 h-2.5 bg-white/10 rounded-none border border-white/20"></div>
          </div>
          
          <div className="flex-1 max-w-md mx-auto flex items-center gap-2 bg-black/40 rounded-sm px-3 py-1.5 border border-white/10">
            <Search size={12} className="text-slate-600" />
            <div className="text-[9px] text-slate-500 font-mono tracking-wider uppercase">
              engine.jp.tech/control-panel/v4
            </div>
          </div>

          <div className="flex items-center gap-4 w-20 justify-end">
            <Bell size={14} className="text-slate-600" />
            <div className="w-6 h-6 bg-blue-600 text-white flex items-center justify-center text-[9px] font-black">JP</div>
          </div>
        </div>

        <div className="flex h-[550px]">
          {/* Sidebar */}
          <div className="w-56 bg-black border-r border-white/5 p-6 flex flex-col gap-8">
             <div className="px-2 mb-4">
               <div className="flex items-center gap-2 text-white font-black text-xs uppercase tracking-tighter">
                 <Cpu size={14} className="text-blue-500" />
                 CORE_OS v1.0
               </div>
             </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3 px-3 py-2.5 bg-blue-600 text-white rounded-sm text-[10px] font-black uppercase tracking-widest">
                <LayoutDashboard size={14} />
                <span>Telemetry</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2.5 text-slate-500 hover:text-slate-200 transition-colors text-[10px] font-black uppercase tracking-widest">
                <Users size={14} />
                <span>Nodes</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2.5 text-slate-500 hover:text-slate-200 transition-colors text-[10px] font-black uppercase tracking-widest">
                <BarChart3 size={14} />
                <span>Traffic</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2.5 text-slate-500 hover:text-slate-200 transition-colors text-[10px] font-black uppercase tracking-widest">
                <Activity size={14} />
                <span>Logs</span>
              </div>
            </div>

            <div className="mt-auto">
              <div className="flex items-center gap-3 px-3 py-2 text-slate-700 hover:text-slate-300 transition-colors text-[10px] font-bold uppercase tracking-widest">
                <Settings size={14} />
                <span>Maint</span>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 p-10 overflow-y-auto custom-scrollbar bg-[#0d0d0d]">
            <div className="flex items-center justify-between mb-10 border-b border-white/5 pb-6">
              <div>
                <h3 className="text-2xl font-black text-white mb-1 uppercase tracking-tight">System_Diagnostics</h3>
                <p className="text-[10px] text-slate-600 font-mono tracking-widest uppercase">Latency: 24ms | Load: Nominal</p>
              </div>
              <div className="flex gap-2">
                 <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-sm text-[9px] text-slate-400 font-black uppercase tracking-widest">Live Feed</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-10">
              <div className="bg-white/[0.02] border border-white/5 p-6 hover:border-blue-500/50 transition-all relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                   <div className="text-blue-500"><TrendingUp size={16} /></div>
                   <span className="text-[9px] font-black text-green-500 uppercase">+15.4%</span>
                </div>
                <div className="text-3xl font-black text-white">4.2Gb/s</div>
                <div className="text-[9px] text-slate-600 uppercase font-black tracking-[0.2em] mt-2">Bandwidth Use</div>
              </div>

              <div className="bg-white/[0.02] border border-white/5 p-6 hover:border-blue-500/50 transition-all">
                <div className="flex items-center justify-between mb-4">
                   <div className="text-slate-500"><Users size={16} /></div>
                   <span className="text-[9px] font-black text-blue-500 uppercase">Active</span>
                </div>
                <div className="text-3xl font-black text-white">1,204</div>
                <div className="text-[9px] text-slate-600 uppercase font-black tracking-[0.2em] mt-2">Server Clusters</div>
              </div>

              <div className="bg-white/[0.02] border border-white/5 p-6 hover:border-blue-500/50 transition-all">
                <div className="flex items-center justify-between mb-4">
                   <div className="text-slate-500"><Activity size={16} /></div>
                   <span className="text-[9px] font-black text-slate-600 uppercase">Healthy</span>
                </div>
                <div className="text-3xl font-black text-white">99.9%</div>
                <div className="text-[9px] text-slate-600 uppercase font-black tracking-[0.2em] mt-2">Uptime Core</div>
              </div>
            </div>

            <div className="bg-white/[0.01] border border-white/5 p-8 h-52 flex items-end gap-1 relative overflow-hidden">
               <div className="absolute top-4 left-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Core CPU Usage (%)</div>
               {[30, 45, 32, 55, 68, 42, 38, 52, 60, 45, 50, 75, 65, 48].map((h, i) => (
                 <div key={i} className="flex-1 bg-white/5 hover:bg-blue-600 transition-all duration-300" style={{ height: `${h}%` }}></div>
               ))}
            </div>
          </div>
        </div>
      </div>

      {/* Industrial Tag */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-200 text-black px-8 py-3 font-black text-[10px] uppercase tracking-[0.5em] shadow-2xl border-x-4 border-blue-600">
        Engine Component JP-V4
      </div>
    </div>
  );
};
