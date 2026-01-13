
import React, { useState, useEffect } from 'react';
import { Search, Calendar, Filter, Download, FileText, ChevronLeft, ChevronRight, MapPin, Clock } from 'lucide-react';

interface DetailedLog {
  id: string;
  date: string;
  time: string;
  type: string;
  reason?: string;
  location: string;
  method: 'GPS' | 'Manual' | 'Fixo';
}

const STORAGE_KEY = 'pc_time_logs_v1';

export const MyRecordsView: React.FC = () => {
  const [logs, setLogs] = useState<DetailedLog[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Inverte para mostrar os mais recentes primeiro
        setLogs(parsed.slice().reverse());
      } catch (e) {
        setLogs([]);
      }
    }
  }, []);

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

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Registros Totais</span>
            <span className="text-sm font-bold text-[#1E3A5F]">{logs.length} Batidas</span>
          </div>
          <div className="h-8 w-[1px] bg-gray-100"></div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Status do Sistema</span>
            <span className="text-sm font-bold text-green-600 italic">Sincronizado Localmente</span>
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
              {logs.length > 0 ? logs.map((log) => (
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
              )) : (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center text-gray-400">
                    Nenhum registro encontrado no dispositivo.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50/50">
          <span className="text-xs text-gray-400 font-medium">Mostrando {logs.length} registros</span>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-30" disabled>
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 rounded-lg bg-[#1E3A5F] text-white text-xs font-bold">1</button>
            </div>
            <button className="p-2 rounded-lg hover:bg-gray-200 transition-colors" disabled>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl flex items-start gap-4">
        <div className="bg-blue-500 text-white p-3 rounded-xl shadow-lg shadow-blue-500/20">
          <FileText size={24} />
        </div>
        <div>
          <h4 className="font-bold text-[#1E3A5F]">Dados Armazenados com Sucesso</h4>
          <p className="text-sm text-[#1E3A5F]/70 mt-1">Seus registros de ponto ficam guardados de forma definitiva no navegador deste computador. Em breve, os dados serão sincronizados automaticamente com o servidor central.</p>
        </div>
      </div>
    </div>
  );
};
