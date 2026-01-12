
import React from 'react';
import { Clock, Users, UserPlus, CheckCircle, Calendar, BarChart2, AlertCircle, Building2, MapPin, ChevronRight, MessageSquare, ExternalLink, HelpCircle } from 'lucide-react';
import { StatCard } from '../../components/system/StatCard';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { PontoCertoLogo, StylizedB } from '../../constants';

export const DashboardView: React.FC = () => {
  const horasData = [
    { name: 'Horas Normais', value: 0, color: '#C4A661' },
    { name: 'Restante', value: 100, color: '#F1F5F9' },
  ];

  return (
    <div className="p-6 space-y-6 animate-fadeIn bg-[#F0F2F5] min-h-screen">
      {/* Header Stat Row - Inspired by reference image */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Company Card (Purple in ref, Navy for Ponto Certo) */}
        <div className="lg:col-span-1 bg-[#1E3A5F] rounded-xl p-4 text-white flex flex-col justify-between shadow-lg relative overflow-hidden group">
          <div className="flex items-start justify-between relative z-10">
            <div className="bg-white/10 p-2 rounded-lg backdrop-blur-md">
              <Building2 size={24} className="text-[#C4A661]" />
            </div>
            <span className="text-[10px] opacity-60 font-bold">12/01/2026</span>
          </div>
          <div className="mt-4 relative z-10">
            <h2 className="text-xs font-bold uppercase tracking-wider">Empresa</h2>
            <p className="text-[10px] opacity-70">Todos os locais selecionados</p>
          </div>
          <StylizedB className="absolute -bottom-4 -right-4 w-20 h-20 opacity-10 group-hover:scale-110 transition-transform" />
        </div>

        {/* Dynamic Stats Cards */}
        {[
          { label: 'Trabalhando', value: '0', icon: <Clock size={18} />, color: 'text-blue-500' },
          { label: 'Ausentes', value: '0', icon: <Users size={18} />, color: 'text-[#1E3A5F]' },
          { label: 'Novos', value: '0', icon: <UserPlus size={18} />, color: 'text-purple-500' },
          { label: 'Ativos', value: '0 / 5', icon: <CheckCircle size={18} />, color: 'text-green-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gray-50 p-2 rounded-lg text-gray-400">
                {stat.icon}
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</span>
            </div>
            <div className="mt-2">
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <div className="h-1 w-full bg-gray-100 rounded-full mt-2 overflow-hidden">
                <div className={`h-full ${stat.color.replace('text', 'bg')} opacity-40`} style={{ width: '0%' }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Registros Recentes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-gray-700">Registros Recentes</h3>
              <p className="text-[10px] text-gray-400">Dia 12/01/2026</p>
            </div>
            <div className="flex gap-2">
              <button className="p-1.5 bg-gray-50 text-gray-400 rounded-md hover:bg-gray-100"><Clock size={16} /></button>
              <button className="p-1.5 bg-gray-50 text-gray-400 rounded-md hover:bg-gray-100"><ExternalLink size={16} /></button>
            </div>
          </div>
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left text-[11px]">
              <thead className="bg-gray-500 text-white uppercase">
                <tr>
                  <th className="px-4 py-2 font-bold">Nome</th>
                  <th className="px-4 py-2 font-bold">Últimos Registros</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50">
                  <td colSpan={2} className="px-4 py-20 text-center text-gray-400 italic">Nenhum registro hoje</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Últimas Admissões */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-gray-700">Últimas Admissões</h3>
              <p className="text-[10px] text-gray-400">Entre 14/10/2025 e 12/01/2026</p>
            </div>
            <div className="flex gap-2">
              <button className="p-1.5 bg-gray-50 text-gray-400 rounded-md hover:bg-gray-100"><UserPlus size={16} /></button>
              <button className="p-1.5 bg-gray-50 text-gray-400 rounded-md hover:bg-gray-100"><ExternalLink size={16} /></button>
            </div>
          </div>
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left text-[11px]">
              <thead className="bg-gray-500 text-white uppercase">
                <tr>
                  <th className="px-4 py-2 font-bold">Nome</th>
                  <th className="px-4 py-2 font-bold">Experiência</th>
                  <th className="px-4 py-2 font-bold">Admissão</th>
                  <th className="px-4 py-2 font-bold">1º Venc.</th>
                  <th className="px-4 py-2 font-bold">2º Venc.</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50">
                  <td colSpan={5} className="px-4 py-20 text-center text-gray-400 italic">Nenhuma admissão no período</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Solicitações de Ajustes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col lg:col-span-1">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-gray-700">Solicitações de Ajustes</h3>
              <p className="text-[10px] text-gray-400">0 de 0 solicitações. <span className="text-[#3B82F6] cursor-pointer">Ver mais...</span></p>
            </div>
            <button className="p-1.5 bg-gray-50 text-gray-400 rounded-md hover:bg-gray-100"><Calendar size={16} /></button>
          </div>
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left text-[11px]">
              <thead className="bg-gray-500 text-white uppercase">
                <tr>
                  <th className="px-4 py-2 font-bold">Nome</th>
                  <th className="px-4 py-2 font-bold">Data</th>
                  <th className="px-4 py-2 font-bold">Hora</th>
                  <th className="px-4 py-2 font-bold">Tipo</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50">
                  <td colSpan={4} className="px-4 py-20 text-center text-gray-400 italic">Sem solicitações pendentes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Resumo de Horas (Grafico Circular) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col items-center justify-center">
          <h3 className="text-sm font-bold text-gray-700 w-full mb-2">Resumo de Horas Registradas</h3>
          <p className="text-[10px] text-gray-400 w-full mb-4">Dia 01/01/2026 até 30/01/2026</p>
          <div className="h-48 w-48 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={horasData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {horasData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] font-bold text-gray-400 uppercase">Horas Normais</span>
              <span className="text-xl font-bold text-[#1E3A5F]">00:00hs</span>
            </div>
          </div>
        </div>

        {/* Resumo de Solicitações */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col">
          <h3 className="text-sm font-bold text-gray-700 mb-1">Resumo de Solicitações</h3>
          <p className="text-[10px] text-gray-400 mb-12">Dia 01/01/2026 até 12/01/2026</p>
          <div className="flex flex-col items-center justify-center flex-1">
            <span className="text-2xl font-bold text-[#1E3A5F]">Aprovadas</span>
            <span className="text-sm text-gray-400 mt-1">0 Solicitações</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Aniversariantes de Janeiro - Occupying Full Width now */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-gray-700">Aniversariantes de Janeiro</h3>
              <p className="text-[10px] text-gray-400">Nenhum colaborador</p>
            </div>
            <button className="p-1.5 bg-gray-50 text-[#C4A661] rounded-md hover:bg-gray-100"><Calendar size={16} /></button>
          </div>
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left text-[11px]">
              <thead className="bg-gray-500 text-white uppercase">
                <tr>
                  <th className="px-4 py-2 font-bold">Nome</th>
                  <th className="px-4 py-2 font-bold text-right">Data</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50">
                  <td colSpan={2} className="px-4 py-10 text-center text-gray-400 italic">Sem aniversariantes este mês</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Footer Branding */}
      <div className="flex justify-between items-center pt-8 border-t border-gray-200 mt-10">
        <PontoCertoLogo className="opacity-20 grayscale" />
        <div className="flex gap-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <span className="cursor-pointer hover:text-[#C4A661]">Central de Ajuda</span>
          <span className="cursor-pointer hover:text-[#C4A661]">Termos de Uso</span>
          <span className="cursor-pointer hover:text-[#C4A661]">Suporte</span>
        </div>
      </div>
    </div>
  );
};
