
// Import useCallback to fix the undefined name error
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Search, Calendar, Filter, Download, FileText, ChevronLeft, ChevronRight, MapPin, Clock, RefreshCw } from 'lucide-react';
import { TimeLog, User } from '../../types';

const STORAGE_KEY = 'pc_time_logs_v1';
const USER_STORAGE_KEY = 'pc_user';

export const MyRecordsView: React.FC = () => {
  const [logs, setLogs] = useState<TimeLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const currentUser: User | null = useMemo(() => {
    const saved = localStorage.getItem(USER_STORAGE_KEY) || sessionStorage.getItem(USER_STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  }, []);

  const loadLogs = useCallback(() => {
    setIsLoading(true);
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed: TimeLog[] = JSON.parse(saved);
        const userLogs = parsed.filter(l => l.userId === currentUser?.id);
        setLogs(userLogs.slice().reverse());
      } catch (e) {
        console.error("Falha ao ler registros:", e);
      }
    }
    setTimeout(() => setIsLoading(false), 300);
  }, [currentUser]);

  useEffect(() => {
    loadLogs();
    
    // Sincronização em tempo real se o usuário bater o ponto em outra aba
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) loadLogs();
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [loadLogs]);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-[#1E3A5F] flex items-center gap-3">
            <FileText size={24} className="text-[#C4A661]" />
            Histórico de Batidas
          </h1>
          <p className="text-gray-500">Consulte aqui todos os seus registros de jornada salvos.</p>
        </div>
        <button 
          onClick={loadLogs}
          className="p-2 text-gray-400 hover:text-[#C4A661] transition-colors flex items-center gap-2 text-xs font-bold"
        >
          <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} /> ATUALIZAR
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 font-bold text-gray-400 uppercase text-[10px] tracking-widest">Data</th>
                <th className="px-6 py-4 font-bold text-gray-400 uppercase text-[10px] tracking-widest">Horário</th>
                <th className="px-6 py-4 font-bold text-gray-400 uppercase text-[10px] tracking-widest text-center">Tipo</th>
                <th className="px-6 py-4 font-bold text-gray-400 uppercase text-[10px] tracking-widest">Validação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {logs.length > 0 ? logs.map((log) => (
                <tr key={log.id} className="hover:bg-blue-50/20 transition-colors">
                  <td className="px-6 py-4 font-medium text-[#1E3A5F]">{log.date}</td>
                  <td className="px-6 py-4 font-bold text-gray-800">{log.time}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase
                      ${log.type === 'Entrada' || log.type === 'Retorno' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                      {log.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <MapPin size={12} className="text-[#C4A661]" />
                      GPS Sincronizado
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="px-6 py-24 text-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="p-4 bg-gray-50 rounded-full"><Clock size={40} className="text-gray-200" /></div>
                        <p className="text-gray-400 font-medium">Você ainda não possui batidas salvas neste perfil.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};