
import React from 'react';
import { Lock, User, Building, Bell, Shield, ChevronRight } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const settingsGroups = [
    { title: 'Perfil', icon: <User />, items: ['Dados Pessoais', 'Alterar Senha', 'Assinatura Digital'] },
    { title: 'Empresa', icon: <Building />, items: ['Dados Cadastrais', 'Filiais', 'Departamentos'] },
    { title: 'Notificações', icon: <Bell />, items: ['E-mail', 'Push Web', 'Alertas de Atraso'] },
    { title: 'Segurança', icon: <Shield />, items: ['Logs de Acesso', 'Permissões API', 'Dispositivos Autorizados'] },
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6 animate-fadeIn">
      <div className="space-y-1 mb-8">
        <h1 className="text-2xl font-bold text-[#1E3A5F] flex items-center gap-3">
          <Lock size={24} className="text-[#C4A661]" />
          Configurações
        </h1>
        <p className="text-gray-500">Personalize sua experiência e as regras do sistema.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {settingsGroups.map((group, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 bg-gray-50 border-b border-gray-100 flex items-center gap-3">
              <div className="text-[#C4A661]">{group.icon}</div>
              <h3 className="font-bold text-[#1E3A5F]">{group.title}</h3>
            </div>
            <div className="p-2">
              {group.items.map((item, j) => (
                <button key={j} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors text-sm text-gray-600 font-medium group">
                  {item}
                  <ChevronRight size={16} className="text-gray-300 group-hover:text-[#C4A661] transition-colors" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-8 border-t border-gray-100 flex justify-end">
        <button className="text-xs font-bold text-gray-400 uppercase hover:text-red-500 transition-colors">Encerrar todas as sessões ativas</button>
      </div>
    </div>
  );
};
