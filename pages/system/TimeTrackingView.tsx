
import React, { useState, useEffect, useMemo } from 'react';
import { Clock, MapPin, CheckCircle2, AlertCircle, History, Coffee, LogOut, Sun, Moon, Calendar, X } from 'lucide-react';
import { StylizedB } from '../../constants';

interface Log {
  id: string;
  type: string;
  time: string;
  reason?: string;
  status: 'success' | 'warning' | 'error';
}

const STOP_REASONS = [
  { id: 'almoco', label: 'Almoço', icon: <Coffee size={20} /> },
  { id: 'lanche', label: 'Lanche', icon: <Coffee size={20} /> },
  { id: 'intervalo', label: 'Intervalo', icon: <Clock size={20} /> },
  { id: 'fim', label: 'Fim de Expediente', icon: <LogOut size={20} /> },
];

export const TimeTrackingView: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [logs, setLogs] = useState<Log[]>([
    { id: '1', type: 'Entrada', time: '08:02', status: 'success' },
    { id: '2', type: 'Saída', time: '12:05', reason: 'Almoço', status: 'success' },
    { id: '3', type: 'Retorno', time: '13:10', status: 'success' },
  ]);

  // Simulação de status baseado no último log
  const currentStatus = useMemo(() => {
    if (logs.length === 0) return 'OFFLINE';
    const lastLog = logs[logs.length - 1];
    
    // Se o último registro foi uma entrada ou retorno, ele está trabalhando
    if (lastLog.type === 'Entrada' || lastLog.type === 'Retorno') return 'WORKING';
    
    // Se foi uma saída, mas não foi "Fim de Expediente", ele está em intervalo
    if (lastLog.type === 'Saída') {
      if (lastLog.reason === 'Fim de Expediente') return 'FINISHED';
      return 'BREAK';
    }
    
    return 'OFFLINE';
  }, [logs]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAction = () => {
    if (currentStatus === 'WORKING') {
      setIsModalOpen(true);
    } else {
      recordPoint('start');
    }
  };

  const recordPoint = (mode: 'start' | 'stop', reason?: string) => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    
    let type = '';
    if (mode === 'start') {
      type = logs.length === 0 ? 'Entrada' : 'Retorno';
    } else {
      type = 'Saída';
    }

    const newLog: Log = {
      id: Math.random().toString(),
      type,
      time: formattedTime,
      reason: reason,
      status: 'success'
    };
    
    setLogs([...logs, newLog]);
    setIsModalOpen(false);
  };

  const getStatusConfig = () => {
    switch (currentStatus) {
      case 'WORKING':
        return { label: 'EM SERVIÇO', color: 'bg-green-500', icon: <Sun size={14} />, text: 'Bom trabalho!' };
      case 'BREAK':
        return { label: 'EM INTERVALO', color: 'bg-amber-500', icon: <Coffee size={14} />, text: 'Aproveite seu descanso.' };
      case 'FINISHED':
        return { label: 'EXPEDIENTE ENCERRADO', color: 'bg-gray-500', icon: <Moon size={14} />, text: 'Até amanhã!' };
      default:
        return { label: 'DE FOLGA', color: 'bg-blue-400', icon: <Calendar size={14} />, text: 'Hoje é seu dia de descanso.' };
    }
  };

  const status = getStatusConfig();

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-fadeIn relative pb-20">
      {/* Background Watermark */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none z-0">
        <StylizedB className="w-[600px] h-[600px]" withBackground={true} />
      </div>

      {/* Justification Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1E3A5F]/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden animate-scaleIn">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-[#1E3A5F]">Justificativa de Saída</h3>
                <p className="text-sm text-gray-500">Selecione o motivo da pausa ou encerramento</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-2">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 grid grid-cols-1 gap-3">
              {STOP_REASONS.map((reason) => (
                <button
                  key={reason.id}
                  onClick={() => recordPoint('stop', reason.label)}
                  className="flex items-center gap-4 p-4 rounded-2xl border-2 border-gray-50 hover:border-[#C4A661] hover:bg-[#C4A661]/5 transition-all group text-left"
                >
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-[#1E3A5F] group-hover:bg-[#C4A661] group-hover:text-white transition-colors">
                    {reason.icon}
                  </div>
                  <span className="font-bold text-gray-700 group-hover:text-[#1E3A5F]">{reason.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
        <div className="text-left space-y-1">
          <h1 className="text-3xl font-bold text-[#1E3A5F] flex items-center gap-3">
            <StylizedB className="h-8" />
            Ponto Certo
          </h1>
          <p className="text-gray-500 font-medium">Controle de Jornada</p>
        </div>
        
        <div className={`px-4 py-2 rounded-xl flex items-center gap-3 border shadow-sm ${currentStatus === 'OFFLINE' ? 'bg-blue-50 border-blue-100' : 'bg-white border-gray-100'}`}>
          <div className={`w-3 h-3 rounded-full ${currentStatus === 'OFFLINE' ? 'bg-blue-400' : 'bg-green-500 animate-pulse'}`}></div>
          <span className="text-sm font-bold text-[#1E3A5F]">
            {currentStatus === 'OFFLINE' ? 'DIA DE FOLGA' : 'DIA DE TRABALHO'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-gray-100 p-12 flex flex-col items-center space-y-8 relative overflow-hidden">
            <div className={`absolute top-8 right-8 flex items-center gap-2 px-4 py-1.5 rounded-full text-white text-[10px] font-bold tracking-widest ${status.color} shadow-lg transition-colors duration-500`}>
              {status.icon}
              {status.label}
            </div>

            <div className="text-center space-y-2">
              <div className="text-7xl font-mono font-bold text-[#1E3A5F] tracking-tighter">
                {time.toLocaleTimeString('pt-BR')}
              </div>
              <div className="text-gray-400 font-bold uppercase tracking-[0.2em] text-xs">
                {time.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
              </div>
            </div>

            <button 
              onClick={handleAction}
              className={`w-72 h-72 rounded-full flex flex-col items-center justify-center text-white shadow-2xl transition-all duration-300 group relative
                ${currentStatus === 'WORKING' 
                  ? 'bg-gradient-to-br from-orange-500 to-red-600 border-[12px] border-orange-100'
                  : 'bg-gradient-to-br from-[#1E3A5F] to-[#2A4A6F] border-[12px] border-[#C4A661]/10 hover:scale-105 active:scale-95'
                }`}
            >
              <div className="absolute inset-0 rounded-full bg-current opacity-5 animate-ping"></div>
              <Clock size={80} className={`mb-4 ${currentStatus === 'WORKING' ? 'animate-pulse' : ''}`} />
              <span className="text-xl font-black uppercase tracking-[0.2em]">
                {currentStatus === 'WORKING' ? 'Pausar/Sair' : 'Iniciar'}
              </span>
              <p className="text-[10px] mt-2 opacity-60 font-bold uppercase tracking-widest">
                {currentStatus === 'WORKING' ? 'Justificar Saída' : 'Registrar Ponto'}
              </p>
            </button>

            <div className="flex flex-col items-center gap-3">
              <p className="text-sm font-medium text-gray-500 italic">"{status.text}"</p>
              <div className="flex items-center gap-2 text-green-600 bg-green-50 px-5 py-2.5 rounded-2xl text-xs font-bold border border-green-100">
                <MapPin size={14} />
                GPS ATIVO: Goiânia, GO
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#1E3A5F] rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <h3 className="text-[#C4A661] text-[10px] font-bold tracking-[0.2em] uppercase">Resumo da Jornada</h3>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-3xl font-bold">06:15h</p>
                  <p className="text-xs text-white/50">Trabalhadas hoje</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-[#C4A661]">08:00h</p>
                  <p className="text-[10px] text-white/50 uppercase">Meta Diária</p>
                </div>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div className="bg-[#C4A661] h-full transition-all duration-1000" style={{ width: '78%' }}></div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 opacity-10">
              <StylizedB className="w-32 h-32" />
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex-1">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="font-bold text-[#1E3A5F] flex items-center gap-2 text-sm">
                <History size={18} className="text-[#C4A661]" /> Histórico do Dia
              </h2>
            </div>
            <div className="p-6 relative max-h-[400px] overflow-y-auto">
              <div className="absolute left-[35px] top-8 bottom-8 w-[2px] bg-gray-100"></div>
              
              <div className="space-y-8">
                {logs.length > 0 ? logs.slice().reverse().map((log, idx) => (
                  <div key={log.id} className="relative flex items-center gap-6 group">
                    <div className="w-12 text-right">
                      <p className="text-sm font-bold text-[#1E3A5F]">{log.time}</p>
                    </div>
                    
                    <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-sm transition-transform group-hover:scale-110
                      ${log.type.includes('Entrada') || log.type.includes('Retorno') ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'}`}>
                      {log.type.includes('Entrada') ? <Sun size={16} /> : log.type.includes('Retorno') ? <Sun size={16} /> : <Coffee size={16} />}
                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-800">{log.type}{log.reason ? `: ${log.reason}` : ''}</p>
                      <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Confirmado via GPS</p>
                    </div>
                  </div>
                )) : (
                  <div className="py-12 text-center">
                    <div className="bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <History size={20} className="text-gray-300" />
                    </div>
                    <p className="text-sm text-gray-400 font-medium">Aguardando primeiro registro...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="bg-blue-50 text-[#1E3A5F] p-4 rounded-2xl">
            <Calendar size={24} />
          </div>
          <div>
            <h4 className="font-bold text-[#1E3A5F]">Escala de Trabalho</h4>
            <p className="text-sm text-gray-500">Segunda a Sexta • 08h00 - 18h00</p>
            <div className="mt-2 flex gap-1">
              {['S', 'T', 'Q', 'Q', 'S'].map((d, i) => (
                <div key={i} className="w-6 h-6 rounded bg-green-100 text-green-700 text-[10px] flex items-center justify-center font-bold">{d}</div>
              ))}
              {['S', 'D'].map((d, i) => (
                <div key={i} className="w-6 h-6 rounded bg-gray-100 text-gray-400 text-[10px] flex items-center justify-center font-bold">{d}</div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="bg-amber-50 text-[#C4A661] p-4 rounded-2xl">
            <AlertCircle size={24} />
          </div>
          <div>
            <h4 className="font-bold text-[#1E3A5F]">Avisos e Pendências</h4>
            <p className="text-sm text-gray-500">Mantenha seus registros atualizados para evitar inconsistências no fechamento do mês.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
