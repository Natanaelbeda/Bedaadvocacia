
import React from 'react';
import { Search, HelpCircle, Bell, User as UserIcon, LogOut } from 'lucide-react';
import { User } from '../../types';

interface HeaderProps {
  user: User | null;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="h-16 bg-[#1E3A5F] border-b border-white/10 flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md w-full">
          <input 
            type="text" 
            placeholder="Buscar no sistema..." 
            className="w-full bg-white/10 border-transparent rounded-full px-4 py-1.5 text-sm text-white placeholder-gray-400 focus:bg-white focus:text-gray-900 transition-all outline-none"
          />
          <Search className="absolute right-3 top-2 text-gray-400" size={16} />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <button className="text-gray-300 hover:text-white transition-colors">
          <HelpCircle size={20} />
        </button>
        <button className="text-gray-300 hover:text-white transition-colors relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-[10px] flex items-center justify-center rounded-full text-white font-bold">3</span>
        </button>
        <div className="h-8 w-[1px] bg-white/10 mx-2"></div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-white leading-tight">{user?.name || 'Carregando...'}</p>
            <p className="text-[10px] text-gray-400">{user?.role || 'Acesso'}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#C4A661] flex items-center justify-center font-bold text-white text-sm">
            <UserIcon size={16} />
          </div>
          <button 
            onClick={onLogout}
            className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-all"
            title="Sair do sistema"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};
