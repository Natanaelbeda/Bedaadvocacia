
import React, { useState } from 'react';
import { Key, Plus, Search, MoreVertical, Shield, UserPlus, X, Lock, Mail, UserCheck, ShieldAlert, ShieldCheck } from 'lucide-react';
import { User } from '../../types';

export const AccessManagementView: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'Natanael Beda', email: 'natanael@beda.com', role: 'Administrador', status: 'Ativo', lastLogin: '12/01/2026 08:30' },
    { id: '2', name: 'Maria Silva', email: 'maria@empresa.com', role: 'Gestor', status: 'Ativo', lastLogin: '11/01/2026 14:20' },
    { id: '3', name: 'João Colaborador', email: 'joao@ponto.com', role: 'Colaborador', status: 'Ativo', lastLogin: '12/01/2026 07:55' },
    { id: '4', name: 'Ricardo Santos', email: 'ricardo@empresa.com', role: 'Colaborador', status: 'Inativo', lastLogin: '05/12/2025 18:00' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Colaborador' as User['role']
  });

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      status: 'Ativo',
      lastLogin: 'Nunca'
    };
    setUsers([newUser, ...users]);
    setIsModalOpen(false);
    setFormData({ name: '', email: '', password: '', role: 'Colaborador' });
  };

  const getRoleBadge = (role: User['role']) => {
    switch (role) {
      case 'Administrador': return <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase flex items-center gap-1 w-fit"><ShieldCheck size={10} /> {role}</span>;
      case 'Gestor': return <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase flex items-center gap-1 w-fit"><Shield size={10} /> {role}</span>;
      default: return <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase flex items-center gap-1 w-fit"><UserCheck size={10} /> {role}</span>;
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn">
      {/* Modal de Novo Usuário */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1E3A5F]/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden animate-scaleIn">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div className="flex items-center gap-4">
                <div className="bg-[#C4A661] p-3 rounded-2xl text-white shadow-lg">
                  <UserPlus size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1E3A5F]">Criar Novo Acesso</h3>
                  <p className="text-sm text-gray-500">Defina as credenciais do novo usuário.</p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-2">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleAddUser} className="p-8 space-y-5">
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Nome Completo</label>
                  <div className="relative">
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      placeholder="Nome do colaborador" 
                      className="w-full border-gray-200 border-2 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:border-[#C4A661] outline-none transition-all"
                    />
                    <UserPlus size={16} className="absolute left-3.5 top-3.5 text-gray-300" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">E-mail de Login</label>
                  <div className="relative">
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      placeholder="email@ponto.com" 
                      className="w-full border-gray-200 border-2 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:border-[#C4A661] outline-none transition-all"
                    />
                    <Mail size={16} className="absolute left-3.5 top-3.5 text-gray-300" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Senha Inicial</label>
                  <div className="relative">
                    <input 
                      required
                      type="password" 
                      value={formData.password}
                      onChange={e => setFormData({...formData, password: e.target.value})}
                      placeholder="••••••••" 
                      className="w-full border-gray-200 border-2 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:border-[#C4A661] outline-none transition-all"
                    />
                    <Lock size={16} className="absolute left-3.5 top-3.5 text-gray-300" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Permissão do Sistema</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Colaborador', 'Gestor', 'Administrador'] as User['role'][]).map(r => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setFormData({...formData, role: r})}
                        className={`p-3 rounded-xl border-2 text-center transition-all ${formData.role === r ? 'border-[#C4A661] bg-[#C4A661]/5 text-[#1E3A5F] font-bold' : 'border-gray-50 text-gray-400 font-medium'}`}
                      >
                        <span className="text-[10px] uppercase tracking-wider">{r}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 border border-gray-200 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-all uppercase text-[10px] tracking-widest"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-[#1E3A5F] text-white rounded-xl font-bold hover:bg-[#162a45] shadow-lg shadow-blue-900/20 transition-all uppercase text-[10px] tracking-widest"
                >
                  Salvar Usuário
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-[#1E3A5F] flex items-center gap-3">
            <Key size={24} className="text-[#C4A661]" />
            Controle de Acessos
          </h1>
          <p className="text-gray-500">Gerencie logins, senhas e permissões de acesso ao sistema.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#1E3A5F] text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-[#162a45] transition-all shadow-md"
        >
          <Plus size={18} /> NOVO ACESSO
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
        <div className="relative flex-1">
          <input 
            type="text" 
            placeholder="Buscar por nome ou e-mail de login..." 
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-transparent rounded-xl text-sm outline-none focus:bg-white focus:ring-2 focus:ring-[#C4A661]/20 transition-all" 
          />
          <Search size={18} className="absolute left-3.5 top-3 text-gray-400" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-gray-400 uppercase">Filtrar:</span>
          <select className="bg-gray-50 border-none rounded-xl px-4 py-2.5 text-sm text-[#1E3A5F] font-bold outline-none cursor-pointer">
            <option>Todos os Perfis</option>
            <option>Administrador</option>
            <option>Gestor</option>
            <option>Colaborador</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Usuário</th>
              <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Login / E-mail</th>
              <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Permissão</th>
              <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Último Acesso</th>
              <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-blue-50/30 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-100 border-2 border-white shadow-sm flex items-center justify-center font-bold text-[#1E3A5F] group-hover:border-[#C4A661] transition-all">
                      {u.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">{u.name}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-xs text-gray-500 font-medium">{u.email}</p>
                </td>
                <td className="px-6 py-4">
                  {getRoleBadge(u.role)}
                </td>
                <td className="px-6 py-4">
                  <p className="text-[10px] text-gray-400 font-bold uppercase">{u.lastLogin}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${u.status === 'Ativo' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {u.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-1">
                    <button className="p-2 hover:bg-[#C4A661]/10 text-gray-400 hover:text-[#C4A661] rounded-lg transition-all" title="Redefinir Senha">
                      <Lock size={16} />
                    </button>
                    <button className="p-2 hover:bg-gray-100 text-gray-400 hover:text-[#1E3A5F] rounded-lg transition-all">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-amber-50 border border-amber-100 p-6 rounded-[2rem] flex items-center gap-4">
        <div className="bg-amber-500 p-3 rounded-2xl text-white shadow-lg">
          <ShieldAlert size={24} />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-amber-900">Segurança de Acesso</h4>
          <p className="text-sm text-amber-700 mt-1">
            Como administrador, você é responsável pela integridade dos acessos. Recomendamos o uso de senhas fortes e a revisão mensal dos usuários ativos para garantir que apenas colaboradores autorizados tenham acesso ao sistema.
          </p>
        </div>
      </div>
    </div>
  );
};
