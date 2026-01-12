
import React, { useState } from 'react';
import { Search, Calendar, Filter, Download, FileText, ChevronLeft, ChevronRight, MapPin, Clock } from 'lucide-react';
import { StylizedB } from '../../constants';

interface DetailedLog {
  id: string;
  date: string;
  time: string;
  type: string;
  reason?: string;
  location: string;
  method: 'GPS' | 'Manual' | 'Fixo';
}

export const MyRecordsView: React.FC = () => {
  const [logs] = useState<DetailedLog[]>([
    { id: '1', date: '12/01/2026', time: '08:02', type: 'Entrada', location: 'Goiânia, GO', method: 'GPS' },
    { id: '2', date: '12/01/2026', time: '12:05', type: 'Saída', reason: 'Almoço', location: 'Goiânia, GO', method: 'GPS' },
    { id: '3', date: '12/01/2026', time: '13:10', type: 'Retorno', location: 'Goiânia, GO', method: 'GPS' },
    // Fix: Removed duplicate 'date' property from line 21
    { id: '4', date: '11/01/2026', time: '18:15', type: 'Saída', reason: 'Fim de Expediente', location: 'Goiânia, GO', method: 'GPS' },
    { id: '5', date: '11/01/2026', time: '13:05', type: 'Retorno', location: 'Goiânia, GO', method: 'GPS' },
    { id: '6', date: '11/01/2026', time: '12:00', type: 'Saída', reason: 'Almoço', location: 'Goiânia, GO', method: 'GPS' },
    { id: '7', date: '11/01/2026', time: '07:58', type: 'Entrada', location: 'Goiânia, GO', method: 'GPS' },
  ]);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-[#1E3A5F] flex items-center gap-3">
            <FileText size={24} className="text-[#C4A661]" />
            Meus Registros
          </h1>
          <p className="text-gray-500">Consulte seu histórico detalhado de batidas de ponto.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm">
            <Download size={18} /> EXPORTAR PDF
          </button>
          <button className="bg-[#1E3A5F] text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-[#162a45] transition-all shadow-sm">
            <Calendar size={18} /> FILTRAR PERÍODO
          </button>
        </div>
      </div>

      {/* Filters Summary */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Período Selecionado</span>
            <span className="text-sm font-bold text-[#1E3A5F]">01/01/2026 - 31/01/2026</span>
          </div>
          <div className="h-8 w-[1px] bg-gray-100"></div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Total de Horas</span>
            <span className="text-sm font-bold text-green-600">84:12hs</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <div className="relative">
             <input 
              type="text" 
              placeholder="Buscar por motivo..." 
              className="pl-9 pr-4 py-2 bg-gray-50 border-transparent rounded-lg text-sm outline-none focus:bg-white focus:ring-2 focus:ring-[#C4A661]/20 transition-all"
             />
             <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
           </div>
        </div>
      </div>

      {/* Records Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 font-bold text-gray-500 uppercase text-[10px] tracking-widest">Data</th>
                <th className="px-6 py-4 font-bold text-gray-500 uppercase text-[10px] tracking-widest">Horário</th>
                <th className="px-6 py-4 font-bold text-gray-500 uppercase text-[10px] tracking-widest">Tipo</th>
                <th className="px-6 py-4 font-bold text-gray-500 uppercase text-[10px] tracking-widest">Justificativa</th>
                <th className="px-6 py-4 font-bold text-gray-500 uppercase text-[10px] tracking-widest">Localização</th>
                <th className="px-6 py-4 font-bold text-gray-500 uppercase text-[10px] tracking-widest">Método</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="px-6 py-4 font-medium text-gray-700">{log.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 font-bold text-[#1E3A5F]">
                      <Clock size={14} className="text-gray-400" />
                      {log.time}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
                      ${log.type === 'Entrada' || log.type === 'Retorno' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-orange-100 text-orange-700'}`}>
                      {log.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 italic">{log.reason || '-'}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <MapPin size={14} className="text-red-400" />
                      {log.location}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded uppercase">
                      {log.method}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50/50">
          <span className="text-xs text-gray-400 font-medium">Mostrando 7 de 154 registros</span>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-30" disabled>
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 rounded-lg bg-[#1E3A5F] text-white text-xs font-bold">1</button>
              <button className="w-8 h-8 rounded-lg hover:bg-gray-200 text-xs font-bold text-gray-600">2</button>
              <button className="w-8 h-8 rounded-lg hover:bg-gray-200 text-xs font-bold text-gray-600">3</button>
            </div>
            <button className="p-2 rounded-lg hover:bg-gray-200 transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl flex items-start gap-4">
        <div className="bg-blue-500 text-white p-3 rounded-xl shadow-lg shadow-blue-500/20">
          <FileText size={24} />
        </div>
        <div>
          <h4 className="font-bold text-[#1E3A5F]">Precisa ajustar algum registro?</h4>
          <p className="text-sm text-[#1E3A5F]/70 mt-1">Caso tenha esquecido de bater o ponto ou tenha feito algum registro incorreto, você pode solicitar um ajuste de ponto através da aba "Solicitar Ajuste" no menu principal.</p>
        </div>
      </div>
    </div>
  );
};
