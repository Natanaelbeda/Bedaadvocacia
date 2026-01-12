
import React from 'react';
import { ShieldCheck, FileText, Download, TrendingUp, AlertCircle, Calendar } from 'lucide-react';

export const ReportsView: React.FC = () => {
  const reportCards = [
    { title: 'Fechamento Mensal', desc: 'Resumo completo de horas por colaborador.', icon: <FileText /> },
    { title: 'Horas Extras', desc: 'Identifique excessos e custos adicionais.', icon: <TrendingUp className="text-green-600" /> },
    { title: 'Faltas e Atrasos', desc: 'Controle de absenteísmo e impontualidade.', icon: <AlertCircle className="text-red-500" /> },
    { title: 'Espelho de Ponto Individual', desc: 'Gere o arquivo para signature eletrônica.', icon: <Calendar className="text-[#C4A661]" /> },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-[#1E3A5F] flex items-center gap-3">
            <ShieldCheck size={24} className="text-[#C4A661]" />
            Relatórios Gerenciais
          </h1>
          <p className="text-gray-500">Extraia dados estratégicos para a tomada de decisão.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportCards.map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center space-y-4 hover:border-[#C4A661] hover:shadow-md transition-all cursor-pointer group">
            <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-[#C4A661]/10 transition-colors">
              {/* Added any cast to React.ReactElement to fix 'size' property typing error */}
              {React.cloneElement(card.icon as React.ReactElement<any>, { size: 32 })}
            </div>
            <div>
              <h3 className="font-bold text-[#1E3A5F]">{card.title}</h3>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">{card.desc}</p>
            </div>
            <button className="w-full pt-4 mt-4 border-t border-gray-50 text-[10px] font-bold text-[#3B82F6] uppercase flex items-center justify-center gap-2">
              <Download size={14} /> Gerar Agora
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h3 className="font-bold text-[#1E3A5F] mb-6">Últimos Relatórios Gerados</h3>
        <div className="space-y-3">
          {[1, 2].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  <FileText className="text-red-500" size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-700">Relatório de Fechamento - Janeiro/2026.pdf</p>
                  <p className="text-[10px] text-gray-400 font-medium">GERADO EM 02/02/2026 • POR NATANAEL BEDA</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-[#1E3A5F]"><Download size={20} /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
