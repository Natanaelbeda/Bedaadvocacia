
import React, { useState } from 'react';
import { ShieldCheck, FileText, Download, TrendingUp, AlertCircle, Calendar, Users, Filter, Loader2, CheckCircle, FileSpreadsheet, FileJson, FileCode } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  dept: string;
}

const MOCK_EMPLOYEES: Employee[] = [
  { id: 'all', name: 'Todos os Colaboradores', dept: 'Geral' },
  { id: '1', name: 'Natanael Beda', dept: 'TI' },
  { id: '2', name: 'Maria Silva', dept: 'Recursos Humanos' },
  { id: '3', name: 'João Colaborador', dept: 'Logística' },
];

type ExportFormat = 'excel' | 'pdf' | 'txt';

export const ReportsView: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState('all');
  const [startDate, setStartDate] = useState('2025-03-01');
  const [endDate, setEndDate] = useState('2025-03-31');
  const [exportFormat, setExportFormat] = useState<ExportFormat>('excel');
  const [isGenerating, setIsGenerating] = useState<string | null>(null);

  const handleGenerateReport = (reportTitle: string) => {
    setIsGenerating(reportTitle);
    
    // Simulação de processamento de dados da equipe
    setTimeout(() => {
      const employeeName = MOCK_EMPLOYEES.find(e => e.id === selectedEmployee)?.name || 'Geral';
      let content = `RELATÓRIO: ${reportTitle}\n`;
      content += `COLABORADOR: ${employeeName}\n`;
      content += `PERÍODO: ${startDate} a ${endDate}\n`;
      content += `STATUS: Processado com Sucesso\n`;
      content += `DATA DE GERAÇÃO: ${new Date().toLocaleString('pt-BR')}\n\n`;
      content += `DADOS CONSOLIDADOS:\n`;
      content += `Total de Horas: 160h\n`;
      content += `Total de Extras: 12h\n`;
      content += `Atrasos: 0h\n`;

      let mimeType = 'text/plain';
      let extension = '.txt';

      if (exportFormat === 'excel') {
        // Formata como CSV para o Excel
        const csvHeader = "Relatorio;Colaborador;Inicio;Fim;TotalHoras;Extras;Atrasos\n";
        const csvData = `${reportTitle};${employeeName};${startDate};${endDate};160;12;0`;
        content = csvHeader + csvData;
        mimeType = 'text/csv;charset=utf-8;';
        extension = '.csv';
      } else if (exportFormat === 'pdf') {
        // Simulando PDF com um layout de texto formatado
        content = `--- DOCUMENTO PDF (SIMULADO) ---\n\n${content}`;
        mimeType = 'application/pdf';
        extension = '.pdf';
      }

      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${reportTitle.toLowerCase().replace(/ /g, '_')}_${employeeName.toLowerCase().replace(/ /g, '_')}${extension}`;
      link.click();
      
      setIsGenerating(null);
    }, 2000);
  };

  const reportCards = [
    { id: 'mensal', title: 'Fechamento Mensal', desc: 'Resumo completo de horas por colaborador.', icon: <FileText /> },
    { id: 'extras', title: 'Horas Extras', desc: 'Identifique excessos e custos adicionais.', icon: <TrendingUp className="text-green-600" /> },
    { id: 'faltas', title: 'Faltas e Atrasos', desc: 'Controle de absenteísmo e impontualidade.', icon: <AlertCircle className="text-red-500" /> },
    { id: 'espelho', title: 'Lote de Espelhos', desc: 'Gera todos os arquivos para assinatura eletrônica.', icon: <Calendar className="text-[#C4A661]" /> },
  ];

  const formatOptions = [
    { id: 'excel', label: 'Excel (CSV)', icon: <FileSpreadsheet size={14} />, color: 'hover:text-green-600' },
    { id: 'pdf', label: 'PDF', icon: <FileText size={14} />, color: 'hover:text-red-500' },
    { id: 'txt', label: 'Texto (TXT)', icon: <FileCode size={14} />, color: 'hover:text-blue-500' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-[#1E3A5F] flex items-center gap-3">
            <ShieldCheck size={24} className="text-[#C4A661]" />
            Relatórios Gerenciais
          </h1>
          <p className="text-gray-500">Extraia dados estratégicos para a tomada de decisão sobre toda a equipe.</p>
        </div>
      </div>

      {/* Filtros Estratégicos */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 items-end">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <Users size={12} /> Selecionar Colaborador
            </label>
            <select 
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className="w-full bg-gray-50 border-none rounded-xl px-4 py-2.5 text-sm text-[#1E3A5F] font-bold outline-none focus:ring-2 focus:ring-[#C4A661]/20 cursor-pointer"
            >
              {MOCK_EMPLOYEES.map(emp => (
                <option key={emp.id} value={emp.id}>{emp.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <Calendar size={12} /> Data Inicial
            </label>
            <input 
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-gray-50 border-none rounded-xl px-4 py-2.5 text-sm font-medium outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <Calendar size={12} /> Data Final
            </label>
            <input 
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full bg-gray-50 border-none rounded-xl px-4 py-2.5 text-sm font-medium outline-none"
            />
          </div>

          <div className="hidden lg:block">
             <div className="bg-[#1E3A5F] text-white p-2.5 rounded-xl flex items-center justify-center gap-2 text-xs font-bold shadow-md">
              <Filter size={14} className="text-[#C4A661]" />
              FILTROS ATIVOS
            </div>
          </div>
        </div>

        {/* Novo Seletor de Formato */}
        <div className="pt-4 border-t border-gray-50">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-3">
            <Download size={12} /> Escolha o Formato do Arquivo
          </label>
          <div className="flex flex-wrap gap-3">
            {formatOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setExportFormat(opt.id as ExportFormat)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all border-2
                  ${exportFormat === opt.id 
                    ? 'bg-[#1E3A5F] border-[#1E3A5F] text-white shadow-lg shadow-blue-900/10' 
                    : `bg-gray-50 border-transparent text-gray-400 ${opt.color}`}`}
              >
                {opt.icon}
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportCards.map((card) => (
          <div key={card.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center space-y-4 hover:border-[#C4A661] hover:shadow-md transition-all group">
            <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-[#C4A661]/10 transition-colors">
              {React.cloneElement(card.icon as React.ReactElement<any>, { size: 32 })}
            </div>
            <div>
              <h3 className="font-bold text-[#1E3A5F]">{card.title}</h3>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">{card.desc}</p>
            </div>
            <button 
              onClick={() => handleGenerateReport(card.title)}
              disabled={!!isGenerating}
              className="w-full pt-4 mt-4 border-t border-gray-50 text-[10px] font-bold text-[#3B82F6] uppercase flex items-center justify-center gap-2 hover:text-[#1E3A5F] transition-colors disabled:opacity-50"
            >
              {isGenerating === card.title ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> Gerando...
                </>
              ) : (
                <>
                  <Download size={14} /> Gerar em {exportFormat.toUpperCase()}
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-[#1E3A5F] flex items-center gap-2">
            <CheckCircle size={18} className="text-green-500" />
            Últimos Relatórios Gerados
          </h3>
          <span className="text-[10px] font-bold text-gray-400 uppercase cursor-pointer hover:text-red-500 transition-colors">Limpar Histórico</span>
        </div>
        <div className="space-y-3">
          {[1, 2].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer border border-transparent hover:border-gray-200">
              <div className="flex items-center gap-4">
                <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100">
                  {i === 0 ? <FileSpreadsheet className="text-green-600" size={20} /> : <FileText className="text-red-500" size={20} />}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-700">Consolidado_{i === 0 ? 'Equipe_Março.csv' : 'Natanael_Beda.pdf'}</p>
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">GERADO EM {i === 0 ? '06' : '05'}/03/2025 • POR ADMIN</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">PRONTO</span>
                <button className="text-gray-400 hover:text-[#1E3A5F] transition-all p-1 hover:bg-white rounded shadow-sm">
                  <Download size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
