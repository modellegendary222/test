import { ComponentType } from 'react';

export interface ModuleConfig {
  id: string;
  name: string;
  path: string;
  component: ComponentType;
  enabled: boolean;
  icon: string;
  order: number;
  permissions?: string[];
}

export interface ModuleRegistration {
  register: () => ModuleConfig;
}