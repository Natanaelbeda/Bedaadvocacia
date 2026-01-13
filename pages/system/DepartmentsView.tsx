
import React, { useState, useEffect, useMemo } from 'react';
import { Briefcase, Plus, Search, Trash2, X, Users, Edit3, Save, CheckCircle2, UserPlus, UserMinus } from 'lucide-react';
import { Department, User } from '../../types';

const DEPT_STORAGE_KEY = 'pc_departments_v1';
const EMP_STORAGE_KEY = 'pc_employees_v1';

export const DepartmentsView: React.FC = () => {
  // Carrega departamentos salvos ou usa default
  const [departments, setDepartments] = useState<Department[]>(() => {
    const saved = localStorage.getItem(DEPT_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'Tecnologia da Informação', manager: 'Natanael Beda', employeeCount: 1, employeeIds: ['102'] },
      { id: '2', name: 'Recursos Humanos', manager: 'Maria Silva', employeeCount: 1, employeeIds: ['205'] },
    ];
  });

  // Carrega funcionários disponíveis
  const [availableEmployees, setAvailableEmployees] = useState<User[]>(() => {
    const saved = localStorage.getItem(EMP_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [
      { id: '102', name: 'Natanael Beda', role: 'Administrador', email: 'natanael@beda.com' },
      { id: '205', name: 'Maria Silva', role: 'Analista de RH', email: 'maria@empresa.com' },
      { id: '310', name: 'Carlos Santos', role: 'Operador', email: 'carlos@empresa.com' },
    ];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | null>(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    manager: '', 
    selectedIds: [] as string[] 
  });

  // Persiste departamentos sempre que mudar
  useEffect(() => {
    localStorage.setItem(DEPT_STORAGE_KEY, JSON.stringify(departments));
  }, [departments]);

  const handleOpenModal = (dept?: Department) => {
    if (dept) {
      setEditingDept(dept);
      setFormData({ 
        name: dept.name, 
        manager: dept.manager, 
        selectedIds: dept.employeeIds || [] 
      });
    } else {
      setEditingDept(null);
      setFormData({ name: '', manager: '', selectedIds: [] });
    }
    setIsModalOpen(true);
  };

  const toggleEmployee = (id: string) => {
    setFormData(prev => ({
      ...prev,
      selectedIds: prev.selectedIds.includes(id) 
        ? prev.selectedIds.filter(item => item !== id)
        : [...prev.selectedIds, id]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Department = {
      id: editingDept ? editingDept.id : Math.random().toString(36).substr(2, 5),
      name: formData.name,
      manager: formData.manager,
      employeeIds: formData.selectedIds,
      employeeCount: formData.selectedIds.length
    };

    if (editingDept) {
      setDepartments(departments.map(d => d.id === editingDept.id ? payload : d));
    } else {
      setDepartments([...departments, payload]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Deseja excluir este departamento? Funcionários vinculados ficarão sem setor.")) {
      setDepartments(departments.filter(d => d.id !== id));
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn">
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1E3A5F]/60 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-scaleIn flex flex-col max-h-[90vh]">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div>
                <h3 className="text-xl font-bold text-[#1E3A5F]">{editingDept ? 'Editar Departamento' : 'Novo Departamento'}</h3>
                <p className="text-sm text-gray-500">Configure nome, gestor e membros da equipe.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-2">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Nome do Setor</label>
                  <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Ex: Comercial" className="w-full border-gray-200 border-2 rounded-xl px-4 py-3 text-sm focus:border-[#C4A661] outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Gestor Responsável</label>
                  <input required value={formData.manager} onChange={e => setFormData({...formData, manager: e.target.value})} placeholder="Nome do Gestor" className="w-full border-gray-200 border-2 rounded-xl px-4 py-3 text-sm focus:border-[#C4A661] outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Vincular Funcionários ({formData.selectedIds.length})</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto p-4 bg-gray-50 rounded-2xl border-2 border-gray-100">
                  {availableEmployees.map(emp => (
                    <button
                      key={emp.id}
                      type="button"
                      onClick={() => toggleEmployee(emp.id)}
                      className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all ${
                        formData.selectedIds.includes(emp.id)
                          ? 'border-[#C4A661] bg-white shadow-sm'
                          : 'border-transparent hover:bg-white/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${
                           formData.selectedIds.includes(emp.id) ? 'bg-[#C4A661] text-white' : 'bg-gray-200 text-gray-500'
                        }`}>
                          {emp.name.substring(0,2).toUpperCase()}
                        </div>
                        <div className="text-left">
                          <p className={`text-xs font-bold ${formData.selectedIds.includes(emp.id) ? 'text-[#1E3A5F]' : 'text-gray-500'}`}>{emp.name}</p>
                          <p className="text-[9px] text-gray-400 uppercase">{emp.role}</p>
                        </div>
                      </div>
                      {formData.selectedIds.includes(emp.id) ? <UserMinus size={14} className="text-red-400" /> : <UserPlus size={14} className="text-[#C4A661]" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 border border-gray-200 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 transition-all uppercase text-[10px] tracking-widest">Cancelar</button>
                <button type="submit" className="flex-1 py-4 bg-[#1E3A5F] text-white rounded-2xl font-bold hover:bg-[#162a45] shadow-lg transition-all flex items-center justify-center gap-2 uppercase text-[10px] tracking-widest">
                  <Save size={14} /> {editingDept ? 'Salvar Alterações' : 'Criar Departamento'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-[#1E3A5F] flex items-center gap-3">
            <Briefcase size={24} className="text-[#C4A661]" /> Departamentos
          </h1>
          <p className="text-gray-500">Gestão de estrutura e organização de equipes.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="bg-[#1E3A5F] text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-[#162a45] transition-all shadow-md">
          <Plus size={18} /> ADICIONAR SETOR
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <div key={dept.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-[#C4A661] transition-all group relative overflow-hidden">
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="bg-gray-50 p-3 rounded-xl text-[#1E3A5F] group-hover:bg-[#C4A661] group-hover:text-white transition-colors">
                <Briefcase size={24} />
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleOpenModal(dept)} className="text-gray-300 hover:text-blue-500 transition-colors p-1" title="Editar"><Edit3 size={18} /></button>
                <button onClick={() => handleDelete(dept.id)} className="text-gray-300 hover:text-red-500 transition-colors p-1" title="Excluir"><Trash2 size={18} /></button>
              </div>
            </div>
            
            <h3 className="font-bold text-[#1E3A5F] text-lg mb-1">{dept.name}</h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Gestor: {dept.manager}</p>
            
            <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 p-3 rounded-xl">
              <Users size={14} className="text-[#C4A661]" />
              <span className="font-bold text-gray-700">{dept.employeeCount} Funcionários Vinculados</span>
            </div>

            <div className="mt-4 flex -space-x-2">
              {dept.employeeIds?.slice(0, 5).map(id => {
                const emp = availableEmployees.find(e => e.id === id);
                return (
                  <div key={id} className="w-8 h-8 rounded-full border-2 border-white bg-[#1E3A5F] flex items-center justify-center text-[8px] text-white font-bold" title={emp?.name}>
                    {emp?.name.substring(0,2).toUpperCase()}
                  </div>
                );
              })}
              {dept.employeeIds?.length > 5 && (
                <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[8px] text-gray-400 font-bold">
                  +{dept.employeeIds.length - 5}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
