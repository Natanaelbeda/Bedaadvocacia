
import React, { useState, useEffect } from 'react';
import { Users, Plus, Search, MoreHorizontal, Mail, X, CheckCircle2, Shield, Building2 } from 'lucide-react';
import { User, Department } from '../../types';

const EMP_STORAGE_KEY = 'pc_employees_v1';
const DEPT_STORAGE_KEY = 'pc_departments_v1';

export const EmployeesView: React.FC = () => {
  const [employees, setEmployees] = useState<User[]>(() => {
    const saved = localStorage.getItem(EMP_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [
      { id: '102', name: 'Natanael Beda', role: 'Administrador', dept: 'Tecnologia da Informação', status: 'Ativo', email: 'natanael@beda.com' },
      { id: '205', name: 'Maria Silva', role: 'Analista de RH', dept: 'Recursos Humanos', status: 'Ativo', email: 'maria@empresa.com' },
      { id: '310', name: 'Carlos Santos', role: 'Operador', dept: 'Logística', status: 'Em Férias', email: 'carlos@empresa.com' },
    ];
  });

  const [departments, setDepartments] = useState<Department[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEmp, setNewEmp] = useState({ name: '', role: '', dept: '', email: '', accessLevel: 'Colaborador' });

  // Carrega departamentos sincronizados
  useEffect(() => {
    const loadDepts = () => {
      const savedDepts = localStorage.getItem(DEPT_STORAGE_KEY);
      if (savedDepts) {
        const parsedDepts: Department[] = JSON.parse(savedDepts);
        setDepartments(parsedDepts);
        if (parsedDepts.length > 0 && !newEmp.dept) {
          setNewEmp(prev => ({ ...prev, dept: parsedDepts[0].name }));
        }
      } else {
        // Fallback caso não existam departamentos no storage ainda
        const fallbackDepts = [
          { id: '1', name: 'Tecnologia da Informação' },
          { id: '2', name: 'Recursos Humanos' },
          { id: '3', name: 'Logística' }
        ];
        setDepartments(fallbackDepts as Department[]);
        setNewEmp(prev => ({ ...prev, dept: fallbackDepts[0].name }));
      }
    };

    loadDepts();
    // Listener para mudanças no storage (caso o usuário adicione depto em outra aba)
    window.addEventListener('storage', (e) => {
      if (e.key === DEPT_STORAGE_KEY) loadDepts();
    });
  }, []);

  // Salva no LocalStorage sempre que houver alteração nos funcionários
  useEffect(() => {
    localStorage.setItem(EMP_STORAGE_KEY, JSON.stringify(employees));
  }, [employees]);

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    const employee: any = {
      id: Math.floor(Math.random() * 900 + 100).toString(),
      name: newEmp.name,
      role: newEmp.role,
      dept: newEmp.dept || (departments[0]?.name || 'Geral'),
      status: 'Ativo',
      email: newEmp.email
    };
    setEmployees([employee, ...employees]);
    setIsModalOpen(false);
    setNewEmp({ 
      name: '', 
      role: '', 
      dept: departments[0]?.name || '', 
      email: '', 
      accessLevel: 'Colaborador' 
    });

    // Atualiza o contador no departamento correspondente (opcional, para consistência visual imediata)
    const savedDepts = localStorage.getItem(DEPT_STORAGE_KEY);
    if (savedDepts) {
      const parsedDepts: Department[] = JSON.parse(savedDepts);
      const updatedDepts = parsedDepts.map(d => {
        if (d.name === employee.dept) {
          return {
            ...d,
            employeeIds: [...(d.employeeIds || []), employee.id],
            employeeCount: (d.employeeCount || 0) + 1
          };
        }
        return d;
      });
      localStorage.setItem(DEPT_STORAGE_KEY, JSON.stringify(updatedDepts));
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn">
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1E3A5F]/60 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden animate-scaleIn">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div>
                <h3 className="text-xl font-bold text-[#1E3A5F]">Novo Colaborador</h3>
                <p className="text-sm text-gray-500">Cadastre um novo usuário sincronizado com os setores.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-2"><X size={24} /></button>
            </div>
            <form onSubmit={handleAddEmployee} className="p-8 space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Nome Completo</label>
                  <input required value={newEmp.name} onChange={e => setNewEmp({...newEmp, name: e.target.value})} className="w-full border-gray-200 border-2 rounded-xl px-4 py-2.5 text-sm focus:border-[#C4A661] outline-none transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Cargo</label>
                    <input required value={newEmp.role} onChange={e => setNewEmp({...newEmp, role: e.target.value})} className="w-full border-gray-200 border-2 rounded-xl px-4 py-2.5 text-sm focus:border-[#C4A661] outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Departamento (Sincronizado)</label>
                    <select 
                      value={newEmp.dept} 
                      onChange={e => setNewEmp({...newEmp, dept: e.target.value})} 
                      className="w-full border-gray-200 border-2 rounded-xl px-4 py-2.5 text-sm outline-none bg-white focus:border-[#C4A661] transition-all"
                    >
                      {departments.length > 0 ? (
                        departments.map(d => (
                          <option key={d.id} value={d.name}>{d.name}</option>
                        ))
                      ) : (
                        <option value="">Carregando setores...</option>
                      )}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">E-mail</label>
                  <input required type="email" value={newEmp.email} onChange={e => setNewEmp({...newEmp, email: e.target.value})} className="w-full border-gray-200 border-2 rounded-xl px-4 py-2.5 text-sm focus:border-[#C4A661] outline-none" />
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 border border-gray-200 rounded-2xl font-bold text-gray-400 uppercase text-[10px] tracking-widest hover:bg-gray-50 transition-all">CANCELAR</button>
                <button type="submit" className="flex-1 py-4 bg-[#1E3A5F] text-white rounded-2xl font-bold shadow-lg hover:bg-[#162a45] transition-all uppercase text-[10px] tracking-widest">SALVAR COLABORADOR</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-[#1E3A5F] flex items-center gap-3"><Users size={24} className="text-[#C4A661]" /> Colaboradores</h1>
          <p className="text-gray-500">Gestão integrada com a estrutura de departamentos.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-[#1E3A5F] text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-[#162a45] transition-all shadow-md">
          <Plus size={18} /> CADASTRAR NOVO
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Colaborador</th>
              <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Cargo / Depto</th>
              <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">E-mail</th>
              <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {employees.map((emp: any) => (
              <tr key={emp.id} className="hover:bg-blue-50/30 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 border-2 border-white shadow-sm flex items-center justify-center font-bold text-[#1E3A5F] group-hover:border-[#C4A661] transition-all">
                      {emp.name.substring(0,2).toUpperCase()}
                    </div>
                    <p className="text-sm font-bold text-gray-800">{emp.name}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-700 font-medium">{emp.role}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Building2 size={10} className="text-[#C4A661]" />
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">{emp.dept}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-xs text-gray-500 font-medium">{emp.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${emp.status === 'Ativo' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>
                    {emp.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                   <button className="text-gray-300 hover:text-[#1E3A5F] transition-colors">
                     <MoreHorizontal size={20} />
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {employees.length === 0 && (
          <div className="py-20 text-center text-gray-400 italic">Nenhum colaborador cadastrado.</div>
        )}
      </div>
    </div>
  );
};
