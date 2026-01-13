
import React from 'react';
import { Home, Users, Clock, FileText, Lock, Building, Layers, ShieldCheck, MapPin, Key, Briefcase } from 'lucide-react';
import { PontoCertoLogo } from '../../constants';
import { SystemSection, User } from '../../types';

interface SidebarProps {
  currentSection: SystemSection;
  onSectionChange: (section: SystemSection) => void;
  user: User | null;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentSection, onSectionChange, user }) => {
  const menuGroups = [
    {
      title: 'Principal',
      items: [
        { label: 'Dashboard', section: SystemSection.DASHBOARD, icon: Home },
        { label: 'Bater Ponto', section: SystemSection.TIME_TRACKING, icon: Clock },
      ]
    },
    {
      title: 'Minha Jornada',
      items: [
        { label: 'Meus Registros', section: SystemSection.MY_RECORDS, icon: FileText },
        { label: 'Espelho de Ponto', section: SystemSection.TIME_MIRROR, icon: Layers },
      ]
    },
    {
      title: 'Administração',
      items: [
        { label: 'Colaboradores', section: SystemSection.EMPLOYEES, icon: Users },
        { label: 'Departamentos', section: SystemSection.DEPARTMENTS, icon: Briefcase },
        { label: 'Controle de Acessos', section: SystemSection.ACCESS_MANAGEMENT, icon: Key },
        { label: 'Relatórios Gerenciais', section: SystemSection.REPORTS, icon: ShieldCheck },
        { label: 'Configurações', section: SystemSection.SETTINGS, icon: Lock },
      ]
    }
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <aside className="w-64 bg-[#1E3A5F] min-h-screen flex flex-col text-white shadow-2xl">
      <div className="p-6 border-b border-white/10">
        <PontoCertoLogo />
      </div>
      <nav className="flex-1 overflow-y-auto py-4 space-y-6">
        {menuGroups.map((group, idx) => (
          <div key={idx} className="px-4">
            <h4 className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-2 px-2">
              {group.title}
            </h4>
            <ul className="space-y-1">
              {group.items.map((item, i) => (
                <li key={i}>
                  <button
                    onClick={() => item.section && onSectionChange(item.section)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                      currentSection === item.section 
                      ? 'bg-[#C4A661] text-[#1E3A5F] font-bold shadow-lg' 
                      : 'hover:bg-white/5 text-gray-300'
                    }`}
                  >
                    <item.icon size={18} />
                    <span className="flex-1 text-left">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl">
          <div className="w-10 h-10 rounded-full bg-[#C4A661] flex items-center justify-center font-bold text-[#1E3A5F]">
            {user ? getInitials(user.name) : '??'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold truncate">{user?.name || 'Usuário'}</p>
            <p className="text-[10px] text-gray-400 truncate">{user?.role || 'Carregando...'}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
