
import React, { useState } from 'react';
import { PontoCertoLogo, StylizedB } from '../constants';
import { Lock, Mail, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { User } from '../types';

interface LoginViewProps {
  onLoginSuccess: (user: User) => void;
  onBack: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulação de banco de dados e delay de rede
    setTimeout(() => {
      const mockUsers: User[] = [
        { id: '1', name: 'Natanael Beda', email: 'natanael@beda.com', role: 'Administrador' },
        { id: '2', name: 'Maria Silva', email: 'maria@empresa.com', role: 'Gestor' },
        { id: '3', name: 'João Colaborador', email: 'joao@ponto.com', role: 'Colaborador' },
      ];

      const user = mockUsers.find(u => u.email === email.toLowerCase());

      if (user && password === '123456') {
        onLoginSuccess(user);
      } else {
        setError('E-mail ou senha incorretos. Tente "natanael@beda.com" e senha "123456"');
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1E3A5F] p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <StylizedB className="absolute -top-20 -left-20 w-[600px] h-[600px]" withBackground />
        <StylizedB className="absolute -bottom-20 -right-20 w-[600px] h-[600px]" withBackground />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-scaleIn">
          <div className="p-10 pt-12 text-center">
            <div className="flex justify-center mb-6">
              <StylizedB className="h-16" color="#1E3A5F" />
            </div>
            <h2 className="text-2xl font-bold text-[#1E3A5F]">Bem-vindo de volta!</h2>
            <p className="text-gray-400 text-sm mt-1">Acesse sua conta para gerenciar sua jornada.</p>
          </div>

          <form onSubmit={handleLogin} className="px-10 pb-10 space-y-5">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-bold flex items-center gap-3 border border-red-100 animate-shake">
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="relative">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">E-mail Corporativo</label>
                <div className="mt-1 relative">
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemplo@empresa.com"
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-[#C4A661] focus:bg-white rounded-2xl px-12 py-3.5 text-sm outline-none transition-all"
                  />
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                </div>
              </div>

              <div className="relative">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sua Senha</label>
                  <button type="button" className="text-[10px] font-bold text-[#C4A661] uppercase hover:underline">Esqueceu?</button>
                </div>
                <div className="mt-1 relative">
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-[#C4A661] focus:bg-white rounded-2xl px-12 py-3.5 text-sm outline-none transition-all"
                  />
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#1E3A5F] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#162a45] shadow-xl shadow-blue-900/20 transition-all disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  ENTRAR NO SISTEMA
                  <ArrowRight size={18} className="text-[#C4A661]" />
                </>
              )}
            </button>
            
            <button 
              type="button"
              onClick={onBack}
              className="w-full text-gray-400 text-xs font-bold uppercase tracking-widest py-2 hover:text-[#1E3A5F] transition-colors"
            >
              Voltar para o site
            </button>
          </form>
        </div>
        
        <p className="text-center mt-8 text-white/40 text-[10px] font-bold uppercase tracking-widest">
          Protegido por Ponto Certo Security Protocol
        </p>
      </div>
    </div>
  );
};
