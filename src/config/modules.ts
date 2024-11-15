export interface Module {
  id: string;
  name: string;
  path: string;
  enabled: boolean;
}

export const getEnabledModules = async (): Promise<Module[]> => {
  // In a real implementation, this would fetch from an API
  const response = await fetch(`${process.env.VITE_API_URL}/modules`);
  return response.json();
};