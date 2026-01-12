
import React, { useState } from 'react';
import { Users, Plus, Search, MoreHorizontal, Mail, X, CheckCircle2, Shield } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  role: string;
  dept: string;
  status: 'Ativo' | 'Inativo' | 'Em Férias';
  email: string;
}

export const EmployeesView: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([
    { id: '102', name: 'Natanael Beda', role: 'Administrador', dept: 'TI', status: 'Ativo', email: 'natanael@beda.com' },
    { id: '205', name: 'Maria Silva', role: 'Analista de RH', dept: 'Recursos Humanos', status: 'Ativo', email: 'maria@empresa.com' },
    { id: '310', name: 'Carlos Santos', role: 'Operador', dept: 'Logística', status: 'Em Férias', email: 'carlos@empresa.com' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEmp, setNewEmp] = useState({
    name: '',
    role: '',
    dept: 'TI',
    email: '',
    accessLevel: 'Colaborador'
  });

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    const employee: Employee = {
      id: Math.floor(Math.random() * 900 + 100).toString(),
      name: newEmp.name,
      role: newEmp.role,
      dept: newEmp.dept,
      status: 'Ativo',
      email: newEmp.email
    };
    setEmployees([employee, ...employees]);
    setIsModalOpen(false);
    setNewEmp({ name: '', role: '', dept: 'TI', email: '', accessLevel: 'Colaborador' });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn">
      {/* Registration Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1E3A5F]/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden animate-scaleIn">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div>
                <h3 className="text-xl font-bold text-[#1E3A5F]">Novo Colaborador</h3>
                <p className="text-sm text-gray-500">Cadastre um novo usuário para acessar o sistema.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-2">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleAddEmployee} className="p-8 space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Nome Completo</label>
                  <input 
                    required
                    type="text" 
                    value={newEmp.name}
                    onChange={e => setNewEmp({...newEmp, name: e.target.value})}
                    placeholder="Ex: João Silva" 
                    className="w-full border-gray-200 border rounded-xl px-4 py-2.5 text-sm focus:border-[#C4A661] outline-none transition-all"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Cargo</label>
                    <input 
                      required
                      type="text" 
                      value={newEmp.role}
                      onChange={e => setNewEmp({...newEmp, role: e.target.value})}
                      placeholder="Ex: Analista" 
                      className="w-full border-gray-200 border rounded-xl px-4 py-2.5 text-sm focus:border-[#C4A661] outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Departamento</label>
                    <select 
                      value={newEmp.dept}
                      onChange={e => setNewEmp({...newEmp, dept: e.target.value})}
                      className="w-full border-gray-200 border rounded-xl px-4 py-2.5 text-sm focus:border-[#C4A661] outline-none transition-all"
                    >
                      <option>TI</option>
                      <option>Recursos Humanos</option>
                      <option>Logística</option>
                      <option>Administrativo</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">E-mail de Acesso</label>
                  <input 
                    required
                    type="email" 
                    value={newEmp.email}
                    onChange={e => setNewEmp({...newEmp, email: e.target.value})}
                    placeholder="email@empresa.com" 
                    className="w-full border-gray-200 border rounded-xl px-4 py-2.5 text-sm focus:border-[#C4A661] outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Nível de Permissão</label>
                  <div className="grid grid-cols-2 gap-3 mt-1">
                    <button 
                      type="button"
                      onClick={() => setNewEmp({...newEmp, accessLevel: 'Colaborador'})}
                      className={`p-3 rounded-xl border-2 text-left transition-all ${newEmp.accessLevel === 'Colaborador' ? 'border-[#C4A661] bg-[#C4A661]/5' : 'border-gray-50'}`}
                    >
                      <p className="font-bold text-xs text-[#1E3A5F]">Colaborador</p>
                      <p className="text-[10px] text-gray-400">Apenas bater ponto e ver registros.</p>
                    </button>
                    <button 
                      type="button"
                      onClick={() => setNewEmp({...newEmp, accessLevel: 'Gestor'})}
                      className={`p-3 rounded-xl border-2 text-left transition-all ${newEmp.accessLevel === 'Gestor' ? 'border-[#C4A661] bg-[#C4A661]/5' : 'border-gray-50'}`}
                    >
                      <p className="font-bold text-xs text-[#1E3A5F]">Gestor</p>
                      <p className="text-[10px] text-gray-400">Pode ver relatórios e outros usuários.</p>
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 border border-gray-200 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-all"
                >
                  CANCELAR
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-[#1E3A5F] text-white rounded-xl font-bold hover:bg-[#162a45] shadow-lg shadow-blue-900/20 transition-all"
                >
                  SALVAR CADASTRO
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-[#1E3A5F] flex items-center gap-3">
            <Users size={24} className="text-[#C4A661]" />
            Colaboradores
          </h1>
          <p className="text-gray-500">Gestão centralizada do quadro de funcionários e permissões.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#1E3A5F] text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-[#162a45] transition-all shadow-sm"
        >
          <Plus size={18} /> CADASTRAR NOVO
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
        <div className="relative flex-1">
          <input type="text" placeholder="Buscar por nome, cargo ou e-mail..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border-transparent rounded-lg text-sm outline-none focus:bg-white focus:ring-2 focus:ring-[#C4A661]/20" />
          <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
        </div>
        <select className="bg-gray-50 border-none rounded-lg px-4 py-2 text-sm text-gray-600 outline-none">
          <option>Todos os Departamentos</option>
          <option>TI</option>
          <option>Recursos Humanos</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Colaborador</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Cargo / Depto</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">E-mail</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {employees.map((emp) => (
              <tr key={emp.id} className="hover:bg-blue-50/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-[#1E3A5F]">{emp.name.split(' ').map(n => n[0]).join('')}</div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">{emp.name}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">ID: {emp.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-700">{emp.role}</p>
                  <p className="text-[10px] text-gray-400 font-medium uppercase">{emp.dept}</p>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{emp.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${emp.status === 'Ativo' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {emp.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400"><MoreHorizontal size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
