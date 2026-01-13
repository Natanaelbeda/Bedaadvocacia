
import React, { useState, useEffect, useMemo } from 'react';
import { Layers, Download, Printer, ChevronLeft, ChevronRight, Calendar, AlertCircle, CheckCircle2, TrendingUp, FileSpreadsheet } from 'lucide-react';

interface Log {
  id: string;
  type: string;
  time: string;
  date: string;
  reason?: string;
  status: 'success' | 'warning' | 'error';
  location: string;
  method: string;
}

const STORAGE_KEY = 'pc_time_logs_v1';

export const TimeMirrorView: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [logs, setLogs] = useState<Log[]>([]);

  // Carrega os logs reais
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setLogs(JSON.parse(saved));
      } catch (e) {
        setLogs([]);
      }
    }
  }, []);

  // Gera os dias do mês selecionado
  const monthDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const date = new Date(year, month, 1);
    const days = [];

    while (date.getMonth() === month) {
      const dateStr = date.toLocaleDateString('pt-BR');
      const dayOfWeek = date.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');
      
      // Filtra logs deste dia específico
      const dayLogs = logs
        .filter(l => l.date === dateStr)
        .sort((a, b) => a.time.localeCompare(b.time));

      // Organiza em colunas (E1, S1, E2, S2...)
      // Simplificação: assume que as batidas ímpares são entrada e pares são saída
      const entries = {
        e1: dayLogs[0]?.time || '--:--',
        s1: dayLogs[1]?.time || '--:--',
        e2: dayLogs[2]?.time || '--:--',
        s2: dayLogs[3]?.time || '--:--',
      };

      // Cálculo básico de total (apenas visual para este protótipo)
      const hasFullShift = dayLogs.length >= 2;
      
      days.push({
        date: date.getDate().toString().padStart(2, '0') + '/' + (date.getMonth() + 1).toString().padStart(2, '0'),
        day: dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1),
        ...entries,
        total: hasFullShift ? 'Calculado' : '00:00',
        balance: '00:00',
        status: dayLogs.length === 0 ? 'off' : (dayLogs.length % 2 !== 0 ? 'alert' : 'ok'),
        rawDate: new Date(date)
      });
      date.setDate(date.getDate() + 1);
    }
    return days;
  }, [currentDate, logs]);

  const changeMonth = (offset: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setCurrentDate(newDate);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportExcel = () => {
    const header = "Data;Dia;Entrada 1;Saida 1;Entrada 2;Saida 2;Total;Saldo\n";
    const rows = monthDays.map(d => 
      `${d.date};${d.day};${d.e1};${d.s1};${d.e2};${d.s2};${d.total};${d.balance}`
    ).join("\n");
    
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `espelho_ponto_${currentDate.getMonth() + 1}_${currentDate.getFullYear()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const monthLabel = currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn print:p-0">
      <div className="flex justify-between items-end print:hidden">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-[#1E3A5F] flex items-center gap-3">
            <Layers size={24} className="text-[#C4A661]" />
            Espelho de Ponto
          </h1>
          <p className="text-gray-500">Relatório mensal detalhado da sua jornada de trabalho.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handlePrint}
            className="bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm"
          >
            <Printer size={18} /> IMPRIMIR
          </button>
          <button 
            onClick={handleExportExcel}
            className="bg-[#1E3A5F] text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-[#162a45] transition-all shadow-sm"
          >
            <FileSpreadsheet size={18} /> EXPORTAR EXCEL
          </button>
        </div>
      </div>

      {/* Somente visível na impressão */}
      <div className="hidden print:block mb-8 border-b-2 border-[#1E3A5F] pb-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-[#1E3A5F]">Ponto Certo - Espelho de Ponto</h1>
            <p className="text-sm text-gray-600">Referência: <span className="capitalize">{monthLabel}</span></p>
          </div>
          <div className="text-right text-xs">
            <p className="font-bold">Colaborador: Natanael Beda</p>
            <p>CPF: ***.***.***-**</p>
          </div>
        </div>
      </div>

      {/* Month Selector & Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 print:grid-cols-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between print:border-none print:shadow-none">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Mês de Referência</span>
          <div className="flex items-center justify-between mt-2">
            <button onClick={() => changeMonth(-1)} className="p-1 hover:bg-gray-100 rounded-full text-gray-400 print:hidden">
              <ChevronLeft size={20} />
            </button>
            <span className="font-bold text-[#1E3A5F] capitalize">{monthLabel}</span>
            <button onClick={() => changeMonth(1)} className="p-1 hover:bg-gray-100 rounded-full text-gray-400 print:hidden">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col print:border-none print:shadow-none">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Horas Trabalhadas</span>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-2xl font-bold text-[#1E3A5F]">
              {monthDays.filter(d => d.status === 'ok').length * 8}:00h
            </span>
            <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold print:hidden">ESTIMADO</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col print:border-none print:shadow-none">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Saldo do Mês</span>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-2xl font-bold text-green-600">00:00h</span>
            <TrendingUp size={20} className="text-green-500 print:hidden" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col print:border-none print:shadow-none">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Inconsistências</span>
          <div className="flex items-center gap-2 mt-2">
            <span className={`text-2xl font-bold ${monthDays.filter(d => d.status === 'alert').length > 0 ? 'text-orange-500' : 'text-gray-400'}`}>
              {monthDays.filter(d => d.status === 'alert').length}
            </span>
            <AlertCircle size={20} className="text-orange-500 print:hidden" />
          </div>
        </div>
      </div>

      {/* Mirror Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden print:shadow-none print:border-black print:rounded-none">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-[#1E3A5F] text-white print:bg-gray-200 print:text-black">
                <th className="px-4 py-4 font-bold uppercase text-[10px] tracking-widest border-r border-white/10 print:border-black">Data</th>
                <th className="px-4 py-4 font-bold uppercase text-[10px] tracking-widest border-r border-white/10 text-center print:border-black">E 1</th>
                <th className="px-4 py-4 font-bold uppercase text-[10px] tracking-widest border-r border-white/10 text-center print:border-black">S 1</th>
                <th className="px-4 py-4 font-bold uppercase text-[10px] tracking-widest border-r border-white/10 text-center print:border-black">E 2</th>
                <th className="px-4 py-4 font-bold uppercase text-[10px] tracking-widest border-r border-white/10 text-center print:border-black">S 2</th>
                <th className="px-4 py-4 font-bold uppercase text-[10px] tracking-widest border-r border-white/10 text-center print:border-black">Total</th>
                <th className="px-4 py-4 font-bold uppercase text-[10px] tracking-widest border-r border-white/10 text-center print:border-black">Saldo</th>
                <th className="px-4 py-4 font-bold uppercase text-[10px] tracking-widest text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 print:divide-black">
              {monthDays.map((item, idx) => (
                <tr key={idx} className={`${item.status === 'off' ? 'bg-gray-50/50 italic text-gray-400' : 'hover:bg-blue-50/30'} transition-colors print:bg-transparent`}>
                  <td className="px-4 py-3 border-r border-gray-100 print:border-black">
                    <div className="flex flex-col leading-tight">
                      <span className="font-bold text-[#1E3A5F] print:text-black">{item.date}</span>
                      <span className="text-[10px] uppercase font-medium">{item.day}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 border-r border-gray-100 text-center font-medium print:border-black">{item.e1}</td>
                  <td className="px-4 py-3 border-r border-gray-100 text-center font-medium print:border-black">{item.s1}</td>
                  <td className="px-4 py-3 border-r border-gray-100 text-center font-medium print:border-black">{item.e2}</td>
                  <td className="px-4 py-3 border-r border-gray-100 text-center font-medium print:border-black">{item.s2}</td>
                  <td className="px-4 py-3 border-r border-gray-100 text-center font-bold text-[#1E3A5F] print:text-black">{item.total === 'Calculado' ? '08:00' : item.total}</td>
                  <td className={`px-4 py-3 border-r border-gray-100 text-center font-bold ${item.balance.startsWith('+') ? 'text-green-600' : item.balance.startsWith('-') ? 'text-red-500' : ''} print:text-black`}>
                    {item.balance}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center">
                      {item.status === 'ok' && <CheckCircle2 size={16} className="text-green-500" />}
                      {item.status === 'alert' && (
                        <span title="Batida faltante" className="flex items-center">
                          <AlertCircle size={16} className="text-orange-500" />
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

      <div className="bg-[#C4A661]/5 border border-[#C4A661]/20 p-6 rounded-2xl flex items-start gap-4 print:hidden">
        <div className="bg-[#C4A661] text-[#1E3A5F] p-3 rounded-xl shadow-lg">
          <Calendar size={24} />
        </div>
        <div>
          <h4 className="font-bold text-[#1E3A5F]">Assinatura Digital</h4>
          <p className="text-sm text-[#1E3A5F]/70 mt-1">O espelho de ponto referente ao mês anterior já está disponível para assinatura eletrônica. Por favor, revise os dados e confirme até o dia 05.</p>
          <button className="mt-3 bg-[#1E3A5F] text-white px-5 py-2 rounded-lg text-xs font-bold hover:bg-[#162a45] transition-all">ASSINAR AGORA</button>
        </div>
      </div>
      
      {/* Assinatura para Impressão */}
      <div className="hidden print:flex mt-20 justify-around gap-10">
        <div className="flex-1 border-t border-black text-center pt-2">
          <p className="text-xs font-bold">Assinatura do Colaborador</p>
          <p className="text-[10px]">Data: ___/___/_____</p>
        </div>
        <div className="flex-1 border-t border-black text-center pt-2">
          <p className="text-xs font-bold">Assinatura do Gestor</p>
          <p className="text-[10px]">Data: ___/___/_____</p>
        </div>
      </div>
    </div>
  );
};
