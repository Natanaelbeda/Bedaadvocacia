
import React, { useState, useEffect, useMemo } from 'react';
import { Layers, Download, Printer, ChevronLeft, ChevronRight, Calendar, AlertCircle, CheckCircle2, FileSpreadsheet, Users, FileText } from 'lucide-react';
import { TimeLog } from '../../types';

const STORAGE_KEY = 'pc_time_logs_v1';

const MOCK_EMPLOYEES = [
  { id: '1', name: 'Natanael Beda', cpf: '***.443.121-**', role: 'Administrador' },
  { id: '2', name: 'Maria Silva', cpf: '***.554.321-**', role: 'Gestor' },
  { id: '3', name: 'João Colaborador', cpf: '***.112.998-**', role: 'Colaborador' },
];

export const TimeMirrorView: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('1');
  const [logs, setLogs] = useState<TimeLog[]>([]);

  const selectedEmployee = MOCK_EMPLOYEES.find(e => e.id === selectedEmployeeId) || MOCK_EMPLOYEES[0];

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

  const monthDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const date = new Date(year, month, 1);
    const days = [];

    while (date.getMonth() === month) {
      const dateStr = date.toLocaleDateString('pt-BR');
      const dayOfWeek = date.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');
      
      const dayLogs = logs
        .filter(l => l.date === dateStr && l.userId === selectedEmployeeId)
        .sort((a, b) => a.time.localeCompare(b.time));

      const entries = {
        e1: dayLogs[0]?.time || '--:--',
        s1: dayLogs[1]?.time || '--:--',
        e2: dayLogs[2]?.time || '--:--',
        s2: dayLogs[3]?.time || '--:--',
      };

      const hasActivity = dayLogs.length > 0;
      const isComplete = dayLogs.length >= 2 && dayLogs.length % 2 === 0;
      
      days.push({
        date: date.getDate().toString().padStart(2, '0') + '/' + (date.getMonth() + 1).toString().padStart(2, '0'),
        day: dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1),
        ...entries,
        total: isComplete ? '08:00' : (hasActivity ? '--:--' : '00:00'),
        status: !hasActivity ? 'off' : (!isComplete ? 'alert' : 'ok'),
      });
      
      date.setDate(date.getDate() + 1);
    }
    return days;
  }, [currentDate, logs, selectedEmployeeId]);

  const exportToExcel = () => {
    let csv = "Data;Dia;Entrada 1;Saida 1;Entrada 2;Saida 2;Total;Status\n";
    monthDays.forEach(d => {
      csv += `${d.date};${d.day};${d.e1};${d.s1};${d.e2};${d.s2};${d.total};${d.status.toUpperCase()}\n`;
    });

    const blob = new Blob(["\ufeff" + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Espelho_${selectedEmployee.name.replace(/ /g, '_')}_${currentDate.getMonth()+1}_${currentDate.getFullYear()}.csv`;
    link.click();
  };

  const changeMonth = (offset: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setCurrentDate(newDate);
  };

  const monthLabel = currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn print:p-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 print:hidden">
        <div className="space-y-4 w-full md:w-auto">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-[#1E3A5F] flex items-center gap-3">
              <Layers size={24} className="text-[#C4A661]" />
              Espelho de Ponto
            </h1>
            <p className="text-gray-500 text-sm">Visualize e exporte a folha de frequência.</p>
          </div>
          
          <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
            <div className="bg-[#1E3A5F] text-white p-2 rounded-xl">
              <Users size={18} />
            </div>
            <select 
              value={selectedEmployeeId}
              onChange={(e) => setSelectedEmployeeId(e.target.value)}
              className="bg-transparent border-none text-sm font-bold text-[#1E3A5F] outline-none pr-8 cursor-pointer"
            >
              {MOCK_EMPLOYEES.map(emp => (
                <option key={emp.id} value={emp.id}>{emp.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <button 
            onClick={exportToExcel}
            className="flex-1 md:flex-none bg-white border border-green-200 text-green-700 px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-green-50 shadow-sm transition-all"
          >
            <FileSpreadsheet size={16} /> EXCEL
          </button>
          <button 
            onClick={() => window.print()} 
            className="flex-1 md:flex-none bg-white border border-red-200 text-red-700 px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-red-50 shadow-sm transition-all"
          >
            <FileText size={16} /> PDF / IMPRIMIR
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 print:grid-cols-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
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

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Horas Calculadas</span>
          <div className="mt-2">
            <span className="text-2xl font-bold text-[#1E3A5F]">
              {monthDays.reduce((acc, d) => acc + (d.status === 'ok' ? 8 : 0), 0)}:00h
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden print:border-black print:rounded-none">
        <div className="p-8 hidden print:block border-b border-gray-200">
            <h2 className="text-xl font-bold text-[#1E3A5F]">RELATÓRIO INDIVIDUAL DE FREQUÊNCIA</h2>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <p><strong>Colaborador:</strong> {selectedEmployee.name}</p>
                <p><strong>CPF:</strong> {selectedEmployee.cpf}</p>
                <p><strong>Período:</strong> {monthLabel}</p>
                <p><strong>Cargo:</strong> {selectedEmployee.role}</p>
            </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-[#1E3A5F] text-white print:bg-gray-200 print:text-black">
                <th className="px-4 py-4 font-bold uppercase text-[10px] tracking-widest">Data</th>
                <th className="px-4 py-4 font-bold uppercase text-[10px] tracking-widest text-center">E 1</th>
                <th className="px-4 py-4 font-bold uppercase text-[10px] tracking-widest text-center">S 1</th>
                <th className="px-4 py-4 font-bold uppercase text-[10px] tracking-widest text-center">E 2</th>
                <th className="px-4 py-4 font-bold uppercase text-[10px] tracking-widest text-center">S 2</th>
                <th className="px-4 py-4 font-bold uppercase text-[10px] tracking-widest text-center">Total</th>
                <th className="px-4 py-4 font-bold uppercase text-[10px] tracking-widest text-center print:hidden">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {monthDays.map((item, idx) => (
                <tr key={idx} className={`${item.status === 'off' ? 'bg-gray-50/30 italic text-gray-400' : 'hover:bg-blue-50/30'} transition-colors`}>
                  <td className="px-4 py-3">
                    <div className="flex flex-col leading-tight">
                      <span className="font-bold text-[#1E3A5F]">{item.date}</span>
                      <span className="text-[10px] uppercase font-medium">{item.day}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center font-medium">{item.e1}</td>
                  <td className="px-4 py-3 text-center font-medium">{item.s1}</td>
                  <td className="px-4 py-3 text-center font-medium">{item.e2}</td>
                  <td className="px-4 py-3 text-center font-medium">{item.s2}</td>
                  <td className="px-4 py-3 text-center font-bold text-[#1E3A5F]">{item.total}</td>
                  <td className="px-4 py-3 text-center print:hidden">
                    <div className="flex justify-center">
                      {item.status === 'ok' && <CheckCircle2 size={16} className="text-green-500" />}
                      {item.status === 'alert' && <AlertCircle size={16} className="text-orange-500" />}
                      {item.status === 'off' && <span className="text-[10px] font-bold opacity-20">---</span>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-20 hidden print:block">
            <div className="flex justify-between gap-20">
                <div className="flex-1 border-t border-black pt-2 text-center text-xs">Assinatura do Colaborador</div>
                <div className="flex-1 border-t border-black pt-2 text-center text-xs">Assinatura do Gestor</div>
            </div>
        </div>
      </div>
    </div>
  );
};
