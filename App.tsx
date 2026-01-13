
import React, { useState, useEffect } from 'react';
import { SystemSection, User } from './types';
import { Sidebar } from './components/system/Sidebar';
import { Header } from './components/system/Header';
import { LoginView } from './pages/LoginView';
import { DashboardView } from './pages/system/DashboardView';
import { TimeTrackingView } from './pages/system/TimeTrackingView';
import { MyRecordsView } from './pages/system/MyRecordsView';
import { TimeMirrorView } from './pages/system/TimeMirrorView';
import { LocationsView } from './pages/system/LocationsView';
import { EmployeesView } from './pages/system/EmployeesView';
import { ReportsView } from './pages/system/ReportsView';
import { SettingsView } from './pages/system/SettingsView';
import { MaintenanceAgentView } from './pages/system/MaintenanceAgentView';
import { AccessManagementView } from './pages/system/AccessManagementView';
import { WhatsAppButton } from './components/common/WhatsAppButton';

type AppState = 'LOGIN' | 'AUTHENTICATED';

const STORAGE_KEY = 'pc_user';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('LOGIN');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [section, setSection] = useState<SystemSection>(SystemSection.TIME_TRACKING);

  // Verifica se existe uma sessão salva ao carregar o app (Local ou Session)
  useEffect(() => {
    const savedUserLocal = localStorage.getItem(STORAGE_KEY);
    const savedUserSession = sessionStorage.getItem(STORAGE_KEY);
    const savedUser = savedUserLocal || savedUserSession;

    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setAppState('AUTHENTICATED');
    }
  }, []);

  const handleLoginSuccess = (user: User, rememberMe: boolean) => {
    setCurrentUser(user);
    setAppState('AUTHENTICATED');
    
    const userStr = JSON.stringify(user);
    if (rememberMe) {
      localStorage.setItem(STORAGE_KEY, userStr);
    } else {
      sessionStorage.setItem(STORAGE_KEY, userStr);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
    setCurrentUser(null);
    setAppState('LOGIN');
  };

  // Se não estiver autenticado, obriga o Login
  if (appState === 'LOGIN') {
    return (
      <LoginView 
        onLoginSuccess={handleLoginSuccess} 
      />
    );
  }

  // Layout do Sistema Autenticado
  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans">
      <Sidebar 
        currentSection={section} 
        onSectionChange={setSection} 
        user={currentUser}
      />
      <div className="flex-1 flex flex-col">
        <Header 
          user={currentUser} 
          onLogout={handleLogout} 
        />
        <main className="flex-1 overflow-y-auto bg-gray-50/50">
          {section === SystemSection.DASHBOARD && <DashboardView />}
          {section === SystemSection.TIME_TRACKING && <TimeTrackingView />}
          {section === SystemSection.MY_RECORDS && <MyRecordsView />}
          {section === SystemSection.TIME_MIRROR && <TimeMirrorView />}
          {section === SystemSection.LOCATIONS && <LocationsView />}
          {section === SystemSection.EMPLOYEES && <EmployeesView />}
          {section === SystemSection.ACCESS_MANAGEMENT && <AccessManagementView />}
          {section === SystemSection.REPORTS && <ReportsView />}
          {section === SystemSection.SETTINGS && <SettingsView />}
          {section === SystemSection.MAINTENANCE_AGENT && <MaintenanceAgentView />}
          
          {!Object.values(SystemSection).includes(section) && (
            <div className="p-10 text-center py-20">
               <h2 className="text-xl font-bold text-gray-400">Recurso em Desenvolvimento</h2>
               <button 
                onClick={() => setSection(SystemSection.TIME_TRACKING)}
                className="mt-4 text-[#3B82F6] underline"
               >
                 Voltar ao Ponto
               </button>
            </div>
          )}
        </main>
        
        <button 
          className="fixed bottom-6 left-6 bg-[#1E3A5F] text-white px-6 py-3 rounded-full font-bold shadow-2xl hover:scale-105 transition-all flex items-center gap-2 z-50 border border-white/10"
          onClick={() => alert("Central de Ajuda Ponto Certo")}
        >
          <div className="w-2 h-2 bg-[#C4A661] rounded-full animate-pulse"></div>
          Suporte
        </button>

        <WhatsAppButton />
      </div>
    </div>
  );
};

export default App;
