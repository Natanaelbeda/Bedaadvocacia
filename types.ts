
export enum SystemSection {
  DASHBOARD = 'DASHBOARD',
  TIME_TRACKING = 'TIME_TRACKING',
  MY_RECORDS = 'MY_RECORDS',
  TIME_MIRROR = 'TIME_MIRROR',
  DEPARTMENTS = 'DEPARTMENTS',
  EMPLOYEES = 'EMPLOYEES',
  REPORTS = 'REPORTS',
  SETTINGS = 'SETTINGS',
  MAINTENANCE_AGENT = 'MAINTENANCE_AGENT',
  MAINTENANCE_COMPANY = 'MAINTENANCE_COMPANY',
  CADASTRO_ADJUSTMENTS = 'CADASTRO_ADJUSTMENTS',
  ACCESS_MANAGEMENT = 'ACCESS_MANAGEMENT'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Administrador' | 'Gestor' | 'Colaborador';
  avatar?: string;
  status?: 'Ativo' | 'Inativo';
  lastLogin?: string;
}

export interface TimeLog {
  id: string;
  userId: string;
  type: string;
  time: string;
  date: string;
  reason?: string;
  status: 'success' | 'warning' | 'error';
  location: string;
  method: string;
}

export interface Department {
  id: string;
  name: string;
  manager: string;
  employeeCount: number;
  employeeIds: string[]; // IDs dos colaboradores vinculados
}

export interface NavItem {
  label: string;
  path: string;
  icon?: any;
  badge?: string;
  section?: SystemSection;
}

export interface Agent {
  id: string;
  active: boolean;
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  email: string;
}
