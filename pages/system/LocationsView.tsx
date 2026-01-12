
import React from 'react';
import { MapPin, Plus, Navigation, Shield, Search } from 'lucide-react';

export const LocationsView: React.FC = () => {
  const locations = [
    { id: 1, name: 'Sede Goiânia', address: 'Av. 85, Setor Sul, Goiânia - GO', radius: '500m', status: 'Ativo' },
    { id: 2, name: 'Filial Brasília', address: 'Setor Comercial Sul, Brasília - DF', radius: '300m', status: 'Ativo' },
    { id: 3, name: 'Home Office', address: 'Remoto (Permissão Global)', radius: 'N/A', status: 'Ativo' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-[#1E3A5F] flex items-center gap-3">
            <MapPin size={24} className="text-[#C4A661]" />
            Localizações Autorizadas
          </h1>
          <p className="text-gray-500">Perímetros geográficos onde o registro de ponto é permitido.</p>
        </div>
        <button className="bg-[#10B981] text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-[#0ea875] transition-all shadow-sm">
          <Plus size={18} /> NOVA ÁREA
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {locations.map((loc) => (
          <div key={loc.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-blue-50 p-3 rounded-xl text-[#1E3A5F]">
                <Navigation size={20} />
              </div>
              <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold uppercase">{loc.status}</span>
            </div>
            <h3 className="font-bold text-[#1E3A5F]">{loc.name}</h3>
            <p className="text-xs text-gray-500 mt-1">{loc.address}</p>
            <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase">
              <span>Raio de Alcance</span>
              <span className="text-[#C4A661]">{loc.radius}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#1E3A5F] p-8 rounded-[2rem] text-white flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        <div className="flex-1 space-y-4 relative z-10">
          <div className="flex items-center gap-2 text-[#C4A661] text-xs font-bold uppercase tracking-widest">
            <Shield size={16} /> Segurança de Registro
          </div>
          <h2 className="text-2xl font-bold leading-tight">Cerca Eletrônica (Geofencing) Ativada</h2>
          <p className="text-white/60 text-sm">O sistema valida automaticamente as coordenadas GPS do colaborador no momento do registro. Batidas fora do perímetro serão sinalizadas para auditoria.</p>
          <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg text-xs font-bold transition-all border border-white/10">VER MAPA DE CALOR</button>
        </div>
        <div className="w-full md:w-64 h-48 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center">
           <MapPin size={48} className="text-white/20" />
        </div>
      </div>
    </div>
  );
};
