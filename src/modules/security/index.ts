import { SecurityDashboard } from './components/SecurityDashboard';
import { ModuleConfig } from '../types';

export const SecurityModule: ModuleConfig = {
  id: 'security',
  name: 'Security Monitoring',
  path: '/security',
  component: SecurityDashboard,
  enabled: true,
  icon: 'shield',
  order: 2,
  permissions: ['VIEW_SECURITY_ALERTS']
};

export default SecurityModule;