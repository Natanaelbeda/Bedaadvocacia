
import React, { useState } from 'react';
import { Search, Plus, MoreVertical, Filter, Download, X, Building2, Mail, ShieldCheck } from 'lucide-react';
import { Agent } from '../../types';

export const MaintenanceAgentView: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([
    { id: '1', active: true, cnpj: '52.333.743/0001-87', razaoSocial: 'BEDA ADVOCACIA', nomeFantasia: 'BEDA ADVOCACIA', email: 'natanael@bedaadvocacia.com' },
    { id: '2', active: true, cnpj: '11.222.333/0001-44', razaoSocial: 'DEMO TECH SOLUTIONS', nomeFantasia: 'DEMO TECH', email: 'contato@demo.com' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    cnpj: '',
    razaoSocial: '',
    nomeFantasia: '',
    email: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAgent: Agent = {
      id: (agents.length + 1).toString(),
      active: true,
      ...formData
    };
    setAgents([...agents, newAgent]);
    setIsModalOpen(false);
    setFormData({ cnpj: '', razaoSocial: '', nomeFantasia: '', email: '' });
  };

  return (
    <div className="p-8 space-y-6 animate-fadeIn">
      {/* Registration Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1E3A5F]/60 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden animate-scaleIn">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-[#F8FAFC]">
              <div>
                <h3 className="text-xl font-bold text-[#1E3A5F]">Novo Agente Credenciado</h3>
                <p className="text-sm text-gray-500">Cadastre uma nova empresa no ecossistema.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-2">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">CNPJ</label>
                  <input 
                    required
                    type="text" 
                    placeholder="00.000.000/0001-00" 
                    value={formData.cnpj}
                    onChange={e => setFormData({...formData, cnpj: e.target.value})}
                    className="w-full border-gray-200 border rounded-xl px-4 py-2.5 text-sm focus:border-[#C4A661] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Razão Social</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Nome empresarial completo" 
                    value={formData.razaoSocial}
                    onChange={e => setFormData({...formData, razaoSocial: e.target.value})}
                    className="w-full border-gray-200 border rounded-xl px-4 py-2.5 text-sm focus:border-[#C4A661] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Nome Fantasia</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Nome comercial" 
                    value={formData.nomeFantasia}
                    onChange={e => setFormData({...formData, nomeFantasia: e.target.value})}
                    className="w-full border-gray-200 border rounded-xl px-4 py-2.5 text-sm focus:border-[#C4A661] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">E-mail Administrativo</label>
                  <input 
                    required
                    type="email" 
                    placeholder="adm@empresa.com" 
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full border-gray-200 border rounded-xl px-4 py-2.5 text-sm focus:border-[#C4A661] outline-none transition-all"
                  />
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
                  className="flex-1 py-3 bg-[#10B981] text-white rounded-xl font-bold hover:bg-[#0ea875] shadow-lg shadow-green-900/10 transition-all"
                >
                  CONFIRMAR AGENTE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Agentes</h1>
          <p className="text-gray-500">Gerencie os agentes credenciados no sistema.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#10B981] text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 shadow-sm hover:bg-[#0ea875] transition-all"
        >
          <Plus size={20} /> NOVO
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[300px]">
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Pesquisar</label>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Razão Social, Nome Fantasia, CPF/CNPJ ou E-mail" 
              className="w-full border-gray-200 border rounded-lg px-4 py-2 text-sm focus:border-[#3B82F6] transition-all outline-none"
            />
            <Search className="absolute right-3 top-2.5 text-gray-400" size={16} />
          </div>
        </div>
        <div className="w-48">
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Status</label>
          <select className="w-full border-gray-200 border rounded-lg px-3 py-2 text-sm outline-none focus:border-[#3B82F6]">
            <option>Ativos</option>
            <option>Inativos</option>
            <option>Todos</option>
          </select>
        </div>
        <button className="bg-[#1E3A5F] text-white px-6 py-2 rounded-lg font-bold text-sm h-10 hover:bg-[#162a45]">
          PESQUISAR
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#4B5563] text-white uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="px-6 py-3 w-20">Ativo</th>
                <th className="px-6 py-3">CPF / CNPJ</th>
                <th className="px-6 py-3">Razão Social</th>
                <th className="px-6 py-3">Nome Fantasia</th>
                <th className="px-6 py-3">E-mail</th>
                <th className="px-6 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {agents.map(agent => (
                <tr key={agent.id} className="hover:bg-blue-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="flex items-center justify-center">
                      <div className={`w-3 h-3 rounded-full ${agent.active ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-gray-600">{agent.cnpj}</td>
                  <td className="px-6 py-4 font-bold text-gray-800">{agent.razaoSocial}</td>
                  <td className="px-6 py-4 text-gray-600">{agent.nomeFantasia}</td>
                  <td className="px-6 py-4 text-gray-500 italic">{agent.email}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[#1E3A5F] p-1.5 hover:bg-gray-100 rounded-lg transition-all">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-[11px] font-bold text-gray-400 uppercase">
          <span>Exibindo 1 - {agents.length} de {agents.length} itens</span>
          <div className="flex gap-2">
            <button className="p-1 px-2 border border-gray-200 rounded disabled:opacity-50">Anterior</button>
            <button className="p-1 px-2 border border-gray-200 rounded bg-white text-[#1E3A5F]">1</button>
            <button className="p-1 px-2 border border-gray-200 rounded disabled:opacity-50">Próximo</button>
          </div>
        </div>
      </div>
    </div>
  );
};
