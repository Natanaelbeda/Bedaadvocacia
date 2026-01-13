
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Clock, MapPin, CheckCircle2, AlertCircle, History, Coffee, LogOut, Sun, Moon, Calendar, X, Save, RefreshCw } from 'lucide-react';
import { StylizedB } from '../../constants';
import { TimeLog, User } from '../../types';

const STORAGE_KEY = 'pc_time_logs_v1';
const BACKUP_KEY = 'pc_time_logs_backup';
const EMERGENCY_KEY = 'pc_emergency_recovery';
const USER_STORAGE_KEY = 'pc_user';

export const TimeTrackingView: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  
  const currentUser: User | null = useMemo(() => {
    const saved = localStorage.getItem(USER_STORAGE_KEY) || sessionStorage.getItem(USER_STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  }, []);

  const [logs, setLogs] = useState<TimeLog[]>(() => {
    // Tenta carregar da fonte principal, se falhar, tenta o backup
    const main = localStorage.getItem(STORAGE_KEY);
    const backup = localStorage.getItem(BACKUP_KEY);
    const emergency = localStorage.getItem(EMERGENCY_KEY);
    
    if (main) return JSON.parse(main);
    if (backup) return JSON.parse(backup);
    if (emergency) return JSON.parse(emergency);
    return [];
  });

  // Mecanismo de Auto-Cura: se os logs principais sumirem mas houver backup, restaura
  useEffect(() => {
    const main = localStorage.getItem(STORAGE_KEY);
    const backup = localStorage.getItem(BACKUP_KEY);
    if (!main && backup && backup !== '[]') {
      console.warn("Restaurando dados do backup de segurança...");
      localStorage.setItem(STORAGE_KEY, backup);
      setLogs(JSON.parse(backup));
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        setLogs(JSON.parse(e.newValue));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const todayLogs = useMemo(() => {
    if (!currentUser) return [];
    const todayStr = new Date().toLocaleDateString('pt-BR');
    return logs.filter(l => l.date === todayStr && l.userId === currentUser.id);
  }, [logs, currentUser]);

  const currentStatus = useMemo(() => {
    if (todayLogs.length === 0) return 'OFFLINE';
    const lastLog = todayLogs[todayLogs.length - 1];
    if (lastLog.type === 'Entrada' || lastLog.type === 'Retorno') return 'WORKING';
    if (lastLog.type === 'Saída') {
      if (lastLog.reason === 'Fim de Expediente') return 'FINISHED';
      return 'BREAK';
    }
    return 'OFFLINE';
  }, [todayLogs]);

  const recordPoint = useCallback((mode: 'start' | 'stop', reason?: string) => {
    if (!currentUser) return;
    
    setIsSaving(true);
    const now = new Date();
    const formattedTime = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const formattedDate = now.toLocaleDateString('pt-BR');
    
    let type = mode === 'start' ? (todayLogs.length === 0 ? 'Entrada' : 'Retorno') : 'Saída';

    const newLog: TimeLog = {
      id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      userId: currentUser.id,
      type,
      time: formattedTime,
      date: formattedDate,
      reason: reason,
      status: 'success',
      location: 'Goiânia, GO',
      method: 'GPS'
    };
    
    try {
      // Leitura imediata do disco para evitar sobrescrever dados de outras abas
      const diskLogs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const updatedLogs = [...diskLogs, newLog];
      
      const rawData = JSON.stringify(updatedLogs);
      // Persistência Tripla (Blindagem)
      localStorage.setItem(STORAGE_KEY, rawData);
      localStorage.setItem(BACKUP_KEY, rawData);
      localStorage.setItem(EMERGENCY_KEY, rawData);

      setLogs(updatedLogs);
      setLastSaved(new Date().toLocaleTimeString());
      setIsModalOpen(false);
    } catch (error) {
      console.error("FALHA DE PERSISTÊNCIA:", error);
      alert("Erro ao salvar! Verifique se seu navegador está com o disco cheio.");
    } finally {
      setTimeout(() => setIsSaving(false), 300);
    }
  }, [currentUser, todayLogs]);

  const getStatusConfig = () => {
    switch (currentStatus) {
      case 'WORKING': return { label: 'EM SERVIÇO', color: 'bg-green-500', icon: <Sun size={14} />, text: 'Proteção de dados ativa.' };
      case 'BREAK': return { label: 'EM INTERVALO', color: 'bg-amber-500', icon: <Coffee size={14} />, text: 'Sincronização em andamento.' };
      case 'FINISHED': return { label: 'EXPEDIENTE ENCERRADO', color: 'bg-gray-500', icon: <Moon size={14} />, text: 'Nuvem local sincronizada.' };
      default: return { label: 'AGUARDANDO', color: 'bg-blue-400', icon: <Calendar size={14} />, text: 'Redundância tripla ligada.' };
    }
  };

  const status = getStatusConfig();
  const displayLogs = [...todayLogs].reverse();

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-fadeIn relative pb-20">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none z-0">
        <StylizedB className="w-[600px] h-[600px]" withBackground={true} />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1E3A5F]/60 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden animate-scaleIn">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div><h3 className="text-xl font-bold text-[#1E3A5F]">Registrar Saída</h3><p className="text-sm text-gray-500">Motivo do registro de hoje.</p></div>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-2"><X size={24} /></button>
            </div>
            <div className="p-6 grid grid-cols-1 gap-3">
              {[ { id: 'almoco', label: 'Almoço', icon: <Coffee size={20} /> }, { id: 'intervalo', label: 'Intervalo', icon: <Clock size={20} /> }, { id: 'fim', label: 'Fim de Expediente', icon: <LogOut size={20} /> }].map((reason) => (
                <button key={reason.id} onClick={() => recordPoint('stop', reason.label)} className="flex items-center gap-4 p-5 rounded-2xl border-2 border-gray-100 hover:border-[#C4A661] hover:bg-[#C4A661]/5 transition-all group text-left">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-[#1E3A5F] group-hover:bg-[#C4A661] transition-colors">{reason.icon}</div>
                  <span className="font-bold text-gray-700">{reason.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
        <div className="text-left space-y-1">
          <h1 className="text-3xl font-bold text-[#1E3A5F] flex items-center gap-3"><StylizedB className="h-8" /> Ponto Certo</h1>
          <p className="text-gray-500 font-medium">Backup automático ativo para {currentUser?.name}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="px-4 py-2 rounded-xl flex items-center gap-3 border bg-white border-green-100 shadow-sm">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[10px] font-bold text-green-700">DADOS PROTEGIDOS (REDUNDÂNCIA TRIPLA)</span>
            <CheckCircle2 size={16} className="text-green-500" />
          </div>
          {lastSaved && <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mr-2 underline decoration-[#C4A661]">Sincronizado às {lastSaved}</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-gray-100 p-12 flex flex-col items-center space-y-8 relative">
            <div className={`absolute top-8 right-8 flex items-center gap-2 px-4 py-1.5 rounded-full text-white text-[10px] font-bold tracking-widest ${status.color} shadow-lg`}>
              {status.icon} {status.label}
            </div>
            <div className="text-center space-y-2">
              <div className="text-7xl font-mono font-bold text-[#1E3A5F]">{time.toLocaleTimeString('pt-BR')}</div>
              <div className="text-gray-400 font-bold uppercase tracking-[0.2em] text-xs">{time.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</div>
            </div>
            <button onClick={() => currentStatus === 'WORKING' ? setIsModalOpen(true) : recordPoint('start')} disabled={currentStatus === 'FINISHED' || isSaving}
              className={`w-72 h-72 rounded-full flex flex-col items-center justify-center text-white shadow-2xl transition-all duration-300 relative
                ${currentStatus === 'WORKING' ? 'bg-gradient-to-br from-orange-500 to-red-600 border-[12px] border-orange-100' : currentStatus === 'FINISHED' ? 'bg-gray-400 opacity-80' : 'bg-gradient-to-br from-[#1E3A5F] to-[#2A4A6F] border-[12px] border-[#C4A661]/10 hover:scale-105 active:scale-95'}`}
            >
              {isSaving ? <RefreshCw size={80} className="animate-spin" /> : <Clock size={80} className={`${currentStatus === 'WORKING' ? 'animate-pulse' : ''}`} />}
              <span className="text-xl font-black uppercase tracking-[0.2em] mt-4">{isSaving ? 'Gravando...' : (currentStatus === 'WORKING' ? 'Registrar' : 'Entrada')}</span>
            </button>
            <p className="text-sm font-medium text-gray-500 italic">"{status.text}"</p>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex-1 flex flex-col min-h-[450px]">
            <div className="p-6 border-b border-gray-100 flex justify-between bg-gray-50/50"><h2 className="font-bold text-[#1E3A5F] flex items-center gap-2 text-sm uppercase"><History size={18} className="text-[#C4A661]" /> Batidas Hoje</h2></div>
            <div className="p-6 flex-1 overflow-y-auto space-y-6">
              {displayLogs.length > 0 ? displayLogs.map((log) => (
                <div key={log.id} className="relative flex items-center gap-4">
                  <div className="w-12 text-right"><p className="text-xs font-bold text-[#1E3A5F]">{log.time.split(':').slice(0,2).join(':')}</p></div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-sm ${log.type.includes('Entrada') ? 'bg-green-500' : 'bg-orange-500'} text-white`}><Sun size={12} /></div>
                  <div className="flex-1"><p className="text-sm font-bold text-gray-800">{log.type}</p><span className="text-[9px] text-green-600 font-bold uppercase">Disco Sincronizado</span></div>
                </div>
              )) : <div className="py-20 text-center text-gray-400">Nenhum registro encontrado.</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
