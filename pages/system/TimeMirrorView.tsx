
import React from 'react';
import { Layers, Download, Printer, ChevronLeft, ChevronRight, Calendar, AlertCircle, CheckCircle2, TrendingUp } from 'lucide-react';

export const TimeMirrorView: React.FC = () => {
  const days = [
    { date: '01/01', day: 'Qui', e1: '08:00', s1: '12:00', e2: '13:00', s2: '18:00', total: '09:00', balance: '+01:00', status: 'ok' },
    { date: '02/01', day: 'Sex', e1: '08:10', s1: '12:05', e2: '13:10', s2: '18:05', total: '08:50', balance: '+00:50', status: 'ok' },
    { date: '03/01', day: 'Sáb', e1: '--:--', s1: '--:--', e2: '--:--', s2: '--:--', total: '00:00', balance: '00:00', status: 'off' },
    { date: '04/01', day: 'Dom', e1: '--:--', s1: '--:--', e2: '--:--', s2: '--:--', total: '00:00', balance: '00:00', status: 'off' },
    { date: '05/01', day: 'Seg', e1: '07:55', s1: '12:00', e2: '13:00', s2: '17:50', total: '08:55', balance: '+00:55', status: 'ok' },
    { date: '06/01', day: 'Ter', e1: '08:00', s1: '12:00', e2: '13:00', s2: '--:--', total: '04:00', balance: '-04:00', status: 'alert' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-[#1E3A5F] flex items-center gap-3">
            <Layers size={24} className="text-[#C4A661]" />
            Espelho de Ponto
          </h1>
          <p className="text-gray-500">Relatório mensal detalhado da sua jornada de trabalho.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm">
            <Printer size={18} /> IMPRIMIR
          </button>
          <button className="bg-[#1E3A5F] text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-[#162a45] transition-all shadow-sm">
            <Download size={18} /> EXPORTAR EXCEL
          </button>
        </div>
      </div>

      {/* Month Selector & Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Mês de Referência</span>
          <div className="flex items-center justify-between mt-2">
            <button className="p-1 hover:bg-gray-100 rounded-full text-gray-400"><ChevronLeft size={20} /></button>
            <span className="font-bold text-[#1E3A5F]">Janeiro / 2026</span>
            <button className="p-1 hover:bg-gray-100 rounded-full text-gray-400"><ChevronRight size={20} /></button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Horas Trabalhadas</span>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-2xl font-bold text-[#1E3A5F]">45:12h</span>
            <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">META 78%</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Saldo do Mês</span>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-2xl font-bold text-green-600">+02:45h</span>
            <TrendingUp size={20} className="text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Inconsistências</span>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-2xl font-bold text-orange-500">1</span>
            <AlertCircle size={20} className="text-orange-500" />
          </div>
        </div>
      </div>

      {/* Mirror Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-[#1E3A5F] text-white">
                <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-widest border-r border-white/10">Data</th>
                <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-widest border-r border-white/10 text-center">Entrada 1</th>
                <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-widest border-r border-white/10 text-center">Saída 1</th>
                <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-widest border-r border-white/10 text-center">Entrada 2</th>
                <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-widest border-r border-white/10 text-center">Saída 2</th>
                <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-widest border-r border-white/10 text-center">Total</th>
                <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-widest border-r border-white/10 text-center">Saldo</th>
                <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-widest text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {days.map((item, idx) => (
                <tr key={idx} className={`${item.status === 'off' ? 'bg-gray-50/50 italic text-gray-400' : 'hover:bg-blue-50/30'} transition-colors`}>
                  <td className="px-6 py-4 border-r border-gray-100">
                    <div className="flex flex-col leading-tight">
                      <span className="font-bold text-[#1E3A5F]">{item.date}</span>
                      <span className="text-[10px] uppercase font-medium">{item.day}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-r border-gray-100 text-center font-medium">{item.e1}</td>
                  <td className="px-6 py-4 border-r border-gray-100 text-center font-medium">{item.s1}</td>
                  <td className="px-6 py-4 border-r border-gray-100 text-center font-medium">{item.e2}</td>
                  <td className="px-6 py-4 border-r border-gray-100 text-center font-medium">{item.s2}</td>
                  <td className="px-6 py-4 border-r border-gray-100 text-center font-bold text-[#1E3A5F]">{item.total}</td>
                  <td className={`px-6 py-4 border-r border-gray-100 text-center font-bold ${item.balance.startsWith('+') ? 'text-green-600' : item.balance.startsWith('-') ? 'text-red-500' : ''}`}>
                    {item.balance}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      {item.status === 'ok' && <CheckCircle2 size={18} className="text-green-500" />}
                      {/* Fix: Wrap AlertCircle in a span to use the 'title' attribute correctly, as Lucide icons do not support 'title' prop directly */}
                      {item.status === 'alert' && (
                        <span title="Batida faltante" className="flex items-center">
                          <AlertCircle size={18} className="text-orange-500" />
                        </span>
                      )}
                      {item.status === 'off' && <span className="text-[10px] font-bold opacity-30">FOLGA</span>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-[#C4A661]/5 border border-[#C4A661]/20 p-6 rounded-2xl flex items-start gap-4">
        <div className="bg-[#C4A661] text-[#1E3A5F] p-3 rounded-xl shadow-lg">
          <Calendar size={24} />
        </div>
        <div>
          <h4 className="font-bold text-[#1E3A5F]">Assinatura Digital</h4>
          <p className="text-sm text-[#1E3A5F]/70 mt-1">O espelho de ponto referente ao mês anterior já está disponível para assinatura eletrônica. Por favor, revise os dados e confirme até o dia 05.</p>
          <button className="mt-3 bg-[#1E3A5F] text-white px-5 py-2 rounded-lg text-xs font-bold hover:bg-[#162a45] transition-all">ASSINAR AGORA</button>
        </div>
      </div>
    </div>
  );
};
